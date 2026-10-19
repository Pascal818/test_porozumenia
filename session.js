/* In-memory test records. No network/storage dependency. */
(function(root){
'use strict';
const statuses=['correct','incorrect','incomplete','needs_review','unscorable'];
const clone=value=>JSON.parse(JSON.stringify(value));
const now=()=>new Date().toISOString();
function score(status){if(!statuses.includes(status))throw Error('Invalid status');return status==='correct'?1:['incorrect','incomplete'].includes(status)?0:null;}
function validate(result,taskId,language){
 if(!result||!statuses.includes(result.status)||result.task_id!==taskId||result.language!==language||result.score!==score(result.status))throw Error('Invalid result');
}
function create(language,tasks,id){
 if(!['sk','en','vi'].includes(language)||!tasks.length||new Set(tasks.map(t=>t.id)).size!==tasks.length)throw Error('Invalid session');
 return {id,language,startedAt:now(),completedAt:null,tasks:clone(tasks),records:[]};
}
function add(session,taskId,answer,result){
 if(session.completedAt||session.tasks[session.records.length]?.id!==taskId)throw Error('Unexpected task');
 validate(result,taskId,session.language);
 if(typeof answer!=='string'||answer.length>2000)throw Error('Invalid answer');
 const stamp=now();
 session.records.push({taskId,submittedAt:stamp,original:{answer,result:clone(result)},
  current:{answer,automatic:clone(result),override:'auto',note:''},history:[]});
 if(session.records.length===session.tasks.length)session.completedAt=stamp;
}
function effective(record){return record.current.override==='auto'?record.current.automatic.status:record.current.override;}
function review(session,index,answer,automatic,override,note){
 if(!session.completedAt)throw Error('Test not complete');
 const record=session.records[index];if(!record)throw Error('Invalid record');
 if(session.tasks[index].equivalence==='not_equivalent_unscored' && !['auto','unscorable','needs_review'].includes(override))throw Error('Non-equivalent item cannot receive a score');
 validate(automatic,record.taskId,session.language);
 if(typeof answer!=='string'||answer.length>2000||typeof note!=='string'||note.length>1000)throw Error('Invalid review');
 if(override!=='auto'&&!statuses.includes(override))throw Error('Invalid override');
 if(override!=='auto'&&!note.trim())throw Error('Manual override requires a note');
 const before=clone(record.current),after={answer,automatic:clone(automatic),override,note};
 if(JSON.stringify(before)===JSON.stringify(after))return false;
 record.history.push({at:now(),before,after:clone(after)});record.current=after;return true;
}
function summary(session){
 const counts=Object.fromEntries(statuses.map(s=>[s,0]));
 for(const r of session.records)counts[effective(r)]++;
 return {...counts,total:session.records.length,scored:counts.correct+counts.incorrect+counts.incomplete,
  unscored:counts.needs_review+counts.unscorable,points:counts.correct};
}
function csvCell(value){
 let text=value===null||value===undefined?'':String(value);
 // Prevent spreadsheet formula execution, including leading whitespace/control chars.
 if(/^[\s\uFEFF]*[=+\-@]/.test(text)||/^[\t\r\n]/.test(text))text="'"+text;
 return '"'+text.replace(/"/g,'""')+'"';
}
function exportCSV(session){
 const headers=['session_id','language','started_at_utc','completed_at_utc','task_order','task_id','task_title','question',
  'submitted_at_utc','original_answer','original_status','original_score','original_reason','current_answer',
  'current_automatic_status','current_automatic_score','current_automatic_reason','review_mode','final_status','final_score',
  'review_note','review_count','last_review_at_utc','rules_version','review_history_json','subtest','source_section','source_page','source_figure','source_doi','source_item_count','equivalence','adaptation_note','response_mode','image_set','image_path'];
 const rows=session.records.map((r,i)=>{
  const task=session.tasks[i],final=effective(r);
  return [session.id,session.language,session.startedAt,session.completedAt,i+1,r.taskId,task.title,task.question,
   r.submittedAt,r.original.answer,r.original.result.status,r.original.result.score,r.original.result.reason,
   r.current.answer,r.current.automatic.status,r.current.automatic.score,r.current.automatic.reason,
   r.current.override==='auto'?'automatic':'manual',final,score(final),r.current.note,r.history.length,
   r.history.at(-1)?.at||'',r.current.automatic.rules_version,JSON.stringify(r.history),task.subtest,task.source?.section,task.source?.printed_page,task.source?.figure,task.source?.doi,task.source?.original_item_count,task.equivalence,task.adaptation_note,task.response_mode,task.image_set,task.image];
 });
 return '\uFEFF'+[headers,...rows].map(row=>row.map(csvCell).join(';')).join('\r\n')+'\r\n';
}
const api={create,add,review,effective,summary,score,exportCSV,statuses};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TestSession=api;
})(typeof window!=='undefined'?window:globalThis);
