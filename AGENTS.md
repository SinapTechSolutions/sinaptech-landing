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
│   ├── SolutionModal.tsx   # Modal de detalhes de cada solução
│   ├── Sinapse.tsx         # Timeline do Ciclo Sináptico
│   ├── SynapseVisual.tsx   # Animação SVG de rede neural
│   ├── Products.tsx        # Carrossel de produtos proprietários
│   ├── ROICalculator.tsx   # Simulador de impacto operacional
│   ├── DNA.tsx             # Missão, Manifesto, Visão
│   ├── FAQ.tsx             # Perguntas frequentes (accordion)
│   ├── Contact.tsx         # Formulário + info de contato
│   ├── ThemeToggle.tsx     # Toggle light/dark (detecção automática)
│   └── Footer.tsx          # Footer com links e badges
public/
├── sinaptech-icon.svg      # Logo SINAPTECH (rede neural SVG)
└── favicon.ico             # Favicon
```

## Design Tokens (CSS Variables)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-brand-snow` | #FAFBFC | #0B1120 | Fundo da página |
| `--color-brand-ink` | #111827 | #F8FAFC | Texto primário |
| `--color-brand-muted` | #6B7280 | #94A3B8 | Texto secundário |
| `--color-forest-trust` | #047857 | #10B981 | Botões primários |
| `--color-synaptic-mint` | #059669 | #34D399 | Destaques, badges |
| `--color-human-amber` | #D97706 | #FBBF24 | Alertas |

## Deploy

- **Plataforma:** Vercel
- **Banco:** Neon Postgres (plano gratuito)
- **URL:** https://sinaptech-landing.vercel.app

### Configuração

1. Conecte o repositório GitHub ao Vercel
2. Adicione a variável `DATABASE_URL` no painel do Vercel
3. O deploy é automático a cada push na branch `dev`

### Desenvolvimento Local

```bash
# Copie .env.local.example para .env.local
# Preencha com sua DATABASE_URL do Neon
npm run dev
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
