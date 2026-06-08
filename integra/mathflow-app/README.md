# Integra+ (MathFlow App) 🧮✨

**Integra+** é uma aplicação web moderna, interativa e inteligente focada na resolução analítica e geométrica de integrais de nível universitário. O aplicativo combina algoritmos matemáticos estruturais locais (`mathjs`), renderização acadêmica de ponta (`KaTeX`) e inteligência artificial generativa (Google Gemini) para não apenas dar a resposta, mas **ensinar o aluno a chegar nela**.

## 🚀 Funcionalidades Principais

*   **Motor de Resolução Simbólica:** 
    *   Algoritmo nativo baseado em análise recursiva de Árvore Sintática Abstrata (AST) para resolução instantânea de polinômios de grau livre, com ou sem termos constantes e denominadores.
    *   Base de conhecimento com dezenas de resoluções completas (`mathSolver.js`) para integrais notáveis, trigonométricas, frações parciais e integração por partes.
*   **Inteligência Artificial (Gemini):** Integrais desconhecidas pelo banco local sofrem parsing e são enviadas à API do Google Gemini, que retorna a resolução rigorosa e o passo a passo de maneira padronizada e segura, incluindo tratamento dinâmico para integrais com restrição de domínio.
*   **Modo Tutor (Chatbot Matemático):** Em vez de apenas fornecer a resposta final, o Modo Tutor simula um professor. Ele exibe os limites de integração graficamente e instiga o aluno a identificar técnicas matemáticas por meio de perguntas de múltipla escolha interativas.
*   **Gráficos Geométricos Interativos:** Construídos com `recharts`, os gráficos reagem em tempo real aos *sliders* de controle de limites `[a, b]`, calculando a área sob a curva para que o estudante compreenda a utilidade prática da integral definida.
*   **Renderização Híbrida KaTeX:** Nada de textos chatos! O aplicativo quebra nativamente frases em linguagem natural e processa trechos delimitados por `$` com tipografia padrão acadêmica (LaTeX), garantindo equações impecáveis tanto nos passos da resposta quanto dentro das bolhas de chat do Tutor.
*   **Motor NLP (Natural Language Processing):** O aplicativo higieniza as entradas do usuário, removendo falsos positivos, convertendo sufixos e traduzindo termos trigonométricos abrasileirados (como `seno`, `arctg`, `tg`) para funções matemáticas formais aceitas pelos compiladores.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** React 19, Vite.
*   **Estilização:** Vanilla CSS Moderno (Design premium com glassmorphism, paletas ricas e micro-interações).
*   **Motor Matemático:** `math.js` (para interpretação de equações, parser de árvores sintáticas AST e execução de código restrita).
*   **Gráficos:** `recharts`.
*   **Renderização LaTeX:** `katex` puro (garantindo compatibilidade absoluta com React 19 sem alertas de depreciação).
*   **Serviço GenAI:** API oficial do Google Gemini.

## ⚙️ Como Executar Localmente

### Pré-requisitos
*   Node.js (v18 ou superior recomendado).
*   Chave de API do **Google Gemini** ativa.

### Passo a Passo

1.  **Acesse a pasta do projeto via terminal:**
    ```bash
    cd "mathflow-app"
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    Na raiz do projeto, certifique-se que exista um arquivo `.env` com a sua chave de API:
    ```env
    VITE_GEMINI_API_KEY="SUA_CHAVE_API_AQUI"
    ```
4.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  **Acesso:** O terminal fornecerá o link local (geralmente `http://localhost:5173/`). Abra no navegador e explore!

## 🧪 Testes Unitários de Robustez

O projeto conta com um script nativo de simulação e parsing massivo. Ele submete o motor algébrico e linguístico do MathFlow a testes progressivos de carga e limites assintóticos:
```bash
node scratch_test.js
```
O script garante que 100% das integrais testadas (manuais, extremas e randômicas em lotes) são validadas e corretamente analisadas sem `SyntaxError` ou vazamentos de escopo de avaliação.

---
*Integra+ - Ajudando você a entender o Cálculo com o poder da Inteligência Artificial.*
