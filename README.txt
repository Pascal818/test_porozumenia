TEST POROZUMENIA — OSEM SUBTESTOV PODĽA ČLÁNKU ROMLAT

SPUSTENIE
1. Rozbaľ celý ZIP do nového priečinka a otvor porozumenie-web vo VS Code.
2. V termináli spusti: python web.py
   Na Windows môžeš použiť: py web.py
3. Otvor http://127.0.0.1:8000, ak sa stránka neotvorí sama.
4. Terminál nechaj bežať. Ukončenie: Ctrl+C.
Potrebuješ Python 3.8+, bez inštalácie ďalších knižníc a bez API kľúča.
Neotváraj index.html dvojklikom. Pri obsadenom porte: python web.py --port 8001
Pri aktualizácii zastav starý server. Spusti nový a obnov stránku Ctrl+F5.

ČO SA ZMENILO
Pôvodných osem voľne navrhnutých otázok nahrádza osem odlišných typov
z oddielov 2.1–2.8 článku. Každý typ má JEDNU ukážkovú položku:
1. Párové otázky — dievča s klobúkom a chlapec so šiltovkou.
2. Otázky s vedľajšou vetou — povedala ryba, v skutočnosti čižma.
3. Trpný rod — kôň je kopaný psom; výber jedného z troch obrázkov.
4. Privlastňovanie — kôň a balón; doplnenie privlastňovacieho tvaru.
5. Čas pri nových slovesách — nové sloveso kremin; minulý čas.
6. Vid pri nových slovesách — travin; prebiehajúci a dokončený dej.
7. Osvojovanie nových podstatných mien — biely blepi; výber obrázka.
8. Osvojovanie nových prídavných mien — patravali/patravalo; výber obrázka.
Podrobná mapa na článok a obmedzenia sú v METODIKA.md.

OVLÁDANIE
Dospelý vyberie SK / EN / VI a celý test alebo skúšanie jednej úlohy.
Pri úlohách s úvodom sa automaticky otvoria pokyny pre dospelého.
Prečítaj dieťaťu úvod, podľa potreby ukáž časť obrázka, potom klikni
Späť k dieťaťu. Poznámku o adaptácii nečítaj ako súčasť zadania.
Pri nových slovách je tento úvod súčasťou úlohy, nepreskakuj ho.
Na výberových úlohách dieťa klikne na obrázok A/B/C a potom odošle odpoveď.
Na ostatných úlohách použije text alebo mikrofón. Enter odošle text;
Shift+Enter vytvorí nový riadok. Prázdna odpoveď sa zaznamená bez skóre.
Po odoslaní sa zobrazí iba neutrálne potvrdenie; ďalšia úloha pokračuje.
Po ôsmej položke môže dospelý otvoriť výsledky a kontrolu.
V skúšaní jednej úlohy sú dostupné ukážky odpovedí aj zdrojové poznámky.
Tieto skúšobné odpovede sa nezapisujú do celého testu.

HODNOTENIE
- Párová otázka: vyžaduje obe dvojice. Rozpoznaný jeden pár = neúplné.
- Vedľajšia veta: ryba, nie skutočný úlovok (čižma).
- Obrázkové úlohy: presné vyhodnotenie výberu podľa ukážkového kľúča.
- Privlastňovanie, čas a vid: dospelý musí skontrolovať slovný tvar.
  Ani ukážková odpoveď sa automaticky neoznačí ako správna.
- Neznáme textové formulácie zostávajú na kontrolu, nie automaticky chybné.
- V EN/VI nemá úloha 8 gramatickú rodovú nápovedu: mačka aj pes majú vzor.
  Je iba prieskumná, zostáva bez skóre a číselné ručné hodnotenie je blokované.
  Na plnohodnotný ekvivalent treba jazykového odborníka a nové overenie.
Správne = 1; nesprávne/neúplné = 0; na kontrolu/nevyhodnotiteľné = bez skóre.
Súhrn je iba technický prehľad. Každý riadok predstavuje jeden subtest,
ale len jednu položku, nie výsledok celého pôvodného subtestu.

KONTROLA A CSV
Dospelý môže opraviť prepis alebo ručne hodnotiť s povinnou poznámkou.
Pri obrázkových úlohách sa odpoveď ukladá ako A/B/C; poradie zodpovedá PDF.
Pôvodná odoslaná odpoveď sa nikdy neprepíše. Zmeny majú čas a históriu.
CSV obsahuje pôvodné aj aktuálne výsledky, históriu, číslo subtestu,
sekciu/stranu/obrázok/DOI zdroja, stav jazykovej adaptácie, sadu a cestu obrázka.
CSV používa UTF-8 s BOM a bodkočiarku. Prázdne skóre neznamená nulu.
Údaje sú len v pamäti otvorenej stránky; pred zatvorením/obnovením exportuj CSV.
Nie je tu databáza ani import výsledkov. Detské/dospelé zobrazenie nemá heslo.

MIKROFÓN
Prepis poskytuje služba prehliadača; môže potrebovať internet a posielať zvuk
online službe. Aplikácia zvuk neukladá. Lokálne úlohy a text fungujú bez API.
Podpora jazykov sk-SK/en-GB/vi-VN závisí od prehliadača a služby.
Prepis sa vloží do poľa, neodošle sa automaticky. Skontroluj ho pred odoslaním.
Vymyslené slová môže rozpoznávač zmeniť na známe slová: pri úlohách 4–6
musí dospelý overiť presný prepis. Tento prototyp neposudzuje výslovnosť.

SÚBORY
web.py                  lokálny server a API
test_porozumenia.py      osem subtestov, SK/EN/VI, zdrojové údaje a hodnotenie
app.js, index.html      ovládanie, mikrofón a zobrazenia
style.css               vzhľad
session.js              záznamy, história, súhrn a export
images/SUBTEST_*.png     pôvodné obrázky pre EN/VI
images/sk/SUBTEST_*.png  nové AI ilustrácie pre SK
METODIKA.md             presná mapa na zdroj a hranice adaptácie
test_subtests.py         automatické kontroly obsahu a hodnotenia

OVERENIE
Spusti: python -m unittest test_subtests.py
Overené boli aj API a programovo simulovaný celý priechod SK/EN/VI,
výber obrázkov, úvodné pokyny, mikrofónové udalosti, Enter, chyby požiadaviek,
opakované odoslanie, ručné opravy, história a CSV.
Fyzický mikrofón ani vizuálne vykreslenie v skutočnom prehliadači neboli
v tomto prostredí overené. Pred ukážkou učiteľovi skús celý priechod lokálne.

