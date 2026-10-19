"""Eight source-aligned demonstrators, not the complete or validated ROMLAT battery."""
import argparse
import json
import re
import unicodedata

RULES_VERSION = 'romlat-eight-types-1.1-sk-images'
SOURCE = {'title': 'Assessing the acquisition of Romani in Roma children',
          'authors': 'Kyuchukov, de Villiers, Zhu & Zhong', 'year': 2024,
          'doi': '10.1080/10489223.2024.2310849'}
# Counts as printed in Table 1. The prose in 2.4 instead says 24 possessive items.
COUNTS = [8, 8, 16, 26, 6, 6, 4, 6]
PAGES = [7, 9, 11, 13, 14, 16, 18, 19]
TYPES = ['paired_wh', 'long_distance_wh', 'passives', 'possessives', 'tense', 'aspect', 'fast_mapping_nouns', 'fast_mapping_adjectives']
ORIGINAL = [
 'Kon so uravel?',
 'So phenďas e romňi hoj lakoro rom chudla?',
 'O grast si čhalavdo e džukelestar',
 'Akava naj tiro balono, akava si … (e grastesko balono)',
 'Ič o rom … (kreminlas)',
 'I daj sar kerla zumi, e čhajori … (travindas pe papuske bala)',
 'Dikh kate si jekh parno blepi. Sikhav mange o parno blepi.',
 'Kaja boja si patravali. Kaj si o patravalo …? (džukel)'
]
# Each row: title, introduction read aloud, elicitation, illustrative response.
CONTENT = {
 'sk': [
 ('Párové otázky', '', 'Kto má čo na hlave?', 'Dievča má klobúk a chlapec má šiltovku.'),
 ('Otázky s vedľajšou vetou', 'Žena povedala, že jej muž chytil rybu. V skutočnosti však chytil starú čižmu.', 'Čo žena povedala, že jej muž chytil?', 'Rybu.'),
 ('Trpný rod', '', 'Ukáž obrázok: Kôň je kopaný psom.', 'C'),
 ('Privlastňovanie', 'Pozri, toto je kôň. Má balón.', 'Toto nie je tvoj balón. Toto je…', 'Koňov balón.'),
 ('Čas pri nových slovesách', 'Tento muž vie kreminovať. „Kreminovať“ je vymyslené slovo pre činnosť na obrázku. Včera to robil tiež.', 'Včera muž…', 'Kreminoval.'),
 ('Vid pri nových slovesách', '1. Ukáž horný obrázok a povedz: „Túto činnosť nazveme travinovať. Kým mama varí polievku, dievča travinuje dedkove vlasy.“\n2. Ukáž dolný obrázok a prečítaj otázku nižšie. Nehovor vopred vzorovú odpoveď.', 'A na dolnom obrázku: Kým mama varí polievku, dievča už…', 'Dotravinovalo dedkove vlasy.'),
 ('Osvojovanie nových podstatných mien', 'Pozri, tu je jeden biely blepi. Neoznačuj pritom správny obrázok.', 'Ukáž mi biely blepi.', 'B'),
 ('Osvojovanie nových prídavných mien', 'Pozri: osol, mačka a pes. Ukáž rovnaký vzor na mačke a psovi: Tento vzor nazveme „patravalý“.', 'Ukáž, ktorý je patravalý.', 'C')
 ],
 'en': [
 ('Paired wh-questions', '', 'Who wears what?', 'The girl wears a hat and the boy wears a cap.'),
 ('Long-distance wh-questions', 'The woman said her husband caught a fish, but he really caught an old boot.', 'What did the woman say her husband caught?', 'A fish.'),
 ('Passives', '', 'Show the picture: The horse is being kicked by the dog.', 'C'),
 ('Possessives', 'Point to the horse at the top left. Look, there is a horse. He has a balloon.', 'This is not your balloon. This is…', "The horse’s balloon."),
 ('Tense with novel verbs', 'This man knows how to kremin. “Kremin” is a made-up word for the action in the picture. Yesterday he did this too.', 'Yesterday the man…', 'Kremined.'),
 ('Aspect with novel verbs', 'Point to the top picture: As the mother is making soup, the girl is travining her grandfather’s hair. “Travin” is a made-up word for this action. Now point to the bottom picture, where she has finished.', 'In the bottom picture: As the mother is making soup, the girl…', 'Has travined her grandfather’s hair.'),
 ('Fast mapping nouns', 'Look, here is a white blepi. Do not point to the target.', 'Show me the white blepi.', 'B'),
 ('Fast mapping adjectives', 'Look: the donkey, the cat and the dog. Point to the pattern shared by the cat and dog: This pattern is called “patravali”.', 'Show me the patravali one.', 'B or C: English has no gender cue here.')
 ],
 'vi': [
 ('Câu hỏi ghép cặp', '', 'Ai đội mũ gì?', 'Bé gái đội mũ rộng vành và bé trai đội mũ lưỡi trai.'),
 ('Câu hỏi có mệnh đề lồng ghép', 'Người phụ nữ nói rằng chồng mình câu được một con cá. Nhưng thực ra ông ấy câu được một chiếc ủng cũ.', 'Người phụ nữ nói rằng chồng mình câu được gì?', 'Một con cá.'),
 ('Câu bị động', '', 'Chọn hình: Con ngựa bị con chó đá.', 'C'),
 ('Sở hữu', 'Chỉ con ngựa ở góc trên bên trái. Đây là một con ngựa. Nó có một quả bóng bay.', 'Đây không phải là bóng bay của con. Đây là…', 'Bóng bay của con ngựa.'),
 ('Thời gian với động từ mới', 'Người đàn ông này biết kremin. “Kremin” là từ bịa để chỉ hoạt động trong hình. Hôm qua ông ấy cũng làm việc này.', 'Hôm qua người đàn ông…', 'Đã kremin.'),
 ('Thể với động từ mới', 'Chỉ hình trên: Trong khi mẹ nấu súp, bé gái đang travin tóc của ông. “Travin” là từ bịa cho hoạt động này. Chỉ hình dưới, nơi bé đã làm xong.', 'Ở hình dưới: Trong khi mẹ nấu súp, bé gái…', 'Đã travin xong tóc của ông.'),
 ('Học nhanh danh từ mới', 'Nhìn này, có một blepi màu trắng. Không chỉ vào đáp án.', 'Hãy chỉ blepi màu trắng.', 'B'),
 ('Học nhanh tính từ mới', 'Đây là con lừa, con mèo và con chó. Chỉ hoa văn trên mèo và chó: Hoa văn này được gọi là “patravali”.', 'Hãy chỉ con có hoa văn patravali.', 'B hoặc C: tiếng Việt không có dấu hiệu giống ngữ pháp ở đây.')
 ]
}
NOTES = {
'sk': [
 'Vyžadujú sa obe správne dvojice. Jeden pár nestačí. Slovenské zadanie je adaptácia.',
 'Odpoveď sa týka výroku ženy, nie skutočného úlovku. Slovenské zadanie je adaptácia.',
 'Pôvodný subtest má akčné aj psychologické slovesá. Táto ukážka obsahuje iba akčné sloveso z obr. 3.',
 'Táto položka je publikovaný príklad so známymi slovami. Pôvodný subtest skúma aj nové slová, rod a číslo; ich úplné zadania článok neposkytuje. Slovenský tvar posúdi dospelý.',
 'Ukážka minulého času podľa obr. 5. Pôvodný subtest obsahuje aj prítomný a budúci čas. Slovenské „kreminovať“ je pracovná adaptácia; posúdi dospelý.',
 'Hore dievča ešte pripína sponky do dedkových vlasov; dole má ruky spustené a úpravu už dokončilo. Testuje sa vyjadrenie dokončenia pomocou nového slovesa, nie pomenovanie sponiek. „Dotravinovalo dedkove vlasy“ je pracovný príklad, nie jediný schválený tvar. Odpoveď posúdi dospelý. Samotné „dáva sponky“ nepreukazuje použitie nového slovesa. Rozpoznávač môže vymyslené slovo prepísať nesprávne; overte prepis podľa reči dieťaťa.',
 'B je nový biely predmet; A je nový hnedý predmet, C známa košeľa. Pôvodná rómčina využíva aj gramatický rod. Slovenskú adaptáciu treba jazykovo overiť.',
 'Rod „patravalý“ zužuje výber na psa; osol nemá vzor a mačka má ženský rod. Ide o pracovnú slovenskú adaptáciu, nie pôvodnú validovanú položku.'
],
'en': [
 'Both correct pairs are required. A single pair is incomplete. English adaptation.',
 'Answer the woman’s report, not the real catch. English adaptation.',
 'The source subtest includes action and psychological verbs. This example only covers the action verb in Figure 3.',
 'Published known-word example only. The full subtest also tests novel nouns, gender and number. English possessives differ from Romani; adult review is required.',
 'Past-tense example from Figure 5. Present and future are also tested in the source battery. This adaptation requires adult review.',
 'Model the ongoing event and elicit the completed event. English aspect differs from Romani morphology; adult review is required.',
 'B is the novel white item, A the novel tan item and C the familiar shirt. English loses the original grammatical-gender cue; this is a limited adaptation.',
 'NOT EQUIVALENT: English provides no masculine cue, so both cat and dog fit. Record an exploratory response only; do not assign a source-test score. The Romani prompt is supplied for expert adaptation.'
],
'vi': [
 'Cần trả lời đủ hai cặp đúng. Một cặp là chưa đầy đủ. Đây là bản chuyển thể.',
 'Trả lời theo lời người phụ nữ, không phải vật thực sự câu được. Bản chuyển thể.',
 'Bản gốc có động từ hành động và tâm lý. Ví dụ này chỉ dùng động từ hành động ở hình 3.',
 'Chỉ là ví dụ với từ quen thuộc. Bản gốc còn kiểm tra từ mới, giống và số. Tiếng Việt không có biến tố sở hữu như tiếng Romani; cần người lớn kiểm tra.',
 'Ví dụ quá khứ ở hình 5. Bản gốc còn có hiện tại và tương lai. Tiếng Việt không chia động từ như tiếng Romani; cần người lớn kiểm tra.',
 'Làm mẫu hành động đang diễn ra, yêu cầu diễn tả hành động đã hoàn tất. Đây là bản chuyển thể, cần người lớn kiểm tra.',
 'B là đồ vật mới màu trắng, A là đồ vật mới màu nâu, C là áo quen thuộc. Tiếng Việt không giữ được dấu hiệu giống ngữ pháp của bản gốc.',
 'KHÔNG TƯƠNG ĐƯƠNG: cả mèo và chó đều phù hợp vì không có dấu hiệu giống đực. Chỉ ghi nhận câu trả lời thăm dò, không tính điểm theo bài gốc.'
]}
MESSAGES = {
 'sk': {'empty':'Odpoveď nebola zaznamenaná.', 'manual':'Odpoveď vyžaduje odbornú kontrolu podľa jazykového kľúča. Automatické skóre sa neprideľuje.', 'correct':'Odpoveď zodpovedá kľúču tejto ukážkovej položky.', 'wrong':'Vybraný obrázok nezodpovedá zadaniu.', 'incomplete':'Uvedená je iba jedna správna dvojica.', 'unknown':'Pravidlá túto formuláciu spoľahlivo nevyhodnotia. Skontrolujte odpoveď.', 'ambiguous':'V tomto preklade chýba rodová nápoveda. Položka nemá jednoznačný správny obrázok a nie je skórovaná.'},
 'en': {'empty':'No response recorded.', 'manual':'Expert review using a language-specific key is required. No automatic score is assigned.', 'correct':'The answer matches this demonstration item’s key.', 'wrong':'The selected picture does not match the prompt.', 'incomplete':'Only one correct pair was given.', 'unknown':'The rules cannot reliably evaluate this wording. Review the response.', 'ambiguous':'This translation lacks the gender cue. There is no unique correct picture, so the item is unscored.'},
 'vi': {'empty':'Chưa ghi nhận câu trả lời.', 'manual':'Cần chuyên gia kiểm tra theo ngôn ngữ. Không tự động chấm điểm.', 'correct':'Câu trả lời khớp đáp án của ví dụ này.', 'wrong':'Hình được chọn không khớp đề bài.', 'incomplete':'Chỉ có một cặp đúng.', 'unknown':'Quy tắc chưa đánh giá được cách diễn đạt này. Cần kiểm tra.', 'ambiguous':'Bản dịch thiếu dấu hiệu giống ngữ pháp, không có một đáp án duy nhất. Không chấm điểm.'}
}
TASKS_BY_LANGUAGE = {}
for lang, rows in CONTENT.items():
 tasks = {}
 for i,(title,scene,question,example) in enumerate(rows):
  number=i+1; tid=f'SUBTEST_{number:02}'
  image=f'/images/sk/{tid}.png' if lang=='sk' else f'/images/{tid}.png'
  choices=[{'id':c,'image':image if lang=='sk' else f'/images/{tid}_{c}.png','label':c,
            'crop':(('animal-' if number==8 else 'third-')+c.lower()) if lang=='sk' else 'full'} for c in 'ABC'] if number in (3,7,8) else []
  tasks[tid]={'id':tid,'title':title,'type':TYPES[i],'subtest':number,'scene':scene,'question':question,
   'image':image,'image_set':'sk_ai_v1' if lang=='sk' else 'article_figures_v1',
   'image_note':{'sk':'Nová AI ilustrácia pre slovenské prostredie; pracovná adaptácia, nie obrázok z článku.',
                 'en':'Original figure extracted from the supplied article.',
                 'vi':'Hình gốc trích từ bài báo đã cung cấp.'}[lang],
   'examples':[[example,'illustration_only']], 'response_mode':'choice' if choices else 'text','options':choices,
   'source':dict(SOURCE,section=f'2.{number}',printed_page=PAGES[i],figure=number if number<7 else number+1,
                 original_item_count=COUNTS[i],original_prompt=ORIGINAL[i]),
   'adaptation_note':NOTES[lang][i], 'rubric':example,
   'equivalence':'not_equivalent_unscored' if number==8 and lang!='sk' else 'unvalidated_adaptation',
   'scoring':'manual' if number in (4,5,6) else 'unscored' if number==8 and lang!='sk' else 'conservative_rules',
   'correct_choice':{3:'C',7:'B',8:'C'}.get(number)}
 TASKS_BY_LANGUAGE[lang]=tasks
LEXICONS={lang:{'labels':{}} for lang in CONTENT}
TASK_LIST=list(TASKS_BY_LANGUAGE['sk'].values())

def normalize(value, language='sk'):
 value=unicodedata.normalize('NFC',value).casefold().replace('’',"'")
 if language!='vi': value=''.join(c for c in unicodedata.normalize('NFD',value) if not unicodedata.combining(c))
 return re.sub(r'\s+',' ',value).strip().rstrip('.!?')

PAIR_PATTERNS={
 'sk':[r'(?:dievca|dievcatko) (?:ma|nosi)(?: na hlave)? klobuk',r'(?:chlapec|chlapcek) (?:ma|nosi)(?: na hlave)? (?:siltovku|ciapku)'],
 'en':[r'(?:the )?girl (?:wears|is wearing|has)(?: a)? hat',r'(?:the )?boy (?:wears|is wearing|has)(?: a)? cap'],
 'vi':[r'(?:bé gái|cô bé) đội (?:mũ rộng vành|mũ vành)',r'(?:bé trai|cậu bé) đội (?:mũ lưỡi trai|mũ bóng chày)']}
FISH={'sk':['rybu','ryba','chytil rybu','ze chytil rybu'], 'en':['fish','a fish','he caught a fish','that he caught a fish'], 'vi':['cá','con cá','một con cá','câu được một con cá','ông ấy câu được một con cá']}
BOOT={'sk':['cizmu','staru cizmu'], 'en':['a boot','an old boot','boot'], 'vi':['chiếc ủng','một chiếc ủng cũ']}

def evaluate(text, task_id='SUBTEST_01', language='sk'):
 task=TASKS_BY_LANGUAGE[language][task_id]; n=task['subtest']; answer=normalize(text,language)
 status,key='needs_review','unknown'
 if not answer: status,key='unscorable','empty'
 elif task['scoring']=='unscored': status,key='unscorable','ambiguous'
 elif task['response_mode']=='choice':
  if answer.upper() in 'ABC' and len(answer)==1:
   status,key=('correct','correct') if answer.upper()==task['correct_choice'] else ('incorrect','wrong')
 elif task['scoring']=='manual': status,key='needs_review','manual'
 elif n==1:
  conjunction={'sk':'a','en':'and','vi':'và|còn'}[language]
  parts=re.split(r'\s+(?:'+conjunction+r')\s+|\s*[,;.]\s*',answer)
  parts=[p.strip() for p in parts if p.strip()]
  recognized=[next((i for i,pat in enumerate(PAIR_PATTERNS[language]) if re.fullmatch(pat,p)),None) for p in parts]
  if None not in recognized and set(recognized)=={0,1}: status,key='correct','correct'
  elif len(recognized)==1 and recognized[0] is not None: status,key='incomplete','incomplete'
 elif n==2:
  if answer in FISH[language]: status,key='correct','correct'
  elif answer in BOOT[language]: status,key='incorrect','wrong'
 score=1 if status=='correct' else 0 if status in ('incorrect','incomplete') else None
 return {'task_id':task_id,'language':language,'rules_version':RULES_VERSION,'engine':'rules_demo_not_ai',
         'transcript':text,'status':status,'score':score,'reason':MESSAGES[language][key],
         'recognized_pairs':[],'missing_pairs':[],'unexpected_pairs':[],'recognized_answer':[],
         'error_type':key,'subtest':n,'equivalence':task['equivalence']}

if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--lang',choices=list(CONTENT),default='sk')
 parser.add_argument('--task',default='SUBTEST_01',choices=list(TASKS_BY_LANGUAGE['sk']))
 parser.add_argument('--answer');args=parser.parse_args()
 print(json.dumps(evaluate(args.answer if args.answer is not None else input(TASKS_BY_LANGUAGE[args.lang][args.task]['question']+' '),args.task,args.lang),ensure_ascii=False,indent=2))
