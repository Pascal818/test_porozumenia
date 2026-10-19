"""Lokálna webová verzia. Spustenie: python web.py (iba štandardná knižnica)."""
import argparse
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
import webbrowser

from test_porozumenia import TASKS_BY_LANGUAGE, LEXICONS, evaluate

ROOT = Path(__file__).resolve().parent
FILES = {'/': ('index.html', 'text/html; charset=utf-8'),
         '/index.html': ('index.html', 'text/html; charset=utf-8'),
         '/app.js': ('app.js', 'text/javascript; charset=utf-8'),
         '/session.js': ('session.js', 'text/javascript; charset=utf-8'),
         '/style.css': ('style.css', 'text/css; charset=utf-8')}


# Register only explicitly declared assets; no general filesystem route.
for tasks in TASKS_BY_LANGUAGE.values():
    for task in tasks.values():
        for path in [task['image']] + [option['image'] for option in task['options']]:
            FILES[path] = (path.lstrip('/'), 'image/png')

def get_tasks(language):
    if language not in TASKS_BY_LANGUAGE:
        raise ValueError('Unsupported language')
    return {'language': language, 'tasks': [
        {key: value for key, value in task.items() if key != 'correct_choice'}
        for task in TASKS_BY_LANGUAGE[language].values()]}


def grade_request(data):
    if not isinstance(data, dict):
        raise ValueError('Expected an object')
    language, task_id, answer = data.get('language'), data.get('task_id'), data.get('answer')
    if not isinstance(language, str) or language not in TASKS_BY_LANGUAGE:
        raise ValueError('Unsupported language')
    if not isinstance(task_id, str) or task_id not in TASKS_BY_LANGUAGE[language]:
        raise ValueError('Unknown task')
    if not isinstance(answer, str) or len(answer) > 2000:
        raise ValueError('Answer must be text, maximum 2000 characters')
    result = evaluate(answer, task_id, language)
    result['labels'] = LEXICONS[language]['labels']
    return result


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # Odpovede používateľa sa nezapisujú do logov.

    def allowed_host(self):
        port = self.server.server_port
        return self.headers.get('Host') in ('127.0.0.1:' + str(port), 'localhost:' + str(port))

    def send_bytes(self, status, body, mime):
        self.send_response(status)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        self.end_headers()
        self.wfile.write(body)

    def send_json(self, status, data):
        self.send_bytes(status, json.dumps(data, ensure_ascii=False).encode('utf-8'),
                        'application/json; charset=utf-8')

    def do_GET(self):
        if not self.allowed_host():
            self.send_json(403, {'error': 'Invalid host'})
            return
        url = urlsplit(self.path)
        if url.path == '/api/tasks':
            language = parse_qs(url.query).get('language', ['sk'])[0]
            try:
                self.send_json(200, get_tasks(language))
            except ValueError:
                self.send_json(400, {'error': 'Unsupported language'})
        elif url.path in FILES:
            filename, mime = FILES[url.path]
            self.send_bytes(200, (ROOT / filename).read_bytes(), mime)
        else:
            self.send_json(404, {'error': 'Not found'})

    def do_POST(self):
        if not self.allowed_host():
            self.send_json(403, {'error': 'Invalid host'})
            return
        origin = self.headers.get('Origin')
        if origin and origin not in ('http://127.0.0.1:' + str(self.server.server_port),
                                     'http://localhost:' + str(self.server.server_port)):
            self.send_json(403, {'error': 'Invalid origin'})
            return
        if self.path != '/api/evaluate':
            self.send_json(404, {'error': 'Not found'})
            return
        if self.headers.get('Content-Type', '').split(';')[0].strip() != 'application/json':
            self.send_json(415, {'error': 'Expected application/json'})
            return
        try:
            size = int(self.headers.get('Content-Length', '0'))
        except ValueError:
            size = 0
        if not 0 < size <= 16384:
            self.send_json(400, {'error': 'Invalid request size'})
            return
        try:
            data = json.loads(self.rfile.read(size).decode('utf-8'))
            result = grade_request(data)
        except (ValueError, UnicodeError):
            self.send_json(400, {'error': 'Invalid answer, task or language'})
            return
        self.send_json(200, result)


def main():
    parser = argparse.ArgumentParser(description='Test porozumenia: lokálna stránka bez API.')
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--no-browser', action='store_true')
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('Port musí byť 1–65535.')
    try:
        server = ThreadingHTTPServer(('127.0.0.1', args.port), Handler)
    except OSError as error:
        print('Server sa nepodarilo spustiť:', error)
        print('Skús iný port: python web.py --port 8001')
        raise SystemExit(1)
    url = 'http://127.0.0.1:' + str(args.port)
    print('Otvor v prehliadači:', url, flush=True)
    print('Toto okno nechaj otvorené. Ukončenie: Ctrl+C.', flush=True)
    if not args.no_browser:
        try:
            webbrowser.open(url)
        except webbrowser.Error:
            pass
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer ukončený.')
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
