[index.txt](https://github.com/user-attachments/files/26481471/index.txt)
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SIM Manager</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;800&display=swap');

:root {
  --bg: #0a0a0f;
  --surface: #12121a;
  --surface2: #1a1a26;
  --border: #2a2a3e;
  --accent: #6c63ff;
  --accent2: #ff6584;
  --accent3: #43e97b;
  --accent4: #ffd166;
  --text: #e8e8f0;
  --muted: #6b6b8a;
  --danger: #ff4466;
  --card-shadow: 0 4px 24px rgba(108,99,255,0.12);
}

*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;font-family:'Syne',sans-serif;background:var(--bg);color:var(--text);}

/* ---- LOCK SCREEN ---- */
#lockScreen {
  position:fixed;inset:0;z-index:9999;
  background:linear-gradient(135deg,#0a0a0f 0%,#12101f 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
}
.lock-logo{font-size:3.5rem;animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
.lock-title{font-size:2rem;font-weight:800;letter-spacing:-1px;}
.lock-sub{font-family:'Space Mono',monospace;font-size:0.72rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;}
.lock-dots{display:flex;gap:14px;margin:8px 0;}
.lock-dot{
  width:18px;height:18px;border-radius:50%;
  border:2px solid var(--border);
  transition:background 0.15s,border-color 0.15s;
}
.lock-dot.filled{background:var(--accent);border-color:var(--accent);box-shadow:0 0 10px var(--accent);}
.lock-dot.error{background:var(--danger);border-color:var(--danger);animation:shake 0.4s;}
@keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}}
.pin-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:220px;}
.pin-btn{
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  color:var(--text);font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;
  padding:16px;cursor:pointer;transition:all 0.12s;
}
.pin-btn:hover{background:var(--surface2);border-color:var(--accent);transform:scale(1.04);}
.pin-btn:active{transform:scale(0.97);}
.lock-hint{font-family:'Space Mono',monospace;font-size:0.65rem;color:var(--muted);margin-top:4px;}
.lock-msg{font-family:'Space Mono',monospace;font-size:0.7rem;color:var(--accent2);min-height:18px;text-align:center;}
.lock-setup{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;}
.lock-setup-step{font-family:'Space Mono',monospace;font-size:0.68rem;color:var(--accent);letter-spacing:1px;}

/* ---- HEADER ---- */
.header{
  background:linear-gradient(135deg,#12121a 0%,#1a1030 100%);
  border-bottom:1px solid var(--border);
  padding:14px 24px;
  display:flex;align-items:center;gap:14px;
  position:sticky;top:0;z-index:100;
}
.header-icon{font-size:1.8rem;}
.header-title{font-size:1.4rem;font-weight:800;letter-spacing:-0.5px;}
.header-sub{font-family:'Space Mono',monospace;font-size:0.65rem;color:var(--muted);}
.header-actions{margin-left:auto;display:flex;gap:8px;align-items:center;}

/* ---- BUTTONS ---- */
.btn{padding:8px 16px;border-radius:8px;border:none;font-family:'Syne',sans-serif;font-weight:600;font-size:0.83rem;cursor:pointer;transition:all 0.15s;display:inline-flex;align-items:center;gap:5px;}
.btn-primary{background:var(--accent);color:#fff;}
.btn-primary:hover{background:#7c74ff;transform:translateY(-1px);}
.btn-ghost{background:var(--surface2);color:var(--text);border:1px solid var(--border);}
.btn-ghost:hover{background:var(--border);}
.btn-danger{background:var(--danger);color:#fff;}
.btn-danger:hover{background:#ff2255;}
.btn-warn{background:var(--accent4);color:#111;}
.btn-warn:hover{background:#ffe08a;}
.btn-sm{padding:5px 11px;font-size:0.76rem;}
.btn-icon{padding:7px 10px;}

/* ---- LAYOUT ---- */
.layout{display:flex;min-height:calc(100vh - 61px);}

/* ---- SIDEBAR ---- */
.sidebar{
  width:200px;min-width:200px;
  background:var(--surface);border-right:1px solid var(--border);
  padding:16px 0;display:flex;flex-direction:column;gap:2px;
  overflow-y:auto;
}
.sidebar-label{font-family:'Space Mono',monospace;font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px;padding:10px 14px 6px;}
.sidebar-item{
  display:flex;align-items:center;gap:8px;padding:9px 14px;cursor:pointer;
  font-size:0.87rem;font-weight:600;color:var(--muted);
  transition:all 0.13s;border-left:3px solid transparent;
}
.sidebar-item:hover{color:var(--text);background:var(--surface2);}
.sidebar-item.active{color:var(--accent);border-left-color:var(--accent);background:rgba(108,99,255,0.08);}
.sidebar-badge{margin-left:auto;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:20px;font-size:0.65rem;padding:1px 7px;font-family:'Space Mono',monospace;}
.sidebar-item.active .sidebar-badge{background:var(--accent);border-color:var(--accent);color:#fff;}
.sidebar-warn{color:var(--accent4) !important;}

/* ---- MAIN ---- */
.main{flex:1;padding:22px;overflow-y:auto;}

/* ---- STATS ---- */
.stats-row{display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 18px;flex:1;min-width:110px;}
.stat-val{font-size:1.9rem;font-weight:800;line-height:1;}
.stat-label{font-size:0.68rem;color:var(--muted);font-family:'Space Mono',monospace;margin-top:4px;}

/* ---- SEARCH + TOOLBAR ---- */
.toolbar{display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;}
.search-wrap{position:relative;flex:1;max-width:320px;}
.search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--muted);}
.search-input{background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:8px 12px 8px 34px;color:var(--text);font-family:'Syne',sans-serif;font-size:0.86rem;outline:none;width:100%;transition:border 0.15s;}
.search-input:focus{border-color:var(--accent);}
.toolbar-right{display:flex;gap:8px;margin-left:auto;}

/* ---- OWNER SECTION ---- */
.owner-section{margin-bottom:26px;}
.owner-header{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.owner-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:800;flex-shrink:0;}
.owner-name{font-size:1.05rem;font-weight:800;}
.owner-count{font-family:'Space Mono',monospace;font-size:0.68rem;color:var(--muted);}

/* ---- SIM CARDS ---- */
.sim-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px;}
.sim-card{
  background:var(--surface);border:1px solid var(--border);border-radius:14px;
  padding:16px;position:relative;transition:box-shadow 0.18s,transform 0.18s;
}
.sim-card:hover{box-shadow:var(--card-shadow);transform:translateY(-2px);}
.sim-card.expiring{border-color:var(--accent4);box-shadow:0 0 0 1px var(--accent4)22;}
.sim-card-top{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.sim-op{font-weight:800;font-size:0.97rem;}
.sim-owner-badge{font-family:'Space Mono',monospace;font-size:0.62rem;margin-top:1px;}
.sim-type-pill{margin-left:auto;font-family:'Space Mono',monospace;font-size:0.6rem;padding:3px 8px;border-radius:20px;}
.pill-abbonamento{background:rgba(108,99,255,0.15);color:var(--accent);}
.pill-prepagata{background:rgba(255,101,132,0.15);color:var(--accent2);}
.pill-ricaricabile{background:rgba(67,233,123,0.15);color:var(--accent3);}
.sim-status-dot{position:absolute;top:14px;right:14px;width:9px;height:9px;border-radius:50%;background:var(--accent3);box-shadow:0 0 7px var(--accent3);}
.sim-status-dot.off{background:var(--danger);box-shadow:0 0 7px var(--danger);}

.sim-fields{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sim-field{display:flex;flex-direction:column;gap:2px;}
.sim-field-full{grid-column:1/-1;}
.field-label{font-family:'Space Mono',monospace;font-size:0.58rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
.field-val{font-family:'Space Mono',monospace;font-size:0.82rem;font-weight:700;}
.field-val.masked{color:var(--muted);letter-spacing:3px;}
.reveal-btn{background:none;border:none;cursor:pointer;color:var(--accent);font-size:0.7rem;font-family:'Space Mono',monospace;padding:0;text-decoration:underline;text-underline-offset:2px;}
.copy-btn{background:none;border:none;cursor:pointer;color:var(--muted);font-size:0.7rem;font-family:'Space Mono',monospace;padding:0 0 0 6px;transition:color 0.12s;}
.copy-btn:hover{color:var(--accent3);}

.sim-note{font-size:0.72rem;color:var(--muted);font-family:'Space Mono',monospace;margin-top:10px;border-top:1px solid var(--border);padding-top:8px;white-space:pre-wrap;line-height:1.5;}
.sim-expiry{
  margin-top:8px;padding:5px 9px;border-radius:7px;
  font-family:'Space Mono',monospace;font-size:0.68rem;
  display:flex;align-items:center;gap:6px;
}
.sim-expiry.ok{background:rgba(67,233,123,0.08);color:var(--accent3);}
.sim-expiry.warn{background:rgba(255,209,102,0.12);color:var(--accent4);}
.sim-expiry.expired{background:rgba(255,68,102,0.12);color:var(--danger);}

.sim-actions{display:flex;gap:6px;margin-top:12px;border-top:1px solid var(--border);padding-top:10px;flex-wrap:wrap;}

/* ---- MODAL ---- */
.modal-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:300;align-items:center;justify-content:center;backdrop-filter:blur(5px);}
.modal-backdrop.open{display:flex;}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:26px;width:500px;max-width:96vw;max-height:92vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,0.55);}
.modal-title{font-size:1.15rem;font-weight:800;margin-bottom:18px;display:flex;align-items:center;gap:8px;}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.form-full{grid-column:1/-1;}
.form-group{display:flex;flex-direction:column;gap:4px;}
.form-label{font-family:'Space Mono',monospace;font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
.form-input,.form-select,.form-textarea{background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:8px 11px;color:var(--text);font-family:'Space Mono',monospace;font-size:0.82rem;outline:none;transition:border 0.13s;width:100%;}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--accent);}
.form-textarea{resize:vertical;min-height:58px;}
.form-select{appearance:none;cursor:pointer;}
.modal-actions{display:flex;gap:8px;margin-top:18px;justify-content:flex-end;}

/* ---- TOAST ---- */
.toast-container{position:fixed;bottom:24px;right:24px;z-index:500;display:flex;flex-direction:column;gap:8px;}
.toast{
  background:var(--surface2);border:1px solid var(--border);border-radius:10px;
  padding:11px 18px;font-family:'Space Mono',monospace;font-size:0.75rem;
  display:flex;align-items:center;gap:8px;
  animation:toastIn 0.25s ease;min-width:200px;
}
@keyframes toastIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
.toast.success{border-color:var(--accent3);color:var(--accent3);}
.toast.error{border-color:var(--danger);color:var(--danger);}
.toast.info{border-color:var(--accent);color:var(--accent);}
.toast.warn{border-color:var(--accent4);color:var(--accent4);}

/* ---- CONFIRM MODAL ---- */
.confirm-modal{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;width:340px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,0.55);}
.confirm-title{font-size:1rem;font-weight:800;margin-bottom:8px;}
.confirm-msg{font-size:0.83rem;color:var(--muted);margin-bottom:20px;line-height:1.5;}
.confirm-actions{display:flex;gap:8px;justify-content:flex-end;}

/* ---- EMPTY ---- */
.empty{color:var(--muted);font-family:'Space Mono',monospace;font-size:0.83rem;padding:20px 0;}

/* ---- SETTINGS PANEL ---- */
.settings-panel{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;max-width:480px;}
.settings-title{font-size:1.1rem;font-weight:800;margin-bottom:16px;}
.settings-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);}
.settings-row:last-child{border-bottom:none;}
.settings-label{font-size:0.88rem;font-weight:600;}
.settings-desc{font-family:'Space Mono',monospace;font-size:0.65rem;color:var(--muted);margin-top:2px;}

/* ---- REMINDER BANNER ---- */
.reminder-banner{
  background:rgba(255,209,102,0.08);border:1px solid rgba(255,209,102,0.25);
  border-radius:10px;padding:10px 16px;margin-bottom:16px;
  display:flex;align-items:center;gap:10px;flex-wrap:wrap;
}
.reminder-text{font-family:'Space Mono',monospace;font-size:0.73rem;color:var(--accent4);}

/* SCROLLBAR */
::-webkit-scrollbar{width:6px;height:6px;}
::-webkit-scrollbar-track{background:var(--surface);}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}
::-webkit-scrollbar-thumb:hover{background:var(--muted);}

/* RESPONSIVE */
@media(max-width:640px){
  .sidebar{width:0;min-width:0;overflow:hidden;padding:0;}
  .stats-row{flex-direction:column;}
  .sim-grid{grid-template-columns:1fr;}
}
</style>
</head>
<body>

<!-- LOCK SCREEN -->
<div id="lockScreen">
  <div class="lock-logo">📱</div>
  <div style="text-align:center">
    <div class="lock-title">SIM Manager</div>
    <div class="lock-sub">Pannello di controllo SIM</div>
  </div>
  <div id="lockContent"><!-- injected by JS --></div>
</div>

<!-- MAIN APP (hidden until unlocked) -->
<div id="app" style="display:none;">

<div class="header">
  <div class="header-icon">📱</div>
  <div>
    <div class="header-title">SIM Manager</div>
    <div class="header-sub" id="headerSub">—</div>
  </div>
  <div class="header-actions">
    <button class="btn btn-ghost btn-sm" onclick="openView('settings')">⚙️ Impostazioni</button>
    <button class="btn btn-ghost btn-sm" onclick="triggerImport()">⬆ Importa</button>
    <button class="btn btn-ghost btn-sm" onclick="exportData()">⬇ Esporta</button>
    <button class="btn btn-primary" onclick="openModal()">+ Nuova SIM</button>
    <button class="btn btn-ghost btn-icon btn-sm" onclick="lockApp()" title="Blocca">🔒</button>
  </div>
</div>

<div class="layout">
  <div class="sidebar" id="sidebar">
    <div class="sidebar-label">Vista</div>
    <div class="sidebar-item active" onclick="setView('all',this)" data-view="all">🗂 Tutte <span class="sidebar-badge" id="badge-all">0</span></div>
    <div class="sidebar-item" onclick="setView('mine',this)" data-view="mine">👤 Tu <span class="sidebar-badge" id="badge-mine">0</span></div>
    <div class="sidebar-item" onclick="setView('jacopo',this)" data-view="jacopo">👦 Jacopo <span class="sidebar-badge" id="badge-jacopo">0</span></div>
    <div class="sidebar-item" onclick="setView('padre',this)" data-view="padre">👴 Padre <span class="sidebar-badge" id="badge-padre">0</span></div>
    <div class="sidebar-label">Filtro</div>
    <div class="sidebar-item" onclick="setView('active',this)" data-view="active">🟢 Attive</div>
    <div class="sidebar-item" onclick="setView('inactive',this)" data-view="inactive">🔴 Non attive</div>
    <div class="sidebar-item" onclick="setView('prepagata',this)" data-view="prepagata">💳 Prepagate</div>
    <div class="sidebar-item" onclick="setView('abbonamento',this)" data-view="abbonamento">📄 Abbonamenti</div>
    <div class="sidebar-item sidebar-warn" onclick="setView('expiring',this)" data-view="expiring">⚠️ In scadenza <span class="sidebar-badge" id="badge-expiring">0</span></div>
    <div class="sidebar-label">App</div>
    <div class="sidebar-item" onclick="openView('settings')" data-view="settings">⚙️ Impostazioni</div>
  </div>

  <div class="main" id="mainContent"><!-- rendered --></div>
</div>

</div><!-- /app -->

<!-- SIM MODAL -->
<div class="modal-backdrop" id="simModal">
  <div class="modal">
    <div class="modal-title">📱 <span id="modalTitle">Nuova SIM</span></div>
    <div class="form-grid">
      <div class="form-group form-full">
        <div class="form-label">Intestatario *</div>
        <select class="form-select" id="f-owner">
          <option value="mine">👤 Tu</option>
          <option value="jacopo">👦 Jacopo</option>
          <option value="padre">👴 Padre</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-label">Operatore *</div>
        <input class="form-input" id="f-operator" placeholder="TIM, Vodafone, Iliad..." list="operators-list"/>
        <datalist id="operators-list">
          <option value="TIM"><option value="Vodafone"><option value="WindTre"><option value="Iliad"><option value="CoopVoce"><option value="ho. Mobile"><option value="Very Mobile"><option value="PosteMobile">
        </datalist>
      </div>
      <div class="form-group">
        <div class="form-label">Numero *</div>
        <input class="form-input" id="f-number" placeholder="+39 3xx xxx xxxx"/>
      </div>
      <div class="form-group">
        <div class="form-label">PIN</div>
        <input class="form-input" id="f-pin" placeholder="xxxx" maxlength="8"/>
      </div>
      <div class="form-group">
        <div class="form-label">PUK</div>
        <input class="form-input" id="f-puk" placeholder="xxxxxxxx" maxlength="12"/>
      </div>
      <div class="form-group">
        <div class="form-label">PIN2 (opz.)</div>
        <input class="form-input" id="f-pin2" placeholder="xxxx" maxlength="8"/>
      </div>
      <div class="form-group">
        <div class="form-label">PUK2 (opz.)</div>
        <input class="form-input" id="f-puk2" placeholder="xxxxxxxx" maxlength="12"/>
      </div>
      <div class="form-group">
        <div class="form-label">Tipo contratto</div>
        <select class="form-select" id="f-type">
          <option value="abbonamento">📄 Abbonamento</option>
          <option value="prepagata">💳 Prepagata</option>
          <option value="ricaricabile">🔄 Ricaricabile</option>
        </select>
      </div>
      <div class="form-group">
        <div class="form-label">Stato</div>
        <select class="form-select" id="f-status">
          <option value="active">🟢 Attiva</option>
          <option value="inactive">🔴 Non attiva</option>
        </select>
      </div>
      <div class="form-group form-full">
        <div class="form-label">ICCID / Seriale SIM (opz.)</div>
        <input class="form-input" id="f-iccid" placeholder="89390..."/>
      </div>
      <div class="form-group">
        <div class="form-label">Costo mensile (opz.)</div>
        <input class="form-input" id="f-cost" placeholder="es. 9.99 €"/>
      </div>
      <div class="form-group">
        <div class="form-label">Scadenza / Rinnovo (opz.)</div>
        <input class="form-input" id="f-expiry" type="date"/>
      </div>
      <div class="form-group form-full">
        <div class="form-label">Note</div>
        <textarea class="form-textarea" id="f-note" placeholder="Piano, dettagli, appunti..."></textarea>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal('simModal')">Annulla</button>
      <button class="btn btn-primary" onclick="saveSim()">💾 Salva</button>
    </div>
  </div>
</div>

<!-- CONFIRM MODAL -->
<div class="modal-backdrop" id="confirmModal">
  <div class="confirm-modal">
    <div class="confirm-title" id="confirmTitle">Conferma</div>
    <div class="confirm-msg" id="confirmMsg"></div>
    <div class="confirm-actions">
      <button class="btn btn-ghost" onclick="closeModal('confirmModal')">Annulla</button>
      <button class="btn btn-danger" id="confirmOk">Elimina</button>
    </div>
  </div>
</div>

<!-- TOAST CONTAINER -->
<div class="toast-container" id="toasts"></div>

<!-- HIDDEN FILE INPUT -->
<input type="file" id="importInput" accept=".json" style="display:none" onchange="importData(event)"/>

<script>
// ===================== STATE =====================
let sims = [];
let currentView = 'all';
let editingId = null;
let revealed = {}; // { simId_field: bool }
let appState = 'locked'; // 'locked' | 'setup' | 'unlocked'

const OWNERS = {
  mine:   {label:'Tu',      emoji:'👤', bg:'rgba(108,99,255,0.18)', color:'#6c63ff'},
  jacopo: {label:'Jacopo',  emoji:'👦', bg:'rgba(255,101,132,0.18)', color:'#ff6584'},
  padre:  {label:'Padre',   emoji:'👴', bg:'rgba(67,233,123,0.18)',  color:'#43e97b'},
};

// ===================== STORAGE =====================
function loadData() {
  try { sims = JSON.parse(localStorage.getItem('simgr_sims') || '[]'); } catch{ sims=[]; }
  // seed demo data if empty
  if (!sims.length) seedDemo();
}
function saveData() {
  localStorage.setItem('simgr_sims', JSON.stringify(sims));
}
function getSetting(k,def='') { return localStorage.getItem('simgr_'+k) ?? def; }
function setSetting(k,v) { localStorage.setItem('simgr_'+k,v); }

function seedDemo() {
  const today = new Date();
  const future30 = new Date(today); future30.setDate(today.getDate()+28);
  const future5  = new Date(today); future5.setDate(today.getDate()+5);
  const past     = new Date(today); past.setDate(today.getDate()-3);
  const fmt = d => d.toISOString().slice(0,10);
  sims = [
    {id:1,owner:'mine',  operator:'TIM',      number:'+39 347 001 0001',pin:'1234',puk:'12345678',pin2:'',puk2:'',type:'abbonamento',status:'active', iccid:'89390100001',cost:'9.99 €',expiry:fmt(future30),note:'SIM principale, piano Voce+Dati 50GB'},
    {id:2,owner:'mine',  operator:'Vodafone', number:'+39 347 001 0002',pin:'5678',puk:'87654321',pin2:'',puk2:'',type:'prepagata',  status:'active', iccid:'',          cost:'',      expiry:fmt(future5), note:'SIM backup — rinnovo urgente!'},
    {id:3,owner:'jacopo',operator:'WindTre',  number:'+39 347 001 0003',pin:'9999',puk:'11223344',pin2:'',puk2:'',type:'abbonamento',status:'active', iccid:'',          cost:'6.99 €',expiry:fmt(future30),note:''},
    {id:4,owner:'jacopo',operator:'Iliad',    number:'+39 347 001 0004',pin:'0000',puk:'44332211',pin2:'',puk2:'',type:'ricaricabile',status:'inactive',iccid:'',         cost:'9.99 €',expiry:fmt(past),    note:'SIM non usata — scaduta'},
    {id:5,owner:'padre', operator:'TIM',      number:'+39 347 001 0005',pin:'2222',puk:'55667788',pin2:'',puk2:'',type:'abbonamento',status:'active', iccid:'',          cost:'12.99 €',expiry:'',          note:''},
    {id:6,owner:'padre', operator:'CoopVoce', number:'+39 347 001 0006',pin:'3333',puk:'99887766',pin2:'',puk2:'',type:'prepagata',  status:'active', iccid:'',          cost:'',       expiry:'',          note:'Solo chiamate'},
  ];
  saveData();
}

// ===================== LOCK / PIN =====================
let pinBuffer = '';
let pinSetupStep = 0; // 0=set first, 1=confirm
let pinSetupFirst = '';

function getStoredPin() { return getSetting('pin',''); }

function initLock() {
  const pin = getStoredPin();
  if (!pin) {
    renderPinSetup();
  } else {
    renderPinEntry();
  }
}

function renderPinEntry() {
  pinBuffer = '';
  const lc = document.getElementById('lockContent');
  lc.innerHTML = `
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
      <div class="lock-sub">Inserisci il PIN per accedere</div>
      <div class="lock-dots" id="lockDots">
        <div class="lock-dot" id="d0"></div>
        <div class="lock-dot" id="d1"></div>
        <div class="lock-dot" id="d2"></div>
        <div class="lock-dot" id="d3"></div>
      </div>
      <div class="lock-msg" id="lockMsg"></div>
      <div class="pin-grid" id="pinGrid"></div>
      <div class="lock-hint">PIN a 4 cifre</div>
    </div>`;
  buildPinGrid('pinEntry');
}

function renderPinSetup() {
  pinBuffer = '';
  pinSetupStep = 0;
  pinSetupFirst = '';
  const lc = document.getElementById('lockContent');
  lc.innerHTML = `
    <div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
      <div class="lock-setup-step" id="setupStep">PASSO 1/2 — SCEGLI IL TUO PIN</div>
      <div class="lock-sub" id="setupSub">Scegli un PIN a 4 cifre per proteggere i tuoi dati</div>
      <div class="lock-dots" id="lockDots">
        <div class="lock-dot" id="d0"></div>
        <div class="lock-dot" id="d1"></div>
        <div class="lock-dot" id="d2"></div>
        <div class="lock-dot" id="d3"></div>
      </div>
      <div class="lock-msg" id="lockMsg"></div>
      <div class="pin-grid" id="pinGrid"></div>
    </div>`;
  buildPinGrid('pinSetup');
}

function buildPinGrid(mode) {
  const grid = document.getElementById('pinGrid');
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
  grid.innerHTML = keys.map(k => {
    if (k === '') return `<div></div>`;
    return `<button class="pin-btn" onclick="pinPress('${k}','${mode}')">${k}</button>`;
  }).join('');
}

function updateDots(len, cls='') {
  for(let i=0;i<4;i++){
    const d = document.getElementById('d'+i);
    if (!d) continue;
    d.className = 'lock-dot' + (i < len ? ' filled' : '') + (cls ? ' '+cls : '');
  }
}

function pinPress(key, mode) {
  if (key === '⌫') {
    pinBuffer = pinBuffer.slice(0,-1);
    updateDots(pinBuffer.length);
    return;
  }
  if (pinBuffer.length >= 4) return;
  pinBuffer += key;
  updateDots(pinBuffer.length);
  if (pinBuffer.length === 4) {
    setTimeout(() => {
      if (mode === 'pinEntry') handlePinEntry();
      else handlePinSetup();
    }, 120);
  }
}

function handlePinEntry() {
  if (pinBuffer === getStoredPin()) {
    unlockApp();
  } else {
    updateDots(4, 'error');
    document.getElementById('lockMsg').textContent = 'PIN errato. Riprova.';
    setTimeout(()=>{ pinBuffer=''; updateDots(0); document.getElementById('lockMsg').textContent=''; }, 800);
  }
}

function handlePinSetup() {
  if (pinSetupStep === 0) {
    pinSetupFirst = pinBuffer;
    pinBuffer = '';
    pinSetupStep = 1;
    updateDots(0);
    document.getElementById('setupStep').textContent = 'PASSO 2/2 — CONFERMA IL PIN';
    document.getElementById('setupSub').textContent = 'Reinserisci il PIN per confermare';
    document.getElementById('lockMsg').textContent = '';
  } else {
    if (pinBuffer === pinSetupFirst) {
      setSetting('pin', pinBuffer);
      toast('PIN impostato con successo!','success');
      unlockApp();
    } else {
      updateDots(4,'error');
      document.getElementById('lockMsg').textContent = 'I PIN non corrispondono. Riprova.';
      setTimeout(()=>{
        pinBuffer=''; pinSetupStep=0; pinSetupFirst='';
        updateDots(0);
        document.getElementById('setupStep').textContent = 'PASSO 1/2 — SCEGLI IL TUO PIN';
        document.getElementById('setupSub').textContent = 'Scegli un PIN a 4 cifre per proteggere i tuoi dati';
        document.getElementById('lockMsg').textContent = '';
      }, 900);
    }
  }
}

function unlockApp() {
  appState = 'unlocked';
  document.getElementById('lockScreen').style.display = 'none';
  document.getElementById('app').style.display = '';
  loadData();
  renderMain();
}

function lockApp() {
  appState = 'locked';
  revealed = {};
  document.getElementById('app').style.display = 'none';
  document.getElementById('lockScreen').style.display = 'flex';
  initLock();
}

// ===================== VIEW ROUTING =====================
function setView(v, el) {
  currentView = v;
  if (el) {
    document.querySelectorAll('.sidebar-item[data-view]').forEach(i=>i.classList.remove('active'));
    el.classList.add('active');
  }
  renderMain();
}

function openView(v) {
  if (v === 'settings') renderSettings();
}

// ===================== RENDER MAIN =====================
function renderMain() {
  if (currentView === 'settings') { renderSettings(); return; }
  const el = document.getElementById('mainContent');
  updateStats();
  const filtered = getFiltered();
  const expiring = getExpiring();

  let html = renderStatsRow();

  // Reminder banner
  if (expiring.length) {
    html += `<div class="reminder-banner">
      <span>⚠️</span>
      <span class="reminder-text">
        ${expiring.length} SIM in scadenza nei prossimi 30 giorni:
        ${expiring.map(s=>`<strong>${s.operator}</strong> (${OWNERS[s.owner]?.label})`).join(', ')}
      </span>
    </div>`;
  }

  html += `<div class="toolbar">
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input class="search-input" id="searchInput" type="text" placeholder="Cerca operatore, numero, intestatario..." oninput="renderMain()" value="${escHtml(document.getElementById('searchInput')?.value||'')}">
    </div>
    <div class="toolbar-right">
      <button class="btn btn-ghost btn-sm" onclick="triggerImport()">⬆ Importa</button>
      <button class="btn btn-ghost btn-sm" onclick="exportData()">⬇ Esporta</button>
      <button class="btn btn-primary" onclick="openModal()">+ SIM</button>
    </div>
  </div>`;

  if (!filtered.length) {
    el.innerHTML = html + '<div class="empty">Nessuna SIM trovata.</div>';
    return;
  }

  if (currentView === 'all') {
    const groups = {mine:[],jacopo:[],padre:[]};
    filtered.forEach(s=>{ if(groups[s.owner]) groups[s.owner].push(s); });
    for (const [owner, arr] of Object.entries(groups)) {
      if (!arr.length) continue;
      const o = OWNERS[owner];
      html += `<div class="owner-section">
        <div class="owner-header">
          <div class="owner-avatar" style="background:${o.bg};color:${o.color}">${o.emoji}</div>
          <div>
            <div class="owner-name" style="color:${o.color}">${o.label}</div>
            <div class="owner-count">${arr.length} SIM</div>
          </div>
        </div>
        <div class="sim-grid">${arr.map(simCardHTML).join('')}</div>
      </div>`;
    }
  } else {
    html += `<div class="sim-grid">${filtered.map(simCardHTML).join('')}</div>`;
  }

  el.innerHTML = html;
  // restore search value
  const si = document.getElementById('searchInput');
  if (si) { si.focus(); si.setSelectionRange(si.value.length,si.value.length); }
}

// ===================== SIM CARD HTML =====================
function simCardHTML(s) {
  const o = OWNERS[s.owner] || OWNERS.mine;
  const pillCls = {abbonamento:'pill-abbonamento',prepagata:'pill-prepagata',ricaricabile:'pill-ricaricabile'}[s.type]||'';
  const typeLabel = {abbonamento:'Abbonamento',prepagata:'Prepagata',ricaricabile:'Ricaricabile'}[s.type]||s.type;
  const expiryHTML = renderExpiry(s);
  const isExpiring = isNearExpiry(s);

  const pinShown = revealed[s.id+'_pin'];
  const pukShown = revealed[s.id+'_puk'];

  return `<div class="sim-card${isExpiring?' expiring':''}">
    <div class="sim-status-dot ${s.status==='inactive'?'off':''}"></div>
    <div class="sim-card-top">
      <div>
        <div class="sim-op">📶 ${escHtml(s.operator)}</div>
        <div class="sim-owner-badge" style="color:${o.color}">${o.emoji} ${o.label}</div>
      </div>
      <span class="sim-type-pill ${pillCls}">${typeLabel}</span>
    </div>
    <div class="sim-fields">
      <div class="sim-field sim-field-full">
        <div class="field-label">Numero</div>
        <div class="field-val">${escHtml(s.number)||'—'} <button class="copy-btn" onclick="copyText('${escHtml(s.number)}')">📋</button></div>
      </div>
      <div class="sim-field">
        <div class="field-label">PIN</div>
        <div class="field-val ${pinShown?'':'masked'}">${pinShown?escHtml(s.pin):'••••'} ${pinShown?`<button class="copy-btn" onclick="copyText('${escHtml(s.pin)}')">📋</button>`:''}</div>
        <button class="reveal-btn" onclick="toggleReveal(${s.id},'pin')">${pinShown?'Nascondi':'Mostra'}</button>
      </div>
      <div class="sim-field">
        <div class="field-label">PUK</div>
        <div class="field-val ${pukShown?'':'masked'}">${pukShown?escHtml(s.puk):'••••••••'} ${pukShown?`<button class="copy-btn" onclick="copyText('${escHtml(s.puk)}')">📋</button>`:''}</div>
        <button class="reveal-btn" onclick="toggleReveal(${s.id},'puk')">${pukShown?'Nascondi':'Mostra'}</button>
      </div>
      ${s.pin2?`<div class="sim-field"><div class="field-label">PIN2</div><div class="field-val masked">••••</div></div>`:''}
      ${s.puk2?`<div class="sim-field"><div class="field-label">PUK2</div><div class="field-val masked">••••••••</div></div>`:''}
      ${s.iccid?`<div class="sim-field sim-field-full"><div class="field-label">ICCID</div><div class="field-val" style="font-size:0.72rem">${escHtml(s.iccid)} <button class="copy-btn" onclick="copyText('${escHtml(s.iccid)}')">📋</button></div></div>`:''}
      ${s.cost?`<div class="sim-field"><div class="field-label">Costo/mese</div><div class="field-val">${escHtml(s.cost)}</div></div>`:''}
    </div>
    ${expiryHTML}
    ${s.note?`<div class="sim-note">${escHtml(s.note)}</div>`:''}
    <div class="sim-actions">
      <button class="btn btn-ghost btn-sm" onclick="editSim(${s.id})">✏️ Modifica</button>
      <button class="btn btn-ghost btn-sm" onclick="toggleStatus(${s.id})">${s.status==='active'?'🔴 Disattiva':'🟢 Attiva'}</button>
      <button class="btn btn-danger btn-sm" style="margin-left:auto" onclick="confirmDelete(${s.id})">🗑</button>
    </div>
  </div>`;
}

function renderExpiry(s) {
  if (!s.expiry) return '';
  const today = new Date(); today.setHours(0,0,0,0);
  const exp = new Date(s.expiry);
  const diff = Math.round((exp-today)/(1000*60*60*24));
  if (diff < 0) return `<div class="sim-expiry expired">⛔ Scaduta ${Math.abs(diff)} giorni fa</div>`;
  if (diff <= 7) return `<div class="sim-expiry warn">⚠️ Scade tra ${diff} giorni — ${s.expiry}</div>`;
  if (diff <= 30) return `<div class="sim-expiry warn">🕐 Rinnovo tra ${diff} giorni — ${s.expiry}</div>`;
  return `<div class="sim-expiry ok">✅ Rinnovo: ${s.expiry}</div>`;
}

function isNearExpiry(s) {
  if (!s.expiry) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const exp = new Date(s.expiry);
  const diff = Math.round((exp-today)/(1000*60*60*24));
  return diff <= 30;
}

function getExpiring() {
  return sims.filter(s=>s.expiry && isNearExpiry(s));
}

// ===================== STATS =====================
function renderStatsRow() {
  const total = sims.length;
  const active = sims.filter(s=>s.status==='active').length;
  const inactive = sims.filter(s=>s.status==='inactive').length;
  const ops = new Set(sims.map(s=>s.operator.toLowerCase())).size;
  return `<div class="stats-row">
    <div class="stat-card"><div class="stat-val">${total}</div><div class="stat-label">SIM totali</div></div>
    <div class="stat-card"><div class="stat-val" style="color:var(--accent3)">${active}</div><div class="stat-label">Attive</div></div>
    <div class="stat-card"><div class="stat-val" style="color:var(--accent2)">${inactive}</div><div class="stat-label">Non attive</div></div>
    <div class="stat-card"><div class="stat-val" style="color:var(--accent)">${ops}</div><div class="stat-label">Operatori</div></div>
  </div>`;
}

function updateStats() {
  const badges = {all:sims.length, mine:0, jacopo:0, padre:0, expiring:getExpiring().length};
  sims.forEach(s=>{ if(badges[s.owner]!==undefined) badges[s.owner]++; });
  Object.entries(badges).forEach(([k,v])=>{ const el=document.getElementById('badge-'+k); if(el) el.textContent=v; });
  document.getElementById('headerSub').textContent = `${sims.length} SIM · ${new Set(sims.map(s=>s.owner)).size} intestatari`;
}

// ===================== FILTER =====================
function getFiltered() {
  const q = (document.getElementById('searchInput')?.value||'').toLowerCase();
  return sims.filter(s=>{
    let matchView = true;
    if (currentView==='mine')       matchView = s.owner==='mine';
    else if (currentView==='jacopo') matchView = s.owner==='jacopo';
    else if (currentView==='padre')  matchView = s.owner==='padre';
    else if (currentView==='active') matchView = s.status==='active';
    else if (currentView==='inactive') matchView = s.status==='inactive';
    else if (currentView==='prepagata') matchView = s.type==='prepagata';
    else if (currentView==='abbonamento') matchView = s.type==='abbonamento';
    else if (currentView==='expiring') matchView = isNearExpiry(s);
    const matchQ = !q || [s.operator,s.number,s.note,s.iccid,OWNERS[s.owner]?.label,''].join(' ').toLowerCase().includes(q);
    return matchView && matchQ;
  });
}

// ===================== TOGGLE REVEAL =====================
function toggleReveal(id, field) {
  const k = id+'_'+field;
  revealed[k] = !revealed[k];
  renderMain();
}

// ===================== CRUD =====================
function openModal(sim) {
  editingId = sim?.id ?? null;
  document.getElementById('modalTitle').textContent = sim ? 'Modifica SIM' : 'Nuova SIM';
  document.getElementById('f-owner').value   = sim?.owner    || 'mine';
  document.getElementById('f-operator').value= sim?.operator || '';
  document.getElementById('f-number').value  = sim?.number   || '';
  document.getElementById('f-pin').value     = sim?.pin      || '';
  document.getElementById('f-puk').value     = sim?.puk      || '';
  document.getElementById('f-pin2').value    = sim?.pin2     || '';
  document.getElementById('f-puk2').value    = sim?.puk2     || '';
  document.getElementById('f-type').value    = sim?.type     || 'abbonamento';
  document.getElementById('f-status').value  = sim?.status   || 'active';
  document.getElementById('f-iccid').value   = sim?.iccid    || '';
  document.getElementById('f-cost').value    = sim?.cost     || '';
  document.getElementById('f-expiry').value  = sim?.expiry   || '';
  document.getElementById('f-note').value    = sim?.note     || '';
  document.getElementById('simModal').classList.add('open');
}

function editSim(id) { openModal(sims.find(s=>s.id===id)); }

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function saveSim() {
  const op = document.getElementById('f-operator').value.trim();
  const num = document.getElementById('f-number').value.trim();
  if (!op) { toast('Inserisci l\'operatore','error'); return; }
  if (!num) { toast('Inserisci il numero','error'); return; }
  const data = {
    owner:    document.getElementById('f-owner').value,
    operator: op, number: num,
    pin:      document.getElementById('f-pin').value.trim(),
    puk:      document.getElementById('f-puk').value.trim(),
    pin2:     document.getElementById('f-pin2').value.trim(),
    puk2:     document.getElementById('f-puk2').value.trim(),
    type:     document.getElementById('f-type').value,
    status:   document.getElementById('f-status').value,
    iccid:    document.getElementById('f-iccid').value.trim(),
    cost:     document.getElementById('f-cost').value.trim(),
    expiry:   document.getElementById('f-expiry').value,
    note:     document.getElementById('f-note').value.trim(),
  };
  if (editingId) {
    const i = sims.findIndex(s=>s.id===editingId);
    sims[i] = {...sims[i], ...data};
    toast('SIM aggiornata!','success');
  } else {
    const id = sims.length ? Math.max(...sims.map(s=>s.id))+1 : 1;
    sims.push({id,...data});
    toast('SIM aggiunta!','success');
  }
  saveData();
  closeModal('simModal');
  renderMain();
}

function toggleStatus(id) {
  const s = sims.find(x=>x.id===id);
  if (!s) return;
  s.status = s.status==='active' ? 'inactive' : 'active';
  saveData(); renderMain();
  toast(s.status==='active'?'SIM attivata':'SIM disattivata', 'info');
}

function confirmDelete(id) {
  const s = sims.find(x=>x.id===id);
  document.getElementById('confirmTitle').textContent = 'Elimina SIM';
  document.getElementById('confirmMsg').textContent = `Vuoi eliminare la SIM ${s?.operator} (${s?.number})? L'operazione è irreversibile.`;
  document.getElementById('confirmOk').onclick = () => { deleteSim(id); closeModal('confirmModal'); };
  document.getElementById('confirmModal').classList.add('open');
}

function deleteSim(id) {
  sims = sims.filter(s=>s.id!==id);
  saveData(); renderMain();
  toast('SIM eliminata','warn');
}

// ===================== EXPORT / IMPORT =====================
function exportData() {
  const json = JSON.stringify(sims, null, 2);
  const blob = new Blob([json], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `sim_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  toast('Backup esportato!','success');
}

function triggerImport() {
  document.getElementById('importInput').click();
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data)) throw new Error('Formato non valido');
      // Merge: skip duplicates by number
      let added = 0;
      data.forEach(ns => {
        if (!sims.find(s=>s.number===ns.number && s.operator===ns.operator)) {
          const id = sims.length ? Math.max(...sims.map(s=>s.id))+1 : 1;
          sims.push({...ns, id});
          added++;
        }
      });
      saveData(); renderMain();
      toast(`Importate ${added} SIM nuove!`, 'success');
    } catch(err) {
      toast('Errore nel file JSON','error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

// ===================== SETTINGS =====================
function renderSettings() {
  const el = document.getElementById('mainContent');
  const hasPin = !!getStoredPin();
  el.innerHTML = `
    <div style="max-width:480px">
      <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:18px;">⚙️ Impostazioni</h2>

      <div class="settings-panel">
        <div class="settings-title">🔒 Sicurezza</div>
        <div class="settings-row">
          <div>
            <div class="settings-label">PIN di accesso</div>
            <div class="settings-desc">${hasPin ? 'PIN attivo — app protetta' : 'Nessun PIN impostato'}</div>
          </div>
          <div style="display:flex;gap:8px">
            ${hasPin ? `<button class="btn btn-ghost btn-sm" onclick="changePinFlow()">Cambia PIN</button>
            <button class="btn btn-danger btn-sm" onclick="removePinConfirm()">Rimuovi</button>` :
            `<button class="btn btn-primary btn-sm" onclick="changePinFlow()">Imposta PIN</button>`}
          </div>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Blocca app</div>
            <div class="settings-desc">Torna alla schermata di blocco</div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="lockApp()">🔒 Blocca ora</button>
        </div>
      </div>

      <div class="settings-panel" style="margin-top:16px">
        <div class="settings-title">💾 Dati</div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Esporta backup</div>
            <div class="settings-desc">Salva tutte le SIM in un file JSON</div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="exportData()">⬇ Esporta</button>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Importa backup</div>
            <div class="settings-desc">Carica SIM da un file JSON precedente</div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="triggerImport()">⬆ Importa</button>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Elimina tutti i dati</div>
            <div class="settings-desc">Cancella tutte le SIM salvate</div>
          </div>
          <button class="btn btn-danger btn-sm" onclick="confirmClearAll()">🗑 Cancella tutto</button>
        </div>
      </div>

      <div class="settings-panel" style="margin-top:16px">
        <div class="settings-title">ℹ️ App</div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Versione</div>
            <div class="settings-desc">SIM Manager v2.0 — by Claude</div>
          </div>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">SIM salvate</div>
            <div class="settings-desc">${sims.length} SIM in totale</div>
          </div>
        </div>
      </div>
    </div>`;
}

function changePinFlow() {
  // Show pin setup over the settings page in a modal-like overlay
  const old = document.getElementById('mainContent').innerHTML;
  document.getElementById('lockScreen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  // Remove old pin so setup runs fresh
  const prevPin = getStoredPin();
  setSetting('pin','');
  pinSetupStep = 0; pinSetupFirst = '';
  renderPinSetup();
  // Override final success to go back to app
  const origUnlock = unlockApp;
  // We patch saveSim to restore
}

function removePinConfirm() {
  document.getElementById('confirmTitle').textContent = 'Rimuovi PIN';
  document.getElementById('confirmMsg').textContent = 'Sei sicuro di voler rimuovere il PIN? Chiunque potrà accedere ai dati.';
  document.getElementById('confirmOk').onclick = () => {
    setSetting('pin','');
    closeModal('confirmModal');
    renderSettings();
    toast('PIN rimosso','warn');
  };
  document.getElementById('confirmModal').classList.add('open');
}

function confirmClearAll() {
  document.getElementById('confirmTitle').textContent = 'Elimina tutti i dati';
  document.getElementById('confirmMsg').textContent = 'Stai per eliminare TUTTE le SIM salvate. Questa operazione è irreversibile. Hai esportato un backup?';
  document.getElementById('confirmOk').onclick = () => {
    sims = [];
    saveData();
    closeModal('confirmModal');
    setView('all', document.querySelector('[data-view="all"]'));
    toast('Tutti i dati eliminati','warn');
  };
  document.getElementById('confirmModal').classList.add('open');
}

// ===================== UTILS =====================
function copyText(text) {
  navigator.clipboard.writeText(text).then(()=>toast('Copiato!','success')).catch(()=>toast('Copia non riuscita','error'));
}

function escHtml(s='') {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function toast(msg, type='info') {
  const icons = {success:'✅',error:'❌',info:'ℹ️',warn:'⚠️'};
  const t = document.createElement('div');
  t.className = 'toast '+type;
  t.innerHTML = `<span>${icons[type]||''}</span><span>${msg}</span>`;
  document.getElementById('toasts').appendChild(t);
  setTimeout(()=>t.remove(), 3200);
}

// Close modals on backdrop click
['simModal','confirmModal'].forEach(id=>{
  document.getElementById(id).addEventListener('click',function(e){
    if(e.target===this) closeModal(id);
  });
});

// ===================== BOOT =====================
initLock();
</script>
</body>
</html>
