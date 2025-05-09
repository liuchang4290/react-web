const resize = () => {
  const docEl = document.documentElement;
  const width = docEl.clientWidth;
  const rem = width / 80;
  docEl.style.fontSize = `${rem}px`;
};

resize();

window.addEventListener('resize', resize);
