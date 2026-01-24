// ==UserScript==
// @name         NZOI Unified Platform
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Combines NZOI Lite IDE and Professional Dashboard 
// @match        https://train.nzoi.org.nz/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-end
// ==/UserScript==

(async()=>{
"use strict";
if(!window.location.pathname.match(/\/problems\/[^\/]+/)) return;

GM_addStyle(`:root{--bg0:#121212;--bg1:#1e1e1e;--bg2:#252526;--border:#333;--border-light:#444;--fg0:#e0e0e0;--fg-muted:#999;--accent:#0a84ff;--green:#2ecc71;--red:#e06c75}pre, code, kbd, samp, .highlight pre, .ui.segment pre, .problem-statement pre {
    background-color: var(--bg1) !important;
    color: var(--fg0) !important;
    border: 1px solid var(--border) !important;
    padding: 10px !important;
    border-radius: 4px !important;
    overflow-x: auto !important;
    white-space: pre-wrap !important; /* Ensures text doesn't overflow horizontally */
}body,html{background-color:var(--bg0)!important;color:var(--fg0)!important;font-family:'Segoe UI',sans-serif!important}#main-container,.problem-description{background:var(--bg0)!important;color:var(--fg0)!important}#main-page-title-box,.ui.segment,.ui.breadcrumb,.ui.container{background:transparent!important;box-shadow:none!important;border:none!important;padding:10px 0!important;margin:0!important}.ui.breadcrumb a{color:var(--fg-muted)!important}.ui.breadcrumb .divider{color:var(--border)!important}.ui.header .sub.header,h1,h2,h3,h4,h5,.ui.header{color:var(--fg0)!important}a{color:var(--fg0);text-decoration:none;transition:color .2s}a:hover{color:var(--accent)}.problem-description pre,.problem-description code,.samples pre,.highlight{background:var(--bg1)!important;color:var(--fg0)!important;border:1px solid var(--border)!important;border-radius:4px!important}.problem-description table,table,td,th{background:var(--bg1)!important;color:var(--fg0)!important;border-color:var(--border)!important}.samples{border:1px solid var(--border)!important}.samples li{background:var(--bg2)!important;border-color:var(--border)!important}#nzoi-layout{display:flex;height:100vh;overflow:hidden;background:var(--bg0)}#main-container{width:50%;overflow-y:auto;padding:20px;box-sizing:border-box;border-right:1px solid var(--border)}#nzoi-resizer{width:6px;cursor:col-resize;background:var(--bg1);border-left:1px solid var(--border);border-right:1px solid var(--border);flex-shrink:0}#nzoi-resizer:hover{background:var(--accent)}#nzoi-sidebar{width:50%;background:var(--bg1);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0}.sidebar-content{height:100%;display:flex;flex-direction:column;padding:10px;box-sizing:border-box}.editor-controls{margin-bottom:10px;display:flex;justify-content:flex-end;gap:8px}button{border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold}#run-btn{background:#4263eb;color:#fff}#submit-btn{background:var(--green);color:#fff}#paste-btn,#files-btn{background:var(--bg2);color:var(--fg0);border:1px solid var(--border)}#editor-container{flex:1;border:1px solid var(--border);border-radius:4px;overflow:hidden;min-height:200px}#clangd-iframe{width:100%;height:100%;border:none}#editor-vertical-resizer{height:8px;background:var(--bg1);cursor:row-resize;display:flex;justify-content:center;align-items:center}#editor-vertical-resizer::after{content:'...';color:var(--border-light);line-height:5px}#test-results-container{height:30%;background:var(--bg1);border-top:1px solid var(--border);display:flex;flex-direction:column}#test-results{padding:10px;overflow-y:auto;flex:1;background:var(--bg1)}.test-result{margin-bottom:8px;border:1px solid var(--border);border-radius:4px;overflow:hidden;background:var(--bg2)}.test-header{padding:8px;background:var(--bg2);display:flex;justify-content:space-between;font-size:13px;font-weight:bold}.test-header.passed{color:var(--green)}.test-header.failed{color:var(--red)}.test-diff{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px;background:var(--bg1)}.test-box{background:var(--bg1);padding:10px;border-radius:4px}.test-box strong{color:var(--fg0);display:block;margin-bottom:5px}.test-box pre{margin:0;white-space:pre-wrap;font-family:monospace;font-size:12px;color:var(--fg0);background:var(--bg0)!important;padding:8px;border-radius:4px}.nzoi-modal{position:fixed;z-index:10000;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center}.nzoi-modal-content{background:var(--bg1);width:80%;max-width:600px;border-radius:8px;border:1px solid var(--border);display:flex;flex-direction:column;max-height:80vh}.nzoi-modal-header{padding:15px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}.nzoi-modal-body{padding:15px;overflow-y:auto;flex:1}.nzoi-modal-footer{padding:15px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}.nzoi-file-item{padding:10px;border:1px solid var(--border);margin-bottom:5px;border-radius:4px;background:var(--bg2);display:flex;justify-content:space-between;align-items:center}.nzoi-file-editor{width:100%;height:300px;background:var(--bg0);color:var(--fg0);border:1px solid var(--border);padding:10px;font-family:monospace}.nzoi-btn{border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:13px}.nzoi-btn-primary{background:var(--accent);color:#fff}.nzoi-btn-secondary{background:var(--bg2);color:var(--fg0);border:1px solid var(--border)}.nzoi-btn-danger{background:var(--red);color:#fff}.nzoi-btn-small{padding:4px 8px;font-size:12px}.nzoi-file-info{flex:1}.nzoi-file-name{font-weight:bold;margin-bottom:2px}.nzoi-file-meta{font-size:11px;color:var(--fg-muted)}.nzoi-file-actions{display:flex;gap:5px}.nzoi-modal-close{background:none;border:none;color:var(--fg-muted);font-size:24px;cursor:pointer;padding:0;width:24px;height:24px}.nzoi-empty-state{color:var(--fg-muted);text-align:center;padding:20px}::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:var(--bg0)}::-webkit-scrollbar-thumb{background:var(--bg2);border-radius:6px;border:2px solid var(--bg0)}::-webkit-scrollbar-thumb:hover{background:var(--border-light)}`);

await(async()=>{if(window.crossOriginIsolated)return true;if(!('serviceWorker'in navigator))return false;const reg=await navigator.serviceWorker.getRegistration();if(reg)return true;const sw=`self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).then(r=>{const h=new Headers(r.headers);h.set('Cross-Origin-Embedder-Policy','credentialless');h.set('Cross-Origin-Opener-Policy','same-origin');return new Response(r.body,{status:r.status,statusText:r.statusText,headers:h})}).catch(()=>fetch(e.request)))});`;try{await navigator.serviceWorker.register(URL.createObjectURL(new Blob([sw],{type:'application/javascript'})));window.location.reload()}catch{return false}})();

const pid=(window.location.pathname.match(/\/problems\/([^\/]+)/)||[])[1]||'default';
let code=localStorage.getItem(`nzoi-code-${pid}`)||`#include <bits/stdc++.h>\nusing namespace std;\n\nint main(){\n    // your code\n    return 0;\n}\n`;
const getUrl=c=>`https://clangd.guyutongxue.site/?embed=true&theme=dark&code=${encodeURIComponent(c.slice(0,5000))}`;
const getMeta=()=>{const d=localStorage.getItem('nzoi-files-metadata');return d?JSON.parse(d):{}};
const saveMeta=m=>localStorage.setItem('nzoi-files-metadata',JSON.stringify(m));
const getPName=()=>document.querySelector('h1.ui.header')?.textContent.trim()||document.title.split('|')[0].trim()||'Untitled';
const esc=t=>(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function delFile(id){const m=getMeta();if(!m[id])return;if(confirm(`Delete file?\n\nProblem: ${m[id].name}`)){localStorage.removeItem(`nzoi-code-${id}`);delete m[id];saveMeta(m);showFiles()}}
function editFile(id){if(id===pid){closeFiles();return}const m=getMeta();const f=m[id];const c=localStorage.getItem(`nzoi-code-${id}`)||'';if(!f)return;const modal=document.createElement('div');modal.className='nzoi-modal';modal.innerHTML=`<div class="nzoi-modal-content"><div class="nzoi-modal-header"><h2>${esc(f.name)}</h2><button class="nzoi-modal-close">×</button></div><div class="nzoi-modal-body"><textarea class="nzoi-file-editor">${esc(c)}</textarea></div><div class="nzoi-modal-footer"><button class="nzoi-btn-save nzoi-btn nzoi-btn-primary">Save Changes</button><button class="nzoi-btn-cancel nzoi-btn nzoi-btn-secondary">Cancel</button></div></div>`;document.body.appendChild(modal);modal.querySelector('.nzoi-btn-save').onclick=()=>{localStorage.setItem(`nzoi-code-${id}`,modal.querySelector('.nzoi-file-editor').value);const md=getMeta();if(md[id]){md[id].timestamp=Date.now();saveMeta(md)}modal.remove();showFiles()};modal.querySelector('.nzoi-btn-cancel').onclick=()=>modal.remove();modal.querySelector('.nzoi-modal-close').onclick=()=>modal.remove()}
function showFiles(){const ex=document.querySelector('.nzoi-modal');if(ex)ex.remove();const m=getMeta();const files=Object.values(m).sort((a,b)=>b.timestamp-a.timestamp);const modal=document.createElement('div');modal.className='nzoi-modal';const list=files.length===0?'<div class="nzoi-empty-state">No saved files.</div>':files.map(f=>`<div class="nzoi-file-item ${f.id===pid?'current':''}"><div class="nzoi-file-info"><div class="nzoi-file-name">${esc(f.name)}</div><div class="nzoi-file-meta">ID: ${f.id}</div></div><div class="nzoi-file-actions"><button class="nzoi-btn nzoi-btn-small nzoi-btn-primary nzoi-open-btn" data-id="${f.id}">${f.id===pid?'Current':'Edit'}</button><button class="nzoi-btn nzoi-btn-small nzoi-btn-danger nzoi-delete-btn" data-id="${f.id}">Delete</button></div></div>`).join('');modal.innerHTML=`<div class="nzoi-modal-content"><div class="nzoi-modal-header"><h2>Code Manager</h2><button class="nzoi-modal-close">×</button></div><div class="nzoi-modal-body"><div class="nzoi-file-list">${list}</div></div></div>`;document.body.appendChild(modal);modal.querySelector('.nzoi-modal-close').onclick=()=>modal.remove();modal.querySelectorAll('.nzoi-open-btn').forEach(b=>b.onclick=()=>editFile(b.dataset.id));modal.querySelectorAll('.nzoi-delete-btn').forEach(b=>b.onclick=()=>delFile(b.dataset.id))}
const closeFiles=()=>document.querySelector('.nzoi-modal')?.remove();

function init(){
const orig=document.getElementById('main-container');if(!orig)return;const layout=document.createElement('div');layout.id='nzoi-layout';const sidebar=document.createElement('div');sidebar.id='nzoi-sidebar';const resizer=document.createElement('div');resizer.id='nzoi-resizer';orig.parentNode.insertBefore(layout,orig);layout.appendChild(orig);layout.appendChild(resizer);layout.appendChild(sidebar);const title=document.getElementById('main-page-title-box');if(title){orig.insertBefore(title,orig.firstChild);title.style.width="100%";title.style.marginBottom="20px"}
sidebar.innerHTML=`<div class="sidebar-content"><div class="editor-controls"><button id="run-btn">Run</button><button id="submit-btn">Submit</button><button id="paste-btn">Paste</button><button id="files-btn">Codes</button></div><div id="editor-container"><iframe id="clangd-iframe" src="about:blank" allow="cross-origin-isolated" crossorigin="anonymous"></iframe></div><div id="editor-vertical-resizer"></div><div id="test-results-container"><div id="test-results"><div style="color:var(--fg-muted);text-align:center;padding-top:20px;">Ready to run.</div></div></div></div>`;
const iframe=document.getElementById('clangd-iframe');const ed={getValue:()=>code,setValue:c=>{code=c;localStorage.setItem(`nzoi-code-${pid}`,c)}};const updatePreview=()=>{try{iframe.src=getUrl(code)}catch(e){}};
document.getElementById('paste-btn').onclick=async()=>{try{const text=await navigator.clipboard.readText();if(text&&text.trim()){ed.setValue(text);const m=getMeta();m[pid]={name:getPName(),id:pid,timestamp:Date.now()};saveMeta(m);const btn=document.getElementById('paste-btn');btn.textContent='Saved!';setTimeout(()=>btn.textContent='Paste',1000)}}catch(e){alert('Clipboard error: '+e.message)}};
document.getElementById('files-btn').onclick=showFiles;document.getElementById('run-btn').onclick=()=>runTests(ed);document.getElementById('submit-btn').onclick=submit;
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();ed.setValue(code);const t=document.getElementById('test-results');t.innerHTML=`<div style="color:var(--green);text-align:center;margin-top:10px;">✓ Code Saved</div>`;setTimeout(()=>t.innerHTML='',1500)}});
setupH(resizer,orig,sidebar);setupV(document.getElementById('editor-vertical-resizer'),document.getElementById('editor-container'),document.getElementById('test-results-container'));updatePreview()}

function setupH(r,l,right){let sx,sw;r.onmousedown=e=>{sx=e.clientX;sw=l.getBoundingClientRect().width;document.documentElement.style.cursor='col-resize';document.onmousemove=e=>{let w=sw+(e.clientX-sx);w=Math.max(300,Math.min(w,window.innerWidth-300));l.style.width=w+'px';right.style.width=(window.innerWidth-w-6)+'px'};document.onmouseup=()=>{document.onmousemove=null;document.documentElement.style.cursor=''}}}
function setupV(r,top,bot){let sy,sh;r.onmousedown=e=>{sy=e.clientY;sh=top.getBoundingClientRect().height;document.documentElement.style.cursor='row-resize';const th=top.parentElement.clientHeight-60;document.onmousemove=e=>{let h=sh+(e.clientY-sy);h=Math.max(100,Math.min(h,th-100));top.style.height=h+'px';bot.style.height=`calc(100% - ${h+8+45}px)`};document.onmouseup=()=>{document.onmousemove=null;document.documentElement.style.cursor=''}}}

const samples=[];
document.querySelectorAll('ul.samples li').forEach((item,i)=>{const inp=item.querySelector('.input pre');const out=item.querySelector('.output pre');if(inp&&out)samples.push({id:i+1,input:inp.textContent,output:out.textContent})});

let __rt_running=false;

async function runTests(ed){
    if(__rt_running) return;
    __rt_running=true;

    const c=ed.getValue();
    const r=document.getElementById('test-results');
    r.innerHTML='<div style="padding:10px;color:var(--accent);">Compiling & Running...</div>';

    const results=[];
    for(const s of samples){
        try{
            const res=await fetch('https://emkc.org/api/v2/piston/execute',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({language:'c++',version:'10.2.0',files:[{content:c}],stdin:s.input.trim()})
            }).then(r=>r.json());

            const out=(
                res.run ? (res.run.stdout||'')+(res.run.stderr||'')
                : (res.compile ? res.compile.output : 'Error')
            ).trim();

            const exp=s.output.trim();
            const pass=out===exp;
            results.push({s,pass,out,exp,error:null});
        }catch(e){
            results.push({s,error:e.message});
        }
    }

    r.innerHTML='';
    results.forEach(({s,pass,out,exp,error})=>{
        const div=document.createElement('div');
        if(error){
            div.innerHTML=`<div style="color:var(--red);padding:5px;">Error running sample ${s.id}: ${error}</div>`;
        }else{
            div.className='test-result';
            div.innerHTML=`<div class="test-header ${pass?'passed':'failed'}"><span>Sample ${s.id}</span><span>${pass?'ACCEPTED':'WRONG ANSWER'}</span></div>${!pass?`<div class="test-diff"><div class="test-box"><strong>Output:</strong><pre>${esc(out)}</pre></div><div class="test-box"><strong>Expected:</strong><pre>${esc(exp)}</pre></div></div>`:''}`;
        }
        r.appendChild(div);
    });

    __rt_running=false;
}


function submit(){const c=code.trim();if(!c)return alert('Code empty');const form=document.createElement('form');form.method='POST';form.action=`/problems/${pid}/submit`;form.style.display='none';const token=document.querySelector('meta[name="csrf-token"]')?.content;const params={utf8:'✓',authenticity_token:token,'submission[language_id]':11,'submission[source]':c,commit:'提交'};for(const k in params){const i=document.createElement('input');i.type='hidden';i.name=k;i.value=params[k];form.appendChild(i)}document.body.appendChild(form);form.submit()}
init();
})();


(async()=>{
"use strict";
const API_KEYS = {
    CEREBRAS: "csk-hjk25fhppym6hht89y4vcprwmkv65mvhcjxetk9n28yfc3j4",
    CEREBRAS_2: "csk-npmwcetvdjdx55j44enkwjrrdcyxm462jx836w6ddj86my4c",
    CEREBRAS_3: "csk-h4jvv4ke3f8jnv62wk3ncrt2pe2484f88jrvp3hhchdrjty2",
    GOOGLE: "AIzaSyDU0z9c1wiXkh9EVORGYYxOKeX52HOxY8I"
};

const API_PROVIDERS = [
    {
        name: 'cerebras',
        displayName: 'Cerebras 1',
        apiKey: API_KEYS.CEREBRAS,
        endpoint: 'https://api.cerebras.ai/v1/chat/completions',
        model: 'gpt-oss-120b',
        rpmLimit: 30,
        buildPayload: p => ({
            model: 'gpt-oss-120b',
            messages: [{ role: 'user', content: p }],
            temperature: 0.7,
            top_p: 0.8,
            max_tokens: 4096,
            stream: false
        }),
        // Helper to extract text from Cerebras
        extractText: data => data.choices?.[0]?.message?.content
    },
    {
        name: 'cerebras-2',
        displayName: 'Cerebras 2',
        apiKey: API_KEYS.CEREBRAS_2,
        endpoint: 'https://api.cerebras.ai/v1/chat/completions',
        model: 'gpt-oss-120b',
        rpmLimit: 30,
        buildPayload: p => ({
            model: 'gpt-oss-120b',
            messages: [{ role: 'user', content: p }],
            temperature: 0.7,
            top_p: 0.8,
            max_tokens: 4096,
            stream: false
        }),
        extractText: data => data.choices?.[0]?.message?.content
    },
    {
        name: 'cerebras-3',
        displayName: 'Cerebras 3',
        apiKey: API_KEYS.CEREBRAS_3,
        endpoint: 'https://api.cerebras.ai/v1/chat/completions',
        model: 'gpt-oss-120b',
        rpmLimit: 30,
        buildPayload: p => ({
            model: 'gpt-oss-120b',
            messages: [{ role: 'user', content: p }],
            temperature: 0.7,
            top_p: 0.8,
            max_tokens: 4096,
            stream: false
        }),
        extractText: data => data.choices?.[0]?.message?.content
    },
    {
    name:'google',
    displayName:'Google AI',
    apiKey:API_KEYS.GOOGLE,
    endpoint:`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEYS.GOOGLE}`,


    model:'gemini-3-flash-preview',
    rpmLimit:15,
    buildPayload:p=>({
        contents:[{
            role:'user',
            parts:[{text:p}]
        }],
        generationConfig:{
            temperature:0.7,
            topP:0.8,
            maxOutputTokens:4096
        }
    }),
    extractText:d=>d.candidates?.[0]?.content?.parts?.[0]?.text
}

].filter(p => p.apiKey && !p.apiKey.includes("..."));
const CFG={API_DELAY_MS:1000,CONCURRENCY:1,MAX_RETRIES:5,PROBLEM_TEXT_LIMIT:3500,INITIAL_BACKOFF_MS:5000,MAX_BACKOFF_MS:300000,BACKOFF_MULTIPLIER:2,MINUTE_WINDOW_MS:60000,HOUR_WINDOW_MS:3600000,DAY_WINDOW_MS:86400000};
let state={problems:[],allTags:new Set(),allGroups:new Set(),sorting:{column:"rating",ascending:false},apiStates:{},reclassifyingProblems:new Set()};
function initApiStates(){API_PROVIDERS.forEach(p=>{state.apiStates[p.name]={lastCall:0,pauseUntil:0,consecutive429:0,pauseLogged:false,requestTimes:[],currentBackoffMs:CFG.INITIAL_BACKOFF_MS}})}
const utils={
  sleep:ms=>new Promise(r=>setTimeout(r,ms)),
  getRatingConfig:()=>({
    bounds:[800,1200,1400,1600,1900,2100,2400,9999],
    colors:[
      "#808080", // Newbie (gray)
      "#008000", // Apprentice/Pupil (green)
      "#03a89e", // Specialist (cyan)
      "#0000ff", // Expert (blue)
      "#aa00aa", // Master / CM (purple)
      "#ff8c00", // Master (orange)
      "#ff0000", // Grandmaster (red)
      "#000000"  // Unrated (black / unused)
    ],
    names:[
      "Newbie",
      "Apprentice",
      "Specialist",
      "Expert",
      "Master",
      "Grandmaster",
      "Legend",
      "Unrated"
    ]
  }),
  getStarCount:r=>{
    const b=utils.getRatingConfig().bounds
    let i=0
    while(i+1<b.length&&r>=b[i+1]) i++
    return Math.max(1,Math.min(5,i+1))
  },
  getStarRating:r=>"★".repeat(utils.getStarCount(r)),
  formatProgress:p=>`${Math.round(p||0)}%`,
  debounce:(f,w)=>{let t;return function(...a){clearTimeout(t);t=setTimeout(()=>f(...a),w)}}
};
const VALID_TAGS=new Set(["2-satisfiability","binary search","bitmasks","brute force","chinese remainder theorem","combinatorics","constructive algorithms","data structures","depth-first search and similar","divide and conquer","dynamic programming","disjoint set union","expression parsing","fast fourier transform","flows","game theory","geometry","graph matchings","graphs","greedy algorithms","hashing","implementation","linear algebra","meet-in-the-middle","number theory","probabilities","scheduling","shortest paths","sorting","string suffix structures","strings","ternary search","trees","two pointers","io"].map(t=>t.toLowerCase()));
const router={isHome:()=>location.href==="https://train.nzoi.org.nz/",isProblem:()=>/^https:\/\/train\.nzoi\.org\.nz\/problems\//.test(location.href),shouldApplyGeneralStyles:()=>!router.isHome()&&!router.isProblem()};
if(router.shouldApplyGeneralStyles()){GM_addStyle(getGeneralPageStyles());return}
if(router.isProblem())return;

const scrapers={getMyGroups:()=>{const g=[];$('h2:contains("My Groups")').nextAll('div').each(function(){const l=$(this).find('a');if(l.length)g.push({name:l.text().trim(),href:l.attr('href')})});return g},getUpcomingContests:()=>{const c=[];$('h2:contains("Upcoming and Current Contests")').next('table').find('tbody tr').each(function(){const cells=$(this).find('td');if(cells.length>=6)c.push({title:$(cells[0]).text().trim(),startTime:$(cells[1]).text().trim(),endTime:$(cells[2]).text().trim(),href:$(cells[5]).find('a').attr('href')})});return c},
async getAllProblems(){
    const all=[],uniq=new Set(),myGrps=this.getMyGroups();
    const procDOM=(doc,gn)=>{
        const rows = doc.querySelectorAll('table tbody tr');
        rows.forEach(row => {
            const cells = row.children;
            const lnk = cells[0]?.querySelector('a[href^="/problems/"]');
            if(!lnk) return;
            const url = lnk.getAttribute("href"), id = url.split("/").pop();
            if(!id || !/^\d+$/.test(id)) return; // Skip non-numeric IDs
            if(uniq.has(id)) return;
            uniq.add(id);
            const name = lnk.textContent.trim(), progTxt = cells[1]?.textContent.trim() || "";
            let prog = 0;
            if(progTxt.includes("%")) prog = parseInt(progTxt)||0;
            else if(progTxt.includes("/")){const[s,t]=progTxt.split("/").map(Number);if(!isNaN(s)&&!isNaN(t)&&t>0)prog=Math.round(s/t*100)}
            all.push({id,name,href:"https://train.nzoi.org.nz"+url,group:gn,progress:prog})
        });
    };
    $(".subheading").each(function(){const gn=$(this).find("td:first").text().trim(),gid=$(this).find("td:first").attr("onclick")?.match(/'([^']+)'/)?.[1];if(gid)procDOM(document.getElementById(gid),gn)});
    if(myGrps.length>0)await Promise.all(myGrps.map(async g=>{try{const r=await fetch('https://train.nzoi.org.nz'+g.href),h=await r.text(),d=(new DOMParser()).parseFromString(h,"text/html");procDOM(d,g.name)}catch(e){console.error(`Failed to fetch problems for group: ${g.name}`,e)}}));
    return all
}};

const apiMgr={getAvailableProvider(sp=null){const now=Date.now(),prv=sp?API_PROVIDERS.filter(p=>p.name===sp):API_PROVIDERS;for(const p of prv){const ps=state.apiStates[p.name];if(ps.pauseUntil>now)continue;const mc=now-CFG.MINUTE_WINDOW_MS,rr=ps.requestTimes.filter(t=>t>mc);if(rr.length>=p.rpmLimit)continue;return p}return null},async waitForProvider(sp=null){while(true){const p=this.getAvailableProvider(sp);if(p)return p;console.warn(sp?`API provider ${sp} is rate-limited. Waiting...`:"All API providers are rate-limited. Waiting...");await utils.sleep(5000)}},recordRequest(p){const now=Date.now(),ps=state.apiStates[p.name];ps.requestTimes.push(now);ps.lastCall=now;const co=now-CFG.MINUTE_WINDOW_MS;ps.requestTimes=ps.requestTimes.filter(t=>t>co)},resetBackoff(p){const ps=state.apiStates[p.name];ps.consecutive429=0;ps.currentBackoffMs=CFG.INITIAL_BACKOFF_MS;ps.pauseLogged=false},handleRateLimitResponse(p,r){const ps=state.apiStates[p.name];ps.consecutive429++;const ra=r.headers.get('Retry-After');let pm;if(ra)pm=parseInt(ra)*1000;else{const bo=Math.min(CFG.MAX_BACKOFF_MS,ps.currentBackoffMs*Math.pow(CFG.BACKOFF_MULTIPLIER,ps.consecutive429)),ji=bo*0.25*(Math.random()-0.5);pm=Math.max(1000,bo+ji)}ps.pauseUntil=Date.now()+pm;console.warn(`[${p.name}] 🚫 Rate limited. Pausing for ${Math.ceil(pm/1000)}s.`)}};
const classifier={async getProblemClassification(prob,sp=null){const prompt=txt=>
`You are a competitive programming problem classifier.

Analyze the given problem and output ONLY a single valid JSON object.
Do NOT include explanations, markdown, or extra text.

Tasks:
1. Assign a difficulty rating between 900 and 2500.
   - Round the rating to the nearest 100 (or at most nearest 10 if needed).
2. Assign up to 5 tags from the following list:
   [${Array.from(VALID_TAGS).join(', ')}]

Rating guidelines:
- 800: ONLY  tasks such as questions named python, cpp or any language also those wellcome to nzic are also trivial. only set the question to 800 if the question is just addition/subtraction or similar questions
- 900–1000: trivial algorithmic problem
- 1000–1200: easy
- 1200–1500: easy but requires some reasoning
- 1500–1800: medium
- 1800–2300: hard
- 2300+: very hard

If a problem is very easy but NOT pure input/output, rate it at least 900.

Output format (exactly):
{"tags":["tag1","tag2"],"rating":1200}

Problem:
${txt}

Think thrice before outputing result!
`;let ptxt="";try{const r=await fetch(prob.href),h=await r.text(),d=(new DOMParser()).parseFromString(h,"text/html");ptxt=d.querySelector(".problem-statement")?.innerText||d.body.innerText||"";ptxt=ptxt.substring(0,CFG.PROBLEM_TEXT_LIMIT)+(ptxt.length>CFG.PROBLEM_TEXT_LIMIT?"...":"")}catch(e){console.error("Failed to fetch problem text:",e);const to=prob.name||"";return await this.callClassificationAPI(prompt(to),sp)}return await this.callClassificationAPI(prompt(ptxt),sp)},
                 async callClassificationAPI(prmt, sp = null) {
    for (let att = 0; att < CFG.MAX_RETRIES; att++) {
        const pv = await apiMgr.waitForProvider(sp);
        try {
            const ps = state.apiStates[pv.name],
                tsl = Date.now() - ps.lastCall;
            if (tsl < CFG.API_DELAY_MS) await utils.sleep(CFG.API_DELAY_MS - tsl);

            console.log(`[${pv.name}] Calling API... (Attempt ${att + 1})`);

            // Fix: Google uses URL params; Cerebras uses Authorization header
            const hdrs = { 'Content-Type': 'application/json' };
            if (pv.name.includes('cerebras')) {
                hdrs['Authorization'] = `Bearer ${pv.apiKey}`;
            }

            const resp = await fetch(pv.endpoint, {
                method: 'POST',
                headers: hdrs,
                body: JSON.stringify(pv.buildPayload(prmt))
            });

            apiMgr.recordRequest(pv);

            if (resp.status === 429) {
                apiMgr.handleRateLimitResponse(pv, resp);
                att--;
                continue;
            }

            if (!resp.ok) {
                const et = await resp.text();
                throw new Error(`API error: ${resp.status} - ${et}`);
            }

            const data = await resp.json();
            // Use the specific extraction logic for this provider
            const cont = pv.extractText(data);

            if (!cont) throw new Error("Invalid response structure from API");

            apiMgr.resetBackoff(pv);
            const cls = this.parseClassificationResponse(cont);
            cls.classifiedBy = pv.name;
            cls.classifiedAt = Date.now();
            return cls;
        } catch (e) {
            console.error(`[${pv.name}] API call failed:`, e);
            state.apiStates[pv.name].pauseUntil = Date.now() + 15000;
        }
    }
    return { tags: ["implementation"], rating: 800, classifiedBy: 'fallback', classifiedAt: Date.now() };
},parseClassificationResponse(cont){try{const raw=typeof cont==='string'?cont:JSON.stringify(cont);console.log('raw classifier output:',raw);let parsed=null;try{parsed=JSON.parse(cont)}catch(e){const m=raw.match(/\{[\s\S]*\}/);if(m)try{parsed=JSON.parse(m[0])}catch(e){}}if(parsed&&Array.isArray(parsed.tags)&&parsed.tags.length>0&&typeof parsed.rating==="number"){const vt=parsed.tags.map(t=>t.toString().toLowerCase()).filter(t=>VALID_TAGS.has(t));return{tags:vt.length>0?vt:["implementation"],rating:parsed.rating}}const rm=raw.match(/(\b[89]\d{2}\b|\b1\d{3}\b|\b2\d{3}\b|\b3[0-4]\d{2}\b)/),rating=rm?parseInt(rm[0]):800,words=raw.toLowerCase().split(/[^a-z0-9-]+/),tm=words.filter(w=>VALID_TAGS.has(w)),ut=Array.from(new Set(tm)).slice(0,3);return{tags:ut.length?ut:["implementation"],rating}}catch(e){return{tags:["implementation"],rating:800}}},async classifyProblems(unc){if(API_PROVIDERS.length===0){console.warn("No API keys configured. Skipping classification.");return}console.log(`🚀 Starting classification of ${unc.length} problems using [${API_PROVIDERS.map(p=>p.name).join(', ')}]...`);let idx=0,comp=0,fail=0;const wk=async()=>{while(true){const ci=idx++;if(ci>=unc.length)break;const prob=unc[ci];try{console.log(`📄 Classifying (${comp+fail+1}/${unc.length}): ${prob.name}`);const cls=await this.getProblemClassification(prob);localStorage.setItem(`nztags_${prob.id}`,JSON.stringify(cls));Object.assign(prob, cls); prob.searchIndex = `${prob.name} ${(prob.tags||[]).join(" ")} ${prob.rating}`.toLowerCase();state.problems.push(prob);cls.tags.forEach(t=>state.allTags.add(t));comp++;if(comp%2===0||comp+fail===unc.length){ui.updateTable();ui.updateCacheCounter()}console.log(`✅ Classified: ${prob.name} (${cls.rating}, ${cls.tags.join(', ')})`)}catch(e){fail++;console.error(`❌ Classification failed for: ${prob.name}`,e)}}};await wk();console.log(`🎉 Classification complete! ✅ ${comp} successful, ❌ ${fail} failed`)},async reclassifySingleProblem(pid,sp=null){const pidStr=String(pid);console.log("Looking for problem with ID:",pidStr);console.log("Available problems:",state.problems.map(p=>({id:p.id,name:p.name})));const prob=state.problems.find(p=>String(p.id)===pidStr);if(!prob){console.error(`Problem ${pidStr} not found in state.problems`);alert(`Error: Problem ${pidStr} not found. Try refreshing the page.`);return false}state.reclassifyingProblems.add(pidStr);ui.updateProblemRow(pidStr,true);try{console.log(`🔄 Reclassifying: ${prob.name}${sp?` using ${sp}`:''}`);const cls=await this.getProblemClassification(prob,sp);localStorage.setItem(`nztags_${prob.id}`,JSON.stringify(cls));Object.assign(prob,cls); prob.searchIndex = `${prob.name} ${(prob.tags||[]).join(" ")} ${prob.rating}`.toLowerCase(); cls.tags.forEach(t=>state.allTags.add(t));console.log(`✅ Reclassified: ${prob.name} (${cls.rating}, ${cls.tags.join(', ')})`);state.reclassifyingProblems.delete(pidStr);ui.updateTable();return true}catch(e){console.error(`❌ Reclassification failed for: ${prob.name}`,e);state.reclassifyingProblems.delete(pidStr);ui.updateProblemRow(pidStr,false);alert(`Reclassification failed: ${e.message}`);return false}}};

const cache={
    loadCachedProblems(all){
        const cac=[],unc=[];
        all.forEach(p=>{
            const cd=localStorage.getItem(`nztags_${p.id}`);
            if(cd)try{
                const par=JSON.parse(cd);
                if(this.isValidCacheData(par)){
                    const mp = {...p,...par};
                    mp.searchIndex = `${mp.name} ${(mp.tags||[]).join(" ")} ${mp.rating}`.toLowerCase();
                    cac.push(mp);
                    par.tags.forEach(t=>state.allTags.add(t));
                }else unc.push(p)
            }catch{unc.push(p)}else unc.push(p)
        });
        return{cached:cac,uncached:unc}
    },
    isValidCacheData(d){return Array.isArray(d.tags)&&d.tags.length>0&&typeof d.rating==="number"&&d.rating>=800},
    clearAll(){if(confirm("Clear all problem classifications? This action cannot be undone.")){Object.keys(localStorage).filter(k=>k.startsWith("nztags_")).forEach(k=>localStorage.removeItem(k));location.reload()}},
    refreshAll(){if(confirm("Re-classify all problems? This may take several minutes and will overwrite existing classifications.")){state.problems.forEach(p=>localStorage.removeItem(`nztags_${p.id}`));location.reload()}}
};

const ui={renderDashboard(all){const mg=scrapers.getMyGroups(),con=scrapers.getUpcomingContests();$("#main-container").html(this.getDashboardHTML(mg,con,all.length));this.attachEventHandlers();this.populateFilters()},getDashboardHTML(grps,cons,tot){return`<div class="dashboard-layout"><div class="main-panel"><header class="dashboard-header"><div class="header-top"><div class="header-title"><h1 class="dashboard-title">Problems</h1><div class="cache-status"><span class="cache-counter"><span id="cached-count">0</span>/${tot} classified</span><div class="cache-actions"><button id="refresh-cache" class="action-btn" title="Re-classify all problems"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg></button><button id="clear-cache" class="action-btn danger" title="Clear cache"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button></div></div></div></div><div class="header-actions"><div class="search-section"><div class="search-container"><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg><input id="search" placeholder="Search problems..." autocomplete="off"></div></div><div class="filters-section"><select id="tag-filter" class="filter-select"><option value="all">All Tags</option></select><select id="diff-filter" class="filter-select"><option value="all">All Difficulties</option><option value="1">★</option><option value="2">★★</option><option value="3">★★★</option><option value="4">★★★★</option><option value="5">★★★★★</option></select><select id="group-filter" class="filter-select"><option value="all">All Groups</option></select></div></div></header><div class="table-section"><div class="table-container"><table id="problems-table" class="problems-table"><thead><tr><th id="name-header" class="sortable-header"><span>Problem</span><svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></th><th id="progress-header" class="sortable-header"><span>Progress</span><svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></th><th id="group-header" class="sortable-header"><span>Group</span><svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></th><th id="tag-header" class="sortable-header"><span>Tags</span><svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></th><th id="rating-header" class="sortable-header active desc"><span>Difficulty</span><svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></th><th class="actions-header"><span>Actions</span></th></tr></thead><tbody></tbody></table></div></div></div><aside class="sidebar">${this.getSidebarHTML(grps,cons)}</aside></div>`},getSidebarHTML(grps,cons){return`<div class="sidebar-card"><div class="card-header"><svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><h2>My Groups</h2></div><div class="card-content">${grps.length?grps.map(g=>`<a href="${g.href}" class="sidebar-item"><span class="item-text">${g.name}</span><svg class="item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`).join(''):'<div class="empty-state">No groups found</div>'}</div></div><div class="sidebar-card"><div class="card-header"><svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg><h2>Upcoming Contests</h2></div><div class="card-content">${cons.length?cons.map(c=>`<a href="${c.href}" class="sidebar-item contest-item"><div class="contest-info"><div class="contest-title">${c.title}</div><div class="contest-time"><div class="time-item">Start: ${c.startTime}</div><div class="time-item">End: ${c.endTime}</div></div></div><svg class="item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></a>`).join(''):'<div class="empty-state">No upcoming contests</div>'}</div></div>`},attachEventHandlers(){$("#refresh-cache").on("click",cache.refreshAll);$("#clear-cache").on("click",cache.clearAll);const dbu=utils.debounce(()=>this.updateTable(),300);$("#search, #tag-filter, #diff-filter, #group-filter").on("input change",dbu);this.setupSorting()},setupSorting(){["name","progress","group","tag","rating"].forEach(col=>{$(`#${col}-header`).on("click",()=>{if(state.sorting.column===col)state.sorting.ascending=!state.sorting.ascending;else{state.sorting.column=col;state.sorting.ascending=col!=="rating"}$(".sortable-header").removeClass("active asc desc");const hdr=$(`#${col}-header`);hdr.addClass(`active ${state.sorting.ascending?'asc':'desc'}`);this.updateTable()})})},populateFilters(){const gs=$("#group-filter");state.allGroups.forEach(g=>gs.append(new Option(g,g)));const ts=$("#tag-filter");Array.from(state.allTags).sort().forEach(t=>{const dn=t.charAt(0).toUpperCase()+t.slice(1);ts.append(new Option(dn,t))})},updateTable(){const flt=this.getFilters(),fp=this.filterProblems(flt),sp=this.sortProblems(fp);this.renderTableRows(sp)},getFilters(){return{search:$("#search").val().toLowerCase(),tag:$("#tag-filter").val(),difficulty:$("#diff-filter").val(),group:$("#group-filter").val()}},
filterProblems(flt){
    return state.problems.filter(p=>{
        const sm=!flt.search||(p.searchIndex && p.searchIndex.includes(flt.search));
        const tm=flt.tag==="all"||(p.tags||[]).map(t=>t.toLowerCase()).includes(flt.tag.toLowerCase());
        const gm=flt.group==="all"||(p.group&&p.group.toLowerCase()===flt.group.toLowerCase());
        const dm=flt.difficulty==="all"||utils.getStarCount(p.rating)===parseInt(flt.difficulty);
        return sm&&tm&&gm&&dm
    })
},
sortProblems(probs){return probs.sort((a,b)=>{let cmp;switch(state.sorting.column){case"name":cmp=a.name.localeCompare(b.name);break;case"group":cmp=(a.group||"").localeCompare(b.group||"");break;case"tag":cmp=(a.tags||[]).join(", ").localeCompare((b.tags||[]).join(", "));break;case"progress":cmp=(a.progress||0)-(b.progress||0);break;default:cmp=(a.rating||0)-(b.rating||0)}return state.sorting.ascending?cmp:-cmp})},getProviderDisplayName(pn){const pv=API_PROVIDERS.find(p=>p.name===pn);return pv?pv.displayName:pn||'Unknown'},renderTableRows(probs){const tb=$("#problems-table tbody");tb.empty();if(probs.length===0){tb.append(`<tr class="empty-row"><td colspan="6" class="empty-state"><div class="empty-content"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg><p>No problems match your filters</p><small>Try adjusting your search terms or filters</small></div></td></tr>`);return}const rcfg=utils.getRatingConfig();probs.forEach(p=>{const cidx=rcfg.bounds.findIndex(b=>p.rating<=b),col=rcfg.colors[cidx],stars=utils.getStarRating(p.rating),isRe=state.reclassifyingProblems.has(p.id),clby=this.getProviderDisplayName(p.classifiedBy);tb.append(`<tr class="problem-row" data-problem-id="${p.id}"><td class="problem-name"><a href="${p.href}" target="_blank" class="problem-link">${p.name}</a></td><td class="problem-progress"><div class="progress-container"><div class="progress-bar"><div class="progress-fill" style="width: ${p.progress}%; background-color: ${p.progress===100?'#30d158':col};"></div></div><span class="progress-text">${utils.formatProgress(p.progress)}</span></div></td><td class="problem-group" title="${p.group||'Public'}"><div class="group-container"><span class="group-badge">${p.group||'Public'}</span></div></td><td class="problem-tags" title="${p.tags.join(', ')}"><div class="tags-container" data-problem-id="${p.id}">${(p.tags||[]).map(t=>`<span class="tag-badge">${t}</span>`).join('')}<button class="edit-tags-btn" data-problem-id="${p.id}" title="Edit tags"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button></div></td><td class="problem-difficulty"><div class="difficulty-container" style="color: ${col}"><span class="difficulty-stars">${stars}</span><span class="difficulty-rating">${p.rating}</span><button class="edit-rating-btn" data-problem-id="${p.id}" title="Edit difficulty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button></div>${p.classifiedBy?`<div class="classified-by" title="Classified by ${clby}">by ${clby}</div>`:''}</td><td class="problem-actions">${isRe?`<div class="reclassify-loading"><svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle></svg><span>Reclassifying...</span></div>`:`<div class="action-buttons"><button class="reclassify-btn" data-problem-id="${p.id}" title="Reclassify this problem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg></button><div class="provider-selector-wrapper"><button class="provider-select-btn" data-problem-id="${p.id}" title="Choose AI to reclassify"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button><div class="provider-menu" data-problem-id="${p.id}">${API_PROVIDERS.map(pv=>`<button class="provider-option" data-provider="${pv.name}" data-problem-id="${p.id}">${pv.displayName}</button>`).join('')}</div></div></div>`}</td></tr>`)});this.attachReclassifyHandlers()},attachReclassifyHandlers(){$(".reclassify-btn").off("click").on("click",async function(e){e.stopPropagation();const pid=$(this).data("problem-id");console.log("Reclassify button clicked, problemId:",pid);await classifier.reclassifySingleProblem(pid)});$(".edit-tags-btn").off("click").on("click",function(e){e.stopPropagation();const pid=$(this).data("problem-id");ui.showTagsEditor(pid)});$(".edit-rating-btn").off("click").on("click",function(e){e.stopPropagation();const pid=$(this).data("problem-id");ui.showRatingEditor(pid)});$(".provider-select-btn").off("click").on("click",function(e){e.stopPropagation();e.preventDefault();const btn=$(this),pid=btn.data("problem-id"),menu=$(`.provider-menu[data-problem-id="${pid}"]`);if(menu.hasClass("show")){menu.removeClass("show");return}$(".provider-menu").removeClass("show");const bo=btn.offset(),bh=btn.outerHeight(),bw=btn.outerWidth(),mw=140;let top=bo.top+bh+4,left=bo.left+bw-mw;const vw=$(window).width(),vh=$(window).height();if(left+mw>vw-10)left=vw-mw-10;if(left<10)left=10;if(top+200>vh)top=bo.top-200-4;menu.css({top:top+'px',left:left+'px'});menu.addClass("show")});$(".provider-option").off("click").on("click",async function(e){e.stopPropagation();const pid=$(this).data("problem-id"),pn=$(this).data("provider");console.log("Provider option clicked, problemId:",pid,"provider:",pn);$(".provider-menu").removeClass("show");await classifier.reclassifySingleProblem(pid,pn)});$(document).off("click.providerMenu").on("click.providerMenu",function(e){if(!$(e.target).closest(".provider-selector-wrapper, .provider-select-btn").length)$(".provider-menu").removeClass("show")});$(".table-container").off("scroll.providerMenu").on("scroll.providerMenu",function(){$(".provider-menu").removeClass("show")})},updateProblemRow(pid,isLoad){const row=$(`.problem-row[data-problem-id="${pid}"]`);if(!row.length)return;const p=state.problems.find(pr=>pr.id===pid);if(!p)return;const rcfg=utils.getRatingConfig(),cidx=rcfg.bounds.findIndex(b=>p.rating<=b),col=rcfg.colors[cidx],stars=utils.getStarRating(p.rating),clby=this.getProviderDisplayName(p.classifiedBy);row.find('.problem-difficulty').html(`<div class="difficulty-container" style="color: ${col}"><span class="difficulty-stars">${stars}</span><span class="difficulty-rating">${p.rating}</span></div>${p.classifiedBy?`<div class="classified-by" title="Classified by ${clby}">by ${clby}</div>`:''}`);row.find('.problem-tags').html(`<div class="tags-container">${(p.tags||[]).slice(0,3).map(t=>`<span class="tag-badge">${t}</span>`).join('')}</div>`);row.find('.problem-actions').html(isLoad?`<div class="reclassify-loading"><svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle></svg><span>Reclassifying...</span></div>`:`<div class="action-buttons"><button class="reclassify-btn" data-problem-id="${pid}" title="Reclassify this problem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg></button><div class="provider-selector-wrapper"><button class="provider-select-btn" data-problem-id="${pid}" title="Choose AI to reclassify"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button><div class="provider-menu" data-problem-id="${pid}">${API_PROVIDERS.map(pv=>`<button class="provider-option" data-provider="${pv.name}" data-problem-id="${pid}">${pv.displayName}</button>`).join('')}</div></div></div>`);if(!isLoad)this.attachReclassifyHandlers()},updateCacheCounter(){$("#cached-count").text(state.problems.length)},showTagsEditor(pid){const pidStr=String(pid),p=state.problems.find(pr=>String(pr.id)===pidStr);if(!p)return;const ct=p.tags||[],ata=Array.from(VALID_TAGS).sort(),modal=$(`<div class="modal-overlay"><div class="modal-content"><div class="modal-header"><h3>Edit Tags: ${p.name}</h3><button class="modal-close">&times;</button></div><div class="modal-body"><div class="tag-selector">${ata.map(t=>`<label class="tag-option ${ct.includes(t)?'selected':''}"><input type="checkbox" value="${t}" ${ct.includes(t)?'checked':''}><span>${t}</span></label>`).join('')}</div></div><div class="modal-footer"><button class="modal-btn modal-btn-secondary modal-cancel">Cancel</button><button class="modal-btn modal-btn-primary modal-save">Save</button></div></div></div>`);$("body").append(modal);modal.find(".tag-option input").on("change",function(){$(this).closest(".tag-option").toggleClass("selected",this.checked)});modal.find(".modal-close, .modal-cancel").on("click",()=>modal.remove());modal.find(".modal-overlay").on("click",e=>{if(e.target===modal[0])modal.remove()});modal.find(".modal-save").on("click",()=>{const st=modal.find(".tag-option input:checked").map(function(){return $(this).val()}).get();if(st.length===0){alert("Please select at least one tag");return}p.tags=st;const cls={tags:st,rating:p.rating,classifiedBy:'manual',classifiedAt:Date.now()};localStorage.setItem(`nztags_${p.id}`,JSON.stringify(cls));st.forEach(t=>state.allTags.add(t));ui.updateTable();modal.remove()})},showRatingEditor(pid){const pidStr=String(pid),p=state.problems.find(pr=>String(pr.id)===pidStr);if(!p)return;const modal=$(`<div class="modal-overlay"><div class="modal-content modal-small"><div class="modal-header"><h3>Edit Difficulty: ${p.name}</h3><button class="modal-close">&times;</button></div><div class="modal-body"><div class="rating-editor"><label for="rating-input">Difficulty Rating (800-3500):</label><input type="number" id="rating-input" min="800" max="3500" step="100" value="${p.rating}"><div class="rating-guide"><div class="guide-item"><span class="guide-range">800:</span><span class="guide-desc">Pure I/O</span></div><div class="guide-item"><span class="guide-range">900-1000:</span><span class="guide-desc">Trivial</span></div><div class="guide-item"><span class="guide-range">1000-1200:</span><span class="guide-desc">Easy</span></div><div class="guide-item"><span class="guide-range">1200-1800:</span><span class="guide-desc">Medium</span></div><div class="guide-item"><span class="guide-range">1800-2300:</span><span class="guide-desc">Hard</span></div><div class="guide-item"><span class="guide-range">2300+:</span><span class="guide-desc">Very Hard</span></div></div></div></div><div class="modal-footer"><button class="modal-btn modal-btn-secondary modal-cancel">Cancel</button><button class="modal-btn modal-btn-primary modal-save">Save</button></div></div></div>`);$("body").append(modal);modal.find(".modal-close, .modal-cancel").on("click",()=>modal.remove());modal.find(".modal-overlay").on("click",e=>{if(e.target===modal[0])modal.remove()});modal.find(".modal-save").on("click",()=>{const nr=parseInt(modal.find("#rating-input").val());if(isNaN(nr)||nr<800||nr>3500){alert("Please enter a valid rating between 800 and 3500");return}p.rating=nr;const cls={tags:p.tags,rating:nr,classifiedBy:'manual',classifiedAt:Date.now()};localStorage.setItem(`nztags_${p.id}`,JSON.stringify(cls));ui.updateTable();modal.remove()})}};
const app={async initialize(){initApiStates();const all=await scrapers.getAllProblems();if(all.length===0){console.warn("No problems found to display");return}all.forEach(p=>{if(p.group)state.allGroups.add(p.group)});const{cached,uncached}=cache.loadCachedProblems(all);state.problems=cached;ui.renderDashboard(all);ui.updateTable();ui.updateCacheCounter();if(uncached.length>0){console.log(`Starting classification of ${uncached.length} uncached problems...`);await classifier.classifyProblems(uncached);console.log("Problem classification completed")}}};
const waitForPageLoad=()=>{const ci=setInterval(()=>{if($('h2:contains("Public Problems")').length>0&&$('h2:contains("My Groups")').length>0){clearInterval(ci);app.initialize()}},300)};
function getGeneralPageStyles(){return`:root{--bg-primary:#0d1117;--bg-secondary:#1e1e1e;--text-primary:#d4d4d4;--text-secondary:#858585;--accent-blue:#569cd6;--border-color:#30363d;--code-keyword:#569cd6;--code-type:#4ec9b0;--code-string:#ce9178;--code-number:#b5cea8;--code-preprocessor:#c586c0;--code-comment:#6a9955;--code-function:#dcdcaa}body,html{background-color:var(--bg-primary)!important;color:var(--text-primary)!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif;line-height:1.5}a{color:var(--accent-blue)!important;text-decoration:none!important;transition:opacity .2s ease}a:hover{opacity:.8!important}table,td,th{background-color:var(--bg-secondary)!important;color:var(--text-primary)!important;border-color:var(--border-color)!important}input,select,textarea{background-color:var(--bg-secondary)!important;color:var(--text-primary)!important;border:1px solid var(--border-color)!important;border-radius:6px;padding:8px 12px}.tab_menu li a{background-color:var(--bg-secondary)!important;color:var(--text-secondary)!important;border-radius:6px;transition:all .2s}.tab_menu li a:hover,.tab_menu li a.selected{background-color:var(--accent-blue)!important;color:#fff!important}.highlight,.highlight *{background-color:var(--bg-secondary)!important}.highlight{color:var(--text-primary)!important;border-radius:6px;padding:0;overflow-x:auto}.highlight pre{margin:0;padding:12px;counter-reset:linenumber}.highlight pre>span[id^="line-"]{display:block;counter-increment:linenumber}.highlight pre>span[id^="line-"]::before{content:counter(linenumber);display:inline-block;width:3ch;margin-right:12px;color:var(--text-secondary)!important;text-align:right;user-select:none;opacity:.8}.highlight .cp,.highlight .cpf{color:var(--code-preprocessor)!important}.highlight .k{color:var(--code-keyword)!important}.highlight .kt,.highlight .nn{color:var(--code-type)!important}.highlight .s,.highlight .s2,.highlight .sc{color:var(--code-string)!important}.highlight .c,.highlight .cm,.highlight .c1{color:var(--code-comment)!important;font-style:italic}.highlight .m,.highlight .mi{color:var(--code-number)!important}.highlight .nf{color:var(--code-function)!important}.highlight .n{color:var(--text-primary)!important}.highlight .p{color:var(--text-primary)!important}`}
GM_addStyle(`:root{--bg-primary:#0d1117;--bg-secondary:#161b22;--bg-tertiary:#21262d;--bg-hover:#30363d;--text-primary:#f0f6fc;--text-secondary:#8b949e;--text-tertiary:#6e7681;--accent-blue:#58a6ff;--accent-green:#3fb950;--accent-red:#f85149;--accent-orange:#d29922;--border-primary:#30363d;--border-secondary:#21262d;--shadow-small:0 1px 3px rgba(0,0,0,0.12);--shadow-medium:0 4px 6px rgba(0,0,0,0.1);--shadow-large:0 10px 25px rgba(0,0,0,0.15);--radius-small:6px;--radius-medium:8px;--radius-large:12px}*{box-sizing:border-box}body,html{background:var(--bg-primary)!important;color:var(--text-primary)!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif!important;line-height:1.5;margin:0;padding:0;height:93vh;overflow:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}#main-container{height:93vh;display:flex;background:linear-gradient(135deg,var(--bg-primary) 0%,#0a0e14 100%);overflow:hidden}.dashboard-layout{display:flex;width:100%;height:100%;gap:16px;padding:16px}.main-panel{flex:1;display:flex;flex-direction:column;background:var(--bg-secondary);border-radius:var(--radius-medium);border:1px solid var(--border-primary);box-shadow:var(--shadow-medium);overflow:hidden}.dashboard-header{background:var(--bg-tertiary);border-bottom:1px solid var(--border-primary);padding:12px 20px}.header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.header-title{display:flex;align-items:center;gap:12px}.dashboard-title{font-size:22px;font-weight:600;color:var(--text-primary);margin:0;letter-spacing:-0.025em}.cache-status{display:flex;align-items:center;gap:8px}.cache-counter{font-size:12px;color:var(--text-secondary);font-variant-numeric:tabular-nums}.cache-actions{display:flex;gap:4px}.action-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:transparent;border:1px solid var(--border-primary);border-radius:var(--radius-small);color:var(--text-tertiary);cursor:pointer;transition:all .2s ease}.action-btn:hover{background:var(--bg-hover);border-color:var(--text-secondary);color:var(--text-secondary)}.action-btn.danger:hover{border-color:var(--accent-red);color:var(--accent-red)}.action-btn svg{width:14px;height:14px}.sidebar{width:260px;display:flex;flex-direction:column;gap:14px;height:100%}.header-actions{display:flex;align-items:center;gap:12px;flex-wrap:nowrap}.search-section{flex:1;min-width:200px}.search-container{position:relative}.search-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--text-tertiary);pointer-events:none}#search{width:100%;padding:8px 12px 8px 36px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:var(--radius-small);color:var(--text-primary);font-size:14px;transition:all .2s ease}#search:focus{outline:none;border-color:var(--accent-blue);box-shadow:0 0 0 2px rgba(88,166,255,0.1)}#search::placeholder{color:var(--text-tertiary)}.filters-section{display:flex;gap:8px;align-items:center;flex-shrink:0}.filter-select{padding:8px 10px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:var(--radius-small);color:var(--text-primary);font-size:13px;min-width:95px;cursor:pointer;transition:all .2s ease}.filter-select:focus{outline:none;border-color:var(--accent-blue);box-shadow:0 0 0 2px rgba(88,166,255,0.1)}.filter-select option{background:var(--bg-secondary);color:var(--text-primary)}.table-section{flex:1;display:flex;flex-direction:column;overflow:hidden}.table-container{flex:1;overflow-y:auto;min-height:0;padding:0 20px 16px}.problems-table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}.problems-table th{width:18%}.problems-table th:first-child{width:22%}.problems-table th:last-child{width:12%}.actions-header{text-align:center}.problem-actions{text-align:center}.action-buttons{display:flex;align-items:center;justify-content:center;gap:6px}.reclassify-btn,.provider-select-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:transparent;border:1px solid var(--border-primary);border-radius:var(--radius-small);color:var(--text-tertiary);cursor:pointer;transition:all .2s ease;padding:0}.reclassify-btn:hover{background:var(--bg-tertiary);border-color:var(--accent-blue);color:var(--accent-blue)}.provider-select-btn:hover{background:var(--bg-tertiary);border-color:var(--text-secondary);color:var(--text-secondary)}.reclassify-btn svg,.provider-select-btn svg{width:14px;height:14px}.provider-selector-wrapper{position:relative}.provider-menu{position:fixed;background:var(--bg-tertiary);border:1px solid var(--border-primary);border-radius:var(--radius-small);box-shadow:var(--shadow-large);min-width:140px;z-index:10000;opacity:0;transform:translateY(-4px);pointer-events:none;transition:all .2s ease}.provider-menu.show{opacity:1;transform:translateY(0);pointer-events:all}.provider-option{display:block;width:100%;padding:8px 12px;background:transparent;border:none;color:var(--text-primary);text-align:left;font-size:13px;cursor:pointer;transition:all .2s ease;border-bottom:1px solid var(--border-secondary)}.provider-option.provider-option:hover{background:var(--bg-hover);color:var(--accent-blue)}.reclassify-loading{display:flex;align-items:center;justify-content:center;gap:6px;color:var(--accent-blue);font-size:12px}.spinner{width:16px;height:16px;animation:spin 1s linear infinite}.spinner circle{stroke-dasharray:50;stroke-dashoffset:25;animation:spinDash 1.5s ease-in-out infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinDash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}100%{stroke-dasharray:90,150;stroke-dashoffset:-124}}.classified-by{font-size:10px;color:var(--text-tertiary);margin-top:2px;text-align:center;opacity:.7}.problems-table thead{position:sticky;top:0;z-index:10;background:var(--bg-secondary)}.problems-table th{background:transparent;color:var(--text-tertiary);padding:10px 14px;text-align:left;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:.5px;border:none;border-bottom:1px solid var(--border-primary);white-space:nowrap}.sortable-header{cursor:pointer;user-select:none;transition:color .2s ease;position:relative;display:table-cell}.sortable-header:hover{color:var(--text-secondary)}.sortable-header.active{color:var(--text-primary)}.sort-icon{width:12px;height:12px;margin-left:6px;opacity:.3;transition:all .2s ease;display:inline-block;vertical-align:middle}.sortable-header:hover .sort-icon{opacity:.6}.sortable-header.active .sort-icon{opacity:1}.sortable-header.active.desc .sort-icon{transform:rotate(180deg)}.problem-row{transition:background-color .15s ease;border-bottom:1px solid var(--border-secondary);height:60px}.problem-row:hover{background-color:var(--bg-hover)}.problem-row.problems-table td{padding:10px 14px;border:none;color:var(--text-secondary);vertical-align:middle;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.problem-name{color:var(--text-primary);font-weight:500}.problem-link{color:var(--text-primary);text-decoration:none;transition:color .2s ease;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.problem-link:hover{color:var(--accent-blue)}.progress-container{display:flex;align-items:center;gap:8px}.progress-bar{flex:1;height:4px;background:var(--bg-primary);border-radius:2px;overflow:hidden}.progress-fill{height:100%;border-radius:2px;transition:width .3s ease}.progress-text{font-size:12px;color:var(--text-tertiary);font-variant-numeric:tabular-nums;min-width:30px;text-align:right}.group-badge,.tag-badge{display:inline-block;padding:3px 8px;border-radius:10px;font-size:11px;font-weight:500;background:var(--bg-primary);color:var(--text-secondary);border:1px solid var(--border-primary);white-space:nowrap;flex-shrink:0}.tags-container,.group-container{display:flex;flex-wrap:nowrap;gap:4px;overflow-x:auto;padding-bottom:4px;mask-image:linear-gradient(90deg, #000 85%, transparent 100%);-webkit-mask-image:linear-gradient(90deg, #000 85%, transparent 100%);scrollbar-width:thin;scrollbar-color:var(--border-primary) transparent}.tags-container.is-end,.group-container.is-end{mask-image:none;-webkit-mask-image:none}.tags-container::-webkit-scrollbar,.group-container::-webkit-scrollbar{height:4px}.tags-container::-webkit-scrollbar-thumb,.group-container::-webkit-scrollbar-thumb{background:var(--border-primary);border-radius:2px}.tags-container::-webkit-scrollbar-track,.group-container::-webkit-scrollbar-track{background:transparent}.edit-tags-btn,.edit-rating-btn{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:transparent;border:1px solid transparent;border-radius:4px;color:var(--text-tertiary);cursor:pointer;transition:all .2s ease;padding:0;flex-shrink:0;margin-left:4px}.tags-container:hover .edit-tags-btn,.difficulty-container:hover .edit-rating-btn,.edit-tags-btn:focus,.edit-rating-btn.edit-tags-btn:hover,.edit-rating-btn:hover{background:var(--bg-tertiary);border-color:var(--accent-blue);color:var(--accent-blue)}.edit-tags-btn svg,.edit-rating-btn svg{width:12px;height:12px}.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn .2s ease}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.modal-content{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:var(--radius-large);box-shadow:var(--shadow-large);max-width:600px;width:90%;max-height:80vh;display:flex;flex-direction:column;animation:slideUp .3s ease}.modal-small{max-width:450px}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.modal-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border-primary)}.modal-header h3{margin:0;font-size:18px;font-weight:600;color:var(--text-primary)}.modal-close{background:transparent;border:none;color:var(--text-tertiary);font-size:24px;cursor:pointer;padding:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:4px;transition:all .2s ease}.modal-close:hover{background:var(--bg-hover);color:var(--text-primary)}.modal-body{padding:20px;overflow-y:auto;flex:1}.tag-selector{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}.tag-option{display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:var(--radius-small);cursor:pointer;transition:all .2s ease;user-select:none}.tag-option:hover{background:var(--bg-hover);border-color:var(--text-secondary)}.tag-option.selected{background:var(--bg-tertiary);border-color:var(--accent-blue)}.tag-option input[type="checkbox"]{margin:0;cursor:pointer}.tag-option span{color:var(--text-primary);font-size:13px}.rating-editor{display:flex;flex-direction:column;gap:12px}.rating-editor label{color:var(--text-primary);font-weight:500;font-size:14px}.rating-editor input[type="number"]{padding:10px 12px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:var(--radius-small);color:var(--text-primary);font-size:16px;font-weight:600}.rating-editor input[type="number"]:focus{outline:none;border-color:var(--accent-blue);box-shadow:0 0 0 2px rgba(88,166,255,0.1)}.rating-guide{display:flex;flex-direction:column;gap:6px;padding:12px;background:var(--bg-primary);border-radius:var(--radius-small);border:1px solid var(--border-primary)}.guide-item{display:flex;gap:8px;font-size:13px}.guide-range{color:var(--accent-blue);font-weight:600;min-width:90px}.guide-desc{color:var(--text-secondary)}.modal-footer{display:flex;justify-content:flex-end;gap:8px;padding:16px 20px;border-top:1px solid var(--border-primary)}.modal-btn{padding:8px 16px;border-radius:var(--radius-small);font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;border:1px solid transparent}.modal-btn-secondary{background:var(--bg-primary);color:var(--text-primary);border-color:var(--border-primary)}.modal-btn-secondary:hover{background:var(--bg-hover)}.modal-btn-primary{background:var(--accent-blue);color:#fff}.modal-btn-primary.tag-badge{flex-shrink:0}.difficulty-container{display:flex;align-items:baseline;gap:6px;font-weight:600;justify-content:center}.difficulty-stars{font-size:14px}.difficulty-rating{font-size:12px;color:var(--text-tertiary);font-variant-numeric:tabular-nums}.sidebar-card{flex:1;min-height:0;display:flex;flex-direction:column;background:var(--bg-secondary);border-radius:var(--radius-medium);border:1px solid var(--border-primary);box-shadow:var(--shadow-medium);overflow:hidden}.card-header{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--border-primary);background:var(--bg-tertiary)}.card-header h2{margin:0;font-size:15px;font-weight:600;color:var(--text-primary)}.card-icon{width:16px;height:16px;color:var(--accent-blue)}.card-content{flex:1;min-height:0;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:2px}.sidebar-item{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:var(--radius-small);color:var(--text-primary);text-decoration:none;transition:all .2s ease;border:1px solid transparent;font-size:14px}.sidebar-item:hover{background:var(--bg-hover);border-color:var(--border-primary);color:var(--text-primary)}.item-text{flex:1;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.item-arrow{width:14px;height:14px;color:var(--text-tertiary);transition:transform .2s ease}.sidebar-item:hover .item-arrow{transform:translateX(2px)}.contest-item{flex-direction:column;align-items:flex-start}.contest-info{flex:1;width:100%}.contest-title{font-weight:600;margin-bottom:6px;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contest-time{display:flex;flex-direction:column;gap:2px}.time-item{font-size:12px;color:var(--text-secondary)}.empty-state{text-align:center;color:var(--text-tertiary);padding:30px 16px}.empty-row .empty-state{padding:40px 16px}.empty-content{display:flex;flex-direction:column;align-items:center;gap:8px}.empty-content svg{width:40px;height:40px;color:var(--text-tertiary);opacity:.5}.empty-content p{font-size:14px;font-weight:500;margin:0}.empty-content small{font-size:12px;opacity:.7}@media (max-width:1200px){.dashboard-layout{flex-direction:column;gap:12px;padding:12px}.sidebar{width:100%;flex-direction:row;gap:12px}.sidebar-card{flex:1}.header-actions{flex-direction:column;align-items:stretch;gap:12px}.search-section{min-width:auto}.filters-section{flex-wrap:wrap}}#main-page-title-box{display:none!important}#main{padding-top:0!important}@media (max-width:768px){.dashboard-layout{padding:8px;gap:8px}.dashboard-header{padding:12px 16px}.table-container{padding:0 12px 12px}.problems-table th,.problems-table td{padding:8px 10px}.dashboard-title{font-size:20px}.sidebar{flex-direction:column}.header-top{flex-direction:column;align-items:flex-start;gap:8px}.cache-status{align-self:flex-end}}.table-container::-webkit-scrollbar,.card-content::-webkit-scrollbar{width:8px}.table-container::-webkit-scrollbar-thumb,.card-content::-webkit-scrollbar-thumb{background:rgba(48,54,61,0.95);border-radius:6px}.table-container::-webkit-scrollbar-track,.card-content::-webkit-scrollbar-track{background:transparent}.table-container,.card-content{scrollbar-color:rgba(48,54,61,0.95) transparent;scrollbar-width:thin}`);
(function(){
    const sel = '.tags-container, .group-container';
    function attach(el) {
        if (el.dataset.hasScrollListener) return;
        el.dataset.hasScrollListener = 'true';
        const check = () => {
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
            if (atEnd) el.classList.add('is-end');
            else el.classList.remove('is-end');
        };
        el.addEventListener('scroll', check, {passive: true});
        check(); // Initial check
    }
    function scan() { document.querySelectorAll(sel).forEach(attach); }
    scan();
    const tb = document.querySelector('#problems-table tbody');
    if(tb) { new MutationObserver(scan).observe(tb, {childList: true, subtree: true}); }
})();
waitForPageLoad();
})();
