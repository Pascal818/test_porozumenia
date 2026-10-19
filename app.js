'use strict';
const $=id=>document.getElementById(id), model=window.TestSession;
const translations={
sk:{heading:'Test porozumenia',intro:'Obrázkové úlohy v slovenčine, angličtine a vietnamčine.',adultSetup:'Nastavenie pre dospelého',language:'Jazyk testu',setupInfo:'Test obsahuje 8 úloh. Dieťa odpovie hlasom alebo textom. Výsledky uvidí dospelý až po dokončení.',memory:'Výsledky sú iba v pamäti tejto stránky. Pred zatvorením, obnovením alebo novým testom ich exportuj do CSV.',start:'Spustiť celý test',practice:'Vyskúšať jednu úlohu',task:'Úloha',back:'Späť k nastaveniam',adult:'Pre dospelého',scene:'PRÍBEH — DOSPELÝ PREČÍTA DIEŤAŤU',storyReminder:'Popros dospelého, aby ti prečítal príbeh.',answer:'Odpoveď',hint:'Enter odošle odpoveď. Shift+Enter vloží nový riadok.',clear:'Vymazať',submit:'Zaznamenať odpoveď',check:'Vyhodnotiť odpoveď',busy:'Spracúvam…',recorded:'Odpoveď zaznamenaná.',next:'Ďalšia úloha',finish:'Dokončiť test',examples:'Ukážkové odpovede',use:'Použiť',adultInstructions:'Pokyny pre dospelého',pauseInfo:'Test je pozastavený. Prečítaj zadanie a potom vráť obrazovku dieťaťu.',noFeedback:'Počas testu neukazujte hodnotenie ani správnu odpoveď. Toto prepnutie zobrazenia nie je chránené heslom.',resume:'Späť k dieťaťu',finished:'Test je hotový',thanks:'Ďakujeme za odpovede. Teraz môže pokračovať dospelý.',showResults:'Zobraziť výsledky pre dospelého',results:'Výsledky a kontrola',scoreNote:'Skóre zahŕňa iba hodnotené odpovede. Nevyhodnotiteľné odpovede a odpovede na kontrolu zostávajú bez skóre. Výsledky neurčujú diagnózu.',export:'Exportovať CSV',newTest:'Nový test',finalStatus:'Aktuálny výsledok',review:'Skontrolovať',reviewScene:'Obrázok a zadanie',original:'Pôvodná odoslaná odpoveď',corrected:'Opravený prepis / odpoveď',decision:'Spôsob hodnotenia',reviewNote:'Poznámka dospelého',reviewHint:'Uloženie znovu vyhodnotí zmenený prepis. Ručné hodnotenie vyžaduje poznámku. Pôvodná verzia sa neprepíše.',saveReview:'Uložiť kontrolu',history:'História zmien',footer:'Prototyp · hodnotenie pomocou pravidiel · bez databázy',prototype:'Pracovné úlohy na odbornú kontrolu; nejde o validovaný diagnostický test.',pairs:'Párová otázka',story:'Príbeh',of:'z',placeholder:'Napíš alebo nadiktuj odpoveď…',status:{correct:'Správne',incorrect:'Nesprávne',incomplete:'Neúplné',needs_review:'Na kontrolu',unscorable:'Nevyhodnotiteľné'},score:'Skóre',noScore:'Bez skóre',auto:'Automaticky podľa pravidiel',manual:'Ručne',count:'Odpovedí',unscored:'Bez skóre',needsReview:'Na kontrolu',empty:'(prázdna odpoveď)',originalLabel:'Pôvodne',automaticLabel:'Automaticky po oprave',reason:'Dôvod',saved:'Kontrola uložená.',unchanged:'Bez zmien.',noteRequired:'Pri ručnom hodnotení doplň poznámku.',noHistory:'Zatiaľ bez opráv.',loadError:'Úlohy sa nepodarilo načítať. Skontroluj python web.py a obnov stránku.',error:'Odpoveď sa nepodarilo spracovať. Skontroluj python web.py a skús znova.',reviewError:'Kontrolu sa nepodarilo uložiť. Pôvodné údaje zostali zachované.',resetConfirm:'Nový test vymaže údaje tohto testu z pamäte stránky. Máš ich exportované a chceš pokračovať?',discardReview:'Neuložené zmeny kontroly sa zahodia. Pokračovať?',exported:'CSV bolo pripravené na stiahnutie. Súbor obsahuje iba uložené zmeny.',saveFirst:'Pred exportom ulož alebo zahoď rozpracovanú kontrolu.',recordedCount:'Zaznamenané',recognized_pairs:'Rozpoznané',missing_pairs:'Chýba',unexpected_pairs:'Nesprávne priradenie',recognized_answer:'Rozpoznaná odpoveď'},
en:{heading:'Comprehension test',intro:'Picture tasks in Slovak, English and Vietnamese.',adultSetup:'Adult setup',language:'Test language',setupInfo:'The test contains 8 tasks. The child answers by voice or text. An adult sees the results after completion.',memory:'Results exist only in this open page. Export CSV before closing, reloading or starting another test.',start:'Start full test',practice:'Try one task',task:'Task',back:'Back to setup',adult:'For the adult',scene:'STORY — AN ADULT READS THIS ALOUD',storyReminder:'Ask an adult to read the story to you.',answer:'Answer',hint:'Enter submits your answer. Shift+Enter adds a new line.',clear:'Clear',submit:'Record answer',check:'Check answer',busy:'Processing…',recorded:'Answer recorded.',next:'Next task',finish:'Finish test',examples:'Example answers',use:'Use',adultInstructions:'Instructions for the adult',pauseInfo:'The test is paused. Read the prompt, then return the screen to the child.',noFeedback:'Do not show scores or correct answers during the test. This view switch is not password-protected.',resume:'Back to the child',finished:'The test is complete',thanks:'Thank you for your answers. An adult can continue now.',showResults:'Show results for the adult',results:'Results and review',scoreNote:'Only scored answers are included in the score. Unscorable answers and answers needing review remain unscored. Results are not a diagnosis.',export:'Export CSV',newTest:'New test',finalStatus:'Current result',review:'Review',reviewScene:'Picture and prompt',original:'Original submitted answer',corrected:'Corrected transcript / answer',decision:'Scoring method',reviewNote:'Adult note',reviewHint:'Saving re-evaluates a changed transcript. Manual scoring requires a note. The original record is preserved.',saveReview:'Save review',history:'Change history',footer:'Prototype · rule-based scoring · no database',prototype:'Draft tasks for expert review; not a validated diagnostic assessment.',pairs:'Paired question',story:'Story',of:'of',placeholder:'Type or dictate your answer…',status:{correct:'Correct',incorrect:'Incorrect',incomplete:'Incomplete',needs_review:'Needs review',unscorable:'Unscorable'},score:'Score',noScore:'No score',auto:'Automatic rules',manual:'Manual',count:'Answers',unscored:'Unscored',needsReview:'Needs review',empty:'(empty answer)',originalLabel:'Original',automaticLabel:'Automatic after correction',reason:'Reason',saved:'Review saved.',unchanged:'No changes.',noteRequired:'Add a note for manual scoring.',noHistory:'No corrections yet.',loadError:'Could not load tasks. Check python web.py and reload the page.',error:'Could not process the answer. Check python web.py and try again.',reviewError:'Could not save the review. Existing records were preserved.',resetConfirm:'Starting a new test clears this test from page memory. Have you exported it and want to continue?',discardReview:'Unsaved review changes will be discarded. Continue?',exported:'CSV is ready to download. It contains saved changes only.',saveFirst:'Save or discard your pending review before exporting.',recordedCount:'Recorded',recognized_pairs:'Recognized',missing_pairs:'Missing',unexpected_pairs:'Incorrect relation',recognized_answer:'Recognized answer'}
};
translations.vi={heading:'Bài kiểm tra hiểu ngôn ngữ',intro:'Bài tập bằng hình ảnh: tiếng Slovak, tiếng Anh và tiếng Việt.',adultSetup:'Thiết lập dành cho người lớn',language:'Ngôn ngữ bài kiểm tra',setupInfo:'Bài kiểm tra có 8 câu. Trẻ trả lời bằng giọng nói hoặc văn bản. Người lớn xem kết quả sau khi hoàn thành.',memory:'Kết quả chỉ có trong bộ nhớ của trang đang mở. Hãy xuất CSV trước khi đóng, tải lại trang hoặc bắt đầu bài mới.',start:'Bắt đầu bài kiểm tra',practice:'Thử một câu',task:'Câu',back:'Quay lại thiết lập',adult:'Dành cho người lớn',scene:'CÂU CHUYỆN — NGƯỜI LỚN ĐỌC CHO TRẺ NGHE',storyReminder:'Hãy nhờ người lớn đọc câu chuyện cho con nghe.',answer:'Câu trả lời',hint:'Enter để gửi. Shift+Enter để xuống dòng.',clear:'Xóa',submit:'Ghi nhận câu trả lời',check:'Kiểm tra câu trả lời',busy:'Đang xử lý…',recorded:'Đã ghi nhận câu trả lời.',next:'Câu tiếp theo',finish:'Hoàn thành bài kiểm tra',examples:'Ví dụ câu trả lời',use:'Sử dụng',adultInstructions:'Hướng dẫn dành cho người lớn',pauseInfo:'Bài kiểm tra đã tạm dừng. Đọc đề bài rồi chuyển màn hình lại cho trẻ.',noFeedback:'Không cho trẻ xem điểm hoặc đáp án đúng trong khi làm bài. Việc chuyển chế độ không được bảo vệ bằng mật khẩu.',resume:'Quay lại màn hình của trẻ',finished:'Đã hoàn thành bài kiểm tra',thanks:'Cảm ơn con đã trả lời. Bây giờ người lớn có thể tiếp tục.',showResults:'Xem kết quả dành cho người lớn',results:'Kết quả và kiểm tra',scoreNote:'Chỉ các câu đã chấm mới được tính điểm. Các câu không thể chấm hoặc cần kiểm tra được để riêng. Kết quả không phải là chẩn đoán.',export:'Xuất CSV',newTest:'Bài kiểm tra mới',finalStatus:'Kết quả hiện tại',review:'Kiểm tra',reviewScene:'Hình ảnh và đề bài',original:'Câu trả lời đã gửi ban đầu',corrected:'Bản chép lời / câu trả lời đã sửa',decision:'Cách chấm điểm',reviewNote:'Ghi chú của người lớn',reviewHint:'Khi lưu, bản chép lời đã sửa được chấm lại. Chấm thủ công cần có ghi chú. Bản gốc vẫn được giữ nguyên.',saveReview:'Lưu kiểm tra',history:'Lịch sử thay đổi',footer:'Bản thử nghiệm · chấm theo quy tắc · không có cơ sở dữ liệu',prototype:'Bài tập dự thảo cần chuyên gia kiểm tra; không phải công cụ chẩn đoán đã được kiểm định.',pairs:'Câu hỏi ghép cặp',story:'Câu chuyện',of:'trên',placeholder:'Nhập hoặc đọc câu trả lời…',status:{correct:'Đúng',incorrect:'Sai',incomplete:'Chưa đầy đủ',needs_review:'Cần kiểm tra',unscorable:'Không thể chấm điểm'},score:'Điểm',noScore:'Chưa chấm điểm',auto:'Tự động theo quy tắc',manual:'Thủ công',count:'Câu trả lời',unscored:'Chưa chấm điểm',needsReview:'Cần kiểm tra',empty:'(câu trả lời trống)',originalLabel:'Ban đầu',automaticLabel:'Tự động sau khi sửa',reason:'Lý do',saved:'Đã lưu kiểm tra.',unchanged:'Không có thay đổi.',noteRequired:'Hãy thêm ghi chú khi chấm thủ công.',noHistory:'Chưa có chỉnh sửa.',loadError:'Không tải được bài tập. Kiểm tra python web.py và tải lại trang.',error:'Không xử lý được câu trả lời. Kiểm tra python web.py và thử lại.',reviewError:'Không lưu được kiểm tra. Dữ liệu hiện có vẫn được giữ nguyên.',resetConfirm:'Bài mới sẽ xóa dữ liệu bài này khỏi bộ nhớ trang. Bạn đã xuất dữ liệu và muốn tiếp tục chưa?',discardReview:'Các chỉnh sửa chưa lưu sẽ bị bỏ. Tiếp tục?',exported:'Tệp CSV đã sẵn sàng để tải xuống. Chỉ các thay đổi đã lưu được xuất.',saveFirst:'Hãy lưu hoặc bỏ các chỉnh sửa đang thực hiện trước khi xuất.',recordedCount:'Đã ghi nhận',recognized_pairs:'Các cặp nhận diện được',missing_pairs:'Còn thiếu',unexpected_pairs:'Ghép sai',recognized_answer:'Câu trả lời nhận diện được'};


Object.assign(translations.sk, {
 setupInfo:'Osem subtestov, po jednej ukážkovej položke. Odpoveď hlasom, textom alebo výberom obrázka.',
 scopeTitle:'8 typov podľa článku ROMLAT · pracovný prototyp',
 scopeNote:'Nejde o celú 80-položkovú batériu. Úlohy vychádzajú z publikovaných príkladov. Slovenčina používa nové AI ilustrácie zo známeho prostredia. SK / EN / VI sú nevalidované jazykové adaptácie. Slovné tvary kontroluje dospelý. Úloha 8 nemá v EN / VI jednoznačný kľúč, preto zostáva bez skóre.',
 scene:'ÚVOD — DOSPELÝ PREČÍTA DIEŤAŤU',storyReminder:'Najprv si s dospelým vypočuj zadanie.',
 sourceTitle:'Zdroj, rozsah a jazyková úprava',sourceLabel:'Pôvodný rómsky príklad',keyLabel:'Pracovný kľúč / príklad pre dospelého',
 scoreNote:'Každý riadok predstavuje jeden subtest, ale iba jednu ukážkovú položku. Súčet je pracovný prehľad; nie výsledok ROMLAT ani odhad jazykovej úrovne. Odpovede na kontrolu a neporovnateľné položky sa do skóre nezapočítavajú.'
});
Object.assign(translations.en, {
 setupInfo:'Eight subtests, one demonstration item each. Answer by voice, text or picture selection.',
 scopeTitle:'8 types from the ROMLAT article · working prototype',
 scopeNote:'Not the full 80-item battery. Uses published examples and figures. SK / EN / VI are unvalidated adaptations. Word forms require adult review. Item 8 has no unique English/Vietnamese key and remains unscored.',
 scene:'INTRODUCTION — READ ALOUD TO THE CHILD',storyReminder:'First ask an adult to introduce the task.',
 sourceTitle:'Source, scope and adaptation',sourceLabel:'Original Romani example',keyLabel:'Draft key / adult example',
 scoreNote:'Each row is one subtest represented by just one example. The total is a working overview, not a ROMLAT result or language-level estimate. Responses needing review and non-equivalent items are excluded.'
});
Object.assign(translations.vi, {
 setupInfo:'Tám loại bài, mỗi loại một ví dụ. Trả lời bằng giọng nói, văn bản hoặc chọn hình.',
 scopeTitle:'8 loại bài theo bài báo ROMLAT · bản thử nghiệm',
 scopeNote:'Không phải bộ 80 câu đầy đủ. Dùng ví dụ và hình trong bài báo. Các bản SK / EN / VI chưa được kiểm định. Người lớn kiểm tra dạng từ. Câu 8 ở bản Anh / Việt không có đáp án duy nhất nên không chấm điểm.',
 scene:'GIỚI THIỆU — ĐỌC CHO TRẺ NGHE',storyReminder:'Nhờ người lớn giới thiệu bài trước.',
 sourceTitle:'Nguồn và bản chuyển thể',sourceLabel:'Ví dụ gốc tiếng Romani',keyLabel:'Đáp án dự thảo / ví dụ cho người lớn',
 scoreNote:'Mỗi dòng là một loại bài với một ví dụ. Tổng điểm chỉ để thử nghiệm, không phải điểm ROMLAT hay mức ngôn ngữ. Không tính các câu cần kiểm tra hoặc không tương đương.'
});
function sourceDescription(task){return `Kyuchukov et al. (2024) · § ${task.source.section} · p. ${task.source.printed_page} · Fig. ${task.source.figure} · DOI: ${task.source.doi} · ${task.image_note}`;}
function showInstructions(){
 const task=currentTask();$('adult-task').textContent=task.title;
 $('adult-script').textContent=task.scene||task.question;
 $('adult-question').textContent=task.question;$('adult-image').src=task.image;$('adult-image').alt='';
 $('adult-note').textContent=task.adaptation_note;setMode('paused');
}
function syncChoices(){
 const nodes=$('choice-panel').children;
 for(const button of nodes){button.disabled=busy||!answerEnabled();button.setAttribute('aria-pressed',String(button.dataset.choice===$('answer').value));}
}

let language='sk',tasks=[],revision=0,busy=false,mode='setup',session=null,index=0,recorded=false,reviewIndex=null,reviewBusy=false;
function ui(){return translations[language];}
function currentTask(){return mode==='practice'?tasks.find(t=>t.id===$('task').value):tasks[index];}
function answerEnabled(){return ['test','practice'].includes(mode)&&(!recorded||mode==='practice');}
function localize(){
 document.documentElement.lang=language;document.title=ui().heading;
 $('eyebrow').textContent=({sk:'JAZYKOVÉ ÚLOHY',en:'LANGUAGE TASKS',vi:'BÀI TẬP NGÔN NGỮ'})[language]+' · SK / EN / VI';
 $('heading').textContent=ui().heading;$('intro').textContent=ui().intro;
 document.querySelectorAll('[data-text]').forEach(node=>node.textContent=ui()[node.dataset.text]);
 $('answer').placeholder=ui().placeholder;
 $('setup-privacy').textContent=speechText[language].privacy;
 $('review-override').replaceChildren(new Option(ui().auto,'auto'),...model.statuses.map(s=>new Option(ui().manual+' — '+ui().status[s],s)));
 updateButtons();
}
function updateButtons(){
 const ready=tasks.length>0;
 $('start').disabled=!ready||busy;$('practice').disabled=!ready||busy;
 $('task').disabled=!ready||busy;
 $('answer').disabled=!ready||!answerEnabled();$('answer').readOnly=Boolean(activeSpeech);
 $('submit').disabled=!ready||busy||Boolean(activeSpeech)||!answerEnabled();
 $('clear').disabled=!ready||!answerEnabled();
 $('submit').textContent=busy?ui().busy:mode==='practice'?ui().check:ui().submit;
 $('save-review').disabled=reviewBusy;
 $('new-test').disabled=reviewBusy;$('export').disabled=reviewBusy;
 speechUI();syncChoices();
}
function clearResult(){$('result').hidden=true;$('error').hidden=true;}
function setMode(next){
 mode=next;
 for(const id of ['setup','exercise','paused','complete','results'])$(id).hidden=id==="exercise"?!['test','practice'].includes(mode):id!==mode;
 $('footer').hidden=['test','paused','complete'].includes(mode);
 $('eyebrow').hidden=mode==='test';$('intro').hidden=mode==='test';
 $('practice-settings').hidden=mode!=='practice';$('adult').hidden=mode!=='test';
 $('examples-panel').hidden=mode!=='practice';$('source-panel').hidden=mode!=='practice';$('progress').hidden=mode!=='test';
 $('speech-privacy').hidden=mode!=='practice';$('task-title').hidden=mode==='test';
 $('task-kind').hidden=mode==='test';
 updateButtons();
}
async function loadLanguage(){
 cancelSpeech();language=$('language').value;const token=++revision;tasks=[];busy=false;localize();$('load-error').hidden=true;
 try{const response=await fetch('/api/tasks?language='+language);if(!response.ok)throw Error();const data=await response.json();if(token!==revision)return;tasks=data.tasks;$('task').replaceChildren(...tasks.map((t,i)=>new Option(`${i+1}. ${t.title}`,t.id)));updateButtons();}
 catch(error){if(token===revision){$('load-error').textContent=ui().loadError;$('load-error').hidden=false;}}
}
function renderTask(){
 cancelSpeech();revision++;busy=false;recorded=false;clearResult();$('recorded').hidden=true;
 const task=currentTask();if(!task)return;
 $('answer').value='';$('task-title').textContent=task.title;$('task-image').src=task.image;$('task-image').alt=ui().task+' '+task.subtest;
 $('scene').textContent=task.scene;$('scene-panel').hidden=mode!=='practice'||!task.scene;
 $('story-reminder').hidden=true;$('question').textContent=task.question;
 $('task-kind').textContent=task.title;$('task-count').textContent=`${tasks.indexOf(task)+1} ${ui().of} ${tasks.length}`;
 $('progress').max=tasks.length;$('progress').value=session?.records.length||0;
 $('text-response').hidden=task.response_mode==='choice';$('task-image').hidden=task.response_mode==='choice';
 $('choice-panel').hidden=task.response_mode!=='choice';$('choice-panel').replaceChildren();
 for(const option of task.options){
  const button=document.createElement('button');button.type='button';button.className='picture-choice';button.dataset.choice=option.id;
  const img=document.createElement('img');img.src=option.image;img.alt=option.label;
  const label=document.createElement('span');label.textContent=option.label;
  if(option.crop&&option.crop!=='full'){
   const art=document.createElement('div');art.className='choice-art '+option.crop;art.append(img);button.append(art,label);
  }else button.append(img,label);
  button.addEventListener('click',()=>{if(!answerEnabled()||busy)return;cancelSpeech();revision++;$('answer').value=option.id;clearResult();updateButtons();});
  $('choice-panel').append(button);
 }
 $('source-info').textContent=sourceDescription(task);$('source-note').textContent=task.adaptation_note;
 $('source-original').textContent=ui().sourceLabel+': '+task.source.original_prompt;
 $('source-panel').open=false;
 $('examples-panel').open=false;$('examples').replaceChildren();
 if(mode==='practice')for(const [answer] of task.examples){
  const row=document.createElement('div');row.className='example';const text=document.createElement('p');text.textContent=answer;
  const button=document.createElement('button');button.type='button';button.className='secondary';button.textContent=ui().use;button.disabled=task.scoring==='unscored';
  button.addEventListener('click',()=>{cancelSpeech();revision++;busy=false;$('answer').value=answer;clearResult();updateButtons();$('answer').focus();});row.append(text,button);$('examples').append(row);
 }
 updateButtons();
 if(mode==='test'&&(task.scene||task.scoring==='unscored'))showInstructions();
}
async function evaluateAnswer(taskId,answer){
 const response=await fetch('/api/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language,task_id:taskId,answer})});
 if(!response.ok)throw Error('Evaluation failed');return response.json();
}
function renderPracticeResult(result){
 $('result').dataset.status=result.status;$('result-title').textContent=ui().status[result.status];$('reason').textContent=result.reason;
 $('score').textContent=result.score===null?ui().noScore:`${ui().score}: ${result.score}/1`;$('relations').replaceChildren();
 for(const field of ['recognized_pairs','missing_pairs','unexpected_pairs'])if(result[field].length){
  const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=ui()[field];dd.textContent=result[field].map(([p,o])=>`${result.labels[p]} → ${result.labels[o]}`).join('; ');$('relations').append(dt,dd);
 }
 $('result').hidden=false;
}
function displayStatus(status){return ui().status[status]+' · '+(model.score(status)===null?ui().noScore:model.score(status)+'/1');}
function renderResults(){
 const s=model.summary(session);$('session-info').textContent=`ID: ${session.id} · ${session.language.toUpperCase()} · ${new Date(session.startedAt).toLocaleString(({sk:'sk-SK',en:'en-GB',vi:'vi-VN'})[language])}`;
 $('summary').replaceChildren();
 for(const [label,value] of [[ui().count,s.total],[ui().score,`${s.points}/${s.scored}`],[ui().unscored,s.unscored],[ui().needsReview,s.needs_review]]){
  const card=document.createElement('div'),strong=document.createElement('strong'),small=document.createElement('span');card.className='stat';strong.textContent=value;small.textContent=label;card.append(strong,small);$('summary').append(card);
 }
 $('result-rows').replaceChildren();session.records.forEach((record,i)=>{
  const row=document.createElement('tr');for(const value of [`${i+1}. ${session.tasks[i].title}`,record.current.answer||ui().empty,displayStatus(model.effective(record))]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}
  const cell=document.createElement('td'),button=document.createElement('button');button.className='secondary compact';button.textContent=ui().review+(record.history.length?' ('+record.history.length+')':'');button.disabled=reviewBusy;button.addEventListener('click',()=>{if(!reviewBusy&&canDiscardReview())openReview(i);});cell.append(button);row.append(cell);$('result-rows').append(row);
 });
}
function reviewDirty(){
 if(reviewIndex===null||!session)return false;
 const c=session.records[reviewIndex].current;
 return $('review-answer').value!==c.answer||$('review-override').value!==c.override||$('review-note').value!==c.note;
}
function canDiscardReview(){return !reviewDirty()||window.confirm(ui().discardReview);}
function renderHistory(record){
 $('history').replaceChildren();
 if(!record.history.length){$('history').textContent=ui().noHistory;return;}
 record.history.forEach((event,i)=>{
  const item=document.createElement('details'),title=document.createElement('summary'),body=document.createElement('p');
  title.textContent=`${i+1}. ${new Date(event.at).toLocaleString(({sk:'sk-SK',en:'en-GB',vi:'vi-VN'})[language])}`;
  const before=event.before.override==='auto'?event.before.automatic.status:event.before.override;
  const after=event.after.override==='auto'?event.after.automatic.status:event.after.override;
  body.textContent=`${event.before.answer||ui().empty} → ${event.after.answer||ui().empty}\n${ui().status[before]} → ${ui().status[after]}\n${ui().reviewNote}: ${event.after.note||'—'}`;
  body.className='preserve';item.append(title,body);$('history').append(item);
 });
}
function openReview(i){
 reviewIndex=i;const record=session.records[i],task=session.tasks[i];$('review-panel').hidden=false;
 for(const option of $('review-override').children)option.disabled=task.equivalence==='not_equivalent_unscored'&&['correct','incorrect','incomplete'].includes(option.value);
 $('review-title').textContent=`${ui().review}: ${i+1}. ${task.title}`;$('review-question').textContent=task.question;
 $('review-scene').textContent=task.scene;$('review-source').textContent=sourceDescription(task)+' — '+task.adaptation_note;$('review-key').textContent=ui().keyLabel+': '+task.rubric;$('review-choice-note').hidden=task.response_mode!=='choice';$('review-image').src=task.image;$('review-image').alt=task.scene;
 $('original-answer').textContent=record.original.answer||ui().empty;
 $('original-result').textContent=ui().originalLabel+': '+displayStatus(record.original.result.status)+' — '+record.original.result.reason;
 $('review-answer').value=record.current.answer;$('review-override').value=record.current.override;$('review-note').value=record.current.note;
 $('current-auto').textContent=ui().automaticLabel+': '+displayStatus(record.current.automatic.status)+' — '+record.current.automatic.reason;
 $('review-message').textContent='';renderHistory(record);$('review-panel').scrollIntoView({behavior:'smooth',block:'start'});
}
$('language').addEventListener('change',loadLanguage);
$('start').addEventListener('click',()=>{
 if(busy||!tasks.length)return;
 session=model.create(language,tasks,window.crypto?.randomUUID?.()||'test-'+Date.now());index=0;reviewIndex=null;$('review-panel').hidden=true;
 setMode('test');renderTask();
});
$('practice').addEventListener('click',()=>{setMode('practice');renderTask();});
$('practice-back').addEventListener('click',()=>{cancelSpeech();revision++;busy=false;setMode('setup');});
$('task').addEventListener('change',renderTask);
$('adult').addEventListener('click',()=>{
 if(busy)return;cancelSpeech();revision++;showInstructions();
});
$('resume').addEventListener('click',()=>{setMode('test');});
$('answer').addEventListener('keydown',event=>{
 if(event.key!=='Enter'||event.shiftKey||event.isComposing||event.keyCode===229)return;
 event.preventDefault();if(event.repeat||$('submit').disabled)return;$('answer-form').requestSubmit($('submit'));
});
$('answer').addEventListener('input',()=>{if(activeSpeech||!answerEnabled())return;revision++;busy=false;clearResult();updateButtons();});
$('clear').addEventListener('click',()=>{cancelSpeech();revision++;busy=false;$('answer').value='';clearResult();updateButtons();$('answer').focus();});
$('answer-form').addEventListener('submit',async event=>{
 event.preventDefault();if(busy||activeSpeech||!answerEnabled())return;
 const token=++revision,task=currentTask(),answer=$('answer').value;busy=true;clearResult();updateButtons();
 try{const result=await evaluateAnswer(task.id,answer);if(token!==revision)return;
  if(mode==='practice')renderPracticeResult(result);
  else{model.add(session,task.id,answer,result);recorded=true;$('recorded').hidden=false;$('progress').value=session.records.length;$('next').textContent=session.completedAt?ui().finish:ui().next;}
 }catch(error){if(token===revision){$('error').textContent=ui().error;$('error').hidden=false;}}
 finally{if(token===revision){busy=false;updateButtons();}}
});
$('next').addEventListener('click',()=>{if(!recorded||busy)return;cancelSpeech();revision++;if(session.completedAt){setMode('complete');}else{index++;renderTask();}});
$('show-results').addEventListener('click',()=>{if(!session?.completedAt)return;setMode('results');renderResults();});
$('review-form').addEventListener('submit',async event=>{
 event.preventDefault();if(reviewBusy||reviewIndex===null)return;
 const i=reviewIndex,record=session.records[i],answer=$('review-answer').value,override=$('review-override').value,note=$('review-note').value;
 if(override!=='auto'&&!note.trim()){$('review-message').textContent=ui().noteRequired;return;}
 reviewBusy=true;updateButtons();renderResults();$('review-answer').disabled=true;$('review-override').disabled=true;$('review-note').disabled=true;
 try{const automatic=answer===record.current.answer?record.current.automatic:await evaluateAnswer(record.taskId,answer);
  const changed=model.review(session,i,answer,automatic,override,note);openReview(i);$('review-message').textContent=changed?ui().saved:ui().unchanged;
 }catch(error){$('review-message').textContent=ui().reviewError;}
 finally{reviewBusy=false;$('review-answer').disabled=false;$('review-override').disabled=false;$('review-note').disabled=false;updateButtons();renderResults();}
});
$('export').addEventListener('click',()=>{
 if(reviewBusy||!session?.completedAt)return;
 if(reviewDirty()){$('export-status').textContent=ui().saveFirst;return;}
 const blob=new Blob([model.exportCSV(session)],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=url;link.download=`test-${session.language}-${session.id}.csv`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('export-status').textContent=ui().exported;
});
$('new-test').addEventListener('click',()=>{
 if(reviewBusy||!window.confirm(ui().resetConfirm))return;cancelSpeech();revision++;session=null;reviewIndex=null;recorded=false;index=0;busy=false;$('review-panel').hidden=true;$('export-status').textContent='';setMode('setup');
});
window.addEventListener('beforeunload',event=>{if(session?.records.length||reviewDirty()){event.preventDefault();event.returnValue='';}});

// Browser speech recognition: no project API key; the browser may use a cloud service.
const SpeechEngine=window.SpeechRecognition||window.webkitSpeechRecognition;
let activeSpeech=null;
const speechText={
 sk:{mic:'Hovoriť do mikrofónu',stop:'Ukončiť diktovanie',starting:'Čakám na povolenie mikrofónu…',listening:'Počúvam… Povedz svoju odpoveď.',stopping:'Dokončujem prepis…',ready:'Prepis je vložený. Skontroluj ho a odošli Enterom alebo tlačidlom.',empty:'Nepodarilo sa zachytiť reč. Skús to znovu alebo odpoveď napíš.',unsupported:'Tento prehliadač neponúka rozpoznávanie reči. Odpoveď môžeš napísať ručne.',privacy:'Prepis poskytuje prehliadač a môže posielať zvuk svojej online službe. Môže vyžadovať internet. Aplikácia zvuk neukladá. Na prvé skúšanie použi vlastný hlas.',note:'Diktovanie pridá text k odpovedi. Prepis sa nevyhodnotí automaticky.',partial:'Priebežný prepis: ',denied:'Mikrofón alebo služba boli zablokované. Skontroluj povolenia stránky v prehliadači.',network:'Služba prepisu nie je dostupná. Skontroluj internet alebo odpoveď napíš.',capture:'Mikrofón nie je dostupný. Skontroluj jeho pripojenie a povolenia.',lang:'Služba nepodporuje zvolený jazyk. Použi zatiaľ textový vstup.',failed:'Prepis sa nepodaril. Skús to znovu alebo odpoveď napíš.',limit:'Dosiahnutý limit 2000 znakov. Skontroluj skrátený prepis.',partialOnly:'Prišiel iba priebežný prepis. Nebol vložený; skús nahrávanie znovu.'},
 en:{mic:'Speak into microphone',stop:'Stop dictation',starting:'Waiting for microphone permission…',listening:'Listening… Say your answer.',stopping:'Finishing transcription…',ready:'Transcript inserted. Check it, then press Enter or Check answer.',empty:'No speech was captured. Try again or type your answer.',unsupported:'Speech recognition is unavailable in this browser. You can still type your answer.',privacy:'Your browser provides transcription and may send audio to its online service. Internet may be required. This app does not store audio. Use your own voice for initial testing.',note:'Dictation adds text to your answer. The transcript is not scored automatically.',partial:'Interim transcript: ',denied:'The microphone or speech service was blocked. Check site permissions in your browser.',network:'The transcription service is unavailable. Check your connection or type your answer.',capture:'The microphone is unavailable. Check its connection and permissions.',lang:'The speech service does not support the selected language. Please type your answer.',failed:'Transcription failed. Try again or type your answer.',limit:'The 2000-character limit was reached. Check the shortened transcript.',partialOnly:'Only an interim transcript was received. It was not inserted; please try again.'}
};
speechText.vi={mic:'Nói vào micrô',stop:'Dừng ghi lời nói',starting:'Đang chờ quyền sử dụng micrô…',listening:'Đang nghe… Hãy nói câu trả lời.',stopping:'Đang hoàn tất bản chép lời…',ready:'Đã thêm bản chép lời. Hãy kiểm tra rồi nhấn Enter hoặc nút gửi.',empty:'Chưa nhận được lời nói. Hãy thử lại hoặc nhập câu trả lời.',unsupported:'Trình duyệt này không hỗ trợ nhận dạng giọng nói. Bạn vẫn có thể nhập câu trả lời.',privacy:'Trình duyệt cung cấp dịch vụ chép lời và có thể gửi âm thanh đến dịch vụ trực tuyến. Có thể cần Internet. Ứng dụng không lưu âm thanh. Hãy thử bằng giọng của người lớn trước.',note:'Lời đọc được thêm vào câu trả lời. Bản chép lời không được gửi chấm tự động.',partial:'Bản chép lời tạm thời: ',denied:'Micrô hoặc dịch vụ bị chặn. Hãy kiểm tra quyền của trang trong trình duyệt.',network:'Dịch vụ chép lời không khả dụng. Kiểm tra Internet hoặc nhập câu trả lời.',capture:'Không truy cập được micrô. Kiểm tra kết nối và quyền sử dụng.',lang:'Dịch vụ không hỗ trợ ngôn ngữ đã chọn. Hãy dùng câu trả lời bằng văn bản.',failed:'Không chép được lời nói. Hãy thử lại hoặc nhập câu trả lời.',limit:'Đã đạt giới hạn 2000 ký tự. Hãy kiểm tra bản chép lời bị rút ngắn.',partialOnly:'Chỉ nhận được bản chép lời tạm thời nên chưa thêm vào câu trả lời. Hãy thử lại.'};

function speechUI(){
 const t=speechText[language];
 $('mic').textContent=activeSpeech?t.stop:t.mic;
 $('mic').disabled=!SpeechEngine||!tasks.length||currentTask()?.response_mode==='choice'||busy||!answerEnabled()||(activeSpeech&&activeSpeech.phase==='stopping');
 $('mic').setAttribute('aria-pressed',activeSpeech?'true':'false');
 $('speech-privacy').textContent=t.privacy;$('speech-note').textContent=t.note;
 if(!SpeechEngine)$('speech-status').textContent=t.unsupported;
}
function cancelSpeech(){
 const session=activeSpeech;activeSpeech=null;
 if(session){clearTimeout(session.timer);clearTimeout(session.fallback);try{session.engine.abort();}catch(error){}}
 $('speech-status').textContent='';$('speech-partial').textContent='';
}
function speechError(code){
 return ({'not-allowed':'denied','service-not-allowed':'denied','network':'network','audio-capture':'capture','language-not-supported':'lang','no-speech':'empty'})[code]||'failed';
}
function finishSpeech(session){
 if(activeSpeech!==session)return;
 clearTimeout(session.timer);clearTimeout(session.fallback);activeSpeech=null;
 const t=speechText[session.language];
 const said=session.finalText.trim();
 if(said){
  const combined=[session.base,said].filter(Boolean).join(' ');
  $('answer').value=combined.slice(0,2000);
  $('speech-status').textContent=combined.length>2000?t.limit:t.ready;
  // A service error can still leave useful final text, but must remain visible.
  if(session.error)$('speech-status').textContent+=' '+t[session.error];
 }else{
  $('speech-status').textContent=t[session.error||(session.interim?'partialOnly':'empty')];
 }
 $('speech-partial').textContent='';revision++;clearResult();updateButtons();$('answer').focus();
}
function stopSpeech(){
 const session=activeSpeech;if(!session||session.phase==='stopping')return;
 session.phase='stopping';clearTimeout(session.timer);
 $('speech-status').textContent=speechText[session.language].stopping;updateButtons();
 // stop() requests a final result; abort() is only the fallback or cancellation.
 session.fallback=setTimeout(()=>{
  if(activeSpeech!==session)return;
  try{session.engine.abort();}catch(error){}
  finishSpeech(session);
 },4000);
 try{session.engine.stop();}catch(error){finishSpeech(session);}
}
function startSpeech(){
 if(activeSpeech){stopSpeech();return;}
 if(!SpeechEngine||busy||!currentTask()||!answerEnabled())return;
 revision++;clearResult();
 let engine;
 try{engine=new SpeechEngine();}catch(error){$('speech-status').textContent=speechText[language].failed;return;}
 const session={engine,language,taskId:currentTask().id,base:$('answer').value.trim(),finalText:'',interim:'',phase:'starting',error:null,timer:null,fallback:null};
 activeSpeech=session;
 engine.lang={sk:'sk-SK',en:'en-GB',vi:'vi-VN'}[language];engine.continuous=true;engine.interimResults=true;engine.maxAlternatives=1;
 $('speech-partial').textContent='';$('speech-status').textContent=speechText[language].starting;
 engine.onstart=()=>{
  if(activeSpeech!==session||session.phase==='stopping')return;
  session.phase='listening';$('speech-status').textContent=speechText[session.language].listening;
  session.timer=setTimeout(stopSpeech,30000);updateButtons();
 };
 engine.onresult=event=>{
  if(activeSpeech!==session)return;
  // Rebuild from the result list; do not append the same finalized segment twice.
  const finals=[],interims=[];
  for(let i=0;i<event.results.length;i++){
   const result=event.results[i];if(!result.length)continue;
   (result.isFinal?finals:interims).push(result[0].transcript);
  }
  session.finalText=finals.join(' ').trim();session.interim=interims.join(' ').trim();
  $('speech-partial').textContent=speechText[session.language].partial+[session.finalText,session.interim].filter(Boolean).join(' ');
 };
 engine.onerror=event=>{
  if(activeSpeech!==session)return;
  session.error=speechError(event.error);finishSpeech(session);
  try{engine.abort();}catch(error){}
 };
 engine.onend=()=>finishSpeech(session);
 updateButtons();
 try{engine.start();}catch(error){session.error=error.name==='NotAllowedError'?'denied':'failed';finishSpeech(session);}
}
$('mic').addEventListener('click',startSpeech);
window.addEventListener('pagehide',cancelSpeech);


loadLanguage();
