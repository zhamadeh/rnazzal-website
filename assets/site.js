async function loadJSON(path){ const r = await fetch(path); return r.json(); }

async function renderWorks(){
  const el = document.querySelector('#works-grid');
  if(!el) return;
  const data = await loadJSON('/data/works.json');
  el.innerHTML = data.map(w => `
    <a class="card" href="#">
      <img src="${w.cover}" alt="${w.title}">
      <div class="meta"><div class="title">${w.title}</div><div class="sub">${w.year}</div></div>
    </a>`).join('');
}

async function renderExhibitions(){
  const el = document.querySelector('#exhibitions-grid');
  if(!el) return;
  const data = await loadJSON('/data/exhibitions.json');
  el.innerHTML = data.map(x => `
    <div class="card">
      <img src="${x.poster}" alt="${x.title}">
      <div class="meta"><div class="title">${x.title}</div><div class="sub">${x.venue}</div></div>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded',()=>{ renderWorks(); renderExhibitions(); });
