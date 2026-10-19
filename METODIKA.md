# Mapa prototypu na článok

Zdroj: Hristo Kyuchukov, Jill de Villiers, Yanwan Zhu a Iris Zhong (2024), *Assessing the acquisition of Romani in Roma children*, Language Acquisition. DOI: https://doi.org/10.1080/10489223.2024.2310849. Zdrojom implementácie je PDF dodané k tomuto projektu.

**Implementovaných je osem typov, každý s jednou publikovanou ukážkou upravenou do SK/EN/VI. Nie je implementovaných všetkých 80 položiek.** Nie je to autorizovaná ani validovaná verzia ROMLAT. Neprenášame normy zo štúdie na tieto preklady alebo na tento malý súbor.

Strany nižšie označujú vytlačené čísla strán článku. Pri prehliadači, ktorý započítava titulnú stranu, je poradové číslo PDF strany o jedno vyššie.

| Subtest | Zdroj | Položiek v tabuľke 1 | Implementovaná ukážka | Odpoveď a hodnotenie |
|---|---|---:|---|---|
| 1. Paired wh-questions | §2.1, s. 6–7, obr. 1 | 8 | Dievča nosí klobúk, chlapec šiltovku; kto nosí čo? | Ústna/textová odpoveď; obe dvojice. Jeden rozpoznaný pár je neúplný. |
| 2. Long-distance wh-questions | §2.2, s. 7–10, obr. 2 | 8 | Žena povedala rybu, muž chytil čižmu; otázka na jej výrok. | Ústna/textová odpoveď; ryba. |
| 3. Passives | §2.3, s. 10–11, obr. 3 | 16 | Kôň je kopaný psom. | Výber obrázka C. |
| 4. Possessives | §2.4, s. 12–13, obr. 4 | 26* | Kôň má balón; doplnenie privlastnenia. | Ústna/textová produkcia; odborná kontrola. |
| 5. Tense | §2.5, s. 13–14, obr. 5 | 6 | Nové sloveso kremin; doplnenie minulého času. | Ústna/textová produkcia po predstavení slova; odborná kontrola. |
| 6. Aspect | §2.6, s. 15–16, obr. 6 | 6 | Travin: model prebiehajúceho deja, produkcia dokončeného deja. | Ústna/textová produkcia po predstavení; odborná kontrola. |
| 7. Fast mapping nouns | §2.7, s. 16–18, obr. 8 | 4 | Biely blepi medzi známou košeľou a dvoma novými predmetmi. | Výber obrázka B. |
| 8. Fast mapping adjectives | §2.8, s. 18–19, obr. 9 | 6 | Patravali/patravalo: vzor a gramatický rod pri oslovi, mačke a psovi. | SK: pracovný kľúč C; EN/VI: nejednoznačné, bez skóre. |

\* Tabuľka 1 uvádza 26 privlastňovacích položiek, text §2.4.2 uvádza 24. Prototyp zachováva údaj 26 z tabuľky (súčet 80) a rozpor nevykladá ako vyriešený. Potrebný je pôvodný manuál alebo vysvetlenie autorov.

## Čo ukážky nepokrývajú

- Subtest 1 má v zdroji aj otázky kto/kde, spôsob/argument a trojité otázky. Táto ukážka pokrýva iba kto/čo.
- Subtest 2 obsahuje rôzne typy vedľajších viet a dialektové varianty. Použitý je iba príklad ryba/čižma.
- Subtest 3 má osem akčných a osem psychologických slovies. Použité je jedno akčné sloveso.
- Subtest 4 zahŕňa známe aj nové podstatné mená, variácie rodu a čísla. Obrázok ukazuje aj nové tvory/predmety, ale článok neuvádza úplné zadania a mená všetkých položiek. Použité je iba úplne opísané zadanie kôň/balón; nové názvy sme si nevymýšľali ako údajný originál.
- Subtest 5 obsahuje prítomný, budúci a minulý čas. Použitý je minulý čas s obrázkom kremin. Príklady flimin a zitivin sú v texte, ale nejde o kompletne sprístupnený šesťpoložkový súbor obrázkov a zadaní.
- Subtest 6 preveruje produkciu oboch vidových podôb. Ukážka modeluje prebiehajúci dej a vyvoláva dokončený; nenahrádza všetkých šesť položiek.
- Obrázok 7 článku je ilustračný príklad z iného nástroja QUILS, preto ho nepoužívame namiesto obr. 8 ROMLAT.
- Popis obrázka 9 v článku uvádza „tense subtest“, ale umiestnenie a výklad §2.8 ho jednoznačne používajú pri osvojovaní prídavných mien. Mapovanie sa riadi týmto výkladom.

## Jazykové adaptácie

Originál hodnotí rómčinu. Rómske formulácie z článku sú uložené ako zdrojový údaj pre dospelého; aplikácia neponúka overenú rómsku administráciu ani rozpoznávanie rómskej reči.

Slovenské, anglické a vietnamské zadania sú pracovné adaptácie publikovaných príkladov. Kľúče pre nové slovné tvary musí pripraviť odborník na daný jazyk. Príklady „kreminoval“ a „dotravinovalo“ sú návrhy pre skúšanie prototypu, nie doložené slovenské testové normy. Vietnamské vyjadrenie času a vlastníctva sa nesmie vydávať za test rovnakých skloňovacích/časovacích koncoviek ako v rómčine.

V subteste 7 angličtina a vietnamčina zachovávajú nový predmet a bielu farbu, ale strácajú pôvodnú rodovú nápovedu. Technický výber B preto nie je dôkazom zvládnutia pôvodného rómskeho mechanizmu.

V subteste 8 je rod rozhodujúci: vzor majú mačka aj pes. Anglický a vietnamský preklad nevyberá jediné zviera. Aplikácia odpoveď uloží ako prieskumnú, bez skóre; blokuje aj číselné ručné hodnotenie tejto neekvivalentnej položky. Nevymýšľame dodatočnú obsahovú nápovedu, ktorá by menila testovanú schopnosť a tvárila sa ako presný preklad.

## Postup a hodnotenie

Pri úlohách s úvodom aplikácia pred odpoveďou otvorí pokyny pre dospelého. Dospelý prečíta úvod a ukáže stanovený obrázok. Najmä pri nových slovách je potrebné zachovať poradie modelovania a vyvolania odpovede.

Na výberových úlohách sa ukladá A/B/C. Na produkčných úlohách sa ukladá odoslaný prepis. Prepis reči môže opraviť nové slovo na známe: dospelý musí overiť, či text zodpovedá tomu, čo dieťa povedalo. Zvuk aplikácia neuchováva, preto nejde o neskoršiu kontrolu podľa nahrávky.

Automatické hodnotenie je konzervatívne a pravidlové. Neznáma formulácia nie je automaticky nesprávna. Privlastňovanie, čas a vid vyžadujú odbornú kontrolu aj pri odpovedi zhodnej s pracovným príkladom. Ručné rozhodnutie musí mať poznámku a zostáva v histórii vedľa pôvodného výsledku.

Každý riadok výsledkov je jeden subtest reprezentovaný jedinou položkou. Súčet bodov slúži len na technické skúšanie. Neurčuje jazykovú úroveň, poruchu ani vekovú normu. Medzijazykové skóre sa nesmie považovať za priamo porovnateľné.

## Obrázky a ďalšia práca

Pre EN/VI sú súbory images/SUBTEST_01 až SUBTEST_08 výrezy obrázkov 1–6, 8 a 9 z dodaného PDF. Varianty _A/_B/_C sú výrezy možností z tých istých obrázkov. Nejde o nové AI obrázky ani o vlastnú grafiku tímu. Zdrojové autorstvo zostáva autorom článku; pred verejným šírením treba vyriešiť podmienky použitia obrázkov a testu.

Na presnú plnú implementáciu treba od učiteľa/autorov získať kompletné položky, schválené inštrukcie, odpoveďové kľúče a pravidlá administrácie. Až potom sa dá doplniť celý rozsah a odborne adaptovať jednotlivé jazyky. Táto verzia zámerne neoznačuje doplnené vlastné položky za originálne položky štúdie.

## Nová slovenská obrazová sada sk_ai_v1

Po výbere slovenčiny sa používajú nové AI ilustrácie z images/sk. Vznikli ako pracovná adaptácia pre tento projekt, nie ako výrezy publikovaných obrázkov. Zdrojová sekcia/strana označuje pôvod metodického príkladu, nie pôvod novej grafiky. EN a VI si ponechávajú pôvodné výrezy. Nové obrázky nie sú validované testové podnety.

| Úloha | Nový slovenský obrázok |
|---|---|
| 1 | Dievča s klobúkom a chlapec so šiltovkou v bežnom parku. |
| 2 | Žena hovorí o rybe, muž z rybníka vytiahol čižmu. |
| 3 | Tri panely: kôň kope psa / stoja pokojne / pes kope koňa. |
| 4 | Jeden kôň s jedným balónom na dvore; už sa neukazuje do ľavého horného rohu. |
| 5 | Muž robí nezvyčajný pohyb na podložke v domácnosti. |
| 6 | Dva panely: pripínanie sponiek dedkovi prebieha / úprava je dokončená. |
| 7 | Nový hnedý predmet / nový biely predmet / známa biela košeľa. |
| 8 | Osol bez vzoru / mačka so vzorom / pes s rovnakým vzorom. |

Sponky sú bežný predmet; nové je sloveso „travinovať“, ktoré dospelý predstaví. Cieľom je vyjadrenie dokončenia novým slovesom, nie znalosť názvu predmetu. Horný panel sa modeluje, na dolný dieťa odpovedá. „Dotravinovalo“ je pracovná alternatíva na odbornú kontrolu, nie normovaný slovenský tvar. Textové odpovede v tomto subteste zostávajú bez automatického skóre.

Výberové karty sa v rozhraní zobrazujú cez samostatné výrezy pomocou CSS; originálne PNG sú ponechané vcelku. A/B/C zodpovedá poradiu zľava doprava na celej karte. Pri kontrole sa ukáže celá karta. CSV uchováva image_set a image_path, aby sa výsledky pôvodných a nových podnetov dali rozlíšiť.
