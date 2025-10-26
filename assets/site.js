// ---- helpers
async function loadJSON(path){ const r = await fetch(path); return r.json(); }
const byId = (id)=>document.getElementById(id);

// ---- works (grid + lightbox)
let worksData = [];
let currentIndex = 0;

function openLightbox(i){
  currentIndex = i;
  const w = worksData[i];
  const lb = byId('lightbox');
  if(!lb) return;
  byId('lb-img').src   = w.cover;
  byId('lb-img').alt   = w.alt || w.title || '';
  byId('lb-cap').innerHTML = `${w.title || ''}${w.year ? ' ('+w.year+')' : ''}${w.credit ? ' · '+w.credit : ''}`;
  lb.classList.remove('hidden');
}
function closeLightbox(){ const lb = byId('lightbox'); lb && lb.classList.add('hidden'); }
function next(){ if(!worksData.length) return; openLightbox((currentIndex+1)%worksData.length); }
function prev(){ if(!worksData.length) return; openLightbox((currentIndex-1+worksData.length)%worksData.length); }

async function renderWorks(){
  const el = document.querySelector('#works-grid');
  if(!el) return;
  worksData = await loadJSON('data/works.json');
  el.innerHTML = worksData.map((w,i)=>`
    <button class="card" data-idx="${i}" aria-label="Open ${w.title}">
      <img src="${w.cover}" alt="${w.alt || w.title}">
      <div class="meta">
        <div class="title">${w.title || ''}</div>
        <div class="sub">${[w.year,w.media].filter(Boolean).join(' · ')}</div>
      </div>
    </button>
  `).join('');
  el.querySelectorAll('.card').forEach(btn=>{
    btn.addEventListener('click',()=>openLightbox(parseInt(btn.dataset.idx,10)));
  });
}

function wireLightbox(){
  const lb = byId('lightbox'); if(!lb) return;
  lb.querySelector('.lb-close').addEventListener('click',closeLightbox);
  lb.querySelector('.lb-next').addEventListener('click',next);
  lb.querySelector('.lb-prev').addEventListener('click',prev);
  lb.addEventListener('click',(e)=>{ if(e.target===lb) closeLightbox(); });
  window.addEventListener('keydown',(e)=>{
    if(lb.classList.contains('hidden')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight') next();
    if(e.key==='ArrowLeft') prev();
  });
}

// ---- exhibitions
async function renderExhibitions(){
  const el = document.querySelector('#exhibitions-grid');
  if(!el) return;
  const data = await loadJSON('data/exhibitions.json');
  el.innerHTML = data.map(x=>`
    <div class="card">
      <img src="${x.poster}" alt="${x.title}">
      <div class="meta">
        <div class="title">${x.title}</div>
        <div class="sub">${[x.venue,x.city,x.dates].filter(Boolean).join(' · ')}</div>
      </div>
    </div>
  `).join('');
}

// ---- publications (optional)
async function renderPublications(){
  const el = document.querySelector('#pubs-grid');
  if(!el) return;
  const data = await loadJSON('data/publications.json');
  el.innerHTML = data.map(p=>`
    <a class="card" ${p.buy ? `href="${p.buy}" target="_blank" rel="noopener"`:''}>
      <img src="${p.cover}" alt="${p.title}">
      <div class="meta">
        <div class="title">${p.title}</div>
        <div class="sub">${[p.publisher,p.year].filter(Boolean).join(' · ')}</div>
      </div>
    </a>
  `).join('');
}

// ---- boot
document.addEventListener('DOMContentLoaded',()=>{
  renderWorks(); renderExhibitions(); renderPublications(); wireLightbox();
});