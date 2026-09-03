# SINAPTECH Landing Page

Landing page corporativa da SINAPTECH - Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 + Framer Motion
- next-themes (Light/Dark Mode)
- Lucide React (Ícones)
- TypeScript

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Componentes

| Componente | Descrição |
|---|---|
| Navbar | Sticky com glassmorphism, theme toggle e CTA |
| Hero | Split-screen com animação de sinapse SVG + cards flutuantes |
| Solutions | Bento Grid de soluções (IA, SaaS, GovTech, Sob Demanda) |
| Sinapse | Timeline do Ciclo Sináptico (4 etapas) |
| DNA | Missão, Manifesto, Visão |
| Contact | Formulário + info de contato (email, WhatsApp) |
| Footer | Footer com links e badges LGPD/SOC 2 |

## Deploy

### Cloudflare Pages

- **URL Fixa:** https://production.sinaptech-landing.pages.dev
- **Projeto:** sinaptech-landing

### Atualizar Deploy

```bash
npm run build && npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
