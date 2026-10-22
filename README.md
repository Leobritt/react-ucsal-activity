# Circuito: loja fictícia em React

Atividade de React de Tópicos Avançados em Programação (UCSal, 2026.2). É uma loja fictícia de eletrônicos, responsiva, com seis componentes feitos do zero e sem biblioteca de UI.

**Vídeo explicativo:** _(link a adicionar)_

![Página inicial](docs/screenshots/inicio-desktop.png)

## Como rodar

**No Codespaces:** clique em **Code → Codespaces → Create codespace on main**, rode `npm run dev` no terminal e abra a porta **5173**. O `.devcontainer` já instala tudo.

**No computador** (Node.js 22.22+):

```bash
npm install
npm run dev
```

## Componentes

| Componente | Onde aparece |
|---|---|
| Acordeão (`Accordion`) | Perguntas frequentes. Um item aberto por vez, com transição suave |
| Paginação (`Pagination`) | Catálogo. Anterior e próxima desabilitados nas pontas, página atual destacada |
| Barra de Progresso (`ProgressBar`) | Solicitar troca. Envio de foto simulado, de 0 a 100% |
| Abas (`Tabs`) | Página do produto: descrição, ficha técnica e avaliações |
| Menu Suspenso (`Dropdown`) | Filtro e ordenação do catálogo; menu "Compartilhar". Fecha ao escolher, ao clicar fora ou com Esc |
| Toast (`Toast`) | Avisos de sucesso, erro, aviso e informação. Somem em 5 s ou pelo botão fechar |

Todos ficam em `src/components` e recebem os dados por props. Também há um componente de classe, o `ErrorBoundary`, que mostra uma mensagem se uma página quebrar.

## Desafio extra

- **Context API:** `ToastContext` (notificações de qualquer componente) e `CartContext` (carrinho compartilhado entre cabeçalho, produtos e página do carrinho).
- **React Router:** páginas `/`, `/produtos`, `/produtos/:id`, `/trocas`, `/duvidas`, `/carrinho` e uma página 404.

O branch `v1-base` guarda a versão sem esses recursos: uma página única, com o estado passado por props.

## Responsividade e acessibilidade

O layout é mobile-first, com mudanças em 600px e 1024px, e foi testado em 375, 768 e 1280px. Os componentes seguem os padrões de teclado e ARIA da WAI-ARIA. A nota no Lighthouse é 100 em Acessibilidade.

| Celular | Tablet |
|---|---|
| ![Celular](docs/screenshots/trocas-celular.png) | ![Tablet](docs/screenshots/produtos-tablet.png) |

## Tecnologias

React 19, React Router 8, Vite 8, CSS Modules e oxlint.
