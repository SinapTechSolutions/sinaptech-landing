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
npm run build      # Build de produção (gera diretório out/)
npm run lint       # Verifica código com ESLint
npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production  # Deploy Cloudflare Pages
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
│   ├── Solutions.tsx       # Bento Grid de soluções
│   ├── Sinapse.tsx         # Timeline do Ciclo Sináptico
│   ├── DNA.tsx             # Missão, Manifesto, Visão
│   ├── Contact.tsx         # Formulário + info de contato
│   └── Footer.tsx          # Footer com links e badges
public/
├── gemini-svg.svg          # Logo SINAPTECH (rede neural SVG)
└── favicon.ico             # Favicon (atualizar para SVG)
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

- **Plataforma:** Cloudflare Pages
- **Projeto:** sinaptech-landing
- **URL Fixa:** https://production.sinaptech-landing.pages.dev

### Atualizar Deploy

```bash
npm run build && npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production
```

## Fluxo de Trabalho

### Branches

| Branch | Uso |
|--------|-----|
| `dev` | Desenvolvimento, features, fixes |
| `master` | Deploy em produção |

### Desenvolvimento

1. Trabalhe na branch `dev`
2. Edite os componentes em `src/components/`
3. Teste localmente com `npm run dev`
4. Rode `npm run lint` para verificar erros
5. Commit e push para `dev`

### Deploy em Produção

1. Merge de `dev` → `master`
2. Rode `npm run build` para gerar a build estática
3. Deploy com `npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production`
