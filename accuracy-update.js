(() => {
  const ACCURACY_VERSION = '2026-09-13';

  function selectedScenario() {
    return document.querySelector('.scenario.selected')?.dataset.scenario || 'silica';
  }

  function replaceText(selector, from, to) {
    document.querySelectorAll(selector).forEach(el => {
      if (el.textContent.includes(from)) el.textContent = el.textContent.replace(from, to);
    });
  }

  function ensureClarifier() {
    if (document.getElementById('measurementClarifier')) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const box = document.createElement('section');
    box.id = 'measurementClarifier';
    box.className = 'measurement-clarifier';
    box.innerHTML = `
      <div class="clarifier-heading">
        <span>ACLARATORIA CLAVE</span>
        <h2>¿El aerosol se mide directamente o se lleva al laboratorio?</h2>
        <p>En higiene ocupacional existen ambas posibilidades, pero <b>no significan lo mismo</b>. Este simulador enseña principalmente el <b>muestreo integrado con análisis posterior</b>.</p>
      </div>
      <div class="measurement-routes">
        <article>
          <span class="route-tag primary-route">RUTA PRINCIPAL DEL SIMULADOR</span>
          <h3>Muestreo integrado + laboratorio</h3>
          <p><b>Bomba → selector/medio → muestra → laboratorio → mg/m³.</b></p>
          <p>La bomba mantiene un caudal y permite conocer el volumen de aire. <b>No muestra por sí sola la concentración del contaminante.</b> El resultado aparece después de analizar lo captado.</p>
        </article>
        <article>
          <span class="route-tag">HERRAMIENTA COMPLEMENTARIA</span>
          <h3>Monitor de lectura directa</h3>
          <p><b>Aerosol → sensor óptico u otra tecnología → señal en tiempo real.</b></p>
          <p>Es muy útil para observar picos, tareas críticas, tendencias y eficacia de controles. Un monitor óptico genérico <b>no identifica automáticamente la sustancia química específica</b> y su respuesta depende del aerosol y de la calibración.</p>
        </article>
      </div>
      <div class="clarifier-bottom"><b>Idea para recordar:</b> no existe un único equipo universal que, para cualquier aerosol, aspire la muestra, identifique su composición química y sustituya todos los análisis de laboratorio.</div>`;
    hero.insertAdjacentElement('afterend', box);
  }

  function ensureFieldNotice() {
    const stage = document.querySelector('.stage[data-stage="3"]');
    if (!stage || document.getElementById('samplingRealityNote')) return;
    const note = document.createElement('div');
    note.id = 'samplingRealityNote';
    note.className = 'sampling-reality-note';
    note.innerHTML = `<b>¿Qué está haciendo realmente la bomba?</b><p>Está haciendo pasar aire a un caudal conocido a través del sistema de captación. <strong>No está leyendo mg/m³ en pantalla.</strong> La concentración se obtendrá después, cuando conozcamos cuánto material o analito quedó retenido y lo relacionemos con el volumen de aire muestreado.</p>`;
    const btn = stage.querySelector('#sampleBtn');
    if (btn) btn.insertAdjacentElement('beforebegin', note);
  }

  function ensureLabNotice() {
    const stage = document.querySelector('.stage[data-stage="4"]');
    if (!stage || document.getElementById('labRealityNote')) return;
    const note = document.createElement('div');
    note.id = 'labRealityNote';
    note.className = 'lab-reality-note';
    note.innerHTML = `<span>AHORA SÍ APARECE EL DATO ANALÍTICO</span><p>El resultado en mg/m³ no nace en la bomba: se construye con <b>el resultado del laboratorio + el volumen de aire muestreado</b>.</p>`;
    const explanation = document.getElementById('labExplanation');
    if (explanation) explanation.insertAdjacentElement('beforebegin', note);
  }

  function ensureDirectReadingHelp() {
    if (document.getElementById('manual-direct-reading')) return;
    const calculation = document.getElementById('manual-calculation');
    if (!calculation) return;
    const details = document.createElement('details');
    details.id = 'manual-direct-reading';
    details.innerHTML = `<summary>Lectura directa vs. muestreo integrado</summary><div class="manual-body"><p><b>Muestreo integrado:</b> una bomba hace pasar un volumen conocido de aire por un medio de captación. La muestra se analiza posteriormente y el resultado se expresa, cuando corresponde, en mg/m³. Es la lógica principal de este simulador.</p><p><b>Lectura directa:</b> existen monitores de aerosol capaces de entregar información en tiempo real. Los monitores ópticos son especialmente útiles para detectar picos, tendencias, tareas críticas y cambios al aplicar controles.</p><p class="manual-tip"><b>No los confundas:</b> una lectura directa de masa o señal de partículas no equivale automáticamente a identificar químicamente el contaminante. Para sílice, metales, álcalis u otros analitos puede ser necesario un método analítico específico.</p></div>`;
    calculation.insertAdjacentElement('beforebegin', details);
  }

  function updateStaticCopy() {
    replaceText('.login-story p', 'Planifica, arma, calibra, muestrea y calcula una concentración gravimétrica en mg/m³.', 'Planifica, arma, calibra, muestrea y obtiene una concentración en mg/m³ mediante análisis posterior.');
    const heroP = document.querySelector('.hero > div > p');
    if (heroP) heroP.textContent = 'Arma un tren de muestreo personal, calibra el caudal, toma la muestra y comprende cómo el laboratorio convierte lo captado en un resultado de concentración.';

    const causticSmall = document.querySelector('.scenario[data-scenario="caustic"] small');
    if (causticSmall) causticSmall.textContent = 'Niebla alcalina · NaOH · análisis químico';

    const stage5Title = document.querySelector('.stage[data-stage="4"] .section-heading h2');
    if (stage5Title) stage5Title.textContent = 'Procesa la muestra en laboratorio';

    const quick = document.querySelector('.manual-quick-start ol');
    if (quick) quick.innerHTML = '<li>Planificar</li><li>Preparar</li><li>Calibrar</li><li>Muestrear</li><li>Analizar</li><li>Interpretar</li>';
  }

  function updateScenarioCopy() {
    const scenario = selectedScenario();
    const lab = document.getElementById('labExplanation');
    const resultLabel = document.querySelector('.result-card > span');
    const note = document.getElementById('labRealityNote');

    if (scenario === 'caustic') {
      if (lab) lab.innerHTML = '<b>Análisis químico: no es una pesada del filtro</b><p>En el ejercicio de NaOH se aplica la lógica de NIOSH 7401: filtro PTFE de 1 µm y determinación de alcalinidad mediante titulación ácido-base, expresada como NaOH equivalente. El método permite 1–4 L/min; el simulador utiliza 2,0 L/min como valor didáctico dentro de ese rango.</p><p><strong>Importante:</strong> el método informa alcalinidad total como equivalente de NaOH y puede recibir interferencias de otros compuestos ácidos o básicos. No debe interpretarse como un “sensor directo de NaOH”.</p>';
      if (resultLabel) resultLabel.textContent = 'Concentración de aerosol alcalino';
      if (note) note.querySelector('p').innerHTML = 'Para este caso, el laboratorio determina <b>alcalinidad como equivalente de NaOH</b>. Luego esa masa analítica se relaciona con el volumen de aire para obtener mg/m³.';
    } else {
      if (lab) lab.innerHTML = '<b>Control gravimétrico</b><p>Los filtros y blancos se acondicionan bajo condiciones controladas antes y después del muestreo. La diferencia de masa, corregida con blancos, permite estimar la masa de aerosol recogida.</p><p><strong>Importante:</strong> la gravimetría cuantifica masa de aerosol, pero por sí sola no identifica su composición química. Para sílice, metales u otros analitos se requiere el análisis específico correspondiente.</p>';
      if (resultLabel) resultLabel.textContent = 'Concentración gravimétrica del aerosol';
      if (note) note.querySelector('p').innerHTML = 'En los casos gravimétricos, el laboratorio determina la <b>masa recogida</b>; luego esa masa corregida se relaciona con el volumen de aire para obtener mg/m³.';
    }
  }

  function updateGuideCopy() {
    const step = document.getElementById('guideStep')?.textContent || '';
    const title = document.getElementById('guideTitle');
    const text = document.getElementById('guideText');
    const what = document.getElementById('learningWhat');
    const purpose = document.getElementById('learningPurpose');
    const interpret = document.getElementById('learningInterpret');

    if (step.includes('PASO 4')) {
      if (title) title.textContent = 'Toma la muestra: todavía no tienes mg/m³';
      if (text) text.textContent = 'La bomba recoge aerosol durante un tiempo conocido. En esta etapa controlas caudal, duración y representatividad; la concentración final aún no existe.';
      if (what) what.textContent = 'Es la captación del aerosol durante una tarea representativa mediante un caudal y tiempo conocidos.';
      if (purpose) purpose.textContent = 'Permite obtener una muestra asociada a un volumen definido de aire y a la exposición del trabajador.';
      if (interpret) interpret.textContent = 'Completar el muestreo no significa haber medido químicamente el contaminante. La muestra todavía debe analizarse.';
    }
    if (step.includes('PASO 5')) {
      if (title) title.textContent = 'El laboratorio convierte la muestra en un dato analítico';
      if (text) text.textContent = selectedScenario() === 'caustic' ? 'Para NaOH se determina alcalinidad químicamente; no se obtiene el resultado por una lectura instantánea de la bomba.' : 'Para el ejercicio gravimétrico se determina la masa retenida y se corrige con blancos.';
    }
    if (step.includes('PASO 6')) {
      if (title) title.textContent = 'Ahora calcula e interpreta la concentración';
      if (text) text.textContent = 'Relaciona el resultado analítico con el volumen de aire muestreado. El valor en mg/m³ pertenece al método, fracción, periodo y analito evaluados.';
    }
  }

  function refresh() {
    updateStaticCopy();
    ensureClarifier();
    ensureFieldNotice();
    ensureLabNotice();
    ensureDirectReadingHelp();
    updateScenarioCopy();
    updateGuideCopy();
  }

  refresh();

  document.querySelectorAll('.scenario, .next, .steps button, .mode-switch button, #guideAction, #sampleBtn, #calibrateBtn').forEach(el => {
    el.addEventListener('click', () => setTimeout(refresh, 0));
  });

  const guideStep = document.getElementById('guideStep');
  if (guideStep) new MutationObserver(() => setTimeout(refresh, 0)).observe(guideStep, {childList:true, subtree:true, characterData:true});

  const result = document.getElementById('concentration');
  if (result) new MutationObserver(() => setTimeout(updateScenarioCopy, 0)).observe(result, {childList:true, subtree:true, characterData:true});

  console.info(`[Movida SST] Aclaratoria técnica de aerosoles cargada ${ACCURACY_VERSION}`);
})();