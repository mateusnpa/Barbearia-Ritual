document.querySelectorAll('aside nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelectorAll('aside nav a').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
const headline = document.querySelector('.hero h1');
if (headline) headline.innerHTML = 'Seu estilo merece<br>um ritual à altura.';

document.querySelectorAll('header nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('header nav a').forEach((item) => item.classList.remove('selected'));
  link.classList.add('selected');
}));

document.querySelectorAll('.booking').forEach((button) => button.addEventListener('click', (event) => {
  event.preventDefault();
  const service = window.prompt('Qual serviço você deseja agendar?\nCorte Ritual, Barba Clássica, Massagem Relax ou Tratamento');
  if (service) window.alert(`Pedido de agendamento para ${service} recebido. Em breve a equipe da Barberia Ritual entrará em contato.`);
}));

const gallery = document.querySelector('.gallery > div');
if (gallery) {
  gallery.insertAdjacentHTML('afterend', '<div class="gallery-controls"><button aria-label="Foto anterior">←</button><span>1 / 3</span><button aria-label="Próxima foto">→</button></div>');
  let current = 0;
  const slides = [...gallery.children];
  const update = () => { slides.forEach((slide, index) => slide.classList.toggle('featured', index === current)); document.querySelector('.gallery-controls span').textContent = `${current + 1} / ${slides.length}`; };
  document.querySelectorAll('.gallery-controls button').forEach((button, index) => button.addEventListener('click', () => { current = (current + (index ? 1 : slides.length - 1)) % slides.length; update(); }));
  update();
}

const menu = document.querySelector('header nav');
const existingGallery = document.querySelector('.gallery');
if (menu && existingGallery) {
  menu.insertAdjacentHTML('beforeend', '<a href="#fotos">Galeria</a>');
  existingGallery.insertAdjacentHTML('afterend', '<section class="photo-gallery" id="fotos"><small>GALERIA RITUAL</small><h2>Detalhes que fazem parte da experiência.</h2><div class="photo-grid"><img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80" alt="Ambiente de barbearia"><img src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=700&q=80" alt="Corte masculino"><img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=80" alt="Barba e cuidados"><img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=80" alt="Produto de barbearia"><img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=700&q=80" alt="Profissional em barbearia"><img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80" alt="Estilo masculino"></div></section>');
}
