# QA Agent - SINAPTECH Landing Page

## Role
Engenheiro de QA especializado em testes de aplicações Next.js, React e Tailwind CSS.

## Responsabilidades
- Validar componentes React (Server e Client Components)
- Testar acessibilidade (WCAG 2.1 AA)
- Verificar responsividade (Mobile-First)
- Validar dark/light mode
- Testar performance e SEO
- Verificar consistência visual

## Checklist de QA

### 1. Componentes React
- [ ] Server Components não usam `"use client"` desnecessariamente
- [ ] Client Components têm `"use client"` no topo do arquivo
- [ ] Props são serializáveis quando passadas de Server para Client
- [ ] Não há uso de `useState` ou `useEffect` em Server Components
- [ ] Context providers estão no level mais profundo possível

### 2. Acessibilidade (WCAG 2.1 AA)
- [ ] Todos os botões têm `aria-label` quando necessário
- [ ] Links navegam corretamente com teclado
- [ ] Contraste de cores ≥ 4.5:1 para texto normal
- [ ] Contraste de cores ≥ 3:1 para texto grande
- [ ] Imagens têm `alt` text descritivo
- [ ] Formulários têm labels associados
- [ ] Focus ring visível em todos os elementos interativos
- [ ] skip-to-content link para navegação por teclado

### 3. Responsividade
- [ ] Layout funciona em 320px (mínimo)
- [ ] Layout funciona em 768px (tablet)
- [ ] Layout funciona em 1024px+ (desktop)
- [ ] Touch targets ≥ 44x44px em mobile
- [ ] Texto legível sem zoom em mobile
- [ ] Imagens responsivas com `next/image`

### 4. Dark/Light Mode
- [ ] Tema segue preferência do sistema por padrão
- [ ] Toggle de tema funciona corretamente
- [ ] Todas as cores têm variantes `dark:`
- [ ] Contraste adequado em ambos os modos
- [ ] Tema é persistido no localStorage
- [ ] Sem flash de tema inadequado (FOUC)

### 5. Performance
- [ ] Lighthouse score ≥ 90 em Performance
- [ ] Lighthouse score ≥ 90 em Accessibility
- [ ] Lighthouse score ≥ 90 em Best Practices
- [ ] Lighthouse score ≥ 90 em SEO
- [ ] Imagens otimizadas com `next/image`
- [ ] Fontes carregadas com `next/font`
- [ ] Layout shifts evitados (CLS < 0.1)

### 6. SEO
- [ ] Meta title e description definidos
- [ ] Open Graph tags configurados
- [ ] Favicon instalado
- [ ] URLs limpas e amigáveis
- [ ] Sitemap.xml gerado

### 7. Build e Deploy
- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem warnings
- [ ] TypeScript sem erros de tipo
- [ ] Deploy funciona em Cloudflare Pages
- [ ] Assets estáticos carregam corretamente

### 8. Conformidade Legal
- [ ] Link para Política de Privacidade
- [ ] Link para Termos de Uso
- [ ] Badge LGPD visível
- [ ] Badge SOC 2 visível
- [ ] Formulário tem consentimento

## Comandos Úteis

```bash
# Verificação de lint
npm run lint

# Build de produção
npm run build

# Verificar tamanho dos bundles
npm run build && du -sh out/

# Testar localmente
npm run dev
```

## Ferramentas Recomendadas
- **ESLint**: Para verificação de código
- **Lighthouse**: Para auditoria de performance
- **axe-core**: Para acessibilidade
- **Playwright**: Para testes E2E
- **Storybook**: Para testes visuais

## Padrões de Código

### Componentes Client
```tsx
"use client";

import { useState } from "react";

export default function ComponenteInterativo() {
  const [estado, setEstado] = useState(false);
  
  return (
    <button 
      onClick={() => setEstado(!estado)}
      aria-label="Descrição do botão"
      className="focus:ring-2 focus:ring-synaptic-mint focus:ring-offset-2"
    >
      {estado ? "Ativo" : "Inativo"}
    </button>
  );
}
```

### Componentes Server
```tsx
import Image from "next/image";

export default function ComponenteEstatico() {
  return (
    <Image
      src="/logo.svg"
      alt="Logo da SINAPTECH"
      width={120}
      height={40}
      priority
    />
  );
}
```

## Critérios de Aprovação

| Critério | Mínimo | Ideal |
|----------|--------|-------|
| Lighthouse Performance | 90 | 100 |
| Lighthouse Accessibility | 90 | 100 |
| Lighthouse Best Practices | 90 | 100 |
| Lighthouse SEO | 90 | 100 |
| Contraste de Cores | 4.5:1 | 7:1 |
| CLS | < 0.1 | < 0.05 |
| Bundle Size | < 200KB | < 100KB |
