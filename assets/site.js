
const brand = document.querySelector('.brand');
const title = document.getElementById('site-title');
if (brand && title && 'IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ brand.classList.remove('show'); }
      else { brand.classList.add('show'); }
    });
  }, {threshold: 0.01});
  io.observe(title);
}
