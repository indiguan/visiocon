// workspace.js — 검수 워크스페이스(검수/편집/핀 탭 + 단축키). DOM 주입 후 initWorkspace() 실행.
export function initWorkspace(){

  const TAB_META = {
    review:{label:'결함 검수', icon:'ti-list-check', closable:false},
    edit:{label:'편집 · C-17', icon:'ti-edit', closable:true},
    pin:{label:'핀 추가', icon:'ti-map-pin-plus', closable:true},
  };
  const state = { active:'review', open:['review'], editDirty:false, pinStep:0 };
  const pinHints = ['결함 위치를 도면에서 클릭하세요','핀 배치됨 · 끌어서 미세 조정 가능','종류와 크기를 입력하고 근거 프레임을 지정하세요'];

  const undoGrp = '<div class="grp"><button aria-label="실행 취소" title="실행 취소 (Ctrl+Z)"><i class="ti ti-arrow-back-up" aria-hidden="true"></i></button><button aria-label="다시 실행" title="다시 실행 (Ctrl+Y)"><i class="ti ti-arrow-forward-up" aria-hidden="true"></i></button></div>';

  function tabCtlHTML(){
    if(state.active==='review'){
      return '<div class="tabctl">'+undoGrp+'<button><i class="ti ti-device-floppy" aria-hidden="true"></i>임시 저장</button></div>';
    }
    if(state.active==='edit'){
      const warn = state.editDirty ? '<span class="dimwarn"><i class="ti ti-point-filled" style="font-size:13px;" aria-hidden="true"></i>미저장</span>' : '';
      return '<div class="tabctl">'+warn+undoGrp+'</div>';
    }
    if(state.active==='pin'){
      const d=state.pinStep;
      const dot=(i,l)=>'<span style="width:9px;height:9px;border-radius:50%;display:inline-block;background:'+(i<=d?'var(--text-accent)':'var(--border-strong)')+';"></span><span style="'+(i===d?'color:var(--text-primary);':'color:var(--text-secondary);')+'white-space:nowrap;">'+l+'</span>';
      return '<div class="tabctl"><div style="display:flex;align-items:center;gap:6px;font-size:10px;color:var(--text-secondary);">'+dot(0,'① 배치')+'<span style="color:var(--text-muted);">→</span>'+dot(1,'② 클릭')+'<span style="color:var(--text-muted);">→</span>'+dot(2,'③ 입력')+'</div></div>';
    }
    return '';
  }

  function renderTabs(){
    const bar = document.getElementById('tabbar');
    let html='';
    state.open.forEach(id=>{
      const m=TAB_META[id];
      const on = state.active===id ? 'on' : '';
      const close = m.closable ? '<i class="ti ti-x close" role="button" aria-label="'+m.label+' 닫기" data-close="'+id+'"></i>' : '';
      html += '<div class="btab '+on+'" role="tab" data-tab="'+id+'"><i class="ti '+m.icon+'" style="font-size:13px;" aria-hidden="true"></i>'+m.label+close+'</div>';
    });
    html += tabCtlHTML();
    bar.innerHTML = html;
    bar.querySelectorAll('[data-tab]').forEach(el=>{
      el.addEventListener('click', e=>{ if(e.target.dataset.close){ return; } switchTab(el.dataset.tab); });
    });
    bar.querySelectorAll('[data-close]').forEach(el=>{
      el.addEventListener('click', e=>{ e.stopPropagation(); closeTab(el.dataset.close); });
    });
  }

  function renderPanels(){
    ['review','edit','pin'].forEach(id=>{ document.getElementById('panel-'+id).classList.toggle('on', state.active===id); });
  }
  function render(){ renderTabs(); renderPanels(); }
  function hasTab(id){ return state.open.includes(id); }
  function switchTab(id){ state.active=id; render(); }

  function openEdit(){ if(!hasTab('edit')){ state.open.push('edit'); } state.editDirty=false; switchTab('edit'); };
  function openPin(){ if(!hasTab('pin')){ state.open.push('pin'); } state.pinStep=0; syncPin(); switchTab('pin'); };
  function closeTab(id){
    if(id==='edit' && state.editDirty){ if(!confirm('저장하지 않은 변경이 있습니다. 변경 내용을 버리고 닫을까요?')) return; state.editDirty=false; }
    state.open = state.open.filter(t=>t!==id);
    if(state.active===id) state.active='review';
    render();
  };
  function markDirty(){ if(!state.editDirty){ state.editDirty=true; renderTabs(); } };
  function markClean(){ if(state.editDirty){ state.editDirty=false; renderTabs(); } };
  function saveEdit(){ state.editDirty=false; state.open=state.open.filter(t=>t!=='edit'); state.active='review'; render(); };
  function cancelEdit(){ closeTab('edit'); };
  function registerPin(){ state.open=state.open.filter(t=>t!=='pin'); state.active='review'; render(); };

  function syncPin(){
    for(let k=0;k<3;k++){ const el=document.getElementById('ps'+k); el.style.display = (k===state.pinStep)?'flex':'none'; }
    document.getElementById('pinHint').textContent = pinHints[state.pinStep];
    document.getElementById('pinPrev').disabled = state.pinStep===0;
    document.getElementById('pinNext').style.visibility = state.pinStep===2 ? 'hidden' : 'visible';
    renderTabs();
  }
  function pinNav(dir){ state.pinStep=Math.max(0,Math.min(2,state.pinStep+dir)); syncPin(); };

  function sSwap(i, el){
    document.getElementById('sv0').classList.toggle('on', i===0);
    document.getElementById('sv1').classList.toggle('on', i===1);
    el.parentElement.querySelectorAll('.stab').forEach(b=>b.classList.remove('on'));
    el.classList.add('on');
  };

  function judge(kind){ /* demo: 판정 후 다음 결함 */ };
  function navDefect(dir){ /* demo: 결함 이동 */ };
  function confirmSign(){
    if(confirm('미검수 18건, 사각지대 1건이 남아 있습니다. 그래도 확정하시겠습니까?')){ window.go('complete'); }
  };

  document.addEventListener('keydown', e=>{
    if(window.currentScreen!=='workspace') return;
    const typing = /INPUT|SELECT|TEXTAREA/.test((document.activeElement||{}).tagName||'');
    if(state.active==='review' && !typing){ if(e.key==='e'||e.key==='E') openEdit(); }
    else if(state.active==='edit'){ if((e.ctrlKey||e.metaKey) && (e.key==='s'||e.key==='S')){ e.preventDefault(); saveEdit(); } if(e.key==='Escape') cancelEdit(); }
    else if(state.active==='pin'){ if(e.key==='Escape') closeTab('pin'); if((e.key==='Enter'||e.key==='ArrowRight') && !typing) pinNav(1); }
  });

  render();

  Object.assign(window, {openEdit, openPin, closeTab, markDirty, markClean, saveEdit, cancelEdit, registerPin, pinNav, sSwap, judge, navDefect, confirmSign});
}
