// Minimal lightbox (no dependencies)
const lb = {
  el: null, img: null, cap: null, i: 0, items: [],
  open(i){
    this.i = i;
    const {href, dataset} = this.items[i];
    this.img.src = href;
    this.img.alt = dataset.alt || '';
    this.cap.textContent = dataset.caption || '';
    this.el.classList.add('open');
  },
  close(){ this.el.classList.remove('open'); },
  next(){ this.open((this.i+1)%this.items.length); },
  prev(){ this.open((this.i-1+this.items.length)%this.items.length); }
};

document.addEventListener('DOMContentLoaded', () => {
  lb.el = document.getElementById('lightbox');
  lb.img = document.getElementById('lb-img');
  lb.cap = document.getElementById('lb-cap');

  lb.items = Array.from(document.querySelectorAll('a.tile'));
  lb.items.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lb.open(i);
    });
  });

  document.querySelector('.lb-close').addEventListener('click', ()=>lb.close());
  document.querySelector('.lb-next').addEventListener('click', ()=>lb.next());
  document.querySelector('.lb-prev').addEventListener('click', ()=>lb.prev());
  lb.el.addEventListener('click', (e)=>{ if(e.target===lb.el) lb.close(); });
  window.addEventListener('keydown', (e)=>{
    if(!lb.el.classList.contains('open')) return;
    if(e.key==='Escape') lb.close();
    if(e.key==='ArrowRight') lb.next();
    if(e.key==='ArrowLeft') lb.prev();
  });
});