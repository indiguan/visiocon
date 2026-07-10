// reopen.js — 기존 .visiocon 프로젝트 재열기(2단계) + 드롭존 선택.
let rII=0; const rLL=1; let hasV=false, hasZ=false;
  function refreshNext(){ const nx=document.getElementById('rNext'); if(rII===0){ nx.disabled=!hasV; } }
  function pickV(){
    hasV=true;
    document.getElementById('dzVchk').style.display='block';
    document.getElementById('dzV').style.borderColor='var(--border-accent)';
    document.getElementById('dzVt').innerHTML='해운대리인뷰_103동남측_편집본.visiocon <span style="color:var(--text-muted);">· 148 KB</span>';
    document.getElementById('dzVs').textContent='도면·크롭·데이터·이력·매핑 포함 · 자체 완결형';
    refreshNext();
  }
  function pickZ(){
    hasZ=!hasZ;
    document.getElementById('dzZchk').style.display = hasZ ? 'block' : 'none';
    document.getElementById('dzZ').style.borderColor = hasZ ? 'var(--border-accent)' : 'var(--border-stronger)';
    document.getElementById('dzZt').innerHTML = hasZ ? '남측_비행_4K_frames.zip <span style="color:var(--text-muted);">· 3.1 GB</span>' : '프레임 패키지 .zip <span style="color:var(--text-muted);">선택</span>';
  }
  function rNav(dir){
    if(dir>0 && rII===0 && !hasV) return;
    if(dir>0 && rII===rLL){ window.go('workspace'); return; }
    rII=Math.max(0,Math.min(rLL,rII+dir));
    for(let k=0;k<=rLL;k++){
      document.getElementById('rw'+k).classList.toggle('on', k===rII);
      const n=document.getElementById('rn'+k);
      n.classList.toggle('on', k===rII);
      n.classList.toggle('done', k<rII);
      n.querySelector('.scirc').innerHTML = k<rII ? '<i class="ti ti-check" aria-hidden="true"></i>' : (k+1);
    }
    if(rII===1){
      const cv=document.getElementById('chkVideo');
      if(hasZ){ cv.classList.remove('off'); cv.querySelector('.ic').className='ti ti-check ic'; cv.lastChild.textContent='전후 영상 재생 · 신규 핀 근거 (프레임 패키지 포함)'; }
      else{ cv.classList.add('off'); cv.querySelector('.ic').className='ti ti-minus ic'; cv.lastChild.textContent='전후 영상 재생 · 신규 핀 근거 (프레임 패키지 필요)'; }
    }
    document.getElementById('rStepText').textContent=(rII+1)+' / 2 단계';
    document.getElementById('rPrev').disabled = rII===0;
    const nx=document.getElementById('rNext');
    if(rII===rLL){ nx.disabled=false; nx.innerHTML='<i class="ti ti-edit" style="margin-right:4px" aria-hidden="true"></i>편집 시작'; }
    else { nx.innerHTML='다음<i class="ti ti-arrow-right" style="margin-left:3px" aria-hidden="true"></i>'; refreshNext(); }
  }
window.pickV = pickV;
window.pickZ = pickZ;
window.rNav = rNav;
