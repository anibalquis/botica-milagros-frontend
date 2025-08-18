  // Slider funcional con botones y puntos (usando % para compatibilidad)
  (function() {
    const track = document.getElementById('autoSliderTrack');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const btnLeft = document.getElementById('sliderBtnLeft');
    const btnRight = document.getElementById('sliderBtnRight');
    const slides = track.querySelectorAll('img');
    let current = 0;
    const total = slides.length;
    // Ajustar el ancho del track dinámicamente
    function setTrackWidth() {
      track.style.width = (100 * total) + '%';
      slides.forEach(slide => slide.style.width = (100/total) + '%');
    }
    setTrackWidth();
    function goToSlide(idx) {
      track.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      track.style.transform = `translateX(-${idx * (100/total)}%)`;
      dots.forEach((d,i) => d.classList.toggle('active', i === idx));
      current = idx;
    }
    function nextSlide() {
      goToSlide((current+1)%total);
    }
    function prevSlide() {
      goToSlide((current-1+total)%total);
    }
    let interval = setInterval(nextSlide, 4000);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        clearInterval(interval);
        interval = setInterval(nextSlide, 4000);
      });
    });
    btnLeft.addEventListener('click', () => {
      prevSlide();
      clearInterval(interval);
      interval = setInterval(nextSlide, 4000);
    });
    btnRight.addEventListener('click', () => {
      nextSlide();
      clearInterval(interval);
      interval = setInterval(nextSlide, 4000);
    });
    window.addEventListener('resize', setTrackWidth);
    // Inicializar posición
    goToSlide(0);
  })();

  // Slider de productos con desplazamiento horizontal
  // Slider de productos horizontal tipo carta
document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('productSliderTrack');
  const btnLeft = document.getElementById('productSliderBtnLeft');
  const btnRight = document.getElementById('productSliderBtnRight');
  let current = 0;
  const visible = 1; // Cambia a 2 o 3 si quieres más cartas visibles en desktop
  function renderCards() {
    track.innerHTML = '';
    products.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" class="product-card-img" />
        <div class="product-card-body">
          <h3 class="product-card-title">${p.title}</h3>
          <div class="product-card-desc">${p.desc}</div>
          <div class="product-card-price-row">
            <span class="product-card-price-label">Precio online</span>
            <span class="product-card-price">${p.price}</span>
          </div>
          <div class="product-card-icons">
            <i class="fa fa-truck"></i>
            <i class="fa fa-store"></i>
          </div>
          <button class="product-card-btn">Agregar</button>
        </div>
      `;
      track.appendChild(card);
    });
  }
  function updateSlider() {
    const cardWidth = track.querySelector('.product-card').offsetWidth;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
  }
  btnLeft.addEventListener('click', function() {
    if (current > 0) current--;
    updateSlider();
  });
  btnRight.addEventListener('click', function() {
    if (current < products.length - visible) current++;
    updateSlider();
  });
  renderCards();
  setTimeout(updateSlider, 100); // Espera a que se rendericen
  window.addEventListener('resize', updateSlider);
});