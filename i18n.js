/* Lightweight client-side i18n for the static Render site. */
(function () {
    'use strict';

    const STORAGE_KEY = 'aria_locale';
    const locales = { pt: 'pt-BR', en: 'en-US' };
    const translations = {
        'ARIA — Assistente inteligente para Discord': 'ARIA — Intelligent assistant for Discord',
        'A companhia de IA que deixa seu Discord mais vivo: conversa com contexto, utilidades, moderação e muito mais.':
            'The AI companion that brings your Discord to life with context, utilities, moderation and more.',
        'Agradecimentos — ARIA': 'Acknowledgments — ARIA',
        'Linguagens, bibliotecas e serviços que tornam a ARIA possível.':
            'Languages, libraries and services that make ARIA possible.',
        'Início': 'Home',
        'Recursos': 'Features',
        'Comandos': 'Commands',
        'Planos': 'Plans',
        'Jurídico': 'Legal',
        'Entrar com Discord': 'Sign in with Discord',
        'Entrar': 'Sign in',
        'Cancelar plano': 'Cancel plan',
        'Sair': 'Sign out',
        'Usuário': 'User',
        'Conta': 'Account',
        'Abrir menu': 'Open menu',
        'Fechar menu': 'Close menu',
        'Aguardando autenticação': 'Waiting for authentication',
        'Conclua o login com Discord na nova aba. Esta página atualiza automaticamente.':
            'Complete Discord sign-in in the new tab. This page updates automatically.',
        'Cancelar': 'Cancel',
        'Fechar': 'Close',
        'Escolha o servidor': 'Choose a server',
        'Selecione um servidor onde você tem permissão de administrador.':
            'Select a server where you have administrator permission.',
        'Nenhum servidor com permissão de administrador encontrado.':
            'No server with administrator permission was found.',
        'Adicione a ARIA': 'Add ARIA',
        'Abra o Discord, adicione a ARIA ao servidor escolhido e volte aqui.':
            'Open Discord, add ARIA to the selected server, and come back here.',
        'Abrir Discord novamente': 'Open Discord again',
        'Já adicionei': 'I already added it',
        'Conheça a': 'Meet',
        'Sou a ARIA (Automated Response & Interaction Assistant), a bot de Discord que monta, modera e anima seu servidor — e ainda faço muito mais que a maioria dos bots por aí. Dá uma olhada em tudo que eu faço aí embaixo 🦊💜':
            'I am ARIA (Automated Response & Interaction Assistant), the Discord bot that builds, moderates and brings your server to life — and does much more than most bots. Take a look below 🦊💜',
        'Adicionar ao Discord': 'Add to Discord',
        'Servidor Oficial': 'Official Server',
        'Imagem da ARIA': 'ARIA image',
        'Desça para conhecer': 'Scroll to discover',
        'Servidores Ativos': 'Active Servers',
        'Comandos Úteis': 'Useful Commands',
        'Status da ARIA': 'ARIA Status',
        'Carregando…': 'Loading…',
        'Atualizando dados…': 'Updating data…',
        'O que eu sei fazer': 'What I can do',
        'Estou aqui para deixar o seu servidor mais animado, organizado e inteligente! ✨':
            'I am here to make your server more lively, organized and smart! ✨',
        'Conversas Inteligentes': 'Smart Conversations',
        'Converso com você de forma natural e me lembro do que já conversamos. Assim, cada conversa fica mais especial e contextual.':
            'I talk with you naturally and remember what we have discussed, making every conversation more personal and contextual.',
        'Utilidades pro Dia a Dia': 'Everyday Utilities',
        'Lembretes, traduções, resumos de texto ou de canal inteiro, embeds e dentre outras funções que ajudam no seu dia a dia no Discord':
            'Reminders, translations, text or channel summaries, embeds and other tools for your everyday Discord life.',
        'Montagem de Servidor': 'Server Setup',
        'Diga o tema do seu servidor e eu cuido do resto! Crio categorias, canais, cargos e organizo tudo automaticamente.':
            'Tell me your server theme and I will handle the rest. I create categories, channels, roles and organize everything automatically.',
        'Privacidade Garantida': 'Privacy First',
        'Você pode consultar, proteger e apagar seu histórico, além de controlar o contexto que utilizo nas conversas.':
            'Review, protect and delete your history, while controlling the context I use in conversations.',
        'Do Seu Jeito': 'Your Way',
        'Ranking de XP, mini-jogos e até o meu próprio estilo de fala — você escolhe. Bot, todo mundo tem uma. Do seu jeito, só a ARIA.':
            'XP rankings, mini-games and even my speaking style — you choose. Every bot has something; only ARIA is yours.',
        'Feita para o Discord': 'Made for Discord',
        'Reúno IA, ferramentas, voz, moderação e automação diretamente no Discord, sem complicar sua experiência.':
            'I bring AI, tools, voice, moderation and automation directly to Discord without complicating your experience.',
        'Meus Comandos': 'My Commands',
        'Atualizado em 19/10/2026': 'Updated on 10/19/2026',
        'O que significam as etiquetas': 'What the labels mean',
        'Grátis': 'Free',
        'Só no plano do servidor': 'Server plan only',
        'Busque um comando (ex: latencia, ticket, aviso)...':
            'Search for a command (e.g. latency, ticket, warning)…',
        'Geral': 'General',
        'Tópico': 'Topic',
        'Histórico': 'History',
        'Utilidades': 'Utilities',
        'Diversão': 'Fun',
        'Moderação': 'Moderation',
        'Voz': 'Voice',
        'Economia': 'Economy',
        'Mini-jogos': 'Mini-games',
        'Latência, tempo online e versão': 'Latency, uptime and version',
        'Menu de ajuda e seu plano': 'Help menu and your plan',
        'Info básica do servidor': 'Basic server information',
        'Cria um tópico privado comigo': 'Create a private topic with me',
        'Fecha seu tópico privado': 'Close your private topic',
        'Consulta o histórico (com PIN)': 'View history (with PIN)',
        'Apaga o histórico': 'Delete history',
        'Apaga minhas mensagens na DM': 'Delete my DM messages',
        'Troca o PIN do histórico': 'Change the history PIN',
        'Ajusta o tamanho do contexto': 'Adjust context size',
        'Traduz um texto': 'Translate text',
        'Resume um texto': 'Summarize text',
        'Cria uma embed': 'Create an embed',
        'Abre um ticket': 'Open a ticket',
        'Resume o canal': 'Summarize the channel',
        'Revisa um texto': 'Review a text',
        'Escolha meu estilo de fala': 'Choose my speaking style',
        'Dá um aviso para um membro': 'Warn a member',
        'Lista os avisos': 'List warnings',
        'Limpa os avisos': 'Clear warnings',
        'Apaga mensagens do canal': 'Delete channel messages',
        'Ativa o modo lento': 'Enable slow mode',
        'Tranca o canal': 'Lock the channel',
        'Destranca o canal': 'Unlock the channel',
        'Entro na call': 'Join the call',
        'Saio da call': 'Leave the call',
        'Mostra nível e XP': 'Show level and XP',
        'Top 10 de XP': 'Top 10 XP leaderboard',
        'Define o XP de alguém': "Set someone's XP",
        'Zera o XP de alguém': "Reset someone's XP",
        'Monta o servidor por tema': 'Build the server by theme',
        'Desfaz a última config': 'Undo the last configuration',
        'Backup da configuração': 'Back up the configuration',
        'Restaura um backup': 'Restore a backup',
        'Onboarding (em breve)': 'Onboarding (coming soon)',
        'Configura o sistema de tickets': 'Configure the ticket system',
        'Cargos automáticos': 'Automatic roles',
        'Respondo só com menção/prefixo': 'Respond only when mentioned or prefixed',
        'Painel geral da ARIA': 'ARIA control panel',
        'Ops, não achei nenhum comando com isso!': 'Oops, no command matched that!',
        'Planos de Assinatura': 'Subscription Plans',
        'Bem simples: pode testar de graça, liberar mais pra você, ou liberar tudo pro servidor inteiro.':
            'Simple: try it for free, unlock more for yourself, or unlock everything for the whole server.',
        'Pra me conhecer, conversar um pouco e usar o básico sem pagar nada.':
            'Get to know me, chat a little and use the basics for free.',
        'Pra você se…': 'For you if…',
        'Assinatura individual: os benefícios vão com você em qualquer servidor onde eu estiver.':
            'Individual subscription: your benefits follow you to every server where I am.',
        'Assinatura da comunidade: libero o Premium pra todo mundo neste servidor.':
            'Community subscription: unlock Premium for everyone in this server.',
        'Assine se…': 'Subscribe if…',
        'Assinatura mensal via Asaas (cartão), com renovação automática.':
            'Monthly subscription via Asaas (card), with automatic renewal.',
        'Assinatura individual: os benefícios vão com você em qualquer servidor onde eu estiver.':
            'Individual subscription: your benefits follow you to every server where I am.',
        'Assinar Premium': 'Subscribe to Premium',
        'Cancelar assinatura': 'Cancel subscription',
        'Assinar para servidor': 'Subscribe for server',
        'Privacidade': 'Privacy',
        'Termos': 'Terms',
        'Agradecimentos': 'Acknowledgments',
        'Voltar ao topo ↑': 'Back to top ↑',
        'Servidor oficial': 'Official server',
        'CHECKOUT PROTEGIDO': 'SECURE CHECKOUT',
        'Finalizar pagamento': 'Complete payment',
        'Assinatura segura via Asaas': 'Secure subscription via Asaas',
        'Abrindo checkout…': 'Opening checkout…',
        'QUASE LÁ': 'ALMOST THERE',
        'Pagamento seguro via Asaas': 'Secure payment via Asaas',
        'O pagamento será aberto em uma janela própria, protegida pelo Asaas.':
            'Payment will open in a separate window protected by Asaas.',
        'Abrir pagamento seguro': 'Open secure payment',
        'Conexão segura': 'Secure connection',
        'Dados protegidos pelo Asaas': 'Data protected by Asaas',
        'Pagamento confirmado': 'Payment confirmed',
        'Continuar': 'Continue',
        'Entre no nosso servidor': 'Join our server',
        'Acesso Premium até': 'Premium access until',
        'Indisponível': 'Unavailable',
        'Não foi possível atualizar os dados agora.': 'Unable to update the data right now.',
        'Não foi possível seguir com esse servidor. Confira se você é admin e se a ARIA já está nele.':
            'Unable to continue with this server. Check that you are an admin and ARIA is already there.',
        'Essa assinatura já está ativa. Use “Cancelar assinatura” se quiser encerrar a renovação.':
            'This subscription is already active. Use “Cancel subscription” to stop renewal.',
        'Este plano ainda não está disponível para compra. Tente mais tarde ou fale com o suporte no servidor oficial.':
            'This plan is not available for purchase yet. Try later or contact support in the official server.',
        'Não conseguimos concluir o pagamento com esse cartão. Confira os dados ou use outro método.':
            'We could not complete payment with this card. Check the details or use another method.',
        'Não deu para abrir o pagamento agora. Tente novamente em alguns instantes.':
            'We could not open payment right now. Try again in a moment.',
        'Não foi possível conectar. Verifique sua internet e tente de novo.':
            'Could not connect. Check your internet connection and try again.',
        'Não encontramos uma assinatura ativa para cancelar.':
            'We could not find an active subscription to cancel.',
        'Não foi possível concluir o pagamento agora. Tente novamente em instantes.':
            'Unable to complete payment right now. Try again shortly.',
        'Não foi possível concluir. Tente novamente em instantes.':
            'Unable to complete this. Try again shortly.',
        'Pagamento recebido. Estamos liberando seu Premium — esta tela atualiza sozinha.':
            'Payment received. We are enabling Premium — this page updates automatically.',
        'Você já tem ARIA Premium ativo.': 'You already have active ARIA Premium.',
        'Nenhum servidor com permissão de administrador encontrado.':
            'No server with administrator permission was found.',
        'Falha ao verificar o servidor.': 'Failed to verify the server.',
        'Falha ao listar servidores.': 'Failed to list servers.',
        'Não foi possível iniciar o checkout.': 'Unable to start checkout.',
        'Não foi possível iniciar o checkout do servidor.': 'Unable to start server checkout.',
        'Login concluído. Escolha o servidor para assinar.':
            'Sign-in complete. Choose the server to subscribe.',
        'Assinatura gerenciada. Se você cancelou, o Premium segue até o fim do período pago.':
            'Subscription managed. If you cancelled, Premium continues until the paid period ends.',
        'Aviso': 'Notice',
        'OK': 'OK'
    };

    const originalText = new WeakMap();
    const originalMeta = new WeakMap();
    const originalAttributes = new WeakMap();
    let originalTitle = null;
    let current = null;

    function normalize(value) {
        return String(value || '').toLowerCase().startsWith('en') ? 'en' : 'pt';
    }

    function resolve() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) return normalize(stored);
        } catch (_) {}
        const query = new URLSearchParams(window.location.search).get('lang');
        if (query) return normalize(query);
        return normalize(navigator.language);
    }

    function translateText(text, locale) {
        const value = text.trim();
        if (!value || locale === 'pt') return text;
        const translated = translations[value];
        if (!translated) return text;
        return text.replace(value, translated);
    }

    function apply(locale) {
        current = normalize(locale);
        document.documentElement.lang = locales[current];
        if (originalTitle === null) originalTitle = document.title;
        document.title = current === 'en' ? translateText(originalTitle, current) : originalTitle;
        document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]').forEach((meta) => {
            if (!originalMeta.has(meta)) originalMeta.set(meta, meta.getAttribute('content') || '');
            const value = originalMeta.get(meta);
            meta.setAttribute('content', current === 'en' ? translateText(value, current) : value);
        });
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale) ogLocale.setAttribute('content', current === 'en' ? 'en_US' : 'pt_BR');
        document.querySelectorAll('[title],[aria-label],[placeholder]').forEach((element) => {
            if (!originalAttributes.has(element)) originalAttributes.set(element, {});
            const saved = originalAttributes.get(element);
            ['title', 'aria-label', 'placeholder'].forEach((attribute) => {
                const value = element.getAttribute(attribute);
                if (!value) return;
                if (!saved[attribute]) saved[attribute] = value;
                const original = saved[attribute];
                element.setAttribute(attribute, translateText(original, current));
            });
        });
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach((node) => {
            if (node.parentElement && ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) return;
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
            const original = originalText.get(node);
            node.nodeValue = current === 'pt' ? original : translateText(original, current);
        });
        document.querySelectorAll('.aria-lang-option').forEach((button) => {
            const active = button.dataset.locale === current;
            button.setAttribute('aria-pressed', String(active));
            button.toggleAttribute('data-active', active);
        });
        window.dispatchEvent(new CustomEvent('aria:localechange', {
            detail: { locale: locales[current] }
        }));
    }

    function createSwitcher() {
        const host = document.querySelector('.nav-end') || document.querySelector('.dc-topbar');
        if (!host || document.getElementById('ariaLangSwitch')) return;
        const wrapper = document.createElement('div');
        wrapper.id = 'ariaLangSwitch';
        wrapper.className = 'aria-lang-switch';
        wrapper.setAttribute('role', 'group');
        wrapper.setAttribute('aria-label', 'Language');
        wrapper.innerHTML = `
            <button type="button" class="aria-lang-option" data-locale="pt"
                    aria-label="Português (Brasil)" title="Português (Brasil)" aria-pressed="false">
                <span aria-hidden="true">🇧🇷</span><span class="sr-only">Português</span>
            </button>
            <button type="button" class="aria-lang-option" data-locale="en"
                    aria-label="English (United States)" title="English (United States)" aria-pressed="false">
                <span aria-hidden="true">🇺🇸</span><span class="sr-only">English</span>
            </button>`;
        host.insertBefore(wrapper, host.firstElementChild);
        wrapper.addEventListener('click', (event) => {
            const button = event.target.closest('.aria-lang-option');
            if (!button) return;
            const locale = normalize(button.dataset.locale);
            try { localStorage.setItem(STORAGE_KEY, locales[locale]); } catch (_) {}
            apply(locale);
        });
    }

    window.ariaI18n = {
        get locale() { return locales[current || resolve()]; },
        t(value) { return current === 'en' ? (translations[value] || value) : value; },
        apply
    };

    function init() {
        createSwitcher();
        apply(resolve());
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
