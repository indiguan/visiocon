// progress.js — 분석 진행 애니메이션. 라우터가 진행 화면 진입 시 startProgress() 호출.
/* 분석 진행 애니메이션 — 진행 화면 진입 시마다 처음부터 재생, 이탈 시 정지 */
(function(){
  var _pt=[];
  window.stopProgress=function(){ _pt.forEach(clearInterval); _pt=[]; };
  window.startProgress=function(){
    window.stopProgress();
    var TOTAL=1062, frames=640, act=1, sub=[1,0.55,0,0], crack=28, spall=5, rebar=2, elapsed=0, done=false;
    function g(id){ return document.getElementById(id); }
    function pct(x){ return Math.round(x*100); }
    var pulse=g('scr-progress') ? g('scr-progress').querySelector('.pulse') : null;
    function render(){
      for(var k=1;k<=3;k++){
        var row=g('st'+k); if(!row) continue;
        row.classList.toggle('done', k<act||done);
        row.classList.toggle('act', k===act&&!done);
        var c=row.querySelector('.stc'); if(c) c.innerHTML=(k<act||done)?'<i class="ti ti-check" aria-hidden="true"></i>':k+1;
        var bar=row.querySelector('.subbar'); if(bar) bar.style.display=(k===act&&!done)?'block':'none';
        var sb=g('sub'+k); if(sb) sb.style.width=pct(sub[k])+'%';
      }
      g('txt1').textContent=Math.min(frames,TOTAL).toLocaleString()+' / '+TOTAL.toLocaleString()+' 프레임';
      g('cCrack').textContent=crack; g('cSpall').textContent=spall; g('cRebar').textContent=rebar; g('cTotal').textContent=(crack+spall+rebar);
      var ov=(1+sub[1]+sub[2]+sub[3])/4; g('ovFill').style.width=pct(ov)+'%'; g('ovPct').textContent=pct(ov)+'%';
    }
    function finish(){
      g('ovLabel').textContent='분석 완료';
      g('ovTime').innerHTML='<i class="ti ti-circle-check" style="font-size:12px; margin-right:3px; color:var(--text-success);" aria-hidden="true"></i>조사망도 · 리포트 생성 완료';
      g('doneBtnWrap').style.display='block';
      if(pulse) pulse.style.animation='none';
      render();
    }
    g('ovLabel').textContent='전체 진행률';
    if(pulse) pulse.style.animation='';
    g('doneBtnWrap').style.display='none';
    render();
    var tick=setInterval(function(){
      if(done){ clearInterval(tick); return; }
      if(act===1){ frames=Math.min(TOTAL,frames+78); sub[1]=frames/TOTAL; if(Math.random()<0.7)crack++; if(Math.random()<0.3)spall++; if(Math.random()<0.12)rebar++; if(frames>=TOTAL){ sub[1]=1; act=2; } }
      else if(act===2){ sub[2]=Math.min(1,sub[2]+0.22); if(sub[2]>=1)act=3; }
      else if(act===3){ sub[3]=Math.min(1,sub[3]+0.26); if(sub[3]>=1){ done=true; finish(); } }
      render();
    },1100);
    var clock=setInterval(function(){
      if(done){ clearInterval(clock); return; }
      elapsed++; var m=Math.floor(elapsed/60), s=elapsed%60;
      g('ovTime').innerHTML='<i class="ti ti-clock" style="font-size:11px; margin-right:3px;" aria-hidden="true"></i>경과 '+m+':'+String(s).padStart(2,'0')+' · 남은 약 '+Math.max(1,7-m)+'분';
    },1000);
    _pt.push(tick,clock);
  };
})();
