/* ============================================================
   Lakshya — Goal & Debt Tracker (100% local, offline-first)
   Data store: localStorage (key: lakshya_v1)
   ============================================================ */
'use strict';

/* ---------------- Icons (inline Lucide-style SVG) ---------------- */
const I = (p, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICONS = {
  home:    I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>'),
  target:  I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>'),
  wallet:  I('<path d="M20 7H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13v4"/><path d="M3 5v13a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/>'),
  history: I('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3.5 2"/>'),
  settings:I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.51 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.23.6.83 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z"/>'),
  plus:    I('<path d="M12 5v14M5 12h14"/>'),
  check:   I('<path d="M20 6 9 17l-5-5"/>'),
  x:       I('<path d="M18 6 6 18M6 6l12 12"/>'),
  flame:   I('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/>'),
  download:I('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>'),
  upload:  I('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>'),
  trash:   I('<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6M14 11v6"/>'),
  sun:     I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'),
  moon:    I('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'),
  monitor: I('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>'),
  calendar:I('<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
  coins:   I('<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>'),
  pencil:  I('<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>'),
  bell:    I('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'),
  zap:     I('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>'),
  info:    I('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
  arrowUp: I('<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>'),
  arrowDn: I('<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>'),
  sparkles:I('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.2"/>'),
  review:  I('<path d="M8 6h13M8 12h13M8 18h13"/><path d="m3 6 1 1 2-2"/><path d="m3 12 1 1 2-2"/><path d="m3 18 1 1 2-2"/>'),
};

/* ---------------- State ---------------- */
const KEY = 'lakshya_v1';
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const defaults = () => ({
  settings: { theme: 'system', reviewTime: '' },
  monthly: { month: monthKey(new Date()), target: 0, achieved: 0 },
  goals: [],            // {id,title,desc,date,done}
  debts: [],            // {id,name,total,paid,due,note,createdAt,status,payments:[{id,amount,date}]}
  days: [],             // saved daily reviews {date,total,done,pct,goals:[{title,done}]}
  activity: [],         // {id,type:'day'|'monthly'|'payment'|'debt',ts,title,sub,amount}
});

let S = load();
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); return { ...defaults(), ...d, settings: { ...defaults().settings, ...(d.settings || {}) } }; } } catch (e) {}
  return defaults();
}
function save() { localStorage.setItem(KEY, JSON.stringify(S)); }

/* ---------------- Helpers ---------------- */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN');
const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

function pad(n) { return String(n).padStart(2, '0'); }
function todayStr() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function monthKey(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; }
function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}
function niceDate(ds) {
  const d = new Date(ds + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
}
function tsDate(ts) { return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); }
function greet() { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }

function todayGoals() { return S.goals.filter(g => g.date === todayStr()); }
function goalStats() {
  const t = todayGoals(), done = t.filter(g => g.done).length;
  return { total: t.length, done, pct: t.length ? Math.round(done / t.length * 100) : 0 };
}
function monthlyCalc() {
  const m = S.monthly;
  const remaining = Math.max(0, m.target - m.achieved);
  const pct = m.target > 0 ? clamp(Math.round(m.achieved / m.target * 100), 0, 100) : 0;
  const [y, mo] = m.month.split('-').map(Number);
  const dim = new Date(y, mo, 0).getDate();
  const now = new Date(), ck = monthKey(now);
  let daysLeft = 0;
  if (m.month === ck) daysLeft = dim - now.getDate() + 1;
  else if (m.month > ck) daysLeft = dim;
  const perDay = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;
  return { remaining, pct, daysLeft, perDay };
}
function debtCalc() {
  const total = S.debts.reduce((a, d) => a + d.total, 0);
  const paid = S.debts.reduce((a, d) => a + d.paid, 0);
  return { total, paid, remaining: Math.max(0, total - paid), pct: total ? Math.round(paid / total * 100) : 0 };
}
function currentStreak() {
  if (!S.days.length) return 0;
  const set = new Map(S.days.map(d => [d.date, d]));
  let streak = 0;
  const d = new Date();
  // allow streak to start from today or yesterday
  if (!set.has(dateStr(d))) d.setDate(d.getDate() - 1);
  while (set.has(dateStr(d)) && set.get(dateStr(d)).done > 0) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}
function dateStr(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

function logActivity(type, title, sub, amount) {
  S.activity.unshift({ id: uid(), type, ts: Date.now(), title, sub, amount: amount ?? null });
  if (S.activity.length > 400) S.activity.length = 400;
}

/* ---------------- Theme ---------------- */
function applyTheme() {
  const t = S.settings.theme;
  const dark = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('meta[name="theme-color"]').setAttribute('content', dark ? '#0a0e1a' : '#4f46e5');
}
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg, kind = '') {
  const el = $('#toast');
  el.textContent = msg; el.className = 'show ' + kind;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.className = '', 2200);
}

/* ---------------- Bottom sheet ---------------- */
function openSheet(title, html, onMount) {
  $('#sheetTitle').textContent = title;
  $('#sheetBody').innerHTML = html;
  $('#sheetBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (onMount) onMount($('#sheetBody'));
}
function closeSheet() {
  $('#sheetBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  $('#fab').classList.remove('open');
}
$('#sheetBackdrop').addEventListener('click', e => { if (e.target.id === 'sheetBackdrop') closeSheet(); });
$('#sheetClose').innerHTML = ICONS.x;
$('#sheetClose').addEventListener('click', closeSheet);

/* ---------------- Router ---------------- */
const NAV = [
  ['home', 'Home', ICONS.home],
  ['goals', 'Goals', ICONS.target],
  ['debts', 'Debts', ICONS.wallet],
  ['history', 'History', ICONS.history],
  ['settings', 'Settings', ICONS.settings],
];
let currentPage = 'home';
function go(page) {
  currentPage = page;
  $$('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  $('#brandSub').textContent = $(`#page-${page}`).dataset.title;
  $('#main').scrollTop = 0; window.scrollTo(0, 0);
}
function buildNav() {
  $('#bottomnav').innerHTML = NAV.map(([p, label, icon]) =>
    `<button class="nav-btn" data-page="${p}">${icon}<span>${label}</span></button>`).join('');
  $$('.nav-btn').forEach(b => b.addEventListener('click', () => go(b.dataset.page)));
}

/* ---------------- Ring ---------------- */
function ring(pct, size = 76, stroke = 8) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const off = c * (1 - clamp(pct, 0, 100) / 100);
  return `<div class="ring" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}">
      <circle class="track" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" fill="none"/>
      <circle class="fill" cx="${size / 2}" cy="${size / 2}" r="${r}" stroke-width="${stroke}" fill="none"
        stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
    </svg><div class="ring-val">${pct}%</div></div>`;
}

/* =================== RENDER: HOME =================== */
function renderHome() {
  const g = goalStats(), m = monthlyCalc(), d = debtCalc(), streak = currentStreak();
  const mc = monthlyCalc();
  $('#page-home').innerHTML = `
    <div class="page-head">
      <div class="page-title">${greet()}</div>
      <div class="page-sub">${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}${streak ? ` &nbsp;·&nbsp; 🔥 ${streak}-day streak` : ''}</div>
    </div>

    <div class="card tappable" id="todayCard">
      <div class="card-row">
        <div>
          <div class="card-label">Today's Progress</div>
          <div class="big-num" style="margin-top:6px">${g.done}<span class="muted" style="font-size:18px;font-weight:600"> / ${g.total}</span></div>
          <div class="small muted" style="margin-top:4px">${g.total ? 'goals completed' : 'No goals yet — tap + to add one'}</div>
        </div>
        ${ring(g.pct)}
      </div>
    </div>

    <div class="card">
      <div class="card-row">
        <div class="card-label">${esc(monthLabel(S.monthly.month))} Goal</div>
        <button class="icon-btn" id="editMonthly" title="Edit goal">${ICONS.pencil}</button>
      </div>
      <div class="big-num" style="margin-top:8px">${fmt(S.monthly.achieved)}<span class="muted" style="font-size:16px;font-weight:600"> / ${fmt(S.monthly.target)}</span></div>
      <div class="pbar"><i style="width:${mc.pct}%"></i></div>
      <div class="stat-grid">
        <div class="stat"><span>Remaining</span><b>${fmt(mc.remaining)}</b></div>
        <div class="stat"><span>Progress</span><b>${mc.pct}%</b></div>
        <div class="stat"><span>Days left</span><b>${mc.daysLeft}</b></div>
      </div>
      ${S.monthly.target > 0 && mc.remaining > 0 && mc.daysLeft > 0
        ? `<div class="hint-pill">${ICONS.zap}<span>Need <b>&nbsp;${fmt(mc.perDay)}/day&nbsp;</b> to reach your monthly goal</span></div>` : ''}
      ${S.monthly.target > 0 && mc.remaining === 0
        ? `<div class="hint-pill" style="background:var(--success-soft);color:var(--success)">${ICONS.check}<span>Monthly goal achieved — great work!</span></div>` : ''}
      <div class="btn-row">
        <button class="btn btn-soft btn-block" id="homeAddProgress">${ICONS.arrowUp} Add Progress</button>
      </div>
    </div>

    <div class="card tappable" id="debtCard">
      <div class="card-row"><div class="card-label">Debt Summary</div><span class="small muted">${d.pct}% repaid</span></div>
      <div class="stat-grid">
        <div class="stat"><span>Total debt</span><b>${fmt(d.total)}</b></div>
        <div class="stat"><span>Paid</span><b style="color:var(--success)">${fmt(d.paid)}</b></div>
        <div class="stat"><span>Remaining</span><b style="color:${d.remaining ? 'var(--danger)' : 'var(--success)'}">${fmt(d.remaining)}</b></div>
      </div>
      <div class="pbar ${d.remaining === 0 && d.total ? 'success' : ''}"><i style="width:${d.pct}%"></i></div>
    </div>`;

  $('#todayCard').addEventListener('click', () => go('goals'));
  $('#debtCard').addEventListener('click', () => go('debts'));
  $('#editMonthly').addEventListener('click', () => openMonthlySheet());
  $('#homeAddProgress').addEventListener('click', () => openProgressSheet());
}

/* =================== RENDER: GOALS =================== */
function renderGoals() {
  const g = goalStats();
  const goals = todayGoals();
  $('#page-goals').innerHTML = `
    <div class="page-head" style="display:flex;align-items:flex-end;justify-content:space-between">
      <div><div class="page-title">Today's Goals</div>
      <div class="page-sub">${niceDate(todayStr())} · ${g.done} / ${g.total} completed · ${g.pct}%</div></div>
      ${ring(g.pct, 56, 6)}
    </div>
    <div class="pbar" style="margin:-4px 0 16px"><i style="width:${g.pct}%"></i></div>
    <div id="goalList">
      ${goals.length ? goals.map(goalItemHTML).join('') : `
        <div class="empty">
          <div class="e-ico">${ICONS.target}</div>
          <b>No goals for today</b>
          <p>Tap the + button below to add your first goal.<br>Small steps every day win the month.</p>
        </div>`}
    </div>
    ${goals.length ? `<button class="btn btn-primary btn-block" id="reviewBtn" style="margin-top:8px">${ICONS.review} Daily Review</button>` : ''}`;

  $$('#goalList .goal-item').forEach(el => {
    el.querySelector('.check').addEventListener('click', e => { e.stopPropagation(); toggleGoal(el.dataset.id); });
    el.querySelector('.del').addEventListener('click', e => { e.stopPropagation(); deleteGoal(el.dataset.id); });
  });
  const rb = $('#reviewBtn');
  if (rb) rb.addEventListener('click', openReviewSheet);
}
function goalItemHTML(g) {
  return `<div class="goal-item ${g.done ? 'done' : ''}" data-id="${g.id}">
    <button class="check" aria-label="Toggle goal">${I(ICONS.check ? '<path d="M20 6 9 17l-5-5"/>' : '')}</button>
    <div class="goal-text">
      <div class="goal-title">${esc(g.title)}</div>
      ${g.desc ? `<div class="goal-desc">${esc(g.desc)}</div>` : ''}
    </div>
    <button class="icon-btn del" aria-label="Delete">${ICONS.trash}</button>
  </div>`;
}
function toggleGoal(id) {
  const g = S.goals.find(x => x.id === id);
  if (!g) return;
  g.done = !g.done; save();
  const el = $(`.goal-item[data-id="${id}"]`);
  if (el) el.classList.toggle('done', g.done);
  renderGoals(); renderHome(); renderStreakChip();
}
function deleteGoal(id) {
  S.goals = S.goals.filter(g => g.id !== id); save();
  renderGoals(); renderHome(); toast('Goal removed');
}

/* =================== RENDER: DEBTS =================== */
function renderDebts() {
  const d = debtCalc();
  $('#page-debts').innerHTML = `
    <div class="page-head" style="display:flex;align-items:flex-end;justify-content:space-between">
      <div><div class="page-title">Debts</div>
      <div class="page-sub">${S.debts.length ? `${S.debts.filter(x => x.status !== 'paid').length} active · ${S.debts.filter(x => x.status === 'paid').length} cleared` : 'Track what you owe'}</div></div>
      <button class="btn btn-primary" id="addDebtBtn" style="padding:10px 15px">${ICONS.plus} Add</button>
    </div>
    ${S.debts.length ? `
    <div class="card">
      <div class="card-row"><div class="card-label">Overview</div><span class="small muted">${d.pct}% repaid</span></div>
      <div class="stat-grid">
        <div class="stat"><span>Total</span><b>${fmt(d.total)}</b></div>
        <div class="stat"><span>Paid</span><b style="color:var(--success)">${fmt(d.paid)}</b></div>
        <div class="stat"><span>Remaining</span><b style="color:${d.remaining ? 'var(--danger)' : 'var(--success)'}">${fmt(d.remaining)}</b></div>
      </div>
      <div class="pbar"><i style="width:${d.pct}%"></i></div>
    </div>` : ''}
    ${S.debts.length ? S.debts.map(debtCardHTML).join('') : `
      <div class="empty">
        <div class="e-ico">${ICONS.wallet}</div>
        <b>No debts tracked</b>
        <p>Add a debt to start tracking repayments<br>and watch the balance shrink.</p>
      </div>`}`;

  $('#addDebtBtn').addEventListener('click', () => openDebtSheet());
  $$('.debt-card').forEach(card => {
    const id = card.dataset.id;
    card.querySelector('.pay').addEventListener('click', () => openPaySheet(id));
    card.querySelector('.hist').addEventListener('click', () => openDebtHistory(id));
    card.querySelector('.del').addEventListener('click', () => {
      if (confirm('Delete this debt and its payment history?')) {
        S.debts = S.debts.filter(x => x.id !== id); save();
        renderDebts(); renderHome(); renderHistory(); toast('Debt deleted');
      }
    });
  });
}
function debtCardHTML(d) {
  const remaining = Math.max(0, d.total - d.paid);
  const pct = d.total ? Math.round(d.paid / d.total * 100) : 0;
  const paid = d.status === 'paid' || remaining === 0;
  const overdue = d.due && !paid && d.due < todayStr();
  return `<div class="card debt-card" data-id="${d.id}">
    <div class="debt-top">
      <div class="debt-name">${esc(d.name)}
        ${paid ? '<span class="badge paid">Paid</span>' : overdue ? '<span class="badge due">Overdue</span>' : ''}
      </div>
      <button class="icon-btn del" aria-label="Delete debt">${ICONS.trash}</button>
    </div>
    <div class="debt-nums"><span class="debt-remain">${fmt(remaining)}</span><span class="muted small">remaining of ${fmt(d.total)}</span></div>
    <div class="pbar ${paid ? 'success' : ''}"><i style="width:${pct}%"></i></div>
    <div class="debt-meta">
      <span>Paid ${fmt(d.paid)} · ${pct}%</span>
      <span>${d.due ? 'Due ' + niceDate(d.due) : 'No due date'}</span>
    </div>
    ${d.note ? `<div class="debt-note">${esc(d.note)}</div>` : ''}
    <div class="btn-row">
      ${paid
        ? `<button class="btn btn-success-soft btn-block" disabled>${ICONS.check} Fully repaid</button>`
        : `<button class="btn btn-primary pay">${ICONS.coins} Pay</button>`}
      <button class="btn btn-soft hist">${ICONS.history} History (${d.payments.length})</button>
    </div>
  </div>`;
}

/* =================== RENDER: HISTORY =================== */
function renderHistory() {
  const streak = currentStreak();
  const acts = S.activity;
  const typeMap = {
    day:     { icon: ICONS.check,  cls: 'emerald' },
    monthly: { icon: ICONS.target, cls: 'indigo' },
    payment: { icon: ICONS.coins,  cls: 'amber' },
    debt:    { icon: ICONS.wallet, cls: 'red' },
  };
  $('#page-history').innerHTML = `
    <div class="page-head"><div class="page-title">History</div>
    <div class="page-sub">Your progress, chronologically</div></div>
    <div class="card" style="display:flex;align-items:center;gap:16px">
      <div class="e-ico" style="width:58px;height:58px;border-radius:18px;background:var(--warn-soft);color:var(--warn);display:grid;place-items:center;flex:none">${ICONS.flame}</div>
      <div><div class="card-label">Current Streak</div>
      <div class="big-num" style="font-size:26px;margin-top:2px">🔥 ${streak} day${streak === 1 ? '' : 's'}</div>
      <div class="small muted" style="margin-top:2px">${streak ? 'Keep it going — review today\'s goals tonight' : 'Save a daily review to start a streak'}</div></div>
    </div>
    ${acts.length ? acts.map(a => {
      const t = typeMap[a.type] || typeMap.day;
      const clickable = a.type === 'day';
      return `<div class="hist-item ${clickable ? 'tappable' : ''}" ${clickable ? `data-date="${a.sub}"` : ''}>
        <div class="hist-ico ${t.cls}">${t.icon}</div>
        <div class="hist-t"><b>${esc(a.title)}</b><span>${esc(a.sub)} · ${tsDate(a.ts)}</span></div>
        ${a.amount != null ? `<div class="hist-amt" style="color:${a.type === 'payment' || a.type === 'monthly' ? 'var(--success)' : 'inherit'}">${a.type === 'payment' || a.type === 'monthly' ? '+' : ''}${fmt(a.amount)}</div>` : ''}
      </div>`;
    }).join('') : `
      <div class="empty">
        <div class="e-ico">${ICONS.history}</div>
        <b>Nothing here yet</b>
        <p>Completed reviews, monthly progress and<br>debt payments will appear here.</p>
      </div>`}`;

  $$('.hist-item.tappable').forEach(el =>
    el.addEventListener('click', () => openDayDetail(el.dataset.date)));
}

/* =================== RENDER: SETTINGS =================== */
function renderSettings() {
  $('#page-settings').innerHTML = `
    <div class="page-head"><div class="page-title">Settings</div>
    <div class="page-sub">Everything stays on this device</div></div>

    <div class="card">
      <div class="card-label" style="margin-bottom:12px">Theme</div>
      <div class="theme-row">
        ${[['light', 'Light', ICONS.sun], ['dark', 'Dark', ICONS.moon], ['system', 'System', ICONS.monitor]]
          .map(([v, l, ic]) => `<button class="theme-opt ${S.settings.theme === v ? 'active' : ''}" data-theme="${v}">${ic}${l}</button>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-label" style="margin-bottom:12px">Daily Review Time</div>
      <div class="field" style="margin-bottom:0">
        <label for="reviewTime">Optional reminder time (shown in-app)</label>
        <input type="time" class="input" id="reviewTime" value="${esc(S.settings.reviewTime)}">
      </div>
    </div>

    <div class="card" style="padding:6px 18px">
      <button class="set-item" id="exportBtn"><span class="ico">${ICONS.download}</span><span><b>Export backup</b><span>Download all data as JSON</span></span></button>
      <button class="set-item" id="importBtn"><span class="ico">${ICONS.upload}</span><span><b>Import backup</b><span>Restore from a JSON file</span></span></button>
      <button class="set-item danger" id="clearBtn"><span class="ico">${ICONS.trash}</span><span><b>Clear all data</b><span>Erase goals, debts and history</span></span></button>
    </div>

    <div class="empty" style="padding:22px">
      <p>Lakshya v1.0 · 100% offline<br>All data is stored locally in your browser.<br>No account, no cloud, no tracking.</p>
    </div>`;

  $$('.theme-opt').forEach(b => b.addEventListener('click', () => {
    S.settings.theme = b.dataset.theme; save(); applyTheme(); renderSettings();
    toast('Theme: ' + b.dataset.theme);
  }));
  $('#reviewTime').addEventListener('change', e => {
    S.settings.reviewTime = e.target.value; save();
    toast(e.target.value ? `Review reminder set for ${e.target.value}` : 'Review reminder cleared');
  });
  $('#exportBtn').addEventListener('click', exportData);
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#clearBtn').addEventListener('click', () => {
    if (confirm('Delete ALL data? This cannot be undone. Consider exporting a backup first.')) {
      S = defaults(); save(); applyTheme(); renderAll(); toast('All data cleared');
    }
  });
}

/* ---------------- Backup ---------------- */
function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `lakshya-backup-${todayStr()}.json`;
  a.click(); URL.revokeObjectURL(a.href);
  toast('Backup exported', 'success');
}
$('#importFile').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (typeof d !== 'object' || !('goals' in d) || !('debts' in d)) throw new Error('bad file');
      S = { ...defaults(), ...d, settings: { ...defaults().settings, ...(d.settings || {}) } };
      save(); applyTheme(); renderAll(); toast('Backup imported', 'success');
    } catch { toast('Invalid backup file', 'error'); }
  };
  r.readAsText(f); e.target.value = '';
});

/* =================== SHEETS =================== */
/* --- Add daily goal --- */
function openGoalSheet() {
  openSheet('New Daily Goal', `
    <div class="field"><label>Title</label><input class="input" id="gTitle" placeholder="e.g. Earn ₹5,000" maxlength="80" autocomplete="off"></div>
    <div class="field"><label>Description (optional)</label><textarea class="input" id="gDesc" placeholder="e.g. Close 2 client calls before lunch"></textarea></div>
    <button class="btn btn-primary btn-block" id="gSave">${ICONS.check} Add Goal</button>`, body => {
    const t = body.querySelector('#gTitle'); t.focus();
    body.querySelector('#gSave').addEventListener('click', () => {
      const title = t.value.trim();
      if (!title) return toast('Please enter a goal title', 'error');
      S.goals.push({ id: uid(), title, desc: body.querySelector('#gDesc').value.trim(), date: todayStr(), done: false });
      save(); closeSheet(); renderGoals(); renderHome();
      toast('Goal added', 'success');
    });
  });
}

/* --- Set / edit monthly goal --- */
function openMonthlySheet() {
  openSheet('Monthly Goal', `
    <div class="field"><label>Month</label><input type="month" class="input" id="mMonth" value="${S.monthly.month}"></div>
    <div class="field"><label>Target amount</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="0" class="input" id="mTarget" placeholder="150000" value="${S.monthly.target || ''}"></div></div>
    <div class="field"><label>Achieved so far</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="0" class="input" id="mAch" placeholder="0" value="${S.monthly.achieved || ''}"></div></div>
    <button class="btn btn-primary btn-block" id="mSave">${ICONS.check} Save Goal</button>`, body => {
    body.querySelector('#mSave').addEventListener('click', () => {
      S.monthly.month = body.querySelector('#mMonth').value || monthKey(new Date());
      S.monthly.target = Math.max(0, Number(body.querySelector('#mTarget').value) || 0);
      S.monthly.achieved = Math.max(0, Number(body.querySelector('#mAch').value) || 0);
      save(); closeSheet(); renderHome();
      toast('Monthly goal saved', 'success');
    });
  });
}

/* --- Add monthly progress --- */
function openProgressSheet() {
  if (!S.monthly.target) { openMonthlySheet(); return; }
  const mc = monthlyCalc();
  openSheet('Add Progress', `
    <div class="card" style="margin-bottom:16px;padding:14px 16px;background:var(--card2);box-shadow:none">
      <div class="small muted">Current: <b style="color:var(--text)">${fmt(S.monthly.achieved)}</b> of ${fmt(S.monthly.target)} · Remaining ${fmt(mc.remaining)}</div>
    </div>
    <div class="field"><label>Amount to add</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="1" class="input" id="pAmt" placeholder="2000"></div></div>
    <button class="btn btn-primary btn-block" id="pSave">${ICONS.arrowUp} Add ${''}Progress</button>`, body => {
    const amt = body.querySelector('#pAmt'); amt.focus();
    body.querySelector('#pSave').addEventListener('click', () => {
      const a = Number(amt.value);
      if (!a || a <= 0) return toast('Enter a valid amount', 'error');
      const before = S.monthly.achieved;
      S.monthly.achieved += a;
      logActivity('monthly', `Monthly progress: ${fmt(before)} → ${fmt(S.monthly.achieved)}`, monthLabel(S.monthly.month), a);
      save(); closeSheet(); renderHome(); renderHistory();
      const mc2 = monthlyCalc();
      toast(mc2.remaining === 0 ? '🎉 Monthly goal achieved!' : `Added ${fmt(a)} — ${mc2.pct}% done`, 'success');
    });
  });
}

/* --- Add debt --- */
function openDebtSheet() {
  openSheet('Add Debt', `
    <div class="field"><label>Person / Name</label><input class="input" id="dName" placeholder="e.g. Ravi" maxlength="40" autocomplete="off"></div>
    <div class="field"><label>Total amount</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="1" class="input" id="dTotal" placeholder="50000"></div></div>
    <div class="field"><label>Already paid (optional)</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="0" class="input" id="dPaid" placeholder="0"></div></div>
    <div class="field"><label>Due date (optional)</label><input type="date" class="input" id="dDue"></div>
    <div class="field"><label>Note (optional)</label><input class="input" id="dNote" placeholder="e.g. Borrowed for bike repair" maxlength="80"></div>
    <button class="btn btn-primary btn-block" id="dSave">${ICONS.check} Save Debt</button>`, body => {
    body.querySelector('#dName').focus();
    body.querySelector('#dSave').addEventListener('click', () => {
      const name = body.querySelector('#dName').value.trim();
      const total = Number(body.querySelector('#dTotal').value);
      if (!name) return toast('Enter a name', 'error');
      if (!total || total <= 0) return toast('Enter a valid amount', 'error');
      const paid = clamp(Number(body.querySelector('#dPaid').value) || 0, 0, total);
      const debt = {
        id: uid(), name, total, paid,
        due: body.querySelector('#dDue').value || '',
        note: body.querySelector('#dNote').value.trim(),
        createdAt: Date.now(), status: paid >= total ? 'paid' : 'open', payments: [],
      };
      if (paid > 0) debt.payments.push({ id: uid(), amount: paid, date: todayStr() });
      S.debts.unshift(debt);
      logActivity('debt', `Debt added: ${name}`, `${fmt(total)} total`, null);
      save(); closeSheet(); renderDebts(); renderHome(); renderHistory();
      toast('Debt added', 'success');
    });
  });
}

/* --- Pay debt --- */
function openPaySheet(preselectId) {
  const open = S.debts.filter(d => d.status !== 'paid' && d.total - d.paid > 0);
  if (!open.length) return toast('No active debts to pay', 'error');
  const sel = preselectId && open.some(d => d.id === preselectId) ? preselectId : open[0].id;
  openSheet('Pay Debt', `
    <div class="field"><label>Debt</label>
      <select class="input" id="payDebt">${open.map(d => `<option value="${d.id}" ${d.id === sel ? 'selected' : ''}>${esc(d.name)} — ${fmt(d.total - d.paid)} left</option>`).join('')}</select>
    </div>
    <div class="card" id="payInfo" style="margin-bottom:16px;padding:14px 16px;background:var(--card2);box-shadow:none"></div>
    <div class="field"><label>Payment amount</label><div class="input-prefix"><span>₹</span><input type="number" inputmode="numeric" min="1" class="input" id="payAmt" placeholder="5000"></div></div>
    <button class="btn btn-primary btn-block" id="paySave">${ICONS.check} Save Payment</button>`, body => {
    const selEl = body.querySelector('#payDebt'), amtEl = body.querySelector('#payAmt');
    const info = () => {
      const d = S.debts.find(x => x.id === selEl.value);
      body.querySelector('#payInfo').innerHTML =
        `<div class="small muted">Remaining: <b style="color:var(--danger)">${fmt(d.total - d.paid)}</b> · Paid so far ${fmt(d.paid)} of ${fmt(d.total)}</div>`;
      amtEl.max = d.total - d.paid;
    };
    selEl.addEventListener('change', info); info(); amtEl.focus();
    body.querySelector('#paySave').addEventListener('click', () => {
      const d = S.debts.find(x => x.id === selEl.value);
      const remaining = d.total - d.paid;
      let a = Number(amtEl.value);
      if (!a || a <= 0) return toast('Enter a valid amount', 'error');
      if (a > remaining) { a = remaining; toast(`Adjusted to remaining ${fmt(a)}`); }
      const before = remaining;
      d.paid += a;
      d.payments.push({ id: uid(), amount: a, date: todayStr() });
      const after = d.total - d.paid;
      if (after <= 0) d.status = 'paid';
      logActivity('payment', `Payment to ${d.name}: ${fmt(before)} → ${fmt(after)}`, after <= 0 ? 'Debt cleared 🎉' : `${fmt(after)} remaining`, a);
      save(); closeSheet(); renderDebts(); renderHome(); renderHistory();
      toast(after <= 0 ? `🎉 ${d.name} fully repaid!` : `Paid ${fmt(a)} — ${fmt(after)} left`, 'success');
    });
  });
}

/* --- Debt payment history --- */
function openDebtHistory(id) {
  const d = S.debts.find(x => x.id === id);
  if (!d) return;
  openSheet(`${d.name} — Payments`, d.payments.length ? `
    ${d.payments.slice().reverse().map(p => `
      <div class="hist-item">
        <div class="hist-ico emerald">${ICONS.arrowDn}</div>
        <div class="hist-t"><b>${fmt(p.amount)}</b><span>${niceDate(p.date)}</span></div>
      </div>`).join('')}
    <div class="hint-pill" style="margin-top:16px">${ICONS.info}<span>Paid ${fmt(d.paid)} of ${fmt(d.total)} · Remaining ${fmt(Math.max(0, d.total - d.paid))}</span></div>`
    : `<div class="empty"><div class="e-ico">${ICONS.coins}</div><b>No payments yet</b><p>Tap Pay on the debt card to record a payment.</p></div>`);
}

/* --- Daily review --- */
function openReviewSheet() {
  const goals = todayGoals();
  const g = goalStats();
  openSheet("Today's Review", `
    <div class="review-summary">
      ${ring(g.pct, 64, 7)}
      <div><div class="mid-num">${g.done} / ${g.total} Completed</div>
      <div class="small muted">${niceDate(todayStr())}</div></div>
    </div>
    <div class="card" style="padding:6px 16px;margin-bottom:16px">
      ${goals.map(x => `<div class="review-row"><span class="dot ${x.done ? 'on' : 'off'}"></span><span style="${x.done ? '' : 'color:var(--muted)'}">${esc(x.title)}</span><span style="margin-left:auto;color:${x.done ? 'var(--success)' : 'var(--danger)'};font-size:13px;font-weight:700">${x.done ? 'Done' : 'Missed'}</span></div>`).join('')}
    </div>
    <button class="btn btn-primary btn-block" id="rvSave">${ICONS.check} Save Day</button>`, body => {
    body.querySelector('#rvSave').addEventListener('click', () => {
      const entry = {
        date: todayStr(), total: g.total, done: g.done, pct: g.pct,
        goals: goals.map(x => ({ title: x.title, done: x.done })),
      };
      S.days = S.days.filter(d => d.date !== todayStr());
      S.days.push(entry);
      logActivity('day', `Day saved: ${g.done}/${g.total} goals (${g.pct}%)`, todayStr(), null);
      save(); closeSheet(); renderAll();
      toast(g.pct === 100 ? '🔥 Perfect day saved!' : 'Day saved to history', 'success');
    });
  });
}

/* --- Day detail from history --- */
function openDayDetail(date) {
  const d = S.days.find(x => x.date === date);
  if (!d) return;
  openSheet(niceDate(date), `
    <div class="review-summary">
      ${ring(d.pct, 64, 7)}
      <div><div class="mid-num">${d.done} / ${d.total} goals</div><div class="small muted">${d.pct}% completed</div></div>
    </div>
    <div class="card" style="padding:6px 16px">
      ${d.goals.map(x => `<div class="review-row"><span class="dot ${x.done ? 'on' : 'off'}"></span><span>${esc(x.title)}</span></div>`).join('')}
    </div>`);
}

/* ---------------- FAB / Quick add ---------------- */
function buildFab() {
  $('#fab').innerHTML = ICONS.plus;
  $('#fab').addEventListener('click', () => {
    $('#fab').classList.add('open');
    openSheet('Quick Add', `
      <button class="qa-item" data-a="goal"><span class="qa-ico indigo">${ICONS.target}</span><span class="qa-t"><b>Daily Goal</b><span>Add a goal for today</span></span></button>
      <button class="qa-item" data-a="progress"><span class="qa-ico emerald">${ICONS.arrowUp}</span><span class="qa-t"><b>Monthly Progress</b><span>Add to this month's achievement</span></span></button>
      <button class="qa-item" data-a="debt"><span class="qa-ico amber">${ICONS.wallet}</span><span class="qa-t"><b>Debt</b><span>Record money you owe</span></span></button>
      <button class="qa-item" data-a="pay"><span class="qa-ico red">${ICONS.coins}</span><span class="qa-t"><b>Debt Payment</b><span>Log a repayment</span></span></button>`, body => {
      body.querySelectorAll('.qa-item').forEach(b => b.addEventListener('click', () => {
        const a = b.dataset.a; closeSheet();
        setTimeout(() => ({
          goal: openGoalSheet, progress: openProgressSheet, debt: openDebtSheet, pay: () => openPaySheet(),
        })[a](), 180);
      }));
    });
  });
}

/* ---------------- Streak chip ---------------- */
function renderStreakChip() {
  const s = currentStreak();
  $('#streakChip').innerHTML = s > 0 ? `${ICONS.flame}<span>${s}</span>` : '';
}

/* ---------------- Review reminder (in-app) ---------------- */
function checkReviewReminder() {
  const t = S.settings.reviewTime; if (!t) return;
  const now = new Date(); const hm = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  if (hm >= t && !S.days.some(d => d.date === todayStr()) && todayGoals().length) {
    toast(`⏰ Time for your daily review (${t})`);
  }
}

/* ---------------- Boot ---------------- */
function renderAll() {
  renderHome(); renderGoals(); renderDebts(); renderHistory(); renderSettings(); renderStreakChip();
}
$('#brandLogo').innerHTML = ICONS.target;
buildNav(); buildFab(); applyTheme(); renderAll(); go('home');
setTimeout(checkReviewReminder, 1500);
