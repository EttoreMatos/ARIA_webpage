/* Patinha da ARIA — páginas auxiliares (legal / acknowledgments) */
(function () {
    const cursor = document.getElementById('cursor');
    const prefersCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (!cursor) return;
    if (prefersCoarse) {
        cursor.style.display = 'none';
        return;
    }

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animCursor() {
        cx += (mx - cx) * 0.2;
        cy += (my - cy) * 0.2;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        requestAnimationFrame(animCursor);
    }
    animCursor();

    const pawEllipses = document.querySelectorAll('#pawSvg ellipse');
    document.querySelectorAll('a, button, .ack-block, .ack-note, .dc-channel, .dc-top-link').forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            pawEllipses.forEach((node) => node.setAttribute('fill', '#FFB347'));
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            pawEllipses.forEach((node) => node.setAttribute('fill', '#FF9A6C'));
        });
    });
})();
