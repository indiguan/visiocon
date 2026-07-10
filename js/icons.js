// icons.js — VisioCon 자체 완결형 아이콘 팩 (ES Module)
// ▶ 아이콘 추가: 아래 ICONS 객체에 '이름':'<path.../>' 한 줄만 추가하면 됩니다 (확장 대응).
const COMMON = 'viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"';

export const ICONS = {
    'alert-triangle':'<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.24 4.5l-8.2 14a2 2 0 0 0 1.76 3h16.4a2 2 0 0 0 1.76 -3l-8.2 -14a2 2 0 0 0 -3.52 0z"/>',
    'arrow-back-up':'<path d="M9 14l-4 -4l4 -4"/><path d="M5 10h11a4 4 0 1 1 0 8h-1"/>',
    'arrow-forward-up':'<path d="M15 14l4 -4l-4 -4"/><path d="M19 10h-11a4 4 0 1 0 0 8h1"/>',
    'arrow-left':'<path d="M5 12h14"/><path d="M5 12l6 6"/><path d="M5 12l6 -6"/>',
    'arrow-right':'<path d="M5 12h14"/><path d="M13 18l6 -6"/><path d="M13 6l6 6"/>',
    'check':'<path d="M5 12l5 5l10 -10"/>',
    'circle-check':'<circle cx="12" cy="12" r="9"/><path d="M9 12l2 2l4 -4"/>',
    'clipboard-plus':'<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/><path d="M10 14h4"/><path d="M12 12v4"/>',
    'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    'cloud-upload':'<path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/><path d="M9 15l3 -3l3 3"/><path d="M12 12v9"/>',
    'cpu':'<path d="M6 5h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1v-12a1 1 0 0 1 1 -1z"/><path d="M9 9h6v6h-6z"/><path d="M3 10l2 0"/><path d="M3 14l2 0"/><path d="M10 3l0 2"/><path d="M14 3l0 2"/><path d="M21 10l-2 0"/><path d="M21 14l-2 0"/><path d="M10 21l0 -2"/><path d="M14 21l0 -2"/>',
    'crop':'<path d="M8 5v10a1 1 0 0 0 1 1h10"/><path d="M5 8h10a1 1 0 0 1 1 1v10"/>',
    'device-desktop':'<path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1z"/><path d="M7 20h10"/><path d="M9 16v4"/><path d="M15 16v4"/>',
    'device-floppy':'<path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"/><circle cx="12" cy="14" r="2"/><path d="M14 4v4h-6v-4"/>',
    'download':'<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><path d="M7 11l5 5l5 -5"/><path d="M12 4l0 12"/>',
    'edit':'<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"/><path d="M16 5l3 3"/>',
    'edit-circle':'<circle cx="12" cy="12" r="9"/><path d="M9 15h3l6 -6a1.5 1.5 0 0 0 -3 -3l-6 6v3"/><path d="M14.5 7.5l3 3"/>',
    'file-code-2':'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M10 13l-1 2l1 2"/><path d="M14 13l1 2l-1 2"/>',
    'file-export':'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4"/><path d="M14 19h7"/><path d="M18 16l3 3l-3 3"/>',
    'file-type-pdf':'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"/><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6"/><path d="M17 18h2"/><path d="M20 15h-3v6"/><path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z"/>',
    'file-upload':'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><path d="M12 11v6"/><path d="M9.5 13.5l2.5 -2.5l2.5 2.5"/>',
    'file-zip':'<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h5"/><path d="M11 5l-1 0"/><path d="M13 7l-1 0"/><path d="M11 9l-1 0"/><path d="M13 11l-1 0"/><path d="M11 13l-1 0"/><path d="M11 15l-1 0"/><path d="M9.5 17h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z"/>',
    'filter':'<path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.414 -4.414a2 2 0 0 1 -.586 -1.414v-2.172z"/>',
    'folder-open':'<path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .945 1.153l-1.658 6a1 1 0 0 1 -.962 .696h-13.335a1 1 0 0 1 -.999 -1z"/><path d="M17 11v-4a2 2 0 0 0 -2 -2h-6l-2 -2h-3a2 2 0 0 0 -2 2v11"/>',
    'info-circle':'<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/>',
    'layout':'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16"/><path d="M10 10v10"/>',
    'list-check':'<path d="M3.5 5.5l1.5 1.5l2.5 -2.5"/><path d="M3.5 11.5l1.5 1.5l2.5 -2.5"/><path d="M3.5 17.5l1.5 1.5l2.5 -2.5"/><path d="M11 6h9"/><path d="M11 12h9"/><path d="M11 18h9"/>',
    'map-pin':'<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0z"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/>',
    'map-pin-plus':'<path d="M12 20c-3.5 -4 -6 -6.5 -6 -9.5a6 6 0 0 1 12 0c0 .7 -.15 1.4 -.4 2"/><circle cx="12" cy="10.5" r="2"/><path d="M17.5 15.5v5"/><path d="M15 18h5"/>',
    'minus':'<path d="M5 12l14 0"/>',
    'photo':'<path d="M15 8h.01"/><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M4 15l4 -4c.9 -.9 2.1 -.9 3 0l5 5"/><path d="M14 14l1 -1c.9 -.9 2.1 -.9 3 0l2 2"/>',
    'photo-search':'<path d="M15 8h.01"/><path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6"/><path d="M4 15l4 -4c.9 -.9 2.1 -.9 3 0l3 3"/><circle cx="18" cy="18" r="3"/><path d="M20.2 20.2l1.8 1.8"/>',
    'player-play':'<path d="M7 4v16l13 -8z"/>',
    'plus':'<path d="M12 5v14"/><path d="M5 12h14"/>',
    'point-filled':'<circle cx="12" cy="12" r="4" style="fill:currentColor;stroke:none"/>',
    'refresh':'<path d="M20 11a8 8 0 0 0 -15.5 -2m-.5 -4v4h4"/><path d="M4 13a8 8 0 0 0 15.5 2m.5 4v-4h-4"/>',
    'scan':'<path d="M4 7v-1a2 2 0 0 1 2 -2h2"/><path d="M4 17v1a2 2 0 0 0 2 2h2"/><path d="M16 4h2a2 2 0 0 1 2 2v1"/><path d="M16 20h2a2 2 0 0 0 2 -2v-1"/><path d="M5 12l14 0"/>',
    'shield-check':'<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"/><path d="M9 12l2 2l4 -4"/>',
    'sparkles':'<path d="M12 3l1.6 4.8l4.8 1.6l-4.8 1.6l-1.6 4.8l-1.6 -4.8l-4.8 -1.6l4.8 -1.6z"/>',
    'trash':'<path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>',
    'vector':'<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M7.4 7.4l9.2 9.2"/>',
    'video':'<path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"/><path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"/>',
    'x':'<path d="M18 6l-12 12"/><path d="M6 6l12 12"/>',
    'zoom-in':'<circle cx="10" cy="10" r="7"/><path d="M7 10h6"/><path d="M10 7v6"/><path d="M21 21l-6 -6"/>',
    'zoom-out':'<circle cx="10" cy="10" r="7"/><path d="M7 10h6"/><path d="M21 21l-6 -6"/>'
};

function draw(el){
  if (el.__ti) return;
  let name = null;
  el.classList.forEach(c => { if (c.slice(0,3) === 'ti-') name = c.slice(3); });
  if (name != null && ICONS[name] !== undefined) {
    el.__ti = true;
    el.innerHTML = '<svg ' + COMMON + '>' + ICONS[name] + '</svg>';
  }
}

// 정적/동적 삽입 아이콘 모두 처리 — 파셜을 fetch로 나중에 주입해도 자동 렌더됩니다.
export function renderIcons(root = document) {
  if (root && root.querySelectorAll) root.querySelectorAll('i.ti').forEach(draw);
}

renderIcons(document);
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(nd => {
  if (nd.nodeType === 1) { if (nd.matches && nd.matches('i.ti')) draw(nd); renderIcons(nd); }
}))).observe(document.documentElement, { childList: true, subtree: true });
