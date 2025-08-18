    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const image = document.getElementById("mainImage");
    const container = document.getElementById("container");

    document.getElementById("toRegister").addEventListener("click", () => {
      loginForm.classList.remove("active");
      registerForm.classList.add("active");
      image.src = "./img/registrarimagen.png";
      container.classList.add("register-mode");
    });

    document.getElementById("toLogin").addEventListener("click", () => {
      registerForm.classList.remove("active");
      loginForm.classList.add("active");
      image.src = "./img/loginimagen.png";
      container.classList.remove("register-mode");
    });

    function togglePassword(id) {
      const input = document.getElementById(id);
      if (input) input.type = input.type === "password" ? "text" : "password";
    }