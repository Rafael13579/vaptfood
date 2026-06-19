# Documento de Descrição de Versão (VDD) - Plataforma VaptFood

## 1. Identificação da Baseline
Este documento consolida a identificação e auditoria física da linha de base atual do projeto VaptFood, em conformidade com o Plano de Gerência de Configuração do software.

* **Identificador Único da Baseline:** BL-02
* **Tag do Repositório:** `v1.1`
* **Branch de Auditoria:** `dev` (atualizada com a `main`)
* **Data da Baseline:** 18 de Junho de 2026
* **Ferramenta de CLI Utilizada:** Syft v1.45.1 (com especificação CycloneDX v1.6)
* **Responsável Técnico (Líder de QA):** Claudio Eliziario
* **Hashes Criptográficos de Integridade (SHA-256):**
    * `sbom.json`: 68b3e0e7e04c7fa39cfdeaff50ecf2cd69669eede1c7e01d98a4d48b0e90ef04
    * `docs/VDD.md`: 35962ef1fd6d3b5bfcc0c393bd712f4291000cc465cb942b63806963759e05c8

---

## 2. Inventário de Modificações e Matriz de Rastreabilidade
Abaixo está o mapeamento dos commits e das solicitações de mudança atendidas nesta linha de base, conforme o histórico do sistema de controle de versão (VCS):

| Hash do Commit / ID | Tipo de Alteração | Descrição da Modificação | Itens de Configuração (ICs) Afetados | Rastreabilidade (Jira/Trello) | Status da Auditoria     |
| :--- | :--- | :--- | :--- | :--- |:------------------------|
| `00be796` | Merge | Incorporação da branch 'main' na branch 'dev' para consolidação da release| Todo o repositório | Geral da Sprint | Aprovado (CCB)          |
| `ded25a7` / `1c37560` | Chore | Adicionado arquivo `.gitignore`, `package-lock.json` e o inventário SBOM gerado pelo Syft | `.gitignore`, `sbom.json` | Ticket `VF-02` | Aprovado (PCA) |
| `e38ab6e` / `cd5a286` | Feat | Implantação da estrutura inicial do repositório contendo os módulos do ecossistema | Raiz do projeto, `/src` | Ticket `VF-01` | Aprovado (FCA) |
| `7b4a6db` | Docs | Criação e publicação do Plano de Gerência de Configuração formal da equipe | `/docs/PGC.pdf` | Documentação | Aprovado (CCB) |

---

## 3. Composição do Software e Resultados do SBOM
A auditoria física (PCA) realizada com a ferramenta de CLI Syft extraiu a árvore completa de dependências da plataforma de Food Delivery:

### A. Metadados do Ecossistema Mapeado
* **Tipo de Projeto:** Aplicação Full-Stack (Microsserviços no Backend e Aplicativo Mobile)
* **Escopo do Escaneamento:** `/src/mobile-app/package-lock.json` e `/src/backend/package.json`

### B. Principais Itens de Configuração Abstratos (Dependências Diretas)
Os seguintes ICs externos compõem o núcleo estável da aplicação:
1. **Framework e Roteamento:** `express` (^4.18.2)
2. **Segurança e Autenticação:** `jsonwebtoken` (^9.0.0) e `bcryptjs` (^2.4.3)
3. **Persistência de Dados (Banco de Dados NoSQL):** `mongoose` (^7.5.0)
4. **Gateway de Pagamento:** `stripe` (^13.6.0)
5. **Ecossistema Mobile:** `expo` (~49.0.0), `react-native` (0.72.4) e `expo-location` (~16.1.0)

---

## 4. Problemas Conhecidos, Vulnerabilidades e Limitações
Em conformidade com a Auditoria de Configuração Física (PCA) realizada sobre o relatório gerado:

1. **Dependências Transitivas Obsoletas no Mobile:** O relatório gerado pelo Syft identificou o uso extensivo de módulos legados internos do Babel (como o `@babel/code-frame` na versão `7.10.4`, enquanto o restante do projeto já utiliza a `7.29.7`).
    * *Motivo de permanência:* Esta variação é uma dependência transitiva injetada automaticamente pelo núcleo do Expo (~49.0.0) e do React Native antigos. Como a alteração manual quebraria a compatibilidade do build do aplicativo móvel, o Comitê de Controle de Mudanças (CCB) aceitou a limitação nesta baseline.
2. **Versões Inseguras em Ambiente de Desenvolvimento:** Foram listadas ferramentas de compilação antigas nos pacotes de desenvolvimento (`devDependencies` do ecossistema, como versões legadas do Jest de testes).
    * *Motivo de permanência:* Elas não são empacotadas para o ambiente de produção da plataforma de Food Delivery, eliminando riscos de segurança na release final.