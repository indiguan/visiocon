// wizard.js — 신규 점검 마법사(4단계) 네비게이션 + 현장명 동기화.
let wI = 0;
  const wLast = 3;
  function wNav(dir){
    if(dir>0 && wI===wLast){ window.go('progress'); return; }
    wI = Math.max(0, Math.min(wLast, wI + dir));
    for(let k=0;k<=wLast;k++){
      document.getElementById('w'+k).classList.toggle('on', k===wI);
      const n = document.getElementById('sn'+k);
      n.classList.toggle('on', k===wI);
      n.classList.toggle('done', k<wI);
      const c = n.querySelector('.scirc');
      c.innerHTML = k<wI ? '<i class="ti ti-check" aria-hidden="true"></i>' : (k+1);
    }
    document.getElementById('wStepText').textContent = (wI+1)+' / 4 단계';
    document.getElementById('wPrev').disabled = wI===0;
    const nx = document.getElementById('wNext');
    if(wI===wLast){ nx.innerHTML = '<i class="ti ti-player-play" style="margin-right:4px" aria-hidden="true"></i>분석 시작'; }
    else { nx.innerHTML = '다음<i class="ti ti-arrow-right" style="margin-left:3px" aria-hidden="true"></i>'; }
  }
  function syncSite(v){
    v = (v || '').trim();
    document.getElementById('siteHdr').textContent = v;                 // 입력 전 비어 있음, 입력 시 우상단 표시
    document.getElementById('siteReview').textContent = v || '해운대 ○○리인뷰'; // 확인 화면도 연동(미입력 시 예시)
  }
window.wNav = wNav;
window.syncSite = syncSite;
