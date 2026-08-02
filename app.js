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
