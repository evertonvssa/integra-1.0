# Documentação Técnica Oficial - INTEGRA+

Esta é a documentação arquitetural e técnica da aplicação web **Integra+ (MathFlow App)**. Este documento foi projetado para auxiliar desenvolvedores e engenheiros de software a compreenderem o fluxo de dados, a divisão de componentes e a lógica de inteligência artificial por trás da resolução das integrais e do Modo Tutor.

---

## 1. Visão Arquitetural

O Integra+ é uma aplicação **Single-Page Application (SPA)** construída com React e Vite. Diferente de aplicações matemáticas baseadas inteiramente no lado do servidor, o Integra+ possui um **Motor Híbrido**:
*   **Motor Local (Fallback Rápido):** Utiliza um catálogo robusto de equações pré-mapeadas e uma análise de árvore sintática (AST via `mathjs`) para processar imediatamente integrais notáveis e polinomiais genéricas.
*   **Motor Cloud (Inteligência Artificial):** Acionado para equações complexas não catalogadas, utiliza a API do **Google Gemini** para calcular a antiderivada, montar passos matemáticos e deduzir os parâmetros gráficos.

---

## 2. Estrutura de Diretórios e Arquivos-Chave

```text
mathflow-app/
├── index.html               # Ponto de entrada do HTML
├── package.json             # Dependências e scripts npm
├── scratch_test.js          # Suite de stress tests (CLI)
├── inconsistencias_log.md   # Histórico de correções detalhadas
├── .env                     # Variáveis de ambiente (VITE_GEMINI_API_KEY)
└── src/
    ├── main.jsx             # Ponto de entrada do React
    ├── App.jsx              # Container principal e Roteamento Visual
    ├── App.css              # Estilos e tokens de design global
    ├── mathSolver.js        # "O Cérebro": Lógica de IA, AST e Normalização NLP
    └── TutorChat.jsx        # Módulo de chatbot interativo renderizado
```

---

## 3. Módulos e Componentes Principais

### `src/App.jsx`
É o maestro da interface do usuário. Ele gerencia o ciclo de vida do aplicativo e contém:
*   **Gestão de Estado:** Mantém as variáveis `mode` (Resolver/Tutor), `solvedData` (os dados da integral solucionada), os temporizadores e o histórico local.
*   **Card Analítico:** Exibe a expressão natural (`latexFormula`) e a antiderivada com o termo "+ C" (`latexResult`), renderizados com `KaTeX`.
*   **Card do Gráfico:** Utiliza o componente `AreaChart` do pacote `recharts`. A área calculada varia em tempo real baseada no slider bidirecional (a, b). O método de renderização varre de `min` a `max` preenchendo as coordenadas geográficas em relação ao zero (`yArea`).
*   **Painel Passo a Passo:** Cria a "timeline" visual das resoluções analíticas passo a passo.

### `src/TutorChat.jsx`
O ambiente de conversação onde o sistema simula um professor.
*   **Parser Misto KaTeX (`renderMixedText`):** Quebra as frases em linguagem natural através do padrão regex de cifras (`$ ... $`). Todo texto delimitado é compilado de forma inline utilizando `katex.renderToString`. Se a formatação falhar, o sistema exibe graciosamente como string pura.
*   **Ciclo de Eventos:** Emprega timeouts recursivos simulando a digitação (`isTyping`), validando a resposta (múltipla escolha) e exibindo feedbacks inteligentes ou dicas (`tips`).

### `src/mathSolver.js`
O core de negócios e processamento simbólico da aplicação. Engloba três grandes sub-sistemas:
1.  **Processamento de Linguagem Natural (NLP):** A função `cleanNaturalLanguageQuery` converte sinônimos portugueses (ex: `raiz`, `seno de`, `arctg`) em primitivas em inglês requeridas pelo parser matemático.
2.  **Resolvedor Simbólico (AST):** A função `integrateNode` vasculha as árvores sintáticas para integrar funções polinomiais. Consegue simplificar coeficientes fracionários e montar os passos didáticos de forma procedural (Regra do Tombo, Regra de Constante).
3.  **Integração Google Gemini (`solveWithAI`):** Quando a integral foge do escopo analítico local, este módulo envia um *prompt engenhoso* para o LLM. A API retorna um JSON estruturado com todos os parâmetros exigidos pelo Frontend, incluindo uma string convertível em função anônima JavaScript (`evaluateCode`). Para contornar erros sintáticos (descontinuidades), a string de código é submetida a um filtro rigoroso suportando clausulas `if/else` e instanciada seguramente na RAM do navegador.

---

## 4. Renderização Matemática (KaTeX)

Historicamente, a renderização matemática utilizava texto bruto mapeado via regex. Atualmente, a aplicação se apoia integralmente na especificação acadêmica do LaTeX.
Para garantir o máximo desempenho sem erros de Hooks obsoletos (`react-katex`), o KaTeX é utilizado diretamente via API procedural `katex.renderToString()`, passando o parâmetro `dangerouslySetInnerHTML`. 
A aplicação formata dinamicamente o foco do cálculo nas linhas do tempo com macros de cor: `\color{#8b5cf6}{...}` (roxo Integra+).

---

## 5. Estratégia de Testes (`scratch_test.js`)

A confiabilidade matemática é assegurada por um executor de testes independente (fora do ecossistema React/Vite).
*   **Estresse Estrutural:** Gera até milhares de funções matematicamente coesas mesclando classes randômicas (Polinomiais, Exponenciais, Trigonométricas Inversas, Funções Logarítmicas compostas).
*   **Análise de Assíntotas:** Avalia ativamente cada integral em pontos críticos flutuantes para garantir que os escopos da avaliação dinâmica não lancem exceções do tipo `NaN` ou estouro de domínio (`SyntaxError`).
*   **Uso:** Invocável diretamente pelo terminal `node scratch_test.js`.

---

## 6. Identidade Visual (Design Tokens)

Toda a formatação e tematização está centralizada em `App.css`.
*   **Cores Primitivas:** Baseia-se no matiz Violeta (variáveis como `--primary`, `--primary-light`).
*   **Glassmorphism:** Uso maciço de `backdrop-filter: blur(16px)` para fundos flutuantes, garantindo um visual *state-of-the-art*.
*   **Dark Mode Nativo:** Responde a `@media (prefers-color-scheme: dark)` ajustando o brilho das variáveis e substituindo as cores de contorno para o preto profundo, reduzindo o cansaço visual.

---
*Fim do Documento.*
