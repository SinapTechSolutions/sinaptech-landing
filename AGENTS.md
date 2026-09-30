<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SINAPTECH Landing Page

## Visão Geral

Landing page corporativa da SINAPTECH (Software House Premium, SaaS e GovTech).
Stack: Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Framer Motion + next-themes.

## Agentes Especializados

| Agente | Arquivo | Descrição |
|--------|---------|-----------|
| QA | `AGENTS-QA.md` | Checklist de qualidade, acessibilidade, performance |
| Dev | `AGENTS-DEV.md` | Padrões de código, componentes, boas práticas |
| Copy | `AGENTS-COPY.md` | Copywriting, UX Writing, SEO, tom de voz |
| Git | `AGENTS-GIT.md` | Git Flow, branches, commits, PRs, CI/CD |

## Comandos Úteis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build de produção (prisma generate + next build)
npm run lint       # Verifica código com ESLint
npx prisma db push # Aplica schema no banco (desenvolvimento)
npx prisma generate # Gera cliente Prisma
```

## Estrutura de Componentes

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com ThemeProvider (next-themes)
│   ├── page.tsx            # Página principal (orquestra todos os componentes)
│   └── globals.css         # Design tokens CSS (cores, fontes, dark mode)
├── components/
│   ├── Navbar.tsx          # Navbar sticky com glassmorphism + theme toggle
│   ├── Hero.tsx            # Split-screen com animação de sinapse SVG
│   ├── TrustBadges.tsx     # Badges de conformidade (LGPD, Licitações)
│   ├── Solutions.tsx       # Bento Grid de soluções
│   ├── Modal.tsx           # Shell de modal (overlay, Escape, foco, scroll-lock)
│   ├── SolutionModal.tsx   # Modal de detalhes de cada solução
│   ├── Sinapse.tsx         # Seção Metodologia (4 etapas + entregáveis)
│   ├── SynapseVisual.tsx   # Animação SVG de rede neural
│   ├── Products.tsx        # Carrossel de produtos proprietários
│   ├── ROICalculator.tsx   # Simulador de impacto operacional
│   ├── Diagnostic.tsx      # Diagnóstico gratuito (CTA → modal → e-mail + banco)
│   ├── DNA.tsx             # Missão, Manifesto, Visão
│   ├── Testimonials.tsx    # Depoimentos de clientes
│   ├── FAQ.tsx             # Perguntas frequentes (accordion)
│   ├── Contact.tsx         # Formulário + info de contato
│   ├── ThemeToggle.tsx     # Toggle light/dark (detecção automática)
│   └── Footer.tsx          # Footer com links e badges
public/
├── sinaptech-icon.svg      # Logo SINAPTECH (rede neural SVG)
└── favicon.ico             # Favicon
```

## Design Tokens (CSS Variables)

Tokens definidos em `src/app/globals.css` (`:root` e `.dark`, sempre **fora** de `@layer`, e espelhados em `@theme inline` para o Tailwind gerar os utilitários).

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-brand-snow` | #F1F5F9 | #0B1120 | Fundo da página |
| `--color-surface` | #FFFFFF | #121B2F | Fundo de cards, inputs, navbar |
| `--color-surface-2` | #E7EDF4 | #0E1626 | Bandas alternadas, chips, inputs |
| `--color-line` | #DDE5EE | #1F2B42 | Bordas de cards e inputs |
| `--color-line-soft` | #E9EFF4 | #18233A | Divisórias internas |
| `--color-brand-ink` | #0F172A | #F8FAFC | Títulos |
| `--color-brand-body` | #334155 | #CBD5E1 | Texto de parágrafos |
| `--color-brand-muted` | #5B6678 | #94A3B8 | Texto secundário/legendas |
| `--color-forest-trust` | #065F46 | #047857 | Fundo de botões primários |
| `--color-forest-trust-light` | #047857 | #065F46 | Hover do botão primário |
| `--color-synaptic-mint` | #047857 | #34D399 | Eyebrows, destaques, rings |
| `--color-synaptic-mint-light` | #10B981 | #6EE7B7 | Hover de destaques |
| `--color-human-amber` | #A84D08 | #FBBF24 | Atenção, selos, ouro do Tatame |
| `--color-danger` | #B91C1C | #F87171 | Erros de validação |
| `--shadow-card` | (slate) | (preto) | Sombra padrão de cards |
| `--shadow-card-hover` | (slate) | (preto) | Sombra elevada no hover |
| `--shadow-lift` | (slate, profunda) | (preto, profunda) | Elevação forte (ex.: Metodologia) |

Classes de componente (em `@layer components`):

- `.ui-card` — `surface` + borda `line` + `shadow-card` (use nos cards).
- `.ui-card-hover` — `.ui-card` + elevação e borda mint no hover/focus.

Variante escura: `@custom-variant dark (&:where(.dark, .dark *));` — a classe `.dark` é aplicada pelo next-themes em `<html>`. **Não usar** o `dark:` nativo do Tailwind, que reage apenas a `prefers-color-scheme`.

### Animações

- `MotionConfig reducedMotion="user"` no `layout.tsx` desliga animações de
  transformação quando o sistema pede movimento reduzido; `globals.css` zera as
  animações CSS no mesmo `@media`.
- `SynapseVisual.tsx` (Hero) tem uma versão estática (`StaticSynapse`) ativada
  por `prefers-reduced-motion` **ou** `max-width: 1023px` (mesmo `useEffect`,
  lido lá para não gerar hydration mismatch) — no smartphone não há animação.
- Easing padrão de entradas: `[0.22, 1, 0.36, 1]`.
- Grade da Hero: camada `.hero-grid-sweep` (quadradinhos de 28px + varredura
  de 9s) tem `animation: none` e `opacity: 0` abaixo de 1024px.
- Ao animar `transform` em SVG, o Framer força `transform-box: fill-box` —
  **não** passe `transformOrigin` com coordenadas do viewBox (o anel/nó sai do
  lugar); o padrão `50% 50%` já centraliza corretamente.

### URL inicial

- Logo (navbar e rodapé), item "Início" e o efeito de montagem do `Hero` usam
  `<Link href="/">` + `history.replaceState(null, "", "/")` → a página sempre
  volta ao estado inicial `/` (sem `#hash`).
- Âncoras de seção continuam escrevendo o hash normalmente (`/#metodologia`).

## Deploy

- **Plataforma:** Vercel
- **Banco:** Neon Postgres (plano gratuito)
- **URL:** https://sinaptech-landing.vercel.app

### Configuração

1. Conecte o repositório GitHub ao Vercel
2. Adicione no painel do Vercel: `DATABASE_URL`, `DIRECT_URL`, `SMTP_HOST`,
   `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` e `DIAGNOSTIC_TO_EMAIL`
3. O deploy é automático a cada push na branch `dev`

### Desenvolvimento Local

```bash
# Copie .env.example para .env.local
# Preencha DATABASE_URL, DIRECT_URL e as variáveis SMTP
npm run dev

npx prisma db push   # cria Contact e Diagnostic (usa DIRECT_URL)
```

## Fluxo de Trabalho

### Branches

| Branch | Uso |
|--------|-----|
| `dev` | Desenvolvimento + deploy em produção |
| `master` | Branch estável, atualizada apenas via PR |

### Desenvolvimento

1. Trabalhe na branch `dev`
2. Edite os componentes em `src/components/`
3. Teste localmente com `npm run dev`
4. Rode `npm run lint` para verificar erros
5. Commit e push para `dev`

### Deploy em Produção

1. Rode `npm run build` para gerar a build estática
2. Push para `dev` — o Vercel faz deploy automaticamente

### Sincronizar com Master

1. Abra um **Pull Request** de `dev` → `master`
2. Após review e aprovação, merge via GitHub

### Regra Obrigatória

> **Sempre que houver mudança significativa (novo componente, correção de bug, update de dependência), atualizar o fluxo de produção:** build + deploy + commit do status atualizado.
