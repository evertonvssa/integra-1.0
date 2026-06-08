import * as math from 'mathjs';

// Lista de exemplos predefinidos idêntica à da aplicação original
const preDefinedIntegrals = {
  'integral de x² + 3x dx': {
    query: 'integral de x² + 3x dx',
    normalizedQuery: 'x^2 + 3x',
    latexFormula: '\\int (x^2 + 3x) \\, dx',
    latexResult: '\\frac{x^3}{3} + \\frac{3x^2}{2} + C',
    rawResult: 'x^3/3 + 1.5x^2 + C',
    functionName: 'f(x) = x^2 + 3x',
    evaluate: (x) => Math.pow(x, 2) + 3 * x,
    defaultLimits: { a: 0, b: 2 },
    sliderLimits: { min: -4, max: 4, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Regra da Soma',
        desc: 'Podemos separar a integral de uma soma de funções na soma das integrais de cada termo individualmente:',
        math: '\\int (f(x) + g(x)) \\, dx = \\int f(x) \\, dx + \\int g(x) \\, dx'
      },
      {
        title: 'Passo 2: Separar os Termos',
        desc: 'Aplicando a regra da soma para os nossos termos, temos:',
        math: '\\int x^2 \\, dx + \\int 3x \\, dx'
      },
      {
        title: 'Passo 3: Mover as Constantes para Fora',
        desc: 'No segundo termo, podemos extrair a constante 3 multiplicativa para fora do símbolo da integral:',
        math: '\\int x^2 \\, dx + 3 \\int x \\, dx'
      },
      {
        title: 'Passo 4: Aplicar a Regra da Potência',
        desc: 'A regra geral para integrar potências de x é \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} (para n \\neq -1):',
        math: 'Termo \\, 1: \\int x^2 \\, dx = \\frac{x^{2+1}}{2+1} = \\frac{x^3}{3}'
      },
      {
        title: 'Passo 5: Integrar o Segundo Termo',
        desc: 'Aplicamos a mesma regra da potência para x (onde n = 1) e multiplicamos pelo fator 3 constante:',
        math: 'Termo \\, 2: 3 \\int x^1 \\, dx = 3 \\cdot \\frac{x^{1+1}}{1+1} = 3 \\cdot \\frac{x^2}{2} = \\frac{3x^2}{2}'
      },
      {
        title: 'Passo 6: Juntar os Resultados e Adicionar a Constante',
        desc: 'Combinamos os termos resolvidos e adicionamos a constante de integração universal C, pois é uma integral indefinida:',
        math: '\\frac{x^3}{3} + \\frac{3x^2}{2} + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Olá! Vamos resolver passo a passo a integral indefinida de x² + 3x. Para começar, temos uma soma de dois termos. Qual regra você acha que devemos aplicar primeiro para simplificar o problema?',
        options: [
          { text: 'Regra da Cadeia (Substituição U)', isCorrect: false, feedback: 'Não, a substituição U é usada quando temos uma função composta multiplicada por sua derivada. Aqui é uma soma direta de polinômios.' },
          { text: 'Regra da Soma (Integrar termo a termo)', isCorrect: true, feedback: 'Excelente! A regra da soma nos permite dividir a integral em várias partes mais fáceis: $\\int(f(x) + g(x))dx = \\int f(x)dx + \\int g(x)dx$.' },
          { text: 'Integração por Partes', isCorrect: false, feedback: 'Não é necessário usar partes aqui, pois não temos um produto de funções de naturezas diferentes.' }
        ],
        tip: 'Tente olhar para o sinal de "+" no meio da expressão.'
      },
      {
        question: 'Perfeito! Separamos em $\\int x^2 dx + \\int 3x dx$. Agora, vamos focar no primeiro termo: $\\int x^2 dx$. Qual é a integral de $x^2$ usando a Regra da Potência?',
        options: [
          { text: '$2x$', isCorrect: false, feedback: 'Cuidado! $2x$ é a derivada de $x^2$, não a integral. Na integral, nós aumentamos o expoente em 1.' },
          { text: '$x^3 / 3$', isCorrect: true, feedback: 'Correto! Pela regra da potência, adicionamos 1 ao expoente (2+1 = 3) e dividimos pelo novo expoente: $x^3 / 3$.' },
          { text: '$x^3$', isCorrect: false, feedback: 'Quase! Você aumentou o expoente para 3, mas esqueceu de dividir pelo novo expoente.' }
        ],
        tip: 'Lembre-se da fórmula: $\\int x^n dx = \\frac{x^{n+1}}{n+1}$.'
      },
      {
        question: 'Excelente progresso! O primeiro termo é $x^3/3$. Agora para o segundo termo: $\\int 3x dx$. Primeiro, o que podemos fazer com o coeficiente constante 3?',
        options: [
          { text: 'Ignorá-lo ou descartá-lo', isCorrect: false, feedback: 'Não podemos simplesmente remover a constante, ela faz parte da função multiplicativa.' },
          { text: 'Tirá-lo para fora da integral', isCorrect: true, feedback: 'Certíssimo! Qualquer constante multiplicativa pode ser colocada para fora da integral: $\\int c \\cdot f(x) dx = c \\int f(x) dx$.' },
          { text: 'Elevá-lo ao quadrado', isCorrect: false, feedback: 'Não, não há nenhuma regra que nos diga para elevar coeficientes ao quadrado.' }
        ],
        tip: 'Tente lembrar da propriedade de linearidade da integral.'
      },
      {
        question: 'Sensacional! Agora calculamos $3 \\int x dx$. Sabendo que a integral de $x$ é $x^2/2$, qual é o resultado final somando tudo e adicionando a constante universal?',
        options: [
          { text: '$x^3/3 + 3x^2/2$', isCorrect: false, feedback: 'Falta apenas um pequeno detalhe fundamental de toda integral indefinida!' },
          { text: '$x^3/3 + 3x^2/2 + C$', isCorrect: true, feedback: 'Perfeito! Parabéns! Conseguimos resolver a integral passo a passo com sucesso! A constante C representa qualquer constante real deslocada verticalmente.' },
          { text: '$x^2/2 + 3x + C$', isCorrect: false, feedback: 'Não, você misturou os termos calculados anteriormente.' }
        ],
        tip: 'Toda integral indefinida precisa terminar com a famosa constante...'
      }
    ]
  },
  'integral de sen(x) cos(x) dx': {
    query: 'integral de sen(x) cos(x) dx',
    normalizedQuery: 'sin(x)*cos(x)',
    latexFormula: '\\int \\sin(x) \\cos(x) \\, dx',
    latexResult: '\\frac{\\sin^2(x)}{2} + C',
    rawResult: 'sin(x)^2/2 + C',
    functionName: 'f(x) = sen(x) * cos(x)',
    evaluate: (x) => Math.sin(x) * Math.cos(x),
    defaultLimits: { a: 0, b: Math.PI / 2 },
    sliderLimits: { min: -Math.PI, max: Math.PI, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Identificar a técnica de Substituição U',
        desc: 'Note que temos a função sen(x) multiplicada por cos(x), que é exatamente a derivada de sen(x). Isso indica que podemos usar a substituição simples:',
        math: 'Definimos \\, u = \\sin(x)'
      },
      {
        title: 'Passo 2: Calcular o diferencial du',
        desc: 'Derivamos u em relação a x para achar o diferencial du:',
        math: 'du = \\frac{d}{dx}(\\sin(x)) \\, dx = \\cos(x) \\, dx'
      },
      {
        title: 'Passo 3: Substituir na integral',
        desc: 'Substituímos sen(x) por u e cos(x) dx por du na expressão original:',
        math: '\\int u \\, du'
      },
      {
        title: 'Passo 4: Integrar na nova variável u',
        desc: 'Aplicamos a regra de potência simples para u (onde o expoente n = 1):',
        math: '\\int u^1 \\, du = \\frac{u^{1+1}}{1+1} = \\frac{u^2}{2}'
      },
      {
        title: 'Passo 5: Retornar à variável original x',
        desc: 'Desfazemos a substituição trocando u por sen(x) novamente, e somamos a constante C:',
        math: '\\frac{\\sin^2(x)}{2} + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Vamos lá! Vamos resolver a integral de $\\sin(x) \\cos(x) dx$. Ela parece intimidadora, mas note que uma parte é a derivada da outra. Que método clássico de integração se encaixa aqui?',
        options: [
          { text: 'Integração por Partes', isCorrect: false, feedback: 'Poderíamos usar partes, mas existe um método de substituição simples muito mais rápido para este formato!' },
          { text: 'Método da Substituição de Variável (Substituição U)', isCorrect: true, feedback: 'Exatamente! Como a derivada do seno é o cosseno, podemos usar $u = \\sin(x)$ e simplificar drasticamente a integral.' },
          { text: 'Frações Parciais', isCorrect: false, feedback: 'Não, frações parciais são reservadas para integrar funções racionais (divisões de polinômios).' }
        ],
        tip: 'Pense em qual método troca uma parte da função por uma nova letra "u".'
      },
      {
        question: 'Excelente! Escolhemos $u = \\sin(x)$. Qual é o diferencial $du$ correspondente a essa escolha?',
        options: [
          { text: '$du = -\\cos(x) dx$', isCorrect: false, feedback: 'Quase! A derivada de $\\sin(x)$ é $\\cos(x)$ positiva. A derivada de $\\cos(x)$ que é $-\\sin(x)$.' },
          { text: '$du = \\cos(x) dx$', isCorrect: true, feedback: 'Corretíssimo! $d/dx(\\sin(x)) = \\cos(x)$, portanto $du = \\cos(x) dx$.' },
          { text: '$du = \\sin(x) dx$', isCorrect: false, feedback: 'Não, a derivada do seno não é o próprio seno.' }
        ],
        tip: 'Qual é a derivada básica de $\\sin(x)$ com relação a $x$?'
      },
      {
        question: 'Ótimo! Agora substituindo tudo, nossa integral $\\int \\sin(x) \\cos(x) dx$ vira simplesmente $\\int u du$. Qual é a integral de $u$ em relação a $u$?',
        options: [
          { text: '$u^2 / 2$', isCorrect: true, feedback: 'Perfeito! Pela regra da potência, a integral de $u^1$ é $u^2/2$.' },
          { text: '$u$', isCorrect: false, feedback: 'Não, a integral de 1 seria $u$. Para $u^1$, o grau do termo aumenta para 2.' },
          { text: '$1$', isCorrect: false, feedback: 'Não, $1$ seria a derivada de $u$.' }
        ],
        tip: 'Aplique a regra da potência para $u^1$.'
      },
      {
        question: 'Maravilha! Agora, para finalizar, basta substituir de volta $u = \\sin(x)$ na nossa resposta $u^2/2$. Qual é a expressão final?',
        options: [
          { text: '$\\frac{\\sin^2(x)}{2}$', isCorrect: false, feedback: 'Está correto, mas não esqueça da constante de integração universal no final!' },
          { text: '$\\frac{\\sin^2(x)}{2} + C$', isCorrect: true, feedback: 'Espetacular! Você resolveu a integral por substituição u com maestria! O resultado final é $\\frac{\\sin^2(x)}{2} + C$.' },
          { text: '$\\frac{\\cos^2(x)}{2} + C$', isCorrect: false, feedback: 'Não, nós substituímos $u$ por $\\sin(x)$, não por $\\cos(x)$.' }
        ],
        tip: 'Substitua u por sen(x) e adicione o "+ C".'
      }
    ]
  },
  'integral de 1/(x²+1) dx': {
    query: 'integral de 1/(x²+1) dx',
    normalizedQuery: '1/(x^2 + 1)',
    latexFormula: '\\int \\frac{1}{x^2 + 1} \\, dx',
    latexResult: '\\arctan(x) + C',
    rawResult: 'atan(x) + C',
    functionName: 'f(x) = 1 / (x^2 + 1)',
    evaluate: (x) => 1 / (Math.pow(x, 2) + 1),
    defaultLimits: { a: -1, b: 1 },
    sliderLimits: { min: -5, max: 5, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Reconhecer a Integral Imediata',
        desc: 'Esta é uma integral notável padrão que corresponde diretamente à derivada de uma função trigonométrica inversa clássica:',
        math: '\\int \\frac{1}{x^2 + a^2} \\, dx = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C'
      },
      {
        title: 'Passo 2: Identificar a constante a',
        desc: 'Na nossa integral, a constante a² = 1, o que significa que a = 1:',
        math: 'a = 1'
      },
      {
        title: 'Passo 3: Substituir e Resolver',
        desc: 'Substituindo a = 1 na fórmula geral, obtemos diretamente:',
        math: '\\int \\frac{1}{x^2 + 1} \\, dx = \\frac{1}{1} \\arctan\\left(\\frac{x}{1}\\right) + C = \\arctan(x) + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Essa integral é um clássico! $\\int \\frac{1}{x^2+1} dx$. Algumas integrais são chamadas de imediatas porque são o resultado direto de derivadas conhecidas. Você lembra qual função quando derivada resulta em $\\frac{1}{x^2+1}$?',
        options: [
          { text: '$\\ln(x^2 + 1)$', isCorrect: false, feedback: 'Não, a derivada de $\\ln(x^2+1)$ seria $\\frac{2x}{x^2+1}$, devido à regra da cadeia.' },
          { text: '$\\arctan(x)$ (ou arco-tangente)', isCorrect: true, feedback: 'Perfeito! A derivada de $\\arctan(x)$ é exatamente $\\frac{1}{x^2+1}$. Portanto, a integral é imediata.' },
          { text: '$\\tan(x)$', isCorrect: false, feedback: 'Não, a derivada de $\\tan(x)$ é $\\sec^2(x)$.' }
        ],
        tip: 'Pense em funções trigonométricas inversas.'
      },
      {
        question: 'Exatamente! A integral de $\\frac{1}{x^2+1} dx$ é imediata e resulta em $\\arctan(x) + C$. Qual é o valor numérico dessa integral se integrarmos de 0 a 1 (ou seja, $F(1) - F(0)$)?',
        options: [
          { text: '$\\frac{\\pi}{4}$', isCorrect: true, feedback: 'Brilhante! $\\arctan(1) = \\frac{\\pi}{4}$ (pois $\\tan(\\frac{\\pi}{4}) = 1$) e $\\arctan(0) = 0$. Então, a integral definida vale $\\frac{\\pi}{4}$.' },
          { text: '$\\pi$', isCorrect: false, feedback: 'Não, $\\tan(\\pi) = 0$. A tangente que vale 1 é a de 45 graus ($\\frac{\\pi}{4}$ radianos).' },
          { text: '$1$', isCorrect: false, feedback: 'Não, $\\arctan(1)$ é medido em radianos.' }
        ],
        tip: 'Lembre-se em qual ângulo em radianos a tangente é igual a 1.'
      }
    ]
  },
  'integral de raiz de x dx': {
    query: 'integral de raiz de x dx',
    normalizedQuery: 'sqrt(x)',
    latexFormula: '\\int \\sqrt{x} \\, dx',
    latexResult: '\\frac{2}{3}x^{3/2} + C',
    rawResult: '2/3 * x^(1.5) + C',
    functionName: 'f(x) = sqrt(x)',
    evaluate: (x) => x >= 0 ? Math.sqrt(x) : 0,
    defaultLimits: { a: 0, b: 4 },
    sliderLimits: { min: 0, max: 9, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Reescrever a Raiz Quadrada como Expoente',
        desc: 'Para facilitar a integração, podemos converter a raiz quadrada em sua representação exponencial equivalente com fração:',
        math: '\\sqrt{x} = x^{1/2}'
      },
      {
        title: 'Passo 2: Aplicar a Regra da Potência',
        desc: 'Usamos a regra de potência clássica \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} para n = 1/2:',
        math: '\\int x^{1/2} \\, dx = \\frac{x^{1/2 + 1}}{1/2 + 1} + C'
      },
      {
        title: 'Passo 3: Somar os Expoentes',
        desc: 'Efetuamos a soma fracionária no expoente e no denominador: 1/2 + 1 = 3/2:',
        math: '\\frac{x^{3/2}}{3/2} + C'
      },
      {
        title: 'Passo 4: Simplificar a Fração do Denominador',
        desc: 'Dividir por uma fração é o mesmo que multiplicar pelo seu inverso, transformando o 3/2 no denominador em 2/3 multiplicando na frente:',
        math: '\\frac{2}{3}x^{3/2} + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Olá! Vamos resolver a integral de $\\sqrt{x} dx$. Para começar, as regras de cálculo funcionam muito melhor com potências numéricas. Como podemos reescrever $\\sqrt{x}$ como uma potência?',
        options: [
          { text: '$x^{-1}$', isCorrect: false, feedback: 'Não, $x^{-1}$ é igual a $1/x$.' },
          { text: '$x^{1/2}$', isCorrect: true, feedback: 'Perfeito! Qualquer raiz n-ésima pode ser escrita como um expoente fracionário: $\\sqrt[n]{x} = x^{1/n}$. Logo, raiz quadrada é $x^{1/2}$.' },
          { text: '$x^2$', isCorrect: false, feedback: 'Não, $x^2$ é o quadrado de x, o oposto de extrair a raiz quadrada.' }
        ],
        tip: 'Pense em potências fracionárias, onde o índice da raiz (2) fica no denominador.'
      },
      {
        question: 'Muito bem! Temos a integral de $x^{1/2} dx$. Agora aplicamos a Regra da Potência: adicionamos 1 ao expoente e dividimos por essa soma. Quanto é $1/2 + 1$?',
        options: [
          { text: '$3/2$', isCorrect: true, feedback: 'Correto! $1/2 + 2/2 = 3/2$.' },
          { text: '$2/3$', isCorrect: false, feedback: 'Não, você inverteu a fração.' },
          { text: '$1.5$', isCorrect: false, feedback: 'Embora seja 1.5, em frações de cálculo é melhor trabalhar com $3/2$ para as simplificações.' }
        ],
        tip: 'Some metade com uma unidade inteira (dois meios).'
      },
      {
        question: 'Isso aí! Nossa expressão fica $x^{3/2}$ dividido por $3/2$. Como podemos simplificar uma divisão por fração?',
        options: [
          { text: 'Inverter a fração e multiplicar: $\\frac{2}{3} x^{3/2} + C$', isCorrect: true, feedback: 'Excelente! Divisão por $3/2$ é igual a multiplicar por $2/3$. E adicionando a constante C, temos a solução perfeita!' },
          { text: 'Subtrair os termos', isCorrect: false, feedback: 'Não há regras de subtração em divisões de fração.' }
        ],
        tip: 'Inverta a fração do denominador e traga-a multiplicando para a frente.'
      }
    ]
  },
  'integral de e^(2x) dx': {
    query: 'integral de e^(2x) dx',
    normalizedQuery: 'e^(2x)',
    latexFormula: '\\int e^{2x} \\, dx',
    latexResult: '\\frac{e^{2x}}{2} + C',
    rawResult: 'e^(2x)/2 + C',
    functionName: 'f(x) = e^(2x)',
    evaluate: (x) => Math.exp(2 * x),
    defaultLimits: { a: 0, b: 1 },
    sliderLimits: { min: -2, max: 2, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Aplicar Substituição de Variável',
        desc: 'Para integrar uma exponencial com expoente composto, definimos a variável u como o expoente:',
        math: 'u = 2x'
      },
      {
        title: 'Passo 2: Achar o Diferencial du',
        desc: 'Derivamos u para encontrar dx:',
        math: 'du = 2 \\, dx \\implies dx = \\frac{du}{2}'
      },
      {
        title: 'Passo 3: Substituir na Integral',
        desc: 'Troca-se o expoente 2x por u, e o dx por du/2, extraindo o fator constante 1/2:',
        math: '\\int e^u \\frac{du}{2} = \\frac{1}{2} \\int e^u \\, du'
      },
      {
        title: 'Passo 4: Resolver a Integral da Exponencial',
        desc: 'A integral de e^u em relação a u é a própria função e^u:',
        math: '\\frac{1}{2} \\cdot e^u = \\frac{e^u}{2}'
      },
      {
        title: 'Passo 5: Retornar para a Variável original x',
        desc: 'Substituímos u por 2x novamente e somamos a constante C:',
        math: '\\frac{e^{2x}}{2} + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Integral exponencial! $\\int e^{2x} dx$. Se fosse apenas $\\int e^x dx$, a resposta seria $e^x + C$. Mas aqui temos "$2x$" no expoente. Qual técnica nos ajuda a contornar isso?',
        options: [
          { text: 'Substituição simples (Substituição U)', isCorrect: true, feedback: 'Perfeito! Definindo $u = 2x$, conseguimos simplificar a integral exponencial facilmente.' },
          { text: 'Trigonometria inversa', isCorrect: false, feedback: 'Não há termos trigonométricos ou inversos nesta expressão.' }
        ],
        tip: 'Precisamos de algo para trocar o expoente complexo por uma única variável "u".'
      },
      {
        question: 'Ótimo, $u = 2x$. Então $du = 2 dx$. Isso significa que $dx = du / 2$. Substituindo na integral, ficamos com $\\int e^u \\frac{du}{2}$, ou seja, $\\frac{1}{2} \\int e^u du$. Qual a integral de $e^u$?',
        options: [
          { text: '$e^u$', isCorrect: true, feedback: 'Correto! A função exponencial natural $e^x$ é a única cuja derivada e integral são ela mesma.' },
          { text: '$\\frac{e^{u+1}}{u+1}$', isCorrect: false, feedback: 'Cuidado! A regra da potência só serve para potências de base x (como $x^n$), não para quando x está no expoente ($e^x$).' }
        ],
        tip: 'Pense na função mais fiel do cálculo, que não muda ao ser derivada ou integrada.'
      },
      {
        question: 'Excelente! Temos $\\frac{1}{2} e^u$. Agora, desfazendo a substituição $u = 2x$ e somando a constante, qual é a nossa solução final?',
        options: [
          { text: '$\\frac{e^{2x}}{2} + C$', isCorrect: true, feedback: 'Fantástico! Você completou a integração com sucesso. O resultado é $\\frac{e^{2x}}{2} + C$.' },
          { text: '$2e^{2x} + C$', isCorrect: false, feedback: 'Cuidado! A constante $\\frac{1}{2}$ divide a exponencial, ela não multiplica por 2.' }
        ],
        tip: 'Substitua u por $2x$ na expressão $\\frac{e^u}{2}$.'
      }
    ]
  },
  'integral de ln(x) dx': {
    query: 'integral de ln(x) dx',
    normalizedQuery: 'ln(x)',
    latexFormula: '\\int \\ln(x) \\, dx',
    latexResult: 'x \\ln(x) - x + C',
    rawResult: 'x * ln(x) - x + C',
    functionName: 'f(x) = ln(x)',
    evaluate: (x) => x > 0 ? Math.log(x) : 0,
    defaultLimits: { a: 1, b: 3 },
    sliderLimits: { min: 0.1, max: 6, step: 0.1 },
    steps: [
      {
        title: 'Passo 1: Identificar a Técnica de Integração por Partes',
        desc: 'Como não temos uma integral imediata ou por substituição óbvia para o logaritmo natural, usamos a integração por partes:',
        math: '\\int u \\, dv = uv - \\int v \\, du'
      },
      {
        title: 'Passo 2: Escolher as Variáveis u e dv',
        desc: 'Para esta integral, a escolha mais adequada seguindo a regra LIATE é:',
        math: 'u = \\ln(x), \\quad dv = dx'
      },
      {
        title: 'Passo 3: Achar os Diferenciais du e v',
        desc: 'Derivamos u e integramos dv para obter du e v:',
        math: 'du = \\frac{1}{x} \\, dx, \\quad v = x'
      },
      {
        title: 'Passo 4: Aplicar a Fórmula de Partes',
        desc: 'Substituímos os termos calculados na fórmula de integração por partes:',
        math: '\\int \\ln(x) \\, dx = (\\ln(x)) \\cdot (x) - \\int (x) \\cdot \\left(\\frac{1}{x} \\, dx\\right)'
      },
      {
        title: 'Passo 5: Simplificar a Integral Restante',
        desc: 'O termo x multiplicado por 1/x se anula, restando apenas a integral simples de 1:',
        math: 'x \\ln(x) - \\int 1 \\, dx = x \\ln(x) - x + C'
      }
    ],
    tutorSteps: [
      {
        question: 'Integral de $\\ln(x) dx$! Esta é muito interessante. O logaritmo natural não tem uma integral imediata, mas podemos resolver encarando como um produto: $\\ln(x) \\cdot 1$. Qual método clássico usa produto de duas partes?',
        options: [
          { text: 'Substituição simples', isCorrect: false, feedback: 'Substituição u não ajuda aqui porque não temos a derivada $1/x$ presente no termo multiplicando.' },
          { text: 'Integração por Partes', isCorrect: true, feedback: 'Perfeito! Usamos partes baseando-se na fórmula $\\int u dv = uv - \\int v du$, escolhendo $u = \\ln(x)$ e $dv = dx$.' }
        ],
        tip: 'Pense no método cuja fórmula é "um dia vi um velho vestir uniforme".'
      },
      {
        question: 'Muito bem! Escolhemos $u = \\ln(x)$ e $dv = dx$. Derivando u, temos $du = \\frac{1}{x} dx$. Integrando $dv = dx$, temos $v = x$. Jogando tudo na fórmula: $uv - \\int v du$, o que resta na parte da integral $\\int v du$?',
        options: [
          { text: '$\\int x \\cdot \\frac{1}{x} dx$, ou seja, $\\int 1 dx$', isCorrect: true, feedback: 'Excelente! Os termos $x$ e $1/x$ se simplificam para $1$, restando apenas a integral simples de $1 dx$.' },
          { text: '$\\int x^2 dx$', isCorrect: false, feedback: 'Não, o $x$ multiplica por $1/x$, o que resulta em $1$, não em $x^2$.' }
        ],
        tip: 'Multiplique $v$ (que é $x$) por $du$ (que é $1/x dx$) e veja o que cancela.'
      },
      {
        question: 'Isso mesmo! A integral restante é de $1 dx$, que simplesmente vale $x$. Juntando as duas partes: $uv$ menos a integral resolvida, qual é a resposta final?',
        options: [
          { text: '$x \\ln(x) - x + C$', isCorrect: true, feedback: 'Espetacular! Você dominou a integração por partes do logaritmo natural! A resposta exata é $x \\ln(x) - x + C$.' },
          { text: '$\\ln(x) - x + C$', isCorrect: false, feedback: 'Falta o termo multiplicador "$x$" do início ($u \\cdot v$), que é $x \\ln(x)$.' }
        ],
        tip: 'Escreva $u \\cdot v$ menos a integral de 1 (que é $x$), e adicione a constante.'
      }
    ]
  }
};

// Normalização simples da busca do usuário
function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, ' ')            // remove múltiplos espaços
    .trim();
}

/**
 * Extrai e normaliza a expressão matemática de uma query em linguagem natural.
 * Ex: "integral de x^2 + 3x dx" → "x^2 + 3x"
 *     "integral de sen(x) cos(x) dx" → "sin(x)*cos(x)"
 */
function extractMathExpr(queryText) {
  let mathExpr = queryText;

  // Tenta capturar o conteúdo dentro de "integral de ... dx"
  const match = queryText.match(/(?:integral\s+de\s+)?(.*?)(?:\s*dx\s*)?$/i);
  if (match && match[1]) {
    mathExpr = match[1].trim();
  }

  // Normaliza símbolos e palavras comuns em português
  mathExpr = mathExpr
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\b(sen|sin)\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'sin($2)')
    .replace(/\b(sen|sin)\s*\(([^)]+)\)/gi, 'sin($2)')
    .replace(/\b(sen|sin)\s+([a-zA-Z0-9()^*+\-.]+)/gi, 'sin($2)')
    .replace(/\b(cos)\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'cos($2)')
    .replace(/\b(cos)\s*\(([^)]+)\)/gi, 'cos($2)')
    .replace(/\b(cos)\s+([a-zA-Z0-9()^*+\-.]+)/gi, 'cos($2)')
    .replace(/\b(tan|tg)\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'tan($2)')
    .replace(/\b(tan|tg)\s*\(([^)]+)\)/gi, 'tan($2)')
    .replace(/\b(tan|tg)\s+([a-zA-Z0-9()^*+\-.]+)/gi, 'tan($2)')
    .replace(/\braiz\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'sqrt($1)')
    .replace(/\braiz\s*\(([^)]+)\)/gi, 'sqrt($1)')
    .replace(/\braiz\s+([a-zA-Z0-9()^*+\-.]+)/gi, 'sqrt($1)')
    .replace(/\bsqrt\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'sqrt($1)')
    .replace(/\bln\s+de\s+([a-zA-Z0-9()^*+\-./]+)/gi, 'ln($1)')
    .replace(/\bln\s+([a-zA-Z0-9()^*+\-.]+)/gi, 'ln($1)')
    .replace(/\be\s*\^\s*\(([^)]+)\)/gi, 'e^($1)')
    .replace(/\bsen\b/gi, 'sin')
    .replace(/\btg\b/gi, 'tan')
    .replace(/\bsec\b/gi, 'sec')
    .trim();

  return mathExpr;
}

/**
 * Normaliza uma expressão matemática para comparação de igualdade.
 */
function normalizeMathExpr(expr) {
  return expr
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/\bsen\b/g, 'sin')
    .replace(/\btg\b/g, 'tan')
    .replace(/\s+/g, '')
    .replace(/\*/g, '')
    .trim();
}

/**
 * Tenta fazer match entre a query do usuário e as integrais predefinidas.
 * Usa apenas igualdade exata (após normalização) para evitar falsos positivos.
 */
function findPreDefinedMatch(queryText) {
  const normalizedQuery = normalizeString(queryText);
  const extractedExpr = normalizeMathExpr(extractMathExpr(queryText));

  for (const key of Object.keys(preDefinedIntegrals)) {
    const entry = preDefinedIntegrals[key];
    const normKey = normalizeString(key);
    const normExprCanonical = normalizeMathExpr(entry.normalizedQuery);

    // 1. Match exato da query completa com a chave predefinida
    if (normalizedQuery === normKey) {
      return entry;
    }

    // 2. A query completa contém a chave predefinida como substring
    if (normalizedQuery.includes(normKey)) {
      return entry;
    }

    // 3. Igualdade exata entre a expressão extraída e a normalizedQuery da entrada
    if (extractedExpr === normExprCanonical) {
      return entry;
    }
  }

  return null;
}

/**
 * Chama a API da Anthropic para resolver analiticamente qualquer integral
 * que não tenha correspondência nas predefinidas.
 * Retorna um objeto completo com todos os campos necessários para a aplicação.
 */
async function solveWithAI(queryText, mathExpr) {
  const prompt = `Você é um professor de Cálculo especializado em integrais. O usuário digitou: "${queryText}"
A expressão matemática extraída é: "${mathExpr}"

Resolva analiticamente a integral indefinida desta expressão e retorne APENAS um JSON válido (sem markdown, sem texto extra) com esta estrutura exata:

{
  "latexFormula": "string com \\int (expressão em LaTeX) \\, dx",
  "latexResult": "string com o resultado em LaTeX (ex: \\\\frac{x^3}{3} + C)",
  "rawResult": "string legível do resultado (ex: x^3/3 + C)",
  "functionName": "string no formato f(x) = expressão",
  "evaluateCode": "código JavaScript puro da função. APENAS o corpo da arrow function com parâmetro x. Use Math.sin, Math.cos, Math.exp, Math.log, Math.sqrt, Math.pow, Math.abs, etc. Exemplo: Math.pow(x, 2) + 3 * x",
  "defaultLimits": { "a": número, "b": número },
  "sliderLimits": { "min": número, "max": número, "step": 0.1 },
  "steps": [
    {
      "title": "Passo N: Nome do passo",
      "desc": "Explicação em português do passo",
      "math": "expressão LaTeX do passo"
    }
  ],
  "tutorSteps": [
    {
      "question": "Pergunta didática ao aluno sobre esta integral",
      "options": [
        { "text": "opção A", "isCorrect": false, "feedback": "explicação por que está errada" },
        { "text": "opção B (correta)", "isCorrect": true, "feedback": "explicação do porquê está correta" },
        { "text": "opção C", "isCorrect": false, "feedback": "explicação por que está errada" }
      ],
      "tip": "Dica curta para o aluno"
    }
  ]
}

Regras importantes:
- Forneça 3 a 6 steps detalhados mostrando o raciocínio matemático completo
- Forneça 2 a 4 tutorSteps pedagógicos, cada um com 2 ou 3 opções (exatamente 1 correta por passo)
- evaluateCode deve ser a FUNÇÃO ORIGINAL f(x) a ser integrada (não a antiderivada), pois é usada para o gráfico
- Se a função não é definida para alguns valores de x (ex: ln(x) para x<=0, sqrt(x) para x<0), adicione verificação no evaluateCode
- Para funções trigonométricas use Math.sin, Math.cos, Math.tan
- Para e^x use Math.exp(x), para ln(x) use Math.log(x)
- defaultLimits deve ser um intervalo interessante para visualizar a integral
- sliderLimits deve cobrir o domínio relevante da função
- Toda e qualquer expressão matemática, variável ou trecho de fórmula no texto de 'question', 'options[text]', 'options[feedback]' e 'tip' DEVE estar entre símbolos de dólar $ (ex: "A integral de $\\int x dx$ é $x^2/2$").
- Responda APENAS o JSON, sem nenhum texto antes ou depois`;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('API key do Gemini não configurada.');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Remove possíveis marcadores de código markdown antes de parsear
  const clean = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
  const parsed = JSON.parse(clean);

  // Constrói a função evaluate a partir do código retornado pela IA
  // eslint-disable-next-line no-new-func
  const evaluateFn = new Function('x', `
    try {
      ${parsed.evaluateCode.includes('return') ? parsed.evaluateCode : `return (${parsed.evaluateCode});`}
    } catch(e) {
      return 0;
    }
  `);

  return {
    query: queryText,
    latexFormula: parsed.latexFormula,
    latexResult: parsed.latexResult,
    rawResult: parsed.rawResult,
    functionName: parsed.functionName,
    evaluate: evaluateFn,
    defaultLimits: parsed.defaultLimits || { a: 0, b: 2 },
    sliderLimits: parsed.sliderLimits || { min: -5, max: 5, step: 0.1 },
    steps: parsed.steps || [],
    tutorSteps: parsed.tutorSteps || [],
    isGeneric: true
  };
}

/**
 * Função principal do solucionador (assíncrona).
 * Tenta match com integrais predefinidas primeiro.
 * Se não encontrar, usa a API da Anthropic para resolver qualquer integral.
 */
export async function solveIntegral(queryText) {
  // 1. Tentar match com as integrais predefinidas (matching flexível)
  const predef = findPreDefinedMatch(queryText);
  if (predef) {
    return { ...predef, isGeneric: false };
  }

  // 2. Extrair expressão matemática da query
  const mathExpr = extractMathExpr(queryText);

  // 3. Resolver via API da Anthropic
  try {
    return await solveWithAI(queryText, mathExpr);
  } catch (aiError) {
    console.error('Erro na API de IA:', aiError);

    // 4. Último fallback: tenta compilar com mathjs para pelo menos mostrar o gráfico
    try {
      const exprForMath = mathExpr
        .replace(/\bsin\b/g, 'sin')
        .replace(/\bcos\b/g, 'cos')
        .replace(/\btan\b/g, 'tan');

      const compiled = math.compile(exprForMath);
      compiled.evaluate({ x: 1 }); // valida

      let latexFormula = `\\int (${math.parse(exprForMath).toTex()}) \\, dx`;

      // Tenta resolver polinômio simples x^n
      const polyMatch = exprForMath.match(/^x\^([0-9]+)$/);
      let latexResult = 'F(x) + C';
      let rawResult = 'F(x) + C';
      let steps = [];

      if (polyMatch) {
        const n = parseInt(polyMatch[1]);
        const newN = n + 1;
        latexResult = `\\frac{x^{${newN}}}{${newN}} + C`;
        rawResult = `x^${newN}/${newN} + C`;
        steps = [
          {
            title: 'Passo 1: Aplicar a Regra da Potência',
            desc: `Potência simples x^n: adicione 1 ao expoente e divida pelo novo expoente.`,
            math: `\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C`
          },
          {
            title: 'Passo 2: Resultado Final',
            desc: `Com n = ${n}, o novo expoente é ${newN}:`,
            math: `\\frac{x^{${newN}}}{${newN}} + C`
          }
        ];
      } else {
        steps = [
          {
            title: 'Passo 1: Expressão Identificada',
            desc: 'A expressão foi reconhecida. O gráfico interativo está disponível para visualização da área.',
            math: `f(x) = ${math.parse(exprForMath).toTex()}`
          },
          {
            title: 'Passo 2: Cálculo Numérico Disponível',
            desc: 'Use os sliders no gráfico para calcular a integral definida numericamente com alta precisão.',
            math: `\\int_{a}^{b} f(x) \\, dx`
          }
        ];
      }

      return {
        query: queryText,
        latexFormula,
        latexResult,
        rawResult,
        functionName: `f(x) = ${mathExpr}`,
        evaluate: (x) => {
          try { return compiled.evaluate({ x }); } catch { return 0; }
        },
        defaultLimits: { a: 0, b: 2 },
        sliderLimits: { min: -5, max: 5, step: 0.1 },
        steps,
        isGeneric: true,
        tutorSteps: [
          {
            question: `Vamos estudar f(x) = ${mathExpr}. O gráfico interativo está disponível. O que você gostaria de explorar?`,
            options: [
              { text: 'Ver a área integrada no gráfico', isCorrect: true, feedback: 'Ótimo! Arraste os controles a e b para ver a área e o valor numérico em tempo real.' },
              { text: 'Entender o conceito de antiderivada', isCorrect: true, feedback: 'A antiderivada F(x) é a função cuja derivada retorna f(x). A constante C representa a família infinita de antiderivadas.' }
            ],
            tip: 'Use os controles do gráfico interativo para explorar!'
          }
        ]
      };

    } catch {
      return {
        success: false,
        error: 'Não consegui compreender a expressão matemática informada. Verifique a sintaxe e tente novamente. Exemplos válidos: "x^2 + 3x", "sin(x)*cos(x)", "e^(2x)", "ln(x)".'
      };
    }
  }
}

/**
 * Realiza a integração numérica da função f(x) no intervalo [a, b]
 * utilizando a regra dos trapézios com 200 subdivisões para altíssima precisão.
 */
export function integrateNumerically(evaluateFn, a, b) {
  const n = 200; // Número de trapézios
  const h = (b - a) / n;
  let sum = 0.5 * (evaluateFn(a) + evaluateFn(b));
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += evaluateFn(x);
  }
  
  const result = sum * h;
  // Retorna com 4 casas decimais de precisão
  return isNaN(result) ? 0 : parseFloat(result.toFixed(4));
}

/**
 * Converte LaTeX para um formato amigável e legível
 * Exemplo: \frac{x^3}{3} + \frac{3x^2}{2} + C → x³/3 + 3x²/2 + C
 */
export function formatFriendlyResult(latexText) {
  let result = latexText;
  
  // Remover símbolos de espaço LaTeX
  result = result.replace(/\\,/g, ' ');
  
  // Remover símbolos integrais e operadores LaTeX
  result = result.replace(/\\int\s*/g, '');
  result = result.replace(/\\cdot/g, '·');
  result = result.replace(/\\left\(/g, '(');
  result = result.replace(/\\right\)/g, ')');
  result = result.replace(/\\neq/g, '≠');
  
  // Converter funções trigonométricas e logarítmicas
  result = result.replace(/\\sin/g, 'sin');
  result = result.replace(/\\cos/g, 'cos');
  result = result.replace(/\\tan/g, 'tan');
  result = result.replace(/\\arctan/g, 'arctan');
  result = result.replace(/\\arcsin/g, 'arcsin');
  result = result.replace(/\\arccos/g, 'arccos');
  result = result.replace(/\\ln/g, 'ln');
  
  // Simplificar expoentes com adição: x^{2+1} → x^3
  result = result.replace(/\^\{(\d+)\+(\d+)\}/g, (match, a, b) => {
    const sum = parseInt(a) + parseInt(b);
    return '^' + sum;
  });
  
  // Simplificar números em chaves: {2+1} → 3 (para denominadores, etc)
  result = result.replace(/\{(\d+)\+(\d+)\}/g, (match, a, b) => {
    const sum = parseInt(a) + parseInt(b);
    return String(sum);
  });
  
  // Converter frações ANTES de remover chaves: \frac{x^3}{3} → x^3/3
  result = result.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, (match, a, b) => {
    a = a.replace(/[{}]/g, '');
    b = b.replace(/[{}]/g, '');
    return `${a}/${b}`;
  });
  
  // Remover completamente qualquer \frac que ainda reste (malformado)
  result = result.replace(/\\frac/g, '');
  
  // Converter expoentes COM chaves: x^{2} → x² (MAS não variáveis tipo e^{2x})
  result = result.replace(/\^\{(\d+)\}/g, (match, exp) => {
    const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    return superscripts[parseInt(exp)] || '^' + exp;
  });
  
  // Remover chaves restantes
  result = result.replace(/[{}]/g, '');
  
  // Converter expoentes simples: x^2 → x² (mas NÃO se tiver variável depois, tipo 2x)
  result = result.replace(/\^(\d)(?![a-z])/g, (match, exp) => {
    const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    return superscripts[parseInt(exp)] || '^' + exp;
  });
  
  // Remover "dx" sozinho quando não está em contexto de função
  result = result.replace(/\s+dx(?![a-z_])/g, '');
  
  // Remover "Termo n:" prefixo
  result = result.replace(/Termo\s+\d+:\s*/gi, '');
  
  // Remover parênteses desnecessários ao redor de números ou variáveis simples
  result = result.replace(/\(([a-zA-Z0-9²³⁴⁵⁶⁷⁸⁹+\-/·]+)\)/g, '$1');
  
  // Simplificar frações: (a)/(b) → a/b
  result = result.replace(/\(([^/()]+)\)\/\(([^/()]+)\)/g, '$1/$2');
  result = result.replace(/\(([^/()]+)\)\/([^/()]+)/g, '$1/$2');
  result = result.replace(/([^/()]+)\/\(([^/()]+)\)/g, '$1/$2');
  
  // Limpar espaços múltiplos
  result = result.replace(/\s+/g, ' ').trim();
  
  return result;
}

/**
 * Formata a resposta final em um formato bem legível
 * Retorna um objeto com formatação legível e a integral
 */
export function formatResultDisplay(latexFormula, latexResult) {
  // Extrair apenas o argumento da integral (removendo o \int e dx)
  let integralPart = latexFormula;
  
  // Remove \int no começo
  integralPart = integralPart.replace(/^\\int\s*/, '');
  
  // Remove \, dx no final
  integralPart = integralPart.replace(/\\,\s*dx\s*$/, ' dx');
  
  // Converte para formato amigável
  let friendlyIntegral = formatFriendlyResult(integralPart);
  let friendlyResult = formatFriendlyResult(latexResult);
  
  return {
    integral: `∫ ${friendlyIntegral}`,
    result: friendlyResult
  };
}

/**
 * Gera os dados de pontos para renderizar o gráfico no Recharts.
 * Produz 80 pontos no intervalo [min, max] da função, e marca se o ponto
 * está dentro do intervalo de integração [a, b] (área sombreada).
 */
export function generateChartPoints(evaluateFn, a, b, min = -5, max = 5) {
  const points = [];
  const steps = 80;
  const stepSize = (max - min) / steps;
  
  // Garantir limites ordenados
  const startLimit = Math.min(a, b);
  const endLimit = Math.max(a, b);

  for (let i = 0; i <= steps; i++) {
    const x = parseFloat((min + i * stepSize).toFixed(3));
    let y = 0;
    try {
      y = evaluateFn(x);
      // Evitar valores infinitos ou extremamente bizarros que quebram o gráfico
      if (!isFinite(y) || isNaN(y)) y = 0;
      if (Math.abs(y) > 100) y = Math.sign(y) * 100;
    } catch {
      y = 0;
    }

    // Identificar se o ponto está dentro do intervalo integrado
    const isIntegrated = x >= startLimit && x <= endLimit;
    
    points.push({
      x,
      y: parseFloat(y.toFixed(4)),
      // yArea é o valor de y se estiver integrado, ou null se não estiver
      // (isso cria o efeito de preenchimento de área sob a curva com Recharts!)
      yArea: isIntegrated ? parseFloat(y.toFixed(4)) : null
    });
  }

  return points;
}