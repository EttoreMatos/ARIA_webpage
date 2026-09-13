/* ══════════════════════════════════════
   CURSOR CUSTOMIZADO (PATINHA SUAVE)
══════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const prefersCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
let mx = 0, my = 0;
let cx = 0, cy = 0;

if (cursor && !prefersCoarse) {
    document.addEventListener('mousemove', e => {
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
    document.querySelectorAll('a, button, .feature-card, .command-item, .cmd-tab, .plan-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            pawEllipses.forEach(e => e.setAttribute('fill', '#FFB347'));
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            pawEllipses.forEach(e => e.setAttribute('fill', '#FF9A6C'));
        });
    });

    document.querySelectorAll('input').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.opacity = '0'; });
        el.addEventListener('mouseleave', () => { cursor.style.opacity = '1'; });
    });
} else if (cursor) {
    cursor.style.display = 'none';
}

/* ══════════════════════════════════════
   PARALLAX SUAVE NA IMAGEM DA ARIA
══════════════════════════════════════ */
const ariaImg = document.getElementById('heroImage');
if (ariaImg && !prefersCoarse) {
    document.addEventListener('mousemove', e => {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        const dx = (e.clientX - x) / 40;
        const dy = (e.clientY - y) / 40;
        ariaImg.style.transform = `translate(${dx}px, ${dy}px) rotateY(${dx / 2}deg) rotateX(${-dy / 2}deg)`;
    });
}

/* ══════════════════════════════════════
   POEIRA MÁGICA INTERATIVA (PARTÍCULAS)
══════════════════════════════════════ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Cores mágicas que combinam com os olhos e pelagem da Aria
const COLORS = [
    'rgba(242, 117, 42, 0.45)',  // Laranja Aria
    'rgba(176, 82, 209, 0.35)',  // Roxo Mágico
    'rgba(255, 154, 108, 0.4)',  // Laranja Claro
    'rgba(255, 255, 255, 0.18)'   // Brilho Estelar
];

const particlesCount = (canvas && ctx)
    ? (window.matchMedia('(max-width: 768px)').matches ? 22 : 55)
    : 0;
const particles = (canvas && ctx)
    ? Array.from({ length: particlesCount }, () => createParticle(true))
    : [];

function createParticle(randomY = false) {
    const w = canvas ? canvas.width : window.innerWidth;
    const h = canvas ? canvas.height : window.innerHeight;
    return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : h + 15,
        r: Math.random() * 2.2 + 0.6, // Tamanhos variados para profundidade 3D
        speedY: Math.random() * 0.4 + 0.15, // Velocidade suave de subida (estilo brasas)
        speedX: (Math.random() - 0.5) * 0.12, // Pequeno desvio lateral
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.02 + 0.005,
        baseAlpha: Math.random() * 0.4 + 0.2
    };
}

function drawParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.phase += p.phaseSpeed;
        
        // Oscilação de tamanho e opacidade (Efeito cintilante de pirilampos)
        const pulse = Math.sin(p.phase);
        const currentAlpha = Math.max(0.05, p.baseAlpha + pulse * 0.15);
        const currentRadius = Math.max(0.4, p.r + pulse * 0.3);
        
        // Movimento ascendente e agitação horizontal natural
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.phase) * 0.08;
        
        // Repulsão suave do rato (interação física mágica com a patinha)
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        
        if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Afasta as partículas levemente em rota oposta ao cursor
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
        }
        
        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        
        const baseColor = p.color.substring(0, p.color.lastIndexOf(','));
        ctx.fillStyle = `${baseColor}, ${currentAlpha})`;
        ctx.fill();
        
        // Reposicionar no fundo se passar o topo ou sair demasiado do ecrã
        if (p.y < -15 || p.x < -15 || p.x > canvas.width + 15) {
            Object.assign(p, createParticle(false));
        }
    });
    
    requestAnimationFrame(drawParticles);
}
if (canvas && ctx) drawParticles();

/* ══════════════════════════════════════
   NAVBAR SCROLL (GLASSMORPHISM) + FAB
══════════════════════════════════════ */
function updateScrollChrome() {
    const nav = document.getElementById('navbar');
    const fab = document.getElementById('discordFab');
    const leftHome = window.scrollY > 80;
    if (nav) nav.classList.toggle('scrolled', leftHome);
    if (fab) fab.classList.toggle('is-visible', leftHome);
}
window.addEventListener('scroll', updateScrollChrome, { passive: true });
updateScrollChrome();

/* ══════════════════════════════════════
   MENU MOBILE
══════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const navBackdrop = document.getElementById('navBackdrop');
const primaryNav = document.getElementById('primaryNav');

function setMobileNav(open) {
    document.body.classList.toggle('nav-open', open);
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    }
    if (navBackdrop) {
        navBackdrop.hidden = !open;
        navBackdrop.classList.toggle('is-open', open);
    }
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        setMobileNav(!document.body.classList.contains('nav-open'));
    });
}
if (navBackdrop) {
    navBackdrop.addEventListener('click', () => setMobileNav(false));
}
if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMobileNav(false));
    });
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMobileNav(false);
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMobileNav(false);
});

document.querySelectorAll('.discord-fab, .footer-discord').forEach((el) => {
    if (!cursor || prefersCoarse) return;
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ══════════════════════════════════════
   SMOOTH SCROLL PARA LINKS INTERNOS
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;
        const t = document.querySelector(targetId);
        if (t) {
            const yOffset = -80; 
            const y = t.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
});

/* ══════════════════════════════════════
   HINT DE SCROLL (FIXO NA VIEWPORT / SOME AO SAIR DA HOME)
══════════════════════════════════════ */
const heroScrollHint = document.getElementById('heroScrollHint');
const heroSection = document.getElementById('home');
const statsSection = document.getElementById('stats');
if (heroScrollHint && heroSection && statsSection) {
    let heroVisible = true;
    let statsVisible = false;

    const updateHint = () => {
        // Só aparece na home; some ao ver stats e não volta ao descer mais
        heroScrollHint.classList.toggle('is-away', !heroVisible || statsVisible);
    };

    new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        updateHint();
    }, { threshold: 0.2 }).observe(heroSection);

    new IntersectionObserver(([entry]) => {
        statsVisible = entry.isIntersecting;
        updateHint();
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }).observe(statsSection);
}

/* ══════════════════════════════════════
   SCROLL REVEAL (ANIMAÇÃO AO DESCER A TELA)
══════════════════════════════════════ */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════
   SISTEMA DE ABAS (TABS) DOS COMANDOS
══════════════════════════════════════ */
document.querySelectorAll('.cmd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cmd-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.cmd-panel').forEach(p => p.classList.remove('active'));
        
        tab.classList.add('active');
        const panel = document.getElementById(tab.dataset.target);
        panel.classList.add('active');
        
        panel.querySelectorAll('.reveal').forEach((el, i) => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), i * 60);
        });
    });
});

setTimeout(() => {
    document.querySelectorAll('#tab-geral .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
    });
}, 500);

/* ══════════════════════════════════════
   ANIMAÇÃO DAS ESTATÍSTICAS (CONTADOR)
══════════════════════════════════════ */
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.getAttribute('data-target'));
            const duration = 2000; 
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    target.innerText = Math.floor(easeProgress * finalValue);
                    requestAnimationFrame(updateCounter);
                } else {
                    target.innerText = finalValue;
                }
            }
            requestAnimationFrame(updateCounter);
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

/* ══════════════════════════════════════
   ARIA API (auth / checkout / billing)
══════════════════════════════════════ */
window.ARIA_API_BASE_URL = window.ARIA_API_BASE_URL || 'https://aria-api-xq1h.onrender.com';
const ARIA_SESSION_KEY = 'aria_session_token';
const ARIA_PENDING_KEY = 'aria_pending_action';
const ARIA_AUTH_BUILD = '20260913-ux-v8';
const ARIA_PENDING_GUILD_KEY = 'aria_pending_guild_id';
const ARIA_BOT_CLIENT_ID = '1439670009147293906';
const ARIA_BOT_PERMISSIONS = '5419235387371120';
const ARIA_AUTH_MSG = 'aria-auth';
const authStore = (() => {
    try { return window.localStorage; } catch (_) { /* ignore */ }
    try { return window.sessionStorage; } catch (_) { /* ignore */ }
    const mem = Object.create(null);
    return {
        getItem: (key) => (key in mem ? mem[key] : null),
        setItem: (key, value) => { mem[key] = String(value); },
        removeItem: (key) => { delete mem[key]; },
    };
})();
try {
    const legacy = sessionStorage.getItem(ARIA_SESSION_KEY);
    if (legacy && !authStore.getItem(ARIA_SESSION_KEY)) {
        authStore.setItem(ARIA_SESSION_KEY, legacy);
    }
    sessionStorage.removeItem(ARIA_SESSION_KEY);
} catch (_) { /* ignore */ }
const DEFAULT_AVATAR = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#5865F2"/><circle cx="32" cy="24" r="12" fill="#fff"/><path d="M12 54c4-12 14-18 20-18s16 6 20 18" fill="#fff"/></svg>'
);

const ariaApi = {
    base: () => String(window.ARIA_API_BASE_URL || '').replace(/\/$/, ''),
    getToken() {
        try { return authStore.getItem(ARIA_SESSION_KEY) || ''; }
        catch (_) { return ''; }
    },
    setToken(token) {
        try {
            if (token) authStore.setItem(ARIA_SESSION_KEY, token);
            else authStore.removeItem(ARIA_SESSION_KEY);
        } catch (_) { /* ignore */ }
    },
    getPendingAction() {
        try { return authStore.getItem(ARIA_PENDING_KEY) || ''; }
        catch (_) { return ''; }
    },
    setPendingAction(action) {
        try {
            if (action) authStore.setItem(ARIA_PENDING_KEY, action);
            else authStore.removeItem(ARIA_PENDING_KEY);
        } catch (_) { /* ignore */ }
    },
    getPendingGuildId() {
        try { return authStore.getItem(ARIA_PENDING_GUILD_KEY) || ''; }
        catch (_) { return ''; }
    },
    setPendingGuildId(guildId) {
        try {
            if (guildId) authStore.setItem(ARIA_PENDING_GUILD_KEY, String(guildId));
            else authStore.removeItem(ARIA_PENDING_GUILD_KEY);
        } catch (_) { /* ignore */ }
    },
    async request(path, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        };
        const token = this.getToken();
        if (token) headers.Authorization = `Bearer ${token}`;
        const response = await fetch(`${this.base()}${path}`, {
            credentials: 'include',
            ...options,
            headers,
        });
        let data = null;
        try { data = await response.json(); } catch (_) { data = null; }
        if (!response.ok) {
            const detail = (data && (data.detail || data.error)) || `HTTP ${response.status}`;
            throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
        }
        return data;
    },
    loginUrl() {
        return `${this.base()}/api/auth/discord/login`;
    },
    async logout() {
        try { await this.request('/api/auth/logout', { method: 'POST' }); }
        finally {
            this.setToken('');
            this.setPendingAction('');
            this.setPendingGuildId('');
        }
    },
    me() { return this.request('/api/auth/me'); },
    guilds() { return this.request('/api/guilds'); },
    checkoutUser() {
        return this.request('/api/checkout/user', {
            method: 'POST',
            body: JSON.stringify({ plan: 'USER_PREMIUM' }),
        });
    },
    checkoutGuild(guildId) {
        return this.request('/api/checkout/guild', {
            method: 'POST',
            body: JSON.stringify({ plan: 'SERVER_PREMIUM', guild_id: String(guildId) }),
        });
    },
    portal() {
        return this.request('/api/billing/portal', { method: 'POST' });
    },
};

let authPopupRef = null;
let authPopupPoll = null;
let billingBusy = false;
let lastAuthSnapshot = { authenticated: false, isPremium: false };
let cachedGuilds = [];
let pendingInviteGuild = null;


function friendlyBillingError(err, fallback) {
    const raw = String(err && err.message ? err.message : err || '');
    if (/stripe|price|secret|api key|not configured|misconfigured/i.test(raw)) {
        return 'Checkout indisponível: Stripe ainda não está configurado na API (chaves/preços de teste).';
    }
    if (/network|failed to fetch|load failed/i.test(raw)) {
        return 'Não foi possível contactar a API. Verifica a ligação ou se o serviço no Render está online.';
    }
    return raw || fallback;
}

function inferStatusTone(message) {
    const msg = String(message || '');
    if (/recebido|sucesso|concluído|ativo|aberta|aberto/i.test(msg)) return 'success';
    if (/cancel|falha|erro|indispon|impossível|não foi|invalid/i.test(msg)) return 'error';
    if (/permite|aguarda|entra|escolhe|ainda não/i.test(msg)) return 'warn';
    return 'info';
}

function statusTitleFor(tone, customTitle) {
    if (customTitle) return customTitle;
    if (tone === 'success') return 'Tudo certo';
    if (tone === 'error') return 'Algo correu mal';
    if (tone === 'warn') return 'Atenção';
    return 'Aviso';
}

function statusIconFor(tone) {
    if (tone === 'success') return '✓';
    if (tone === 'error') return '!';
    if (tone === 'warn') return '⚠';
    return 'ℹ';
}

function closeStatusModal() {
    const modal = document.getElementById('statusModal');
    if (!modal) return;
    modal.classList.remove('is-visible', 'is-success', 'is-error', 'is-warn', 'is-info');
    modal.setAttribute('aria-hidden', 'true');
}

let topToastTimer = null;
let topToastHideTimer = null;

function hideTopToast() {
    const toast = document.getElementById('topToast');
    if (!toast) return;
    toast.classList.remove('is-visible');
    toast.classList.add('is-leaving');
    clearTimeout(topToastHideTimer);
    topToastHideTimer = setTimeout(() => {
        toast.classList.remove('is-leaving');
        toast.setAttribute('aria-hidden', 'true');
    }, 360);
}

function showTopToast(message) {
    const toast = document.getElementById('topToast');
    const textEl = document.getElementById('topToastText');
    if (!toast || !textEl) return;
    clearTimeout(topToastTimer);
    clearTimeout(topToastHideTimer);
    textEl.textContent = String(message || '');
    toast.classList.remove('is-leaving');
    toast.classList.add('is-visible');
    toast.setAttribute('aria-hidden', 'false');
    topToastTimer = setTimeout(hideTopToast, 3000);
}

function showStatusPopup(message, options = {}) {
    const modal = document.getElementById('statusModal');
    const titleEl = document.getElementById('statusModalTitle');
    const textEl = document.getElementById('statusModalText');
    const iconEl = document.getElementById('statusModalIcon');
    if (!modal || !titleEl || !textEl) return;
    const tone = options.tone || inferStatusTone(message);
    modal.classList.remove('is-success', 'is-error', 'is-warn', 'is-info');
    modal.classList.add('is-visible', `is-${tone}`);
    modal.setAttribute('aria-hidden', 'false');
    titleEl.textContent = statusTitleFor(tone, options.title);
    textEl.textContent = String(message || '');
    if (iconEl) iconEl.textContent = statusIconFor(tone);
}

function showBillingBanner(message) {
    showStatusPopup(message);
}

function setAuthWaiting(visible) {
    const overlay = document.getElementById('authWaitingOverlay');
    if (!overlay) return;
    overlay.classList.toggle('is-visible', !!visible);
    overlay.setAttribute('aria-hidden', visible ? 'false' : 'true');
    if (!visible && authPopupPoll) {
        clearInterval(authPopupPoll);
        authPopupPoll = null;
    }
}

function setButtonLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
        if (!btn.dataset.htmlBackup) {
            btn.dataset.htmlBackup = btn.innerHTML;
        }
        if (!btn.dataset.labelBackup) {
            btn.dataset.labelBackup = btn.textContent.trim();
        }
        btn.classList.add('is-loading');
        btn.setAttribute('aria-busy', 'true');
        btn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span><span class="sr-only">A carregar…</span>';
        return;
    }
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
    if (btn.dataset.htmlBackup) {
        btn.innerHTML = btn.dataset.htmlBackup;
        delete btn.dataset.htmlBackup;
        return;
    }
    const backup = btn.dataset.labelBackup;
    if (backup) {
        btn.textContent = backup;
        delete btn.dataset.labelBackup;
    }
}

function setBillingBusy(busy, label, activeBtnId) {
    billingBusy = !!busy;
    const ids = ['btnCheckoutUser', 'btnCheckoutGuild', 'btnManageBilling', 'navManagePlanBtn', 'guildInviteDoneBtn', 'guildInviteAgainBtn'];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.disabled = billingBusy;
        const shouldSpin = billingBusy && (
            activeBtnId ? id === activeBtnId : !!label
        );
        if (shouldSpin) setButtonLoading(el, true);
        else if (!billingBusy) setButtonLoading(el, false);
        else if (el.classList.contains('is-loading') && activeBtnId && id !== activeBtnId) {
            setButtonLoading(el, false);
        }
    });
    if (!billingBusy) updateBillingCtas(lastAuthSnapshot);
}

function updateBillingCtas(state) {
    const authenticated = !!(state && state.authenticated);
    const isPremium = !!(state && state.isPremium);
    const checkoutBtn = document.getElementById('btnCheckoutUser');
    const manageBtn = document.getElementById('btnManageBilling');
    const navManageBtn = document.getElementById('navManagePlanBtn');
    const navManageDivider = document.getElementById('navManagePlanDivider');
    const guildBtn = document.getElementById('btnCheckoutGuild');

    if (manageBtn) {
        manageBtn.hidden = !(authenticated && isPremium);
        manageBtn.disabled = billingBusy || manageBtn.hidden;
        if (!billingBusy && !manageBtn.classList.contains('is-loading')) {
            manageBtn.dataset.labelBackup = 'Gerenciar assinatura';
            if (!manageBtn.textContent.trim() || manageBtn.querySelector('.btn-spinner')) {
                manageBtn.textContent = 'Gerenciar assinatura';
            }
        }
    }
    if (navManageBtn) {
        const showManage = authenticated && isPremium;
        navManageBtn.hidden = !showManage;
        if (navManageDivider) navManageDivider.hidden = !showManage;
    }
    if (checkoutBtn) {
        if (authenticated && isPremium) {
            checkoutBtn.hidden = true;
            setButtonLoading(checkoutBtn, false);
        } else {
            checkoutBtn.hidden = false;
            if (!billingBusy) {
                setButtonLoading(checkoutBtn, false);
                checkoutBtn.textContent = 'Assinar Premium';
                checkoutBtn.dataset.labelBackup = 'Assinar Premium';
            }
            checkoutBtn.disabled = billingBusy;
        }
    }
    if (guildBtn) {
        guildBtn.disabled = billingBusy;
        if (!billingBusy) {
            setButtonLoading(guildBtn, false);
            if (!guildBtn.dataset.labelBackup) guildBtn.dataset.labelBackup = 'Assinar para servidor';
            if (!guildBtn.querySelector('.btn-spinner')) {
                guildBtn.textContent = guildBtn.dataset.labelBackup || 'Assinar para servidor';
            }
        }
    }
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function applyUserBanner(user) {
    const banner = document.getElementById('navUserBanner');
    if (!banner) return;
    banner.classList.remove('has-image', 'has-color');
    banner.style.backgroundImage = '';
    banner.style.backgroundColor = '';
    if (user && user.banner_url) {
        banner.classList.add('has-image');
        banner.style.backgroundImage = `url("${String(user.banner_url).replace(/"/g, '')}")`;
        return;
    }
    if (user && user.banner_color) {
        banner.classList.add('has-color');
        banner.style.backgroundColor = String(user.banner_color);
    }
}

function setLoggedInUi(user, premium) {
    const loginBtn = document.getElementById('navLoginBtn');
    const chip = document.getElementById('navUserChip');
    const avatar = document.getElementById('navUserAvatar');
    const menuAvatar = document.getElementById('navUserMenuAvatar');
    const nameEl = document.getElementById('navUserName');
    const planEl = document.getElementById('navUserPlan');
    if (!chip || !avatar || !nameEl || !planEl) return;

    const label = user.display_name || user.username || 'Conta Discord';
    const isPremium = !!(premium && premium.enabled);
    const src = user.avatar_url || DEFAULT_AVATAR;
    avatar.src = src;
    avatar.alt = label;
    if (menuAvatar) {
        menuAvatar.src = src;
        menuAvatar.alt = label;
    }
    nameEl.textContent = label;
    planEl.textContent = isPremium ? 'Premium' : 'Conta gratuita';
    planEl.classList.toggle('is-premium', isPremium);
    applyUserBanner(user);
    if (loginBtn) loginBtn.style.display = 'none';
    chip.classList.add('is-visible');
    lastAuthSnapshot = { authenticated: true, isPremium };
    updateBillingCtas(lastAuthSnapshot);
}

function setLoggedOutUi() {
    const loginBtn = document.getElementById('navLoginBtn');
    const chip = document.getElementById('navUserChip');
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (chip) chip.classList.remove('is-visible');
    closeNavUserMenu();
    applyUserBanner(null);
    lastAuthSnapshot = { authenticated: false, isPremium: false };
    updateBillingCtas(lastAuthSnapshot);
}

function closeNavUserMenu() {
    const menu = document.getElementById('navUserMenu');
    const trigger = document.getElementById('navUserTrigger');
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function toggleNavUserMenu() {
    const menu = document.getElementById('navUserMenu');
    const trigger = document.getElementById('navUserTrigger');
    if (!menu || !trigger) return;
    const open = menu.hidden;
    menu.hidden = !open;
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function guildIconUrl(guild) {
    if (guild && guild.icon && guild.guild_id) {
        return `https://cdn.discordapp.com/icons/${guild.guild_id}/${guild.icon}.png?size=128`;
    }
    return '';
}

function guildInitial(name) {
    const text = String(name || '?').trim();
    return (text.charAt(0) || '?').toUpperCase();
}

function botInviteUrl(guildId) {
    const params = new URLSearchParams({
        client_id: ARIA_BOT_CLIENT_ID,
        permissions: ARIA_BOT_PERMISSIONS,
        integration_type: '0',
        scope: 'bot',
    });
    if (guildId) {
        params.set('guild_id', String(guildId));
        params.set('disable_guild_select', 'true');
    }
    return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

function setGuildModalVisible(visible) {
    const modal = document.getElementById('guildModal');
    if (!modal) return;
    modal.classList.toggle('is-visible', !!visible);
    modal.setAttribute('aria-hidden', visible ? 'false' : 'true');
    if (!visible) {
        pendingInviteGuild = null;
        showGuildPickView();
    }
}

function showGuildPickView() {
    const pick = document.getElementById('guildModalPickView');
    const invite = document.getElementById('guildModalInviteView');
    if (pick) pick.hidden = false;
    if (invite) invite.hidden = true;
}

function showGuildInviteView(guild) {
    const pick = document.getElementById('guildModalPickView');
    const invite = document.getElementById('guildModalInviteView');
    const hint = document.getElementById('guildModalInviteHint');
    const title = document.getElementById('guildModalInviteTitle');
    if (pick) pick.hidden = true;
    if (invite) invite.hidden = false;
    const name = (guild && guild.name) || 'servidor';
    if (title) title.textContent = 'Adiciona a ARIA';
    if (hint) {
        hint.textContent = `A ARIA ainda não está em “${name}”. Abre o Discord, adiciona-a e volta aqui para continuar o pagamento.`;
    }
}

function renderGuildBalloons(guilds) {
    const grid = document.getElementById('guildBalloonGrid');
    const empty = document.getElementById('guildModalEmpty');
    if (!grid) return;
    cachedGuilds = Array.isArray(guilds) ? guilds : [];
    if (!cachedGuilds.length) {
        grid.innerHTML = '';
        if (empty) empty.hidden = false;
        return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = cachedGuilds.map((g) => {
        const name = escapeHtml(g.name || g.guild_id);
        const ready = !!g.aria_present;
        const icon = guildIconUrl(g);
        const avatarHtml = icon
            ? `<img class="guild-balloon-avatar" src="${escapeHtml(icon)}" alt="" loading="lazy">`
            : `<span class="guild-balloon-avatar guild-balloon-fallback" aria-hidden="true">${escapeHtml(guildInitial(g.name))}</span>`;
        return `
            <button type="button" class="guild-balloon ${ready ? 'is-ready' : ''}" data-guild-id="${escapeHtml(g.guild_id)}" title="${name}">
                ${avatarHtml}
                <span class="guild-balloon-name">${name}</span>
            </button>
        `;
    }).join('');
}

function openBotInvite(guildId) {
    const url = botInviteUrl(guildId);
    const popup = window.open(url, '_blank');
    if (!popup || popup.closed) {
        window.location.href = url;
    }
}

async function onGuildBalloonClick(guildId) {
    const guild = cachedGuilds.find((g) => String(g.guild_id) === String(guildId));
    if (!guild) return;
    if (guild.aria_present) {
        setGuildModalVisible(false);
        await startGuildCheckout(guild.guild_id);
        return;
    }
    pendingInviteGuild = guild;
    ariaApi.setPendingGuildId(guild.guild_id);
    showGuildInviteView(guild);
    openBotInvite(guild.guild_id);
}

async function recheckGuildAfterInvite() {
    const guildId = (pendingInviteGuild && pendingInviteGuild.guild_id) || ariaApi.getPendingGuildId();
    if (!guildId || billingBusy) return;
    setBillingBusy(true, null, 'guildInviteDoneBtn');
    try {
        const data = await ariaApi.guilds();
        const guilds = (data.guilds || []).filter((g) => g.can_manage);
        renderGuildBalloons(guilds);
        const match = guilds.find((g) => String(g.guild_id) === String(guildId));
        if (match && match.aria_present) {
            ariaApi.setPendingGuildId('');
            pendingInviteGuild = null;
            setGuildModalVisible(false);
            setBillingBusy(false);
            await startGuildCheckout(match.guild_id);
            return;
        }
        showGuildInviteView(match || pendingInviteGuild || { guild_id: guildId, name: 'servidor' });
        showBillingBanner('Ainda não detetei a ARIA nesse servidor. Confirma o convite e tenta outra vez.');
    } catch (err) {
        showBillingBanner(friendlyBillingError(err, 'Falha ao verificar o servidor.'));
    } finally {
        setBillingBusy(false);
    }
}

async function refreshAuthUi() {
    const loginBtn = document.getElementById('navLoginBtn');
    const chip = document.getElementById('navUserChip');
    if (!loginBtn && !chip) return null;
    try {
        const me = await ariaApi.me();
        if (me.authenticated && me.user) {
            setLoggedInUi(me.user, me.premium);
        } else {
            setLoggedOutUi();
        }
        return me;
    } catch (_) {
        setLoggedOutUi();
        return null;
    }
}

function notifyOpenerAuth(payload) {
    if (!window.opener || window.opener.closed) return false;
    try {
        window.opener.postMessage({ type: ARIA_AUTH_MSG, ...payload }, window.location.origin);
        return true;
    } catch (_) {
        return false;
    }
}

function requireLoginThen(action) {
    ariaApi.setPendingAction(action);
    const pricing = document.getElementById('pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showBillingBanner('Entra com Discord para continuar. Depois seguimos para o pagamento.');
    startDiscordLogin();
}

function startDiscordLogin() {
    const url = ariaApi.loginUrl();
    // Nova aba com opener (sem noopener) para postMessage do token de volta.
    authPopupRef = window.open(url, '_blank');
    const opened = !!(authPopupRef && !authPopupRef.closed);
    if (!opened) {
        showBillingBanner('Permite pop-ups para autenticar, ou o login abre nesta aba.');
        window.location.href = url;
        return;
    }
    setAuthWaiting(true);
    if (authPopupPoll) clearInterval(authPopupPoll);
    authPopupPoll = setInterval(() => {
        if (!authPopupRef || authPopupRef.closed) {
            clearInterval(authPopupPoll);
            authPopupPoll = null;
            // Sempre libertar a UI — o overlay preso bloqueava os botões.
            setAuthWaiting(false);
        }
    }, 700);
}

async function startUserCheckout() {
    if (billingBusy) return;
    setBillingBusy(true, 'A redirecionar…', 'btnCheckoutUser');
    try {
        const me = await ariaApi.me();
        if (!me.authenticated) {
            setBillingBusy(false);
            requireLoginThen('checkout_user');
            return;
        }
        if (me.premium && me.premium.enabled) {
            ariaApi.setPendingAction('');
            setBillingBusy(false);
            showBillingBanner('Já tens Aria Premium ativo.');
            await refreshAuthUi();
            return;
        }
        const session = await ariaApi.checkoutUser();
        const url = session && (session.checkout_url || session.url);
        if (!url) throw new Error('A API não devolveu o link do Stripe Checkout.');
        ariaApi.setPendingAction('');
        window.location.href = url;
    } catch (err) {
        setBillingBusy(false);
        const msg = friendlyBillingError(err, 'Não foi possível iniciar o checkout.');
        if (/401|unauthor|não autentic|not authenticated|login/i.test(String(err && err.message ? err.message : err))) {
            ariaApi.setToken('');
            requireLoginThen('checkout_user');
            return;
        }
        showBillingBanner(msg);
    }
}

async function openGuildPicker() {
    if (billingBusy) return;
    setBillingBusy(true, null, 'btnCheckoutGuild');
    try {
        const me = await ariaApi.me();
        if (!me.authenticated) {
            setBillingBusy(false);
            requireLoginThen('checkout_guild');
            return;
        }
        const data = await ariaApi.guilds();
        const manageable = (data.guilds || []).filter((g) => g.can_manage);
        if (!manageable.length) {
            showBillingBanner('Nenhum servidor com permissão de administrador encontrado.');
            return;
        }
        renderGuildBalloons(manageable);
        showGuildPickView();
        setGuildModalVisible(true);
        ariaApi.setPendingAction('');
    } catch (err) {
        const msg = String(err && err.message ? err.message : err);
        if (/401|unauthor|não autentic|not authenticated|login/i.test(msg)) {
            ariaApi.setToken('');
            requireLoginThen('checkout_guild');
            return;
        }
        showBillingBanner(friendlyBillingError(err, 'Falha ao listar servidores.'));
    } finally {
        setBillingBusy(false);
    }
}

async function startGuildCheckout(guildId) {
    if (billingBusy || !guildId) return;
    setBillingBusy(true, 'A redirecionar…', 'btnCheckoutGuild');
    try {
        const session = await ariaApi.checkoutGuild(guildId);
        const url = session && (session.checkout_url || session.url);
        if (!url) throw new Error('A API não devolveu o link do Stripe Checkout.');
        ariaApi.setPendingAction('');
        ariaApi.setPendingGuildId('');
        window.location.href = url;
    } catch (err) {
        setBillingBusy(false);
        showBillingBanner(friendlyBillingError(err, 'Não foi possível iniciar o checkout do servidor.'));
    }
}

async function openBillingPortal(sourceBtnId) {
    if (billingBusy) return;
    const activeId = sourceBtnId || 'btnManageBilling';
    setBillingBusy(true, 'A redirecionar…', activeId);
    try {
        const me = await ariaApi.me();
        if (!me.authenticated) {
            showBillingBanner('Entra com Discord para gerir a assinatura.');
            return;
        }
        if (!(me.premium && me.premium.enabled)) {
            showBillingBanner('Ainda não tens uma assinatura ativa para gerir.');
            await refreshAuthUi();
            return;
        }
        const portal = await ariaApi.portal();
        const url = portal && (portal.portal_url || portal.url);
        if (!url) throw new Error('Portal de cobrança indisponível.');
        const portalTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (!portalTab) {
            // Pop-up bloqueado: tenta link sem navegar a aba atual.
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    } catch (err) {
        showBillingBanner(friendlyBillingError(err, 'Portal de cobrança indisponível.'));
    } finally {
        setBillingBusy(false);
    }
}

async function resumePendingAction() {
    const action = ariaApi.getPendingAction();
    if (!action || billingBusy) return;
    if (action === 'checkout_user') {
        showBillingBanner('Login concluído. A abrir o Stripe…');
        await startUserCheckout();
        return;
    }
    if (action === 'checkout_guild') {
        showBillingBanner('Login concluído. Escolhe o servidor para assinar.');
        await openGuildPicker();
        return;
    }
    ariaApi.setPendingAction('');
}

async function onAuthSuccess(token) {
    if (token) ariaApi.setToken(token);
    setAuthWaiting(false);
    await refreshAuthUi();
    await resumePendingAction();
}

window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin) return;
    const data = event.data;
    if (!data || data.type !== ARIA_AUTH_MSG) return;
    if (data.token) {
        showTopToast('Login com Discord concluído.');
        await onAuthSuccess(data.token);
        return;
    }
    if (data.auth === 'error' || data.auth === 'invalid_state') {
        setAuthWaiting(false);
        ariaApi.setPendingAction('');
        showBillingBanner('Falha no login com Discord.');
    }
});

document.getElementById('navLoginBtn')?.addEventListener('click', (event) => {
    event.preventDefault();
    startDiscordLogin();
});

document.getElementById('navUserTrigger')?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleNavUserMenu();
});

document.getElementById('navLogoutBtn')?.addEventListener('click', async (event) => {
    event.preventDefault();
    closeNavUserMenu();
    try {
        await ariaApi.logout();
        await refreshAuthUi();
        showTopToast('Sessão encerrada.');
    } catch (err) {
        showBillingBanner(err.message || 'Falha ao sair.');
    }
});

document.getElementById('navManagePlanBtn')?.addEventListener('click', async (event) => {
    event.preventDefault();
    await openBillingPortal('navManagePlanBtn');
    closeNavUserMenu();
});

document.addEventListener('click', (event) => {
    const chip = document.getElementById('navUserChip');
    if (!chip || !chip.contains(event.target)) closeNavUserMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeNavUserMenu();
    closeStatusModal();
    const modal = document.getElementById('guildModal');
    if (modal && modal.classList.contains('is-visible')) setGuildModalVisible(false);
});

document.getElementById('statusModalOk')?.addEventListener('click', () => {
    closeStatusModal();
});

document.getElementById('statusModalBackdrop')?.addEventListener('click', () => {
    closeStatusModal();
});

document.getElementById('authWaitingCancel')?.addEventListener('click', () => {
    setAuthWaiting(false);
    ariaApi.setPendingAction('');
    try { if (authPopupRef && !authPopupRef.closed) authPopupRef.close(); } catch (_) { /* ignore */ }
    authPopupRef = null;
});

document.getElementById('btnCheckoutUser')?.addEventListener('click', () => {
    startUserCheckout();
});

document.getElementById('btnManageBilling')?.addEventListener('click', () => {
    openBillingPortal('btnManageBilling');
});

document.getElementById('btnCheckoutGuild')?.addEventListener('click', () => {
    openGuildPicker();
});

document.getElementById('guildModalClose')?.addEventListener('click', () => {
    setGuildModalVisible(false);
});

document.getElementById('guildModalBackdrop')?.addEventListener('click', () => {
    setGuildModalVisible(false);
});

document.getElementById('guildBalloonGrid')?.addEventListener('click', async (event) => {
    const btn = event.target.closest('.guild-balloon');
    if (!btn) return;
    const guildId = btn.getAttribute('data-guild-id');
    if (!guildId) return;
    await onGuildBalloonClick(guildId);
});

if (cursor && !prefersCoarse) {
    document.getElementById('guildBalloonGrid')?.addEventListener('mouseover', (event) => {
        if (event.target.closest('.guild-balloon')) cursor.classList.add('hover');
    });
    document.getElementById('guildBalloonGrid')?.addEventListener('mouseout', (event) => {
        if (event.target.closest('.guild-balloon')) cursor.classList.remove('hover');
    });
}

document.getElementById('guildInviteAgainBtn')?.addEventListener('click', () => {
    const guildId = (pendingInviteGuild && pendingInviteGuild.guild_id) || ariaApi.getPendingGuildId();
    if (guildId) openBotInvite(guildId);
});

document.getElementById('guildInviteDoneBtn')?.addEventListener('click', () => {
    recheckGuildAfterInvite();
});

// Estado inicial dos CTAs (Gerenciar escondido até haver Premium).
updateBillingCtas({ authenticated: false, isPremium: false });

(async function handleBillingQuery() {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get('auth');
    const billing = params.get('billing');
    const handoffCode = params.get('code');
    const legacySession = params.get('session');
    const isAuthPopup = !!(window.opener && !window.opener.closed);

    let exchangedToken = '';
    if (handoffCode) {
        try {
            const exchanged = await ariaApi.request('/api/auth/exchange', {
                method: 'POST',
                body: JSON.stringify({ code: handoffCode }),
            });
            if (exchanged && exchanged.token) {
                exchangedToken = exchanged.token;
                ariaApi.setToken(exchanged.token);
            }
        } catch (err) {
            if (isAuthPopup) {
                notifyOpenerAuth({ auth: 'error' });
                window.close();
                return;
            }
            showBillingBanner(err.message || 'Falha ao concluir login.');
        }
    } else if (legacySession) {
        exchangedToken = legacySession;
        ariaApi.setToken(legacySession);
    }

    if (isAuthPopup && (exchangedToken || auth === 'success' || auth === 'error' || auth === 'invalid_state')) {
        notifyOpenerAuth({
            auth: auth || (exchangedToken ? 'success' : 'error'),
            token: exchangedToken || undefined,
        });
        setTimeout(() => { try { window.close(); } catch (_) { /* ignore */ } }, 120);
        return;
    }

    if (auth === 'success') showTopToast('Login com Discord concluído.');
    if (auth === 'error' || auth === 'invalid_state') {
        ariaApi.setPendingAction('');
        showStatusPopup('Falha no login com Discord.', { tone: 'error', title: 'Login falhou' });
    }
    if (billing === 'success') {
        showStatusPopup('Pagamento recebido. O Premium será ativado em instantes.', {
            tone: 'success',
            title: 'Pagamento efetuado',
        });
    }
    if (billing === 'cancel') {
        showStatusPopup('Checkout cancelado. Nenhuma cobrança foi feita.', {
            tone: 'warn',
            title: 'Pagamento cancelado',
        });
    }
    if (billing === 'portal') {
        showStatusPopup('Voltaste do portal de cobrança.', {
            tone: 'info',
            title: 'Portal de cobrança',
        });
    }

    if (auth || billing || handoffCode || legacySession) {
        const clean = new URL(window.location.href);
        clean.searchParams.delete('auth');
        clean.searchParams.delete('billing');
        clean.searchParams.delete('session');
        clean.searchParams.delete('code');
        window.history.replaceState({}, '', clean.pathname + clean.search + clean.hash);
    }
    await refreshAuthUi();
    if (exchangedToken || auth === 'success') {
        await resumePendingAction();
    }
})();

/* ══════════════════════════════════════
   SISTEMA DE PESQUISA DE COMANDOS
══════════════════════════════════════ */
const searchInput = document.getElementById('cmdSearch');
const commandsSection = document.getElementById('commands');
const allCmdItems = document.querySelectorAll('.command-item');
const noResultsMsg = document.getElementById('no-results');

if (searchInput && commandsSection) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        if (term.length > 0) {
            commandsSection.classList.add('searching');
            let hasMatch = false;

            allCmdItems.forEach(item => {
                const textContent = item.textContent.toLowerCase();
                if (textContent.includes(term)) {
                    item.classList.add('match');
                    item.classList.add('visible');
                    hasMatch = true;
                } else {
                    item.classList.remove('match');
                }
            });

            if (noResultsMsg) noResultsMsg.style.display = hasMatch ? 'none' : 'block';
        } else {
            commandsSection.classList.remove('searching');
            allCmdItems.forEach(item => item.classList.remove('match'));
            if (noResultsMsg) noResultsMsg.style.display = 'none';
        }
    });
}


