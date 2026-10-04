# Site estático da ARIA

O site é HTML/CSS/JS estático no Render. Autenticação, checkout e webhooks
ficam na **ARIA API** (repositório/serviço separado).

## Ficheiros

- `index.html` — markup
- `style.css` — estilos
- `script.js` — cursor, animações, auth, checkout e billing
- `acknowledgments/` — página de agradecimentos (stack e bibliotecas)
- `legal/` — Política de Privacidade e Termos (visual estilo Discord)
- `paw.js` — cursor da patinha nas páginas auxiliares

## URLs

- Site: `https://ariawebpage.onrender.com`
- Agradecimentos: `https://ariawebpage.onrender.com/acknowledgments/`
- Legal: `https://ariawebpage.onrender.com/legal/`
- API: `https://aria-api-xq1h.onrender.com` (configurável via `window.ARIA_API_BASE_URL`)

## Fluxo OAuth

1. Utilizador clica **Entrar com Discord** → `GET /api/auth/discord/login`.
2. Discord autentica e volta para a API:
   `https://aria-api-xq1h.onrender.com/api/auth/discord/callback`
3. A API redireciona para o site com `?auth=success&code=...` (handoff).
4. O site troca o code em `POST /api/auth/exchange` e guarda o token.

## Configuração

No Discord Developer Portal, o redirect URI deve apontar para a **API**:

```text
https://aria-api-xq1h.onrender.com/api/auth/discord/callback
```

No Asaas, o webhook aponta para a API:

```text
https://aria-api-xq1h.onrender.com/api/webhooks/asaas
```

Eventos: `CHECKOUT_PAID`, `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`,
`PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`, `PAYMENT_DELETED`.
Header `asaas-access-token` deve coincidir com `ASAAS_WEBHOOK_TOKEN`.

## Local

Sirva `site/` com qualquer static server. Para apontar a API local, altere o default
em `script.js` (`window.ARIA_API_BASE_URL`) ou defina-o antes do `script.js`:

```html
<script>window.ARIA_API_BASE_URL = 'http://localhost:8000';</script>
<script defer src="script.js"></script>
```
