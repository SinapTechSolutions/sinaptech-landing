# Sinaptech — Git Flow & Branching Strategy

## Regras Fundamentais

```
1. Nunca trabalhar direto na main
2. Toda tarefa = uma branch
3. Branch = escopo pequeno
4. Commits = Conventional Commits
5. Toda alteração = Pull Request
6. PR precisa passar no CI
7. PR precisa de 1+ review
8. Squash merge
9. Limpar branch após merge
10. Main sempre pronta para deploy
```

## Branches

```
main          → código estável + deploy
feature/*     → nova funcionalidade
fix/*         → correção de bug
refactor/*    → refatoração
infra/*       → infraestrutura
chore/*       → manutenção
hotfix/*      → correção urgente
```

### Exemplos

```
feature/user-authentication
feature/SIN-123-citizen-registration
fix/login-redirect
refactor/payment-service
chore/update-dependencies
```

> **Nome da branch descreve O QUE faz, não QUEM criou.**

## Fluxo

```
Issue/Ticket
    ↓
git checkout main && git pull
    ↓
git checkout -b feature/<descrição>
    ↓
Desenvolvimento (commits pequenos)
    ↓
git push -u origin feature/<descrição>
    ↓
Abrir Pull Request
    ↓
┌─────────────────────────┐
│  CI                     │
│  ├── lint               │
│  ├── typecheck          │
│  ├── tests              │
│  └── build              │
│  Code Review (1+ aprovação)
└─────────────────────────┘
    ↓
Squash Merge
    ↓
main → Deploy
```

## Conventional Commits

```
feat(scope): descrição
fix(scope): descrição
refactor(scope): descrição
chore: descrição
docs: descrição
```

### Exemplos

```bash
git commit -m "feat(auth): add login endpoint"
git commit -m "fix(payment): handle timeout"
git commit -m "refactor(api): extract validation"
git commit -m "chore: update eslint v9"
```

### Escopos comuns

```
auth | api | ui | db | deploy | config | docs | test
```

## Atualizando Feature Branch

```bash
git fetch origin
git checkout feature/<descrição>
git rebase origin/main
# resolver conflitos se necessário
git push --force-with-lease
```

> **NUNCA rebase na main compartilhada!**

## PR Title

```
[feat(auth)] Implement user authentication
```

ou com ticket:

```
[SIN-123] Implement citizen registration
```

## Branch Protection (GitHub)

```
main
✓ Pull Request obrigatório
✓ 1+ aprovação
✓ CI obrigatório
✓ Branch atualizada antes do merge
✓ Sem push direto
✓ Sem force push
✓ Auto-delete branch após merge
```

## CI (GitHub Actions)

```yaml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

## Branches Pequenas

```
❌ feature/marketplace (15k linhas)

✅ feature/product-model
✅ feature/product-api
✅ feature/product-list-page
✅ feature/product-search
✅ feature/product-details
```

## Visual

```
main ◄── PR ◄── feature/* fix/* refactor/*
 │                    │
 │                    ├── CI pass ✓
 │                    ├── Review ok ✓
 │                    └── Squash merge
 │
 └──► Deploy automático
```

---

**Duvidas?** Consultar `AGENTS-GIT.md` no repositório.
