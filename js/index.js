(() => {
    const carousel = document.querySelector('.home-panels');
    const track = carousel.querySelector('.panel-track');
    const slides = [...track.children];
    const links = [...carousel.querySelectorAll('.panel-nav a')];
    const desktop = window.matchMedia('(min-width: 841px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    let timer;

    function select(index) {
        active = index;
        track.style.setProperty('--slide-index', index);
        slides.forEach((slide, i) => {
            slide.inert = desktop.matches && i !== index;
            links[i].parentElement.classList.toggle('is-current', i === index);
        });
    }

    function updateRotation() {
        clearInterval(timer);
        if (desktop.matches && !reducedMotion.matches && !carousel.matches(':hover, :focus-within')) {
            timer = setInterval(() => select((active + 1) % slides.length), 4000);
        }
    }

    function syncLayout() {
        select(desktop.matches ? active : 0);
        if (desktop.matches) {
            track.querySelectorAll('img[loading="lazy"]').forEach(image => {
                image.loading = 'eager';
            });
        }
        updateRotation();
    }

    links.forEach((link, index) => {
        link.addEventListener('pointerenter', event => {
            if (event.pointerType === 'mouse') select(index);
        });
        link.addEventListener('focus', () => select(index));
    });
    carousel.addEventListener('pointerenter', updateRotation);
    carousel.addEventListener('pointerleave', updateRotation);
    carousel.addEventListener('focusin', updateRotation);
    carousel.addEventListener('focusout', () => requestAnimationFrame(updateRotation));
    desktop.addEventListener('change', syncLayout);
    reducedMotion.addEventListener('change', updateRotation);
    syncLayout();
})();
