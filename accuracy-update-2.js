(() => {
  function applyTutorialAccuracy(){
    const first = document.querySelector('[data-tutorial-step="0"]');
    if(first){
      const p = first.querySelector('p:not(.eyebrow):not(.tutorial-callout)');
      if(p) p.innerHTML = 'La bomba no es un medidor instantáneo de concentración. Aspira un volumen conocido de aire y deposita el aerosol en un medio de captación. Después, el laboratorio determina <b>la masa o el analito de interés</b>, según el método.';
    }

    const last = document.querySelector('[data-tutorial-step="3"]');
    if(last){
      const h2 = last.querySelector('h2');
      if(h2) h2.textContent = 'Analiza, corrige y calcula';
      const eq = last.querySelector('.tutorial-equations');
      if(eq) eq.innerHTML = '<div><span>Volumen de aire</span><b>V = Qprom × t / 1000</b></div><div><span>Resultado analítico</span><b>Gravimetría o análisis químico</b></div><div><span>Concentración</span><b>C = resultado corregido / V</b></div>';
      const warning = last.querySelector('.tutorial-callout.warning');
      if(warning) warning.innerHTML = '<b>No todos los aerosoles terminan en una pesada.</b> La gravimetría determina masa de aerosol; para NaOH se determina alcalinidad químicamente, y para sílice, metales u otros agentes se aplica el método analítico específico.';
    }

    const nav = document.querySelector('.manual-nav');
    if(nav && !nav.querySelector('[data-manual-target="manual-direct-reading"]')){
      const b = document.createElement('button');
      b.dataset.manualTarget = 'manual-direct-reading';
      b.textContent = 'Lectura directa';
      b.onclick = () => {
        const target = document.getElementById('manual-direct-reading');
        document.querySelectorAll('.function-manual details').forEach(d=>d.open=false);
        if(target){target.hidden=false;target.open=true;target.scrollIntoView({behavior:'smooth',block:'center'});}
      };
      nav.appendChild(b);
    }

    const fraction = document.getElementById('fraction');
    if(fraction && !document.getElementById('fractionMethodHint')){
      const hint = document.createElement('small');
      hint.id = 'fractionMethodHint';
      hint.className = 'method-hint';
      hint.innerHTML = '<b>Recuerda:</b> “fracción” describe qué parte del aerosol queremos captar; el resultado final depende además del método de análisis. mg/m³ es una concentración, no una lectura propia de la bomba.';
      fraction.closest('label')?.appendChild(hint);
    }
  }

  applyTutorialAccuracy();
  document.querySelectorAll('.scenario, #topTutorialBtn, #openTutorialBtn').forEach(el=>el.addEventListener('click',()=>setTimeout(applyTutorialAccuracy,0)));
})();