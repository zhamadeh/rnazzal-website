
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a.tile');
  if(!a) return;
  const src = a.getAttribute('href');
  const alt = a.dataset.alt || '';
  const caption = a.dataset.caption || '';
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  e.preventDefault();
  lb.querySelector('#lb-img').src = src;
  lb.querySelector('#lb-img').alt = alt;
  lb.querySelector('#lb-cap').textContent = caption;
  lb.classList.remove('lb-hidden');
});

document.addEventListener('click', (e)=>{
  if(e.target.classList.contains('lb-close') || e.target.id === 'lightbox') {
    document.getElementById('lightbox').classList.add('lb-hidden');
  }
});
