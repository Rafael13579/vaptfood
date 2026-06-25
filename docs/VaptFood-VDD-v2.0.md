# VDD — Version Description Document
**Projeto:** VaptFood — Plataforma de Food Delivery
**Versão:** 2.0.1
**Data:** 25/06/2026
**Elaborado por:** Pedro Augusto, Rafael Fernandes da Silva, Cláudio Eliziário
**Referência:** IEEE 828-2012 — Seção 6.3 (Configuration Status Accounting)

---

## 1. Identificação da Baseline

| Campo | Valor |
|---|---|
| **ID da Baseline** | BL-03 — Baseline de Produto |
| **Versão do Software** | 2.0.1 |
| **Tag Git** | `v2.0.1` |
| **Commit HEAD (SHA-1)** | `278296747d5e5a55386e26a32a9deb4b548865f9` |
| **Data de congelamento** | 2026-06-25 14:29:48 -0300 |
| **Repositório** | `Rafael13579/vaptfood` (GitHub) |
| **Ferramenta de SBOM** | Syft v1.45.1 — CycloneDX JSON 1.6 |
| **Versionamento** | SemVer (MAJOR.MINOR.PATCH) |

---

## 2. Inventário de Modificações (Matriz de Rastreabilidade)

| Hash | Mensagem do Commit | CR / Issue | Tipo | Autor |
|---|---|---|---|---|
| `b2d76f6` | Initial commit | — | chore | Rafael |
| `7b4a6db` | docs: adiciona plano de gerencia de configuracao | — | docs | Rafael |
| `cd5a286` | feat(VF-01): estrutura inicial do repositório | VF-01 | feat | Pedro |
| `e38ab6e` | Merge PR #1 — feature/VF-01-estrutura-inicial | VF-01 | merge | Rafael |
| `1c37560` | chore(VF-02): adiciona .gitignore, package-lock.json e SBOM gerado pelo Syft v1.45.1 | VF-02 | chore | Pedro |
| `c3651b8` | Merge PR #2 — feature/VF-02-sbom-gitignore | VF-02 | merge | Rafael |
| `ded25a7` | chore(VF-02): adiciona .gitignore, package-lock.json e SBOM (tag v1.1) | VF-02 | chore | Pedro |
| `50f476b` | docs(VF-03): adiciona VDD para baseline BL-02 | VF-03 | docs | Rafael |
| `9508810` | docs(VF-04): adiciona relatório de auditoria física BL-01 | VF-04 | docs | Cláudio |
| `82e6ceb` | Merge PR #6 — release/1.2 (tag v1.2 / v2.0) | — | merge | Rafael |
| `85a95bb` | feat(auth): add authentication routes | VF-05 | feat | Pedro |
| `7d9afe5` | feat(cardapio): add menu routes | VF-05 | feat | Pedro |
| `cb3952e` | feat(pedidos): add order routes | VF-05 | feat | Pedro |
| `32b5219` | feat(backend): bootstrap express server | VF-05 | feat | Pedro |
| `27b2b1f` | docs(backend): document environment variables | VF-05 | docs | Pedro |
| `e354c82` | Merge PR #7 — feature/VF-05-backend-server | VF-05 | merge | Rafael |
| `0e3ab7c` | feat(db): add users migration | VF-06 | feat | Rafael |
| `d47802e` | feat(db): add initial seed script | VF-06 | feat | Rafael |
| `92769df` | docs(scripts): document database scripts | VF-06 | docs | Rafael |
| `869961d` | Merge PR #8 — feature/VF-06-database-scripts | VF-06 | merge | Rafael |
| `a46a4f1` | test(auth): add authentication route tests | VF-07 | test | Cláudio |
| `fd6fcee` | test(cardapio): add menu route tests | VF-07 | test | Cláudio |
| `b6b8d3f` | test(pedidos): add order route tests | VF-07 | test | Cláudio |
| `0f90c0d` | test(backend): add jest test script | VF-07 | test | Cláudio |
| `6510e8e` | Merge PR #9 — feature/VF-07-testes-unitarios | VF-07 | merge | Rafael |
| `8f870f5` | build(scripts): add local build script | VF-08 | build | Pedro |
| `172bc2a` | ci(github): add build and test workflow | VF-08 | ci | Pedro |
| `e6312ce` | Merge PR #10 — feature/VF-08-build-script | VF-08 | merge | Rafael |
| `4a5c4f0` | Merge PR #11 — release/2.0 (tag v2.0) | — | merge | Rafael |
| `6d1baa9` | docs(VF-09): padroniza nomenclatura dos documentos | VF-09 | docs | Pedro |
| `9d3cd58` | Merge PR #12 — feature/VF-09-renomear-docs | VF-09 | merge | Rafael |
| `cc74cf9` | Merge PR #13 — release/2.0.1 (tag v2.0.1) | — | merge | Rafael |

### Resumo por tipo de mudança

| Tipo | Quantidade | CRs atendidas |
|---|---|---|
| feat (nova funcionalidade) | 7 | VF-01, VF-05, VF-06 |
| chore (configuração/infraestrutura) | 3 | VF-02 |
| docs (documentação) | 6 | VF-03, VF-04, VF-05, VF-09 |
| test (testes) | 4 | VF-07 |
| build / ci | 2 | VF-08 |
| merge | 10 | — |

### Histórico de Baselines e Tags

| Tag | Commit | Baseline | Data | Descrição |
|---|---|---|---|---|
| `v1.0` | `e38ab6e` | BL-01 — Baseline Funcional | 2026-06-18 | Estrutura inicial do repositório |
| `v1.1` | `ded25a7` | BL-02 — Baseline de Desenvolvimento | 2026-06-18 | SBOM e controle de dependências |
| `v2.0` | `82e6ceb` | BL-03 — Baseline de Produto (parcial) | 2026-06-19 | Backend, testes, scripts e build |
| `v2.0.1` | `cc74cf9` | BL-03 — Baseline de Produto (final) | 2026-06-25 | Padronização de docs e SBOM atualizado |

---

## 3. Composição do Software / SBOM

**Ferramenta:** Syft v1.45.1 (Anchore)
**Formato:** CycloneDX JSON 1.6
**Arquivo:** `sbom.json`
**Timestamp:** `2026-06-25`
**Escaneamento realizado sobre:** tag `v2.0.1`

### Resumo do inventário

| Tipo de Componente | Quantidade |
|---|---|
| `library` (dependências npm) | 1.086 |
| `file` (arquivos rastreados) | 6 |
| `application` (executáveis) | 1 |
| **Total** | **1.092** |

### Dependências diretas — Backend (`src/backend/package.json`)

| Pacote | Versão | Finalidade |
|---|---|---|
| `express` | ^4.18.2 | Framework HTTP da API REST |
| `jsonwebtoken` | ^9.0.0 | Autenticação JWT |
| `bcryptjs` | ^2.4.3 | Hash de senhas |
| `mongoose` | ^7.5.0 | ODM para MongoDB |
| `dotenv` | ^16.3.1 | Gerenciamento de variáveis de ambiente |
| `cors` | ^2.8.5 | Controle de CORS |
| `stripe` | ^13.6.0 | Integração com gateway de pagamento |
| `jest` *(dev)* | ^29.6.4 | Framework de testes unitários |
| `nodemon` *(dev)* | ^3.0.1 | Hot reload em desenvolvimento |

### Dependências diretas — Mobile (`src/mobile-app/package.json`)

| Pacote | Versão | Finalidade |
|---|---|---|
| `expo` | ~49.0.0 | Plataforma de desenvolvimento mobile |
| `react` | 18.2.0 | Biblioteca de UI |
| `react-native` | 0.72.4 | Framework mobile multiplataforma |
| `expo-location` | ~16.1.0 | Geolocalização |
| `expo-notifications` | ~0.20.1 | Notificações push |
| `@react-navigation/native` | ^6.1.7 | Navegação entre telas |
| `axios` | ^1.5.0 | Cliente HTTP |

---

## 4. Problemas Conhecidos e Limitações

| ID | Descrição | Severidade | Status |
|---|---|---|---|
| LIM-01 | `src/web-admin/` sem implementação — painel administrativo não desenvolvido nesta baseline | Média | Pendente |
| LIM-02 | Backend sem conexão real com banco de dados MongoDB — rotas retornam dados mockados | Alta | Pendente |
| LIM-03 | Aplicativo mobile sem implementação de telas — apenas estrutura de dependências | Alta | Pendente |
| LIM-04 | Testes unitários cobrem apenas rotas básicas — sem testes de integração | Média | Pendente |
| LIM-05 | Tags `v1.0` e `v1.1` não seguem SemVer completo (sem o terceiro dígito .PATCH) | Baixa | Aceito |
| LIM-06 | SBOM não inclui análise de vulnerabilidades CVE — Trivy não foi executado nesta baseline | Média | Pendente |

---

## 5. Hashes de Integridade (SHA-256)

| Arquivo | SHA-256 |
|---|---|
| `sbom.json` | `e1085f60618d14ec5df45286a5e42ae93cc2d23c8e993f00280d589965655d01` |
| `docs/VaptFood-VDD-v2.0.md` | `a45686dec35b8a3e886982d7aa7b679764a5411973a8b747926b9f786e36c7c4` |

---

*Documento elaborado em conformidade com IEEE 828-2012*
*VaptFood Tecnologia LTDA — Confidencial — Junho de 2026*