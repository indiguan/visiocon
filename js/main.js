// main.js — 진입점(구성 B)
// ① 모듈 로드(아이콘·스케일러·화면 로직) → ② 파셜 6개 fetch 주입 → ③ data-* 핸들러 재배선 → ④ 해시 라우터
//
// 개발/미리보기: file:// 은 fetch·모듈이 막히므로 반드시 정적 HTTP 서버로 여세요.
//   python3 -m http.server 8000  →  http://localhost:8000
// 배포: GitHub Pages(정적 HTTP)에서 동일하게 동작합니다.

import './icons.js';            // 아이콘 렌더러(자동 초기화 · MutationObserver로 주입 파셜도 자동 렌더)
import './fit.js';              // 무대(960px 고정) 전체 확대/축소 스케일러
import './screens/progress.js'; // window.startProgress / stopProgress 등록
import './screens/wizard.js';   // window.wNav / syncSite 등록
import './screens/reopen.js';   // window.pickV / pickZ / rNav 등록
import './screens/complete.js'; // window.dl4 / dlProj4 등록
import { initWorkspace } from './screens/workspace.js';

const SCREENS = ['launcher', 'wizard', 'reopen', 'progress', 'workspace', 'complete'];
const app = document.getElementById('app');

// ── 해시 라우터 ─────────────────────────────────────────────
window.currentScreen = 'launcher';

function applyRoute(id) {
  if (!document.getElementById('scr-' + id)) id = 'launcher';
  // 진행 화면을 벗어나면 애니메이션 정지
  if (window.currentScreen === 'progress' && id !== 'progress' && window.stopProgress) window.stopProgress();
  window.currentScreen = id;
  SCREENS.forEach(s => {
    const el = document.getElementById('scr-' + s);
    if (el) el.classList.toggle('on', s === id);
  });
  // 데모바 세그먼트 하이라이트 동기화
  document.querySelectorAll('#seg button').forEach(b => b.classList.toggle('on', b.dataset.go === id));
  // 진행 화면 진입 시 애니메이션 시작
  if (id === 'progress' && window.startProgress) window.startProgress();
}

// go(id): 상태는 해시로 관리 → hashchange가 applyRoute를 호출. 공유 가능한 URL(#/wizard 등) 생성.
window.go = function (id) { location.hash = '#/' + id; };
function routeFromHash() { return location.hash.replace(/^#\/?/, '') || 'launcher'; }
window.addEventListener('hashchange', () => applyRoute(routeFromHash()));

// ── 선언적 액션 디스패처 (인라인 onclick 대체) ─────────────
function coerce(v) { return /^-?\d+$/.test(v) ? Number(v) : v; }

function runAct(el) {
  const fn = window[el.dataset.act];
  if (typeof fn !== 'function') return;
  if (el.dataset.pass === 'value') { fn(el.value); return; }   // syncSite(this.value)
  const args = [];
  if ('arg' in el.dataset) args.push(coerce(el.dataset.arg));
  if ('arg2' in el.dataset) args.push(coerce(el.dataset.arg2));
  if (el.hasAttribute('data-el')) args.push(el);               // sSwap(i, this)
  fn.apply(null, args);
}

function wireActions(root) {
  root.querySelectorAll('[data-go]').forEach(el =>
    el.addEventListener('click', () => { location.hash = '#/' + el.dataset.go; }));
  root.querySelectorAll('[data-toggle]').forEach(el =>
    el.addEventListener('click', () => el.classList.toggle(el.dataset.toggle)));
  root.querySelectorAll('[data-act]').forEach(el => {
    const ev = el.dataset.on || 'click';
    el.addEventListener(ev, () => runAct(el));
  });
}

// ── 부팅: 파셜 전량 로드(상태 보존형 · 한 페이지 유지) → 배선 → 초기화 ──
async function boot() {
  const parts = await Promise.all(
    SCREENS.map(n => fetch('partials/' + n + '.html').then(r => r.text()))
  );
  app.innerHTML = parts.join('\n');   // 6개 섹션 주입 → icons.js가 .ti 아이콘 자동 렌더
  wireActions(document);              // 데모바 + 모든 화면의 data-* 재배선
  initWorkspace();                    // 워크스페이스 탭/단축키 초기화(DOM 필요)
  applyRoute(routeFromHash());        // 해시 기반 초기 화면
}

boot();
