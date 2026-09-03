@AGENTS.md

# SINAPTECH Landing Page - Guia Rápido

## Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 + Framer Motion
- next-themes (Light/Dark Mode)
- Lucide React (Ícones)
- Cloudflare Pages (Deploy)

## Comandos
```bash
npm run dev                           # Desenvolvimento
npm run build                         # Build produção
npm run lint                          # Lint
npx wrangler pages deploy out --project-name=sinaptech-landing  # Deploy
```

## Componentes
- `Navbar.tsx` - Sticky glassmorphism + theme toggle
- `Hero.tsx` - Split-screen + animação sinapse SVG
- `Solutions.tsx` - Bento Grid (IA, SaaS, GovTech, Sob Demanda)
- `Sinapse.tsx` - Timeline 4 etapas
- `DNA.tsx` - Missão/Manifesto/Visão
- `Contact.tsx` - Formulário + WhatsApp
- `Footer.tsx` - Links + badges

## Deploy URL
https://production.sinaptech-landing.pages.dev
