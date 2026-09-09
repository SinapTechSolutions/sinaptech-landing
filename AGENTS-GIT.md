# AGENT: Git Flow & Branching Strategy

## Visão Geral

Estratégia de branching baseada em **GitHub Flow** — simples, revisável e escalável.

```text
main (estável + deploy)
 ↑
PR
 ↑
feature/* fix/* refactor/* chore/* infra/*
```

## Regras Fundamentais

1. **Nunca trabalhar diretamente na `main`.**
2. **Toda tarefa deve possuir uma branch.**
3. **Branch deve ter escopo pequeno** (unidade revisável de trabalho).
4. **Commits devem seguir Conventional Commits.**
5. **Toda alteração entra por Pull Request.**
6. **PR precisa passar pelo CI** (lint, typecheck, tests, build).
7. **PR precisa de pelo menos uma revisão.**
8. **Preferir Squash Merge.**
9. **Após merge, apagar a feature branch.**
10. **`main` deve estar sempre pronta para deploy.**

## Convenção de Branches

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Feature | `feature/<descrição>` | `feature/user-authentication` |
| Fix | `fix/<descrição>` | `fix/login-redirect` |
| Refactor | `refactor/<descrição>` | `refactor/payment-service` |
| Infraestrutura | `infra/<descrição>` | `infra/docker-production` |
| Manutenção | `chore/<descrição>` | `chore/update-dependencies` |
| Hotfix | `hotfix/<descrição>` | `hotfix/payment-crash` |

### Com tickets (recomendado)

```text
feature/SIN-123-user-authentication
fix/SIN-81-payment-timeout
```

### Regra de ouro

> **O nome da branch descreve O QUE ela faz, não QUEM criou.**

❌ `diego-login`, `joao-dashboard`
✅ `feature/login`, `feature/admin-dashboard`

## Fluxo Completo

```text
Issue/Ticket
  │
  ▼
Criar branch a partir da main
  │
  ▼
Desenvolvimento (commits pequenos)
  │
  ▼
Push
  │
  ▼
Abrir Pull Request
  │
  ├── CI: lint
  ├── CI: typecheck
  ├── CI: tests
  ├── CI: build
  └── Code Review
  │
  ▼
Squash Merge
  │
  ▼
main
  │
  ▼
Deploy automático
```

## Criando uma Feature Branch

```bash
# Sempre atualizar a main primeiro
git checkout main
git pull origin main

# Criar branch
git checkout -b feature/user-authentication
```

## Commits — Conventional Commits

### Formato

```text
<type>(<scope>): <descrição>
```

### Tipos permitidos

| Type | Uso |
|------|-----|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudar comportamento |
| `chore` | Manutenção, dependências, configs |
| `docs` | Documentação |
| `style` | Formatação, CSS, sem mudança lógica |
| `test` | Adição/correção de testes |
| `ci` | Configuração de CI/CD |
| `perf` | Melhoria de performance |
| `revert` | Reverter commit anterior |

### Exemplos

```bash
git commit -m "feat(auth): add login endpoint"
git commit -m "fix(payment): handle timeout error"
git commit -m "refactor(api): extract validation logic"
git commit -m "chore: update eslint to v9"
git commit -m "docs: update AGENTS.md"
```

### Escopos comuns (SINAPTECH)

```text
auth, api, ui, db, deploy, config, docs, test
```

## Push e Pull Request

```bash
git push -u origin feature/user-authentication
```

### Título do PR

```text
[feat(auth)] Implement user authentication
```

ou com ticket:

```text
[SIN-123] Implement citizen registration
```

### Descrição do PR

```markdown
## O que foi feito
- Adicionado endpoint de login
- Validação de credenciais
- JWT token generation

## Como testar
1. POST /api/auth/login com email/senha
2. Verificar retorno do token

## Related
- Closes #42
```

## Mantendo a Branch Atualizada

```bash
# Fetch das alterações remotas
git fetch origin

# Rebase na main
git checkout feature/user-authentication
git rebase origin/main

# Se houver conflitos, resolver e continuar
git rebase --continue

# Forçar push (apenas na feature branch)
git push --force-with-lease
```

> **NUNCA fazer rebase na `main` compartilhada!**

## Squash Merge

Padrão para manter o histórico da `main` limpo.

### Exemplo

Uma feature com 5 commits:

```text
feat: create user model
fix: validation
fix: lint
fix: tests
refactor: improve service
```

Vira **um único commit** na `main`:

```text
feat(auth): implement user authentication
```

### Configuração no GitHub

Em **Settings → General → Pull Requests**:
- ✅ Allow squash merging
- ❌ Allow merge commits
- ❌ Allow rebase merging

## Proteção da Branch `main`

No GitHub em **Settings → Branches → Branch protection rules**:

```text
main
✓ Pull Request obrigatório
✓ Pelo menos 1 aprovação
✓ CI obrigatório (lint, typecheck, tests, build)
✓ Branch atualizada antes do merge
✓ Sem push direto
✓ Sem force push
✓ Automatically delete head branches
```

## CI Mínimo (GitHub Actions)

```yaml
name: CI

on:
  pull_request:
    branches:
      - main

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

**PR só é mergeado se tudo passar:**

```text
✓ lint
✓ typescript
✓ tests
✓ build
✓ review
```

## Exemplo Prático

### Cenário: Plataforma para prefeitura

Tarefas:

```text
SIN-101 Cadastro de cidadãos
SIN-102 Dashboard administrativo
SIN-103 Autenticação gov.br
```

### Branches

```bash
feature/SIN-101-citizen-registration
feature/SIN-102-admin-dashboard
feature/SIN-103-govbr-auth
```

### Desenvolvimento paralelo

```bash
# Desenvolvedor 1
git checkout -b feature/SIN-101-citizen-registration
git commit -m "feat(citizens): add registration endpoint"
git push -u origin feature/SIN-101-citizen-registration

# Desenvolvedor 2
git checkout -b feature/SIN-102-admin-dashboard
git commit -m "feat(dashboard): create admin layout"
git push -u origin feature/SIN-102-admin-dashboard
```

### Após merge de SIN-101

```bash
# Desenvolvedor 2 atualiza sua branch
git fetch origin
git rebase origin/main
git push --force-with-lease
```

### Limpeza

```bash
# Local
git branch -d feature/SIN-101-citizen-registration

# Remoto: configurado automaticamente no GitHub
# Settings → General → Automatically delete head branches
```

## Branches Pequenas

> **Uma branch deve representar uma unidade pequena e revisável de trabalho.**

❌ Ruim:

```text
feature/marketplace (15.000 linhas alteradas)
```

✅ Bom:

```text
feature/product-model
feature/product-api
feature/product-list-page
feature/product-search
feature/product-details
```

## Resumo Visual

```text
┌─────────────────────────────────────────────────────┐
│                    SINAPTECH GIT FLOW                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  main ◄── PR ◄── feature/*  fix/*  refactor/*      │
│   │                       │                         │
│   │                       ├── CI pass               │
│   │                       ├── Review aprovado       │
│   │                       └── Squash merge          │
│   │                                                 │
│   └──► Deploy automático                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ✓ Nunca direto na main                             │
│  ✓ Branches pequenas                                │
│  ✓ Conventional Commits                             │
│  ✓ PR obrigatório                                   │
│  ✓ CI obrigatório                                   │
│  ✓ Squash merge                                     │
│  ✓ Limpar branch após merge                         │
└─────────────────────────────────────────────────────┘
```
