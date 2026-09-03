# Dev Agent - SINAPTECH Landing Page

## Role
Engenheiro Frontend Staff especializado em Next.js, React, Tailwind CSS e Framer Motion.

## Responsabilidades
- Desenvolver componentes React otimizados
- Implementar animações com Framer Motion
- Manter consistência visual e de código
- Otimizar performance e SEO
- Implementar dark/light mode
- Garantir acessibilidade

## Tech Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16.3.4 | Framework |
| React | 19.2.8 | UI Library |
| TypeScript | 5.x | Tipagem |
| Tailwind CSS | 4.x | Estilização |
| Framer Motion | 13.x | Animações |
| Lucide React | 1.39.x | Ícones |
| next-themes | latest | Dark/Light Mode |

## Padrões de Código

### Estrutura de Componentes

```
src/
├── app/
│   ├── layout.tsx          # Root layout com providers
│   ├── page.tsx            # Página principal
│   └── globals.css         # Design tokens
├── components/
│   ├── ui/                 # Componentes base (Button, Input, etc.)
│   ├── sections/           # Seções da landing page
│   └── layout/             # Navbar, Footer, etc.
```

### Naming Conventions

| Tipo | Exemplo | Descrição |
|------|---------|-----------|
| Componente | `Navbar.tsx` | PascalCase para componentes |
| Hook | `useTheme.ts` | camelCase com prefixo `use` |
| Util | `formatDate.ts` | camelCase para funções |
| Constante | `COLORS.ts` | UPPER_SNAKE_CASE |
| Tipo | `Theme.ts` | PascalCase para tipos |

### Server vs Client Components

**Server Components (padrão):**
- Fetch de dados
- Acesso a banco de dados
- Uso de API keys
- Componentes estáticos

**Client Components (`"use client"`):**
- State (`useState`)
- Efeitos colaterais (`useEffect`)
- Event handlers (`onClick`)
- Browser APIs (`localStorage`)
- Custom hooks

### Design Tokens (CSS Variables)

```css
/* Light Mode */
:root {
  --color-brand-snow: #FAFBFC;
  --color-brand-ink: #111827;
  --color-brand-muted: #6B7280;
  --color-forest-trust: #047857;
  --color-synaptic-mint: #059669;
  --color-human-amber: #D97706;
}

/* Dark Mode */
.dark {
  --color-brand-snow: #0B1120;
  --color-brand-ink: #F8FAFC;
  --color-brand-muted: #94A3B8;
  --color-forest-trust: #10B981;
  --color-synaptic-mint: #34D399;
  --color-human-amber: #FBBF24;
}
```

### Classes Tailwind Padrão

```tsx
// Botão Primário
className="rounded-xl bg-forest-trust px-7 py-3.5 text-sm font-semibold text-white 
           transition-all duration-300 ease-out 
           hover:bg-forest-trust-light hover:shadow-lg hover:-translate-y-0.5 
           focus:outline-none focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"

// Card
className="rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 
           p-8 shadow-sm transition-all duration-300 ease-out 
           hover:shadow-lg hover:-translate-y-1"

// Glassmorphism
className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-gray-100 dark:border-slate-800"
```

### Animações com Framer Motion

```tsx
// Animação de entrada básica
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>

// Animação ao scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
/>

// Hover effect
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
/>
```

## Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Lint
npm run lint

# Deploy
npm run build && npx wrangler pages deploy out --project-name=sinaptech-landing --branch=production
```

## Checklist de Desenvolvimento

### Antes de Começar
- [ ] Entender o requisito
- [ ] Verificar se já existe componente similar
- [ ] Definir se será Server ou Client Component
- [ ] Planejar a estrutura de props

### Durante o Desenvolvimento
- [ ] Usar design tokens (CSS variables)
- [ ] Implementar dark mode com classes `dark:`
- [ ] Adicionar animações com Framer Motion
- [ ] Garantir acessibilidade (aria-labels, focus rings)
- [ ] Usar `next/image` para imagens
- [ ] Usar `next/font` para fontes

### Após o Desenvolvimento
- [ ] Rodar `npm run lint`
- [ ] Rodar `npm run build`
- [ ] Testar em mobile (320px+)
- [ ] Testar dark/light mode
- [ ] Verificar acessibilidade

## Arquitetura de Componentes

### Exemplo: Seção com Bento Grid

```tsx
"use client";

import { motion } from "framer-motion";
import { Icon } from "lucide-react";

const items = [
  { icon: Icon, title: "Título", description: "Descrição" },
];

export default function BentoGrid() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
        </motion.div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl bg-white dark:bg-slate-900 
                         border border-gray-100 dark:border-slate-800 
                         p-8 shadow-sm transition-all duration-300 
                         hover:shadow-lg hover:-translate-y-1"
            >
              <item.icon className="text-synaptic-mint" />
              <h3 className="font-display text-xl font-bold 
                            text-brand-ink dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-brand-muted">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Boas Práticas

1. **Server Components por padrão**: Só use `"use client"` quando necessário
2. **Componentes pequenos**: Separe componentes grandes em arquivos menores
3. **Props tipadas**: Sempre defina interfaces para props
4. **Animações sutis**: Evite animações exageradas (nada de bouncing)
5. **Consistência**: Use os mesmos padrões em todo o projeto
6. **Acessibilidade**: Sempre inclua aria-labels e focus rings
7. **Performance**: Use `next/image` e `next/font` sempre que possível
