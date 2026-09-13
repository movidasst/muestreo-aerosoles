(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'accuracy-update.css?v=20260913';
  document.head.appendChild(css);

  const core = document.createElement('script');
  core.src = 'app-core.js?v=20260913';
  core.async = false;
  core.onload = () => {
    const update = document.createElement('script');
    update.src = 'accuracy-update.js?v=20260913';
    update.async = false;
    document.body.appendChild(update);
  };
  document.body.appendChild(core);
})();