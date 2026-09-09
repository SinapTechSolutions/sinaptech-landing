# SINAPTECH Landing Page

Landing page corporativa da SINAPTECH - Software House Premium especializada em IA Local, SaaS B2B e soluções GovTech.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 + Framer Motion
- next-themes (Light/Dark Mode)
- Lucide React (Ícones)
- TypeScript
- Prisma + Neon Postgres

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
| TrustBadges | Badges de conformidade (LGPD, Licitações, Segurança) |
| Solutions | Bento Grid de soluções (IA, SaaS, GovTech, Sob Demanda) |
| SolutionModal | Modal de detalhes de cada solução |
| Sinapse | Timeline do Ciclo Sináptico (4 etapas) |
| SynapseVisual | Animação SVG de rede neural |
| Products | Carrossel de produtos proprietários (Tatame Squad) |
| ROICalculator | Simulador de impacto operacional por segmento |
| DNA | Missão, Manifesto, Visão |
| FAQ | Perguntas frequentes com accordion |
| Contact | Formulário + info de contato (email, WhatsApp) |
| ThemeToggle | Toggle light/dark com detecção automática do sistema |
| Footer | Footer com links e badges LGPD/Licitações |

## Fluxo de Trabalho

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

## Deploy

### Vercel

- **URL:** https://sinaptech-landing.vercel.app
- **Banco:** Neon Postgres (plano gratuito)

### Configuração

1. Conecte o repositório GitHub ao Vercel
2. Adicione a variável `DATABASE_URL` no painel do Vercel
3. O deploy é automático a cada push na branch `dev`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
