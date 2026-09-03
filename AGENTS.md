<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SINAPTECH Landing Page

## Visão Geral

Landing page corporativa da SINAPTECH (Software House Premium, SaaS e GovTech).
Stack: Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Framer Motion + next-themes.

## Comandos Úteis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build de produção (gera diretório out/)
npm run lint       # Verifica código com ESLint
npx wrangler pages deploy out --project-name=sinaptech-landing  # Deploy Cloudflare Pages
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
```

## Design Tokens (CSS Variables)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--color-brand-snow` | #FFFFFF | #0B1120 | Fundo da página |
| `--color-brand-ink` | #0F172A | #F8FAFC | Texto primário |
| `--color-brand-muted` | #64748B | #94A3B8 | Texto secundário |
| `--color-forest-trust` | #065F46 | #10B981 | Botões primários |
| `--color-synaptic-mint` | #10B981 | #34D399 | Destaques, badges |
| `--color-human-amber` | #F59E0B | #FBBF24 | Alertas |

## Deploy

- **Plataforma:** Cloudflare Pages
- **Projeto:** sinaptech-landing
- **URL Fixa:** https://production.sinaptech-landing.pages.dev

### Atualizar Deploy

```bash
npm run build && npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production
```

> Nota: Cada deploy gera uma URL com hash único (ex: `c435e884`), mas a URL de alias `production.sinaptech-landing.pages.dev` é fixa.

## Fluxo de Trabalho

1. Edite os componentes em `src/components/`
2. Teste localmente com `npm run dev`
3. Rode `npm run lint` para verificar erros
4. Rode `npm run build` para gerar a build estática
5. Deploy com `npx wrangler pages deploy out --project-name=sinaptech-landing`
