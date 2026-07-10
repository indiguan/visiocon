// fit.js — 뷰포트에 맞춰 무대(960px 고정)를 전체 확대/축소. 레이아웃은 고정, 배율만 변화.
/* 뷰포트에 맞춰 프레임 전체를 확대/축소 (형태 고정 · 폭·높이 중 작은 비율로 전체 표시).
   모바일 웹뷰 호환: 무대의 실제 렌더 크기 측정 + visualViewport/지연 재보정 */
(function(){
  var stage=document.querySelector('.stage'), frame=document.querySelector('.frame'), M=18;
  function fit(){
    var r=stage.getBoundingClientRect();
    var aw=r.width-M, ah=r.height-M;
    var w=frame.offsetWidth||960, h=frame.offsetHeight||540;
    var s=Math.min(aw/w, ah/h);
    frame.style.transform='scale('+Math.max(0.05, (s>0?s:aw/w))+')';
  }
  var raf; function schedule(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(fit); }
  schedule();
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('orientationchange', schedule);
  window.addEventListener('load', schedule);
  if(window.visualViewport){ window.visualViewport.addEventListener('resize', schedule); window.visualViewport.addEventListener('scroll', schedule); }
  if(window.ResizeObserver){ new ResizeObserver(schedule).observe(stage); }
  [60,180,450,1000].forEach(function(t){ setTimeout(schedule, t); });
})();
