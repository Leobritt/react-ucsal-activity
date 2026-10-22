# Circuito: loja fictícia em React

Atividade de React da disciplina Tópicos Avançados em Programação (UCSal, Engenharia de Software, 2026.2).

Aplicação web responsiva de uma loja fictícia de eletrônicos, com seis componentes React feitos do zero: acordeão, paginação, barra de progresso, abas, menu suspenso e notificação toast.

> Projeto em desenvolvimento. Este README será completado ao final (componentes, conceitos de React usados, prints e desafio extra).

## Como rodar no GitHub Codespaces

1. No repositório, clique em **Code → Codespaces → Create codespace on main**.
2. Espere o ambiente abrir. As dependências são instaladas sozinhas (configurado em `.devcontainer/devcontainer.json`).
3. No terminal, rode:

   ```bash
   npm run dev
   ```

4. Quando aparecer o aviso da porta **5173**, clique em **Open in Browser**.

## Como rodar no computador

Requer Node.js 22.22 ou mais recente (exigência do React Router 8).

```bash
npm install
npm run dev
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Gera a versão de produção na pasta `dist` |
| `npm run preview` | Abre a versão de produção localmente |
| `npm run lint` | Verifica o código com o oxlint (inclui regras de acessibilidade) |

## Tecnologias

- React 19 e Vite
- CSS puro com CSS Modules (sem biblioteca de UI)
- Nomes no código em inglês; comentários em português
