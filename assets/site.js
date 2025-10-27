const brand = document.querySelector('.brand');
const title = document.getElementById('site-title');

if (brand && title) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) brand.classList.remove('show');
      else brand.classList.add('show');
    });
  });
  io.observe(title);
}