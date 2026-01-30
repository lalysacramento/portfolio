document.addEventListener('DOMContentLoaded', () => {

    // Efeito de "scroll suave" para os links
    const scrollLinks = document.querySelectorAll('nav a, .cta-button');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Apenas para links internos que começam com #
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animação de aparição das seções (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up, section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                // Adiciona a classe se quiser controlar via CSS puro
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica o observer em seções que não tem a classe explícita ainda
    document.querySelectorAll('section h2, section p, .servico-item').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    // Lógica para o menu hambúrguer com Animação Stagger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a'); // Pega os links dentro dos LIs

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');

            // Animação sequencial dos links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = ''; // Reseta se fechar
                } else {
                    // Delay baseado no índice (0.1s, 0.2s, etc)
                    link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Fecha o menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                
                // Limpa animação
                navLinksItems.forEach(item => item.style.animation = '');
            }
        });
    });

    // Header muda de cor ao rolar
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
