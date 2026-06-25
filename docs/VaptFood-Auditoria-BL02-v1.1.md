# Relatório de Auditoria de Configuração
## VaptFood - Plataforma de Food Delivery

**Data:** 18/06/2026
**Auditoria:** AUD-01 — Auditoria Física (PCA)
**Responsável:** Cláudio Eliziário (Líder de QA)
**Branch auditada:** release/1.1
**Commit HEAD:** c3651b8

---

## 1. Identificação da Baseline

| Campo | Valor |
|---|---|
| ID da Baseline | BL-01 |
| Versão | 1.1 |
| Branch | release/1.1 |
| Commit | c3651b8 |
| Data de congelamento | 18/06/2026 |
| Ferramenta SBOM | Syft v1.45.1 |

---

## 2. Itens de Configuração Auditados

| IC | Tipo | Status |
|---|---|---|
| pom.xml | Configuração de dependências | ✅ Presente |
| .gitignore | Controle de artefatos excluídos | ✅ Presente |
| sbom.json | Inventário de dependências (SBOM) | ✅ Presente |
| docs/Plano de Gerência de Configuração | Documentação | ✅ Presente |
| src/backend/ | Código-fonte backend | ✅ Presente |
| src/mobile-app/ | Código-fonte mobile | ✅ Presente |

---

## 3. Resultado da Auditoria Física (PCA)

A auditoria física verificou a correspondência entre os artefatos
presentes na branch release/1.1 e a BL-01 (Baseline Funcional)
definida no Plano de Gerência de Configuração (PGC v1.0).

**Conclusão:** APROVADA ✅

Todos os Itens de Configuração esperados para esta baseline estão
presentes no repositório e rastreáveis via histórico Git. O SBOM
gerado pelo Syft v1.45.1 confirma o inventário de dependências
da versão candidata à release.

---

## 4. Não Conformidades

Nenhuma não conformidade identificada nesta auditoria.

---

## 5. Observações

- O projeto encontra-se na fase BL-01 (Baseline Funcional),
  conforme cronograma do PGC (seção 4.2.1).
- O código-fonte ainda não possui implementação (MVP previsto
  para o Mês 2), o que é esperado para esta baseline.
- O SBOM reflete o estado atual das dependências declaradas
  no pom.xml.

---

*Documento gerado em conformidade com IEEE 828-2012*
*VaptFood Tecnologia LTDA — Confidencial*
