// complete.js — 검수 완료 화면. 산출물 다운로드 토스트 + .visiocon 저장.
let tt4;
  function toast4(msg){ const t=document.getElementById('toast4'); t.textContent=msg; t.classList.add('on'); clearTimeout(tt4); tt4=setTimeout(()=>t.classList.remove('on'),2200); }
  function dl4(name, fmt){ toast4(name+' 다운로드를 시작합니다 ('+fmt+')'); }
  function saveFile4(filename, text){
    try{
      const blob=new Blob([text],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      toast4(filename+' 저장');
    }catch(e){ toast4(filename+' 다운로드를 시작합니다'); }
  }
  function dlProj4(kind){
    const base={ format:'visiocon-project', version:'1.0',
      site:{name:'해운대 ○○리인뷰', building:'103동', facade:'남측'},
      engine:{vision:'비지오 3.0', serverTask:'keyframe-defect-extraction'},
      source:{keyframePackage:'남측_비행_4K.frames', frames:1062},
      drawing:'103동_남측_입면도.pdf(embedded)', crops:'52(embedded)', mapping:'homography-params(embedded)' };
    if(kind==='ai'){
      const p=Object.assign({}, base, { kind:'ai-analysis', createdAt:'2026-07-02T14:05:00',
        defects:[
          {id:'C-17', type:'균열', floor:8, col:'W3', width_mm:0.3, length_m:1.2, frame:'04:12', confidence:0.96, status:'미검수'},
          {id:'C-18', type:'박리', floor:3, col:'W5', frame:'06:40', confidence:0.91, status:'미검수'}
        ] });
      saveFile4('해운대리인뷰_103동남측_AI분석본.visiocon', JSON.stringify(p,null,2));
    } else {
      const p=Object.assign({}, base, { kind:'reviewed-edit', reviewer:'김기술', reviewedAt:'2026-07-02T14:52:00',
        defects:[
          {id:'C-17', type:'균열', floor:8, col:'W3', width_mm:0.4, length_m:1.2, frame:'04:12', confidence:0.96, status:'승인', edits:[{field:'width_mm', from:0.3, to:0.4, reason:'실측 재측정', by:'김기술', at:'14:52'}]},
          {id:'M-01', type:'철근노출', floor:5, col:'W2', frame:'11:02', origin:'manual', reason:'AI 미탐지·육안', status:'승인'}
        ] });
      saveFile4('해운대리인뷰_103동남측_편집본.visiocon', JSON.stringify(p,null,2));
    }
  }
window.dl4 = dl4;
window.dlProj4 = dlProj4;
