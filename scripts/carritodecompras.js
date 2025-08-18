   // Elementos
    const btnCart = document.getElementById('btn-cart');
    const btnHistory = document.getElementById('btn-history');
    const cartView = document.getElementById('cart-view');
    const historyView = document.getElementById('history-view');
    const bcCarrito = document.getElementById('bc-carrito');
    const bcHistorial = document.getElementById('bc-historial');

    // Función para mostrar carrito
    function showCart() {
      cartView.classList.add('active');
      historyView.classList.remove('active');
      btnCart.classList.add('active');
      btnHistory.classList.remove('active');
      bcCarrito.classList.add('active');
      bcHistorial.classList.remove('active');
    }

    // Función para mostrar historial
    function showHistory() {
      cartView.classList.remove('active');
      historyView.classList.add('active');
      btnCart.classList.remove('active');
      btnHistory.classList.add('active');
      bcCarrito.classList.remove('active');
      bcHistorial.classList.add('active');
    }

    // Eventos
    btnCart.addEventListener('click', showCart);
    btnHistory.addEventListener('click', showHistory);
    bcHistorial.addEventListener('click', (e) => {
      e.preventDefault();
      showHistory();
    });

    // Por defecto
    showCart();