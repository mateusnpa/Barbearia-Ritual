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
