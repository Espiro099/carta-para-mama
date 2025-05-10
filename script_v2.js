document.addEventListener('DOMContentLoaded', () => {
    const envoltura = document.querySelector(".envoltura-sobre");
    const carta = document.querySelector(".carta");
    let intervaloPetales = null;
    let petalosActivos = false;
    
    // Configuración inicial
    document.documentElement.style.setProperty('--escala', '1.5');
    
    // Cambiar tamaño del sobre y contenido
    function cambiarTamano(escala) {
        document.documentElement.style.setProperty('--escala', escala);
        reiniciarAnimaciones();
        
        // Feedback visual al cambiar tamaño
        const contenedor = document.querySelector('.contenedor');
        contenedor.style.animation = 'none';
        void contenedor.offsetWidth; // Trigger reflow
        contenedor.style.animation = 'escalar 0.5s ease';
    }
    
    // Reiniciar animaciones al cambiar tamaño
    function reiniciarAnimaciones() {
        envoltura.classList.remove("abierto");
        carta.classList.remove("abierta");
        detenerPetales();
    }
    
    // Crear pétalos que caen
    function crearPetales() {
        const petalo = document.createElement("div");
        petalo.className = "petalo";
        
        // Posición aleatoria en la parte superior
        petalo.style.left = Math.random() * 100 + "vw";
        
        // Tamaño y duración aleatorios
        const size = Math.random() * 15 + 10;
        petalo.style.width = size + "px";
        petalo.style.height = size + "px";
        
        // Animación más variada
        const duration = Math.random() * 3 + 3;
        petalo.style.animationDuration = duration + "s";
        
        // Opacidad y rotación inicial aleatoria
        petalo.style.opacity = Math.random() * 0.6 + 0.4;
        petalo.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Color aleatorio dentro de la gama rosa
        const hue = Math.floor(Math.random() * 20 + 340);
        petalo.style.backgroundColor = `hsl(${hue}, 80%, 70%)`;
        
        document.body.appendChild(petalo);
        
        // Eliminar después de la animación
        setTimeout(() => {
            petalo.remove();
        }, duration * 1000);
    }
    
    // Iniciar lluvia de pétalos
    function iniciarPetales() {
        if (!petalosActivos) {
            petalosActivos = true;
            intervaloPetales = setInterval(crearPetales, 200);
            
            // Primeros pétalos más rápidos
            for (let i = 0; i < 10; i++) {
                setTimeout(crearPetales, i * 100);
            }
        }
    }
    
    // Detener lluvia de pétalos
    function detenerPetales() {
        if (intervaloPetales) {
            clearInterval(intervaloPetales);
            intervaloPetales = null;
            petalosActivos = false;
        }
    }
    
    // Abrir la carta con animación
    function abrirCarta() {
        envoltura.classList.add("abierto");
        
        // Animación escalonada
        setTimeout(() => {
            carta.classList.add("abierta");
            iniciarPetales();
            
            // Efecto de confeti al abrir
            for (let i = 0; i < 20; i++) {
                setTimeout(crearPetales, i * 50);
            }
        }, 600);
    }
    
    // Cerrar la carta con animación
    function cerrarCarta() {
        carta.classList.remove("abierta");
        detenerPetales();
        
        setTimeout(() => {
            envoltura.classList.remove("abierto");
        }, 500);
    }
    
    // Manejar clics
    document.addEventListener("click", (e) => {
        const clickEnSobre = e.target.closest(".sobre, .solapa-derecha, .solapa-izquierda, .corazon");
        const clickEnCarta = e.target.closest(".carta, .contenido");
        
        if (clickEnSobre && !envoltura.classList.contains("abierto")) {
            abrirCarta();
        } else if (clickEnCarta && envoltura.classList.contains("abierto")) {
            cerrarCarta();
        }
    });
    
    // Efecto al pasar el ratón sobre el sobre
    envoltura.addEventListener('mouseenter', () => {
        if (!envoltura.classList.contains("abierto")) {
            envoltura.style.transform = 'translateY(-5px)';
        }
    });
    
    envoltura.addEventListener('mouseleave', () => {
        envoltura.style.transform = '';
    });
    
    // Animación CSS para el cambio de tamaño
    const style = document.createElement('style');
    style.textContent = `
        @keyframes escalar {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});