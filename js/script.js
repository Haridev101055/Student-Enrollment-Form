'use strict';
const $ = id => document.getElementById(id);
const dbName = 'SCHOOL-DB', rel = 'STUDENT-TABLE';
const fields = {'Full-Name':'name','Class':'class','Birth-Date':'birth','Address':'address','Enrollment-Date':'enrollment'};
let token = '', mode = '', recNo = null, busy = false;
function message(text, type='secondary') { $('status').textContent=text; $('status').className='alert alert-'+type; }
function controls() {
  $('roll').disabled = busy || !!mode;
  Object.values(fields).forEach(id => $(id).disabled = busy || !mode);
  $('save').disabled = busy || mode !== 'save';
  $('update').disabled = busy || mode !== 'update';
  $('reset').disabled = busy || !mode;
  $('configure').disabled = busy || !!mode;
}
function reset(text='Enter Roll No and press Enter or Tab.', type='secondary') {
  mode=''; recNo=null; busy=false; $('form').reset(); controls(); message(text,type); $('roll').focus();
}
$('configure').onclick = () => { const value=prompt('Enter your JsonPowerDB connection token (kept only in this page session):',token); if(value!==null) token=value.trim(); $('roll').focus(); };
async function request(path, payload) {
  const response=await fetch('https://api.login2explore.com:5577'+path,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({token,dbName,rel,...payload})});
  const result=await response.json();
  if (!result || result.status===undefined) throw Error('Unexpected database response');
  return result;
}
async function lookup() {
  if(busy || mode || !$('roll').value.trim()) return;
  if(!token) { message('Configure your JPDB token first.','warning'); return; }
  $('roll').value=$('roll').value.trim(); busy=true; controls();
  try {
    const result=await request('/api/irl',{cmd:'GET_BY_KEY',jsonStr:{'Roll-No':$('roll').value}});
    if(Number(result.status)===400 && /not found|no record|does not exist/i.test(String(result.message))) {
      mode='save'; message('New student. Enter all details.','info');
    } else if(Number(result.status)===200) {
      const data=typeof result.data==='string'?JSON.parse(result.data):result.data;
      recNo=data.rec_no; if(recNo==null || !data.record) throw Error('Invalid record response');
      for(const [key,id] of Object.entries(fields)) $(id).value=data.record[key]??'';
      mode='update'; message('Existing student. Edit details and click Update.','info');
    } else { throw Error(result.message || 'Lookup failed'); }
  } catch(e) { message(e.message,'danger'); }
  finally {busy=false; controls(); if(mode) $('name').focus();}
}
async function write() {
  if(busy || !mode) return;
  const record={'Roll-No':$('roll').value};
  for(const [key,id] of Object.entries(fields)) { const value=$(id).value.trim(); if(!value){message('All fields are required.','warning');$(id).focus();return;} record[key]=value; }
  if(record['Birth-Date']>record['Enrollment-Date']) {message('Birth date must not be after enrollment date.','warning');return;}
  busy=true;controls();
  try {
    const result=await request('/api/iml',mode==='save'?{cmd:'PUT',jsonStr:record}:{cmd:'UPDATE',jsonStr:{[recNo]:record}});
    if(Number(result.status)!==200) throw Error(result.message || 'Database write failed');
    reset(mode==='save'?'Student saved successfully.':'Student updated successfully.','success');
  } catch(e) {busy=false;controls();message(e.message,'danger');}
}
$('roll').addEventListener('change',lookup);
$('roll').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();lookup();}});
$('form').addEventListener('submit',e=>e.preventDefault());
$('save').onclick=write; $('update').onclick=write; $('reset').onclick=()=>reset(); reset();
