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

const particlesCount = 55; // Densidade perfeita para equilíbrio visual e performance
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
   NAVBAR SCROLL (GLASSMORPHISM)
══════════════════════════════════════ */
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
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
const ARIA_AUTH_BUILD = '20260912-checkout-v2';
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

function showBillingBanner(message) {
    const banner = document.getElementById('billingStatusBanner');
    const text = document.getElementById('billingStatusText');
    if (!banner || !text) return;
    text.textContent = message;
    banner.style.display = 'flex';
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

function setBillingBusy(busy, label) {
    billingBusy = !!busy;
    const ids = ['btnCheckoutUser', 'btnCheckoutGuild', 'btnConfirmGuildCheckout', 'btnManageBilling'];
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.disabled = billingBusy;
    });
    const checkoutBtn = document.getElementById('btnCheckoutUser');
    if (checkoutBtn && !checkoutBtn.hidden) {
        if (billingBusy && label) checkoutBtn.textContent = label;
        else updateBillingCtas(lastAuthSnapshot);
    }
}

function updateBillingCtas(state) {
    const authenticated = !!(state && state.authenticated);
    const isPremium = !!(state && state.isPremium);
    const checkoutBtn = document.getElementById('btnCheckoutUser');
    const manageBtn = document.getElementById('btnManageBilling');
    const guildBtn = document.getElementById('btnCheckoutGuild');

    if (manageBtn) {
        manageBtn.hidden = !(authenticated && isPremium);
        manageBtn.disabled = billingBusy || manageBtn.hidden;
    }
    if (checkoutBtn) {
        if (authenticated && isPremium) {
            checkoutBtn.hidden = true;
        } else {
            checkoutBtn.hidden = false;
            checkoutBtn.textContent = 'Assinar Premium';
            checkoutBtn.disabled = billingBusy;
        }
    }
    if (guildBtn) guildBtn.disabled = billingBusy;
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function setLoggedOutUi() {
    const loginBtn = document.getElementById('navLoginBtn');
    const chip = document.getElementById('navUserChip');
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (chip) chip.classList.remove('is-visible');
    lastAuthSnapshot = { authenticated: false, isPremium: false };
    updateBillingCtas(lastAuthSnapshot);
}

function setLoggedInUi(user, premium) {
    const loginBtn = document.getElementById('navLoginBtn');
    const chip = document.getElementById('navUserChip');
    const avatar = document.getElementById('navUserAvatar');
    const nameEl = document.getElementById('navUserName');
    const planEl = document.getElementById('navUserPlan');
    if (!chip || !avatar || !nameEl || !planEl) return;

    const label = user.display_name || user.username || 'Conta Discord';
    const isPremium = !!(premium && premium.enabled);
    avatar.src = user.avatar_url || DEFAULT_AVATAR;
    avatar.alt = label;
    nameEl.textContent = label;
    planEl.textContent = isPremium ? 'Premium' : 'Conta gratuita';
    planEl.classList.toggle('is-premium', isPremium);
    if (loginBtn) loginBtn.style.display = 'none';
    chip.classList.add('is-visible');
    lastAuthSnapshot = { authenticated: true, isPremium };
    updateBillingCtas(lastAuthSnapshot);
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
    setBillingBusy(true, 'A redirecionar…');
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
    const picker = document.getElementById('guildPicker');
    const select = document.getElementById('guildSelect');
    setBillingBusy(true);
    try {
        const me = await ariaApi.me();
        if (!me.authenticated) {
            setBillingBusy(false);
            requireLoginThen('checkout_guild');
            return;
        }
        const data = await ariaApi.guilds();
        const eligible = (data.guilds || []).filter(g => g.eligible_for_checkout);
        if (!eligible.length) {
            showBillingBanner('Nenhum servidor elegível. Precisas de permissão de admin e a ARIA presente no servidor.');
            return;
        }
        select.innerHTML = eligible.map(g =>
            `<option value="${escapeHtml(g.guild_id)}">${escapeHtml(g.name || g.guild_id)}</option>`
        ).join('');
        picker.style.display = 'block';
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
    setBillingBusy(true, 'A redirecionar…');
    try {
        const session = await ariaApi.checkoutGuild(guildId);
        const url = session && (session.checkout_url || session.url);
        if (!url) throw new Error('A API não devolveu o link do Stripe Checkout.');
        ariaApi.setPendingAction('');
        window.location.href = url;
    } catch (err) {
        setBillingBusy(false);
        showBillingBanner(friendlyBillingError(err, 'Não foi possível iniciar o checkout do servidor.'));
    }
}

async function openBillingPortal() {
    if (billingBusy) return;
    setBillingBusy(true);
    try {
        const me = await ariaApi.me();
        if (!me.authenticated) {
            setBillingBusy(false);
            showBillingBanner('Entra com Discord para gerir a assinatura.');
            return;
        }
        if (!(me.premium && me.premium.enabled)) {
            setBillingBusy(false);
            showBillingBanner('Ainda não tens uma assinatura ativa para gerir.');
            await refreshAuthUi();
            return;
        }
        const portal = await ariaApi.portal();
        const url = portal && (portal.portal_url || portal.url);
        if (!url) throw new Error('Portal de cobrança indisponível.');
        window.location.href = url;
    } catch (err) {
        setBillingBusy(false);
        showBillingBanner(friendlyBillingError(err, 'Portal de cobrança indisponível.'));
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
        showBillingBanner('Login com Discord concluído.');
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

document.getElementById('navLogoutBtn')?.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        await ariaApi.logout();
        await refreshAuthUi();
        showBillingBanner('Sessão encerrada.');
    } catch (err) {
        showBillingBanner(err.message || 'Falha ao sair.');
    }
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
    openBillingPortal();
});

document.getElementById('btnCheckoutGuild')?.addEventListener('click', () => {
    openGuildPicker();
});

document.getElementById('btnConfirmGuildCheckout')?.addEventListener('click', async () => {
    const select = document.getElementById('guildSelect');
    const guildId = select?.value;
    if (!guildId) return;
    await startGuildCheckout(guildId);
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

    if (auth === 'success') showBillingBanner('Login com Discord concluído.');
    if (auth === 'error' || auth === 'invalid_state') {
        ariaApi.setPendingAction('');
        showBillingBanner('Falha no login com Discord.');
    }
    if (billing === 'success') showBillingBanner('Pagamento recebido. O Premium será ativado em instantes.');
    if (billing === 'cancel') showBillingBanner('Checkout cancelado.');
    if (billing === 'portal') showBillingBanner('Voltaste do portal de cobrança.');

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


