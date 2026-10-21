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
        'Agradecimentos': 'Acknowledgments',
        'Linguagens': 'Languages',
        'Bibliotecas — bot': 'Bot libraries',
        'Bibliotecas — API': 'API libraries',
        'Site': 'Website',
        'Serviços': 'Services',
        'Obrigado a todo mundo por trás dessas libs e serviços. Sem vocês a ARIA não existiria — e eu também não teria como fazer isso ser possível no Discord.':
            'Thank you to everyone behind these libraries and services. Without you, ARIA would not exist — and I could not make this possible on Discord.',
        'Voltar ao site': 'Back to website',
        'Política de Privacidade': 'Privacy Policy',
        'Como eu cuido dos seus dados': 'How I handle your data',
        'Versão: 05/10/2026 · clara, direta e sem juridiquês desnecessário.':
            'Version: 10/05/2026 · clear, direct and without unnecessary legalese.',
        'Escopo': 'Scope',
        'O que eu posso guardar': 'What I may store',
        'Pra que eu uso': 'What I use it for',
        'Serviços externos': 'External services',
        'Base legal': 'Legal basis',
        'Retenção e exclusão': 'Retention and deletion',
        'Segurança': 'Security',
        'Seus direitos': 'Your rights',
        'Um pedido de amiga': 'A small request',
        'Alterações': 'Changes',
        'Contato': 'Contact',
        'Termos de Serviço': 'Terms of Service',
        'As regrinhas do nosso uso': 'The rules for using ARIA',
        'Aceitação': 'Acceptance',
        'O que eu ofereço': 'What I offer',
        'Uso permitido': 'Permitted use',
        'Planos, pagamentos e cancelamento': 'Plans, payments and cancellation',
        'Comandos, planos e permissões Discord': 'Commands, plans and Discord permissions',
        'Disponibilidade e precisão': 'Availability and accuracy',
        'Seu conteúdo': 'Your content',
        'Limitação de responsabilidade': 'Limitation of liability',
        'Suspensão': 'Suspension',
        'Lei aplicável': 'Applicable law',
        'Esta política explica como eu, a ARIA, trato seus dados quando você usa meus comandos, me menciona, conversa comigo, usa voz, envia anexos, abre tickets ou assina Aria Premium / Aria Server no Discord e no site.':
            'This policy explains how I, ARIA, handle your data when you use my commands, mention me, chat with me, use voice, send attachments, open tickets or subscribe to Aria Premium / Aria Server on Discord and the website.',
        'Eu vivo no Discord, então o uso também depende das regras e da infraestrutura do Discord e de serviços externos (IA, voz, mídia, busca e pagamentos com Asaas).':
            'I live on Discord, so use also depends on Discord rules and infrastructure and on external services (AI, voice, media, search and Asaas payments).',
        'Eu não vendo seus dados. Pra funcionar, posso enviar o necessário a serviços de IA, voz, busca, mídia, hospedagem, banco de dados, Discord e Asaas — só pra cumprir o pedido, garantir segurança ou atender obrigações legais.':
            'I do not sell your data. To operate, I may send what is necessary to AI, voice, search, media, hosting, database, Discord and Asaas services — only to fulfill your request, keep things safe or meet legal obligations.',
        'Você pode pedir acesso, correção, informação, exclusão ou bloqueio, conforme a legislação (incluindo a LGPD). Às vezes eu preciso confirmar sua identidade.':
            'You may request access, correction, information, deletion or restriction as allowed by law (including the LGPD). I may sometimes need to verify your identity.',
        'Ao me usar (no Discord e neste site), você concorda com estes Termos e com a Política de Privacidade. Se não concordar, é só parar de me usar — sem drama.':
            'By using me (on Discord and this website), you agree to these Terms and the Privacy Policy. If you disagree, simply stop using me.',
        'Posso ficar offline por manutenção ou falhas de terceiros. Às vezes eu troco as patinhas — revise respostas importantes antes de decidir.':
            'I may go offline for maintenance or third-party failures. I can sometimes get things wrong — review important answers before making decisions.',
        'O que você envia continua seu. Ao interagir, você autoriza o processamento técnico pra eu cumprir o pedido.':
            'What you send remains yours. By interacting, you authorize the technical processing needed to fulfill your request.',
        'Regidos pela legislação brasileira aplicável.':
            'These terms are governed by applicable Brazilian law.',
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
        'ARIA Free — pode usar sem assinatura': 'ARIA Free — available without a subscription',
        'Sua assinatura pessoal ou servidor com ARIA Server':
            'Your personal subscription or a server with ARIA Server',
        'Permissão: Gerenciar Mensagens': 'Permission: Manage Messages',
        'Permissão: Gerenciar Canais': 'Permission: Manage Channels',
        'Permissão: Administrador': 'Permission: Administrator',
        'Converse com a ARIA': 'Chat with ARIA',
        '<strong>Update:</strong> peça um lembrete informando data, hora e o que será lembrado; confirme em <strong>Criar</strong> e pronto.':
            '<strong>Update:</strong> ask for a reminder with a date, time and what to remember; confirm with <strong>Create</strong> and you are done.',
        'Mini-jogos': 'Mini-games',
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
        'ARIA Server — pode usar sem assinatura': 'ARIA Server — server subscription required',
        'Sem ferramentas avançadas de servidor': 'No advanced server tools',
        'Comandos gerais, histórico básico e XP': 'General commands, basic history and XP',
        'Comandos de moderação': 'Moderation commands',
        'Utilidades Premium (lembretes, tradução, resumos, embeds, tickets, voz…)':
            'Premium utilities (reminders, translation, summaries, embeds, tickets, voice…)',
        'Personalização, mini-jogos e contexto ajustável':
            'Customization, mini-games and adjustable context',
        'Busca web e TTS mais caprichado quando der':
            'Web search and enhanced TTS when available',
        'Vai com você em qualquer servidor — sem precisar de ARIA Server':
            'Follows you to any server — no ARIA Server required',
        'Benefícios <strong>ARIA Premium</strong> pra <strong>todos</strong> os membros':
            ' <strong>ARIA Premium</strong> benefits for <strong>all</strong> members',
        'IA <strong>ilimitada</strong> no servidor': '<strong>Unlimited</strong> AI on the server',
        'Ferramentas de admin e automação do servidor':
            'Server admin and automation tools',
        'Montagem, backup, restauração e reversão do servidor':
            'Server setup, backup, restore and rollback',
        'Boas-vindas, despedidas, boost e tom do servidor':
            'Welcome messages, goodbyes, boosts and server tone',
        'Assinatura mensal via Asaas (cartão), com renovação automática. Se cancelar no site, o acesso segue até o fim do período já pago; depois volta pro ARIA Free sem apagar histórico nem configs. Se o pagamento atrasar (<em>past_due</em>), o Premium pode seguir até o fim do período atual.':
            'Monthly subscription via Asaas (card), with automatic renewal. If cancelled on the website, access continues until the paid period ends; then it returns to ARIA Free without deleting history or settings. If payment is late (<em>past_due</em>), Premium may continue until the current period ends.',
        'Desenvolvida por': 'Developed by',
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
        'Diferença do Free: IA ilimitada, memória maior, utilidades Premium e moderação. Sozinho ainda não libera as ferramentas de admin do servidor.':
            'Difference from Free: unlimited AI, more memory, Premium utilities and moderation. It does not unlock server admin tools by itself.',
        'Diferença do ARIA Premium: cobre o servidor inteiro + ferramentas de admin. Se é só pra você, o ARIA Premium já resolve.':
            'Difference from ARIA Premium: covers the whole server plus admin tools. If it is just for you, ARIA Premium is enough.',
        '6 mensagens de IA por usuário, por dia — ao estourar, 24h sem IA':
            '6 AI messages per user per day — after that, AI is unavailable for 24 hours',
        'Histórico de até 12 mensagens': 'History of up to 12 messages',
        'Mensagens de IA ilimitadas': 'Unlimited AI messages',
        'Contexto de até 100 mensagens': 'Context of up to 100 messages',
        'Assine se… você fala bastante comigo e quer utilidades e jogos sem o limite diário do Free.':
            'Subscribe if you chat with me often and want utilities and games without the Free daily limit.',
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
        'Online': 'Online',
        'Offline': 'Offline',
        'Atualizado às': 'Updated at',
        'Sua sessão expirou. Entre com Discord e tente de novo.':
            'Your session expired. Sign in with Discord and try again.',
        'Tudo certo': 'All set',
        'Algo deu errado': 'Something went wrong',
        'Atenção': 'Attention',
        'O pagamento está temporariamente indisponível. Estamos liberando os métodos de cobrança — tente de novo em instantes.':
            'Payment is temporarily unavailable. We are enabling payment methods — try again shortly.',
        'Houve um problema ao vincular seu cadastro de pagamento. Atualize a página e tente novamente — se persistir, fale com o suporte.':
            'There was a problem linking your payment profile. Refresh and try again — if it persists, contact support.',
        'O checkout está temporariamente fora do ar. Já estamos ajustando — tente novamente em breve.':
            'Checkout is temporarily unavailable. We are fixing it — try again soon.',
        'Muitas tentativas seguidas. Espere alguns segundos e tente de novo.':
            'Too many attempts. Wait a few seconds and try again.',
        'Algo deu errado ao processar o pagamento. Tente novamente.':
            'Something went wrong while processing payment. Try again.',
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
    const fragmentTranslations = [
        ['Permissão: Gerenciar Mensagens', 'Permission: Manage Messages'],
        ['Permissão: Gerenciar Canais', 'Permission: Manage Channels'],
        ['Permissão: Administrador', 'Permission: Administrator'],
        ['ARIA Free — pode usar sem assinatura', 'ARIA Free — available without a subscription'],
        ['Sua assinatura pessoal ou servidor com ARIA Server', 'Your personal subscription or a server with ARIA Server'],
        ['Benefícios ', 'Benefits '],
        [' pra ', ' for '],
        [' todos ', ' all '],
        [' membros', ' members'],
        ['ilimitada', 'unlimited'],
        ['no servidor', 'on the server'],
        ['Ferramentas de admin', 'Admin tools'],
        ['automação do servidor', 'server automation'],
        ['Boas-vindas', 'Welcome messages'],
        ['despedidas', 'goodbyes'],
        ['Permissão', 'Permission'],
        ['Atualizado em ', 'Updated on '],
        ['Update:', 'Update:'],
        ['peça um lembrete informando data, hora e o que será lembrado; confirme em ', 'ask for a reminder with a date, time and what to remember; confirm with '],
        [' e pronto.', ' and you are done.'],
        ['Assinatura mensal via Asaas (cartão), com renovação automática. Se cancelar no site, o acesso segue até o fim do período já pago; depois volta pro ARIA Free sem apagar histórico nem configs. Se o pagamento atrasar (', 'Monthly subscription via Asaas (card), with automatic renewal. If cancelled on the website, access continues until the paid period ends; then it returns to ARIA Free without deleting history or settings. If payment is late ('],
        ['), o Premium pode seguir até o fim do período atual.', '), Premium may continue until the current period ends.'],
        ['Desenvolvida por', 'Developed by'],
        ['Servidor oficial no Discord', 'Official server on Discord'],
        ['Servidor oficial', 'Official server'],
        ['Documentos oficiais', 'Official documents'],
        ['Informações', 'Information'],
        ['Links', 'Links'],
        ['privacidade', 'privacy'],
        ['termos', 'terms'],
        ['voltar-ao-site', 'back-to-site'],
        ['agradecimentos', 'acknowledgments'],
        ['online', 'online'],
        ['Política de Privacidade', 'Privacy Policy'],
        ['Como eu cuido dos seus dados', 'How I handle your data'],
        ['Versão: ', 'Version: '],
        ['clara, direta e sem juridiquês desnecessário.', 'clear, direct and without unnecessary legalese.'],
        ['Escopo', 'Scope'],
        ['O que eu posso guardar', 'What I may store'],
        ['Pra que eu uso', 'What I use it for'],
        ['Serviços externos', 'External services'],
        ['Base legal', 'Legal basis'],
        ['Retenção e exclusão', 'Retention and deletion'],
        ['Segurança', 'Security'],
        ['Seus direitos', 'Your rights'],
        ['Um pedido de amiga', 'A small request'],
        ['Alterações', 'Changes'],
        ['Contato', 'Contact'],
        ['Termos de Serviço', 'Terms of Service'],
        ['As regrinhas do nosso uso', 'The rules for using ARIA'],
        ['Aceitação', 'Acceptance'],
        ['O que eu ofereço', 'What I offer'],
        ['Uso permitido', 'Permitted use'],
        ['Planos, pagamentos e cancelamento', 'Plans, payments and cancellation'],
        ['Comandos, planos e permissões Discord', 'Commands, plans and Discord permissions'],
        ['Disponibilidade e precisão', 'Availability and accuracy'],
        ['Seu conteúdo', 'Your content'],
        ['Limitação de responsabilidade', 'Limitation of liability'],
        ['Suspensão', 'Suspension'],
        ['Lei aplicável', 'Applicable law'],
        ['Esta política explica como eu, a ', 'This policy explains how I, '],
        ['trato seus dados quando você usa meus comandos, me menciona, conversa comigo, usa voz, envia anexos, abre tickets ou assina Aria Premium / Aria Server no Discord e no site.',
            'handle your data when you use my commands, mention me, chat with me, use voice, send attachments, open tickets or subscribe to Aria Premium / Aria Server on Discord and the website.'],
        ['Eu vivo no Discord, então o uso também depende das regras e da infraestrutura do Discord e de serviços externos (IA, voz, mídia, busca e pagamentos com Asaas).',
            'I live on Discord, so use also depends on Discord rules and infrastructure and on external services (AI, voice, media, search and Asaas payments).'],
        ['Eu não vendo seus dados. Pra funcionar, posso enviar o necessário a serviços de IA, voz, busca, mídia, hospedagem, banco de dados, Discord e Asaas — só pra cumprir o pedido, garantir segurança ou atender obrigações legais.',
            'I do not sell your data. To operate, I may send what is necessary to AI, voice, search, media, hosting, database, Discord and Asaas services — only to fulfill your request, keep things safe or meet legal obligations.'],
        ['Você pode pedir acesso, correção, informação, exclusão ou bloqueio, conforme a legislação (incluindo a LGPD). Às vezes eu preciso confirmar sua identidade.',
            'You may request access, correction, information, deletion or restriction as allowed by law (including the LGPD). I may sometimes need to verify your identity.'],
        ['Ao me usar (no Discord e neste site), você concorda com estes Termos e com a Política de Privacidade. Se não concordar, é só parar de me usar — sem drama.',
            'By using me (on Discord and this website), you agree to these Terms and the Privacy Policy. If you disagree, simply stop using me.'],
        ['Posso ficar offline por manutenção ou falhas de terceiros. Às vezes eu troco as patinhas — revise respostas importantes antes de decidir.',
            'I may go offline for maintenance or third-party failures. I can sometimes get things wrong — review important answers before making decisions.'],
        ['O que você envia continua seu. Ao interagir, você autoriza o processamento técnico pra eu cumprir o pedido.',
            'What you send remains yours. By interacting, you authorize the technical processing needed to fulfill your request.'],
        ['Regidos pela legislação brasileira aplicável.', 'These terms are governed by applicable Brazilian law.'],
        ['Última atualização: ', 'Last updated: '],
        ['Dúvidas? Fala com o programador:', 'Questions? Contact the developer:'],
    ];

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
        if (translated) return text.replace(value, translated);
        return fragmentTranslations.reduce(
            (result, [source, target]) => result.replaceAll(source, target),
            text,
        );
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
            if (button.dataset.locale === 'pt') {
                button.setAttribute('aria-label', current === 'en' ? 'Portuguese (Brazil)' : 'Português (Brasil)');
                button.setAttribute('title', current === 'en' ? 'Portuguese (Brazil)' : 'Português (Brasil)');
            } else {
                button.setAttribute('aria-label', current === 'en' ? 'English (United States)' : 'Inglês (Estados Unidos)');
                button.setAttribute('title', current === 'en' ? 'English (United States)' : 'Inglês (Estados Unidos)');
            }
        });
        const switcher = document.getElementById('ariaLangSwitch');
        if (switcher) {
            switcher.setAttribute('aria-label', current === 'en' ? 'Language' : 'Idioma');
        }
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
