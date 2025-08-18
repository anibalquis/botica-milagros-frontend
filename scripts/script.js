function applyNow() {
  alert("Redirigiendo a la sección de postulaciones...");
}

function toggleMenu() {
  // Mostrar/ocultar menú de iconos
  const nav = document.getElementById('navIcons');
  nav.classList.toggle('show');
  // Mostrar/ocultar menú principal en móvil
  const mainNav = document.querySelector('.main-nav');
  if (window.innerWidth <= 600) {
    mainNav.classList.toggle('show');
  }
}

// Mostrar menú principal al pasar el mouse sobre 'Inicio' en móvil y tablet
document.addEventListener('DOMContentLoaded', function() {
  const inicioLi = document.querySelector('.main-nav li.inicio');
  const mainNav = document.querySelector('.main-nav');
  if (inicioLi && mainNav) {
    inicioLi.addEventListener('mouseenter', function() {
      if (window.innerWidth <= 1024) {
        mainNav.classList.add('show');
      }
    });
    mainNav.addEventListener('mouseleave', function() {
      if (window.innerWidth <= 1024) {
        mainNav.classList.remove('show');
      }
    });
  }
});

// Mostrar menú principal al pasar el mouse sobre el botón hamburguesa en móvil
// Eliminar eventos de mouse para menú hamburguesa en móvil. Solo abrir/cerrar con click.


//////////////////////////////////////add
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.getElementById('productCarousel');
            const nextButton = document.getElementById('nextButton');
            const indicators = document.querySelectorAll('.indicator');
            let isDown = false;
            let startX;
            let scrollLeft;
            let currentIndex = 0;
            let cardWidth = 285; // Valor inicial, se actualizará en resize
            
            // Función para actualizar el ancho de la tarjeta según el tamaño de pantalla
            function updateCardWidth() {
                const firstCard = carousel.querySelector('.product-card');
                if (firstCard) {
                    cardWidth = firstCard.offsetWidth + 25; // Ancho + gap
                }
            }
            
            // Función para actualizar indicadores
            function updateIndicators(index) {
                indicators.forEach((indicator, i) => {
                    if (i === index) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // Función para avanzar el carrusel
            function nextSlide() {
                if (currentIndex < indicators.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0; // Volver al inicio
                }
                
                carousel.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
                
                updateIndicators(currentIndex);
            }
            
            // Función para retroceder el carrusel
            function prevSlide() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = indicators.length - 1; // Ir al final
                }
                
                carousel.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'smooth'
                });
                
                updateIndicators(currentIndex);
            }
            
            // Evento para el botón siguiente
            nextButton.addEventListener('click', nextSlide);
            
            // Eventos para los indicadores
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    currentIndex = index;
                    
                    carousel.scrollTo({
                        left: currentIndex * cardWidth,
                        behavior: 'smooth'
                    });
                    
                    updateIndicators(currentIndex);
                });
            });
            
            // Implementación del swipe para móviles
            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('mouseleave', () => {
                isDown = false;
            });
            
            carousel.addEventListener('mouseup', () => {
                isDown = false;
                // Actualizar índice basado en la posición actual
                currentIndex = Math.round(carousel.scrollLeft / cardWidth);
                updateIndicators(currentIndex);
            });
            
            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2; // Multiplicador para hacer el scroll más rápido
                carousel.scrollLeft = scrollLeft - walk;
            });
            
            // Para dispositivos táctiles
            carousel.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
            
            carousel.addEventListener('touchend', () => {
                isDown = false;
                // Actualizar índice basado en la posición actual
                currentIndex = Math.round(carousel.scrollLeft / cardWidth);
                updateIndicators(currentIndex);
            });
            
            // Funcionalidad del botón "Ver más productos"
            const pillButton = document.querySelector('.pill-button');
            pillButton.addEventListener('click', function() {
                alert('¡Explorando más productos para bebé!');
            });
            
            // Funcionalidad del botón "Agregar"
            const addButtons = document.querySelectorAll('.add-button');
            addButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('h3').textContent;
                    alert(`Producto "${productName}" agregado al carrito`);
                });
            });
            
            // Detectar cambios en el scroll para actualizar indicadores
            carousel.addEventListener('scroll', function() {
                const scrollPosition = carousel.scrollLeft;
                const newIndex = Math.round(scrollPosition / cardWidth);
                
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateIndicators(currentIndex);
                }
            });
            
            // Actualizar dimensiones al redimensionar la ventana
            window.addEventListener('resize', function() {
                updateCardWidth();
                // Ajustar posición actual al nuevo tamaño
                carousel.scrollTo({
                    left: currentIndex * cardWidth,
                    behavior: 'instant'
                });
            });
            
            // Inicializar dimensiones
            updateCardWidth();
        });

        //ESLIDER PRODUCTO COMERCIAL

        document.addEventListener('DOMContentLoaded', function() {
            const lista = document.getElementById('listaProductos');
            const botonSiguiente = document.getElementById('btnSiguiente');
            const indicadores = document.querySelectorAll('.indicador');
            let presionado = false;
            let posicionInicialX;
            let scrollIzquierda;
            let indiceActual = 0;
            let anchoTarjeta = 285;

            function actualizarAnchoTarjeta() {
                const primeraTarjeta = lista.querySelector('.item-tarjeta');
                if (primeraTarjeta) {
                    anchoTarjeta = primeraTarjeta.offsetWidth + 25;
                }
            }

            function actualizarIndicadores(indice) {
                indicadores.forEach((indicador, i) => {
                    if (i === indice) {
                        indicador.classList.add('activo');
                    } else {
                        indicador.classList.remove('activo');
                    }
                });
            }

            function siguienteElemento() {
                if (indiceActual < indicadores.length - 1) {
                    indiceActual++;
                } else {
                    indiceActual = 0;
                }
                lista.scrollTo({
                    left: indiceActual * anchoTarjeta,
                    behavior: 'smooth'
                });
                actualizarIndicadores(indiceActual);
            }

            function anteriorElemento() {
                if (indiceActual > 0) {
                    indiceActual--;
                } else {
                    indiceActual = indicadores.length - 1;
                }
                lista.scrollTo({
                    left: indiceActual * anchoTarjeta,
                    behavior: 'smooth'
                });
                actualizarIndicadores(indiceActual);
            }

            botonSiguiente.addEventListener('click', siguienteElemento);

            indicadores.forEach(indicador => {
                indicador.addEventListener('click', function() {
                    const indice = parseInt(this.getAttribute('data-index'));
                    indiceActual = indice;
                    lista.scrollTo({
                        left: indiceActual * anchoTarjeta,
                        behavior: 'smooth'
                    });
                    actualizarIndicadores(indiceActual);
                });
            });

            lista.addEventListener('mousedown', (e) => {
                presionado = true;
                posicionInicialX = e.pageX - lista.offsetLeft;
                scrollIzquierda = lista.scrollLeft;
            });

            lista.addEventListener('mouseleave', () => {
                presionado = false;
            });

            lista.addEventListener('mouseup', () => {
                presionado = false;
                indiceActual = Math.round(lista.scrollLeft / anchoTarjeta);
                actualizarIndicadores(indiceActual);
            });

            lista.addEventListener('mousemove', (e) => {
                if (!presionado) return;
                e.preventDefault();
                const x = e.pageX - lista.offsetLeft;
                const recorrido = (x - posicionInicialX) * 2;
                lista.scrollLeft = scrollIzquierda - recorrido;
            });

            lista.addEventListener('touchstart', (e) => {
                presionado = true;
                posicionInicialX = e.touches[0].pageX - lista.offsetLeft;
                scrollIzquierda = lista.scrollLeft;
            });

            lista.addEventListener('touchmove', (e) => {
                if (!presionado) return;
                e.preventDefault();
                const x = e.touches[0].pageX - lista.offsetLeft;
                const recorrido = (x - posicionInicialX) * 2;
                lista.scrollLeft = scrollIzquierda - recorrido;
            });

            lista.addEventListener('touchend', () => {
                presionado = false;
                indiceActual = Math.round(lista.scrollLeft / anchoTarjeta);
                actualizarIndicadores(indiceActual);
            });

            const botonVerMas = document.querySelector('.boton-redondo');
            botonVerMas.addEventListener('click', function() {
                alert('¡Explorando más productos para bebé!');
            });

            const botonesAgregar = document.querySelectorAll('.boton-anadir');
            botonesAgregar.forEach(boton => {
                boton.addEventListener('click', function() {
                    const tarjeta = this.closest('.item-tarjeta');
                    const nombreProducto = tarjeta.querySelector('h3').textContent;
                    alert(`Producto "${nombreProducto}" agregado al carrito`);
                });
            });

            lista.addEventListener('scroll', function() {
                const posicion = lista.scrollLeft;
                const nuevoIndice = Math.round(posicion / anchoTarjeta);
                if (nuevoIndice !== indiceActual) {
                    indiceActual = nuevoIndice;
                    actualizarIndicadores(indiceActual);
                }
            });

            window.addEventListener('resize', function() {
                actualizarAnchoTarjeta();
                lista.scrollTo({
                    left: indiceActual * anchoTarjeta,
                    behavior: 'instant'
                });
            });

            actualizarAnchoTarjeta();
        });
// Datos de productops de elider de productos 2
const products = [
  {
    img: 'https://i.imgur.com/4QfKuz1.png',
    title: 'Agua oxigenada Vol. 10 250.ml',
    desc: 'Frasco x 250ml',
    price: 's/1.60',
    online: true
  },
  {
    img: 'https://i.imgur.com/4QfKuz1.png',
    title: 'Paracetamol 500mg 20 tabs',
    desc: 'Caja x 20',
    price: 's/2.50',
    online: true
  },
  {
    img: 'https://i.imgur.com/4QfKuz1.png',
    title: 'Alcohol 70% 250ml',
    desc: 'Frasco x 250ml',
    price: 's/2.00',
    online: true
  },
  {
    img: 'https://i.imgur.com/4QfKuz1.png',
    title: 'Ibuprofeno 400mg 10 tabs',
    desc: 'Caja x 10',
    price: 's/3.20',
    online: true
  },
  {
    img: 'https://i.imgur.com/4QfKuz1.png',
    title: 'Vitamina C 500mg 30 tabs',
    desc: 'Caja x 30',
    price: 's/4.50',
    online: true
  }
];

const track = document.getElementById("productSliderTrack");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.img}" alt="${product.title}" class="product-img">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-desc">${product.desc}</p>
    <span class="product-price">${product.price}</span>
    ${product.online ? '<span class="product-online">Online</span>' : ''}
  `;
  track.appendChild(card);
});

// slider productos tipo carta cuidado personal
  function scrollSlider(direction) {
    const track = document.getElementById("sliderTrack");
    const scrollAmount = 320;
    track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }

//MENU FLOTANTE de carrito
        const cartOpenTrigger = document.getElementById('cart-open-trigger');
        const cartCloseTrigger = document.getElementById('cart-close-trigger');
        const cartOverlay = document.getElementById('cart-overlay');
        const cartDrawer = document.getElementById('cart-drawer');

        // Abrir carrito
        cartOpenTrigger.addEventListener('click', () => {
            cartDrawer.classList.add('cart-open');
            cartOverlay.style.display = 'block';
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
            }, 10);
        });

        // Cerrar carrito
        const closeCartDrawer = () => {
            cartDrawer.classList.remove('cart-open');
            cartOverlay.style.opacity = '0';
            setTimeout(() => {
                cartOverlay.style.display = 'none';
            }, 300);
        };

        cartCloseTrigger.addEventListener('click', closeCartDrawer);
        cartOverlay.addEventListener('click', closeCartDrawer);
    
    //funcion de la ventna flotanten de usuario
        const perfilBtn = document.getElementById('perfilBtn');
    const menuPerfil = document.getElementById('menuPerfil');

    perfilBtn.addEventListener('click', () => {
      const visible = menuPerfil.style.display === 'block';
      menuPerfil.style.display = visible ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!perfilBtn.contains(e.target) && !menuPerfil.contains(e.target)) {
        menuPerfil.style.display = 'none';
      }
    });

//menu flotante de notificaciones

    const btnUsuario = document.getElementById('btnUsuario');
    const btnAvisos = document.getElementById('btnAvisos');
    const menuUsuario = document.getElementById('menuUsuario');
    const cajaAvisos = document.getElementById('cajaAvisos');

    btnUsuario.addEventListener('click', () => {
      const visible = menuUsuario.style.display === 'block';
      menuUsuario.style.display = visible ? 'none' : 'block';
      cajaAvisos.style.display = 'none';
    });

    btnAvisos.addEventListener('click', () => {
      const visible = cajaAvisos.style.display === 'block';
      cajaAvisos.style.display = visible ? 'none' : 'block';
      menuUsuario.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
      if (!btnUsuario.contains(e.target) && !menuUsuario.contains(e.target) &&
          !btnAvisos.contains(e.target) && !cajaAvisos.contains(e.target)) {
        menuUsuario.style.display = 'none';
        cajaAvisos.style.display = 'none';
      }
    });