import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calculator, 
  History, 
  Search, 
  Camera, 
  Send, 
  FileText, 
  BarChart3, 
  ChevronRight, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

import './App.css';
import { solveIntegral, integrateNumerically, generateChartPoints, formatFriendlyResult } from './mathSolver';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import TutorChat, { renderMixedText } from './TutorChat';

export default function App() {
  // Estados de Navegação e Modos
  const [activeTab, setActiveTab] = useState('resolver'); // 'resolver' ou 'historico'
  const [mode, setMode] = useState('resolver'); // 'resolver' ou 'tutor'
  const [inputText, setInputText] = useState('');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  
  // Estados de Cálculo e Resultados
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Analisando expressão...');
  const [solvedData, setSolvedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Limites do Gráfico Dinâmico
  const [limits, setLimits] = useState({ a: 0, b: 2 });
  const [definedArea, setDefinedArea] = useState(0);
  const [chartPoints, setChartPoints] = useState([]);

  // Histórico
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Carregar histórico do localStorage na inicialização
  useEffect(() => {
    try {
      const stored = localStorage.getItem('integra_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Falha ao ler histórico do localStorage:', e);
    }
  }, []);

  // 2. Efeito de cálculo dinâmico da área sob a curva e dos pontos do gráfico
  useEffect(() => {
    if (solvedData && !solvedData.error) {
      const area = integrateNumerically(solvedData.evaluate, limits.a, limits.b);
      setDefinedArea(area);

      const limitsLimits = solvedData.sliderLimits || { min: -5, max: 5 };
      const points = generateChartPoints(
        solvedData.evaluate, 
        limits.a, 
        limits.b, 
        limitsLimits.min, 
        limitsLimits.max
      );
      setChartPoints(points);
    }
  }, [solvedData, limits]);

  // Função para executar a resolução (assíncrona — suporta chamada à API de IA)
  const handleSolve = async (queryToSolve) => {
    const text = queryToSolve || inputText;
    if (!text.trim()) return;

    setErrorMessage('');
    setIsLoading(true);
    setSolvedData(null);

    // Mensagens de loading progressivas
    setLoadingMsg('Analisando a expressão matemática...');
    
    const msgTimer1 = setTimeout(() => {
      setLoadingMsg('Aplicando as regras analíticas de cálculo...');
    }, 800);

    const msgTimer2 = setTimeout(() => {
      setLoadingMsg('Gerando explicações passo a passo e modo tutor...');
    }, 2000);

    const msgTimer3 = setTimeout(() => {
      setLoadingMsg('Preparando gráfico interativo...');
    }, 3500);

    try {
      const result = await solveIntegral(text);

      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      setSolvedData(result);
      setActiveStepIndex(0);

      // Configurar limites iniciais
      const defaultLimits = result.defaultLimits || { a: 0, b: 2 };
      setLimits(defaultLimits);

      // Adicionar ao Histórico
      const newHistoryItem = {
        id: `hist-${Date.now()}`,
        query: text,
        functionName: result.functionName,
        date: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setHistory((prev) => {
        const filtered = prev.filter(item => item.query.toLowerCase() !== text.toLowerCase());
        const updated = [newHistoryItem, ...filtered].slice(0, 50);
        localStorage.setItem('integra_history', JSON.stringify(updated));
        return updated;
      });

    } catch (err) {
      console.error('Erro ao resolver integral:', err);
      setErrorMessage('Ocorreu um erro inesperado ao processar a integral. Verifique a expressão e tente novamente.');
    } finally {
      clearTimeout(msgTimer1);
      clearTimeout(msgTimer2);
      clearTimeout(msgTimer3);
      setIsLoading(false);
    }
  };

  // Trata clique nas pílulas de exemplo
  const handleExampleClick = (example) => {
    setInputText(example);
    handleSolve(example);
  };

  // Trata clique no histórico para recarregar
  const handleHistoryItemClick = (item) => {
    setInputText(item.query);
    setActiveTab('resolver');
    handleSolve(item.query);
  };

  // Limpa o histórico
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('integra_history');
  };

  // Filtra histórico conforme busca do usuário
  const filteredHistory = history.filter((item) =>
    item.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.functionName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header da Aplicação */}
      <header className="app-header">
        <div className="logo-container" onClick={() => { setActiveTab('resolver'); setSolvedData(null); setInputText(''); }}>
          <div className="logo-icon">
            <Sparkles size={20} />
          </div>
          <span className="logo-text">INTEGRA+</span>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'resolver' ? 'active' : ''}`}
            onClick={() => setActiveTab('resolver')}
          >
            <Calculator size={16} />
            Resolver
          </button>
          <button 
            className={`nav-tab ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => setActiveTab('historico')}
          >
            <History size={16} />
            Histórico
          </button>
        </div>
      </header>

      {/* Container Principal */}
      <main className="app-container">
        
        {activeTab === 'resolver' ? (
          <>
            {/* Tag Inteligente */}
            <div className="ai-badge">
              <Sparkles size={13} />
              Resolução inteligente com IA
            </div>

            {/* Cabeçalho de Boas-vindas (oculta se houver dados ou tutor ativo) */}
            {!solvedData && !isLoading && mode === 'resolver' && (
              <>
                <h1 className="hero-title">Resolva qualquer integral</h1>
                <p className="hero-subtitle">
                  Digite em linguagem natural ou simule um upload de foto. Receba explicações passo a passo adaptadas ao seu nível escolar ou acadêmico.
                </p>
              </>
            )}

            {mode === 'tutor' && !solvedData && !isLoading && (
              <>
                <h1 className="hero-title" style={{ fontSize: '38px', marginBottom: '8px' }}>Tutor IA Integrado</h1>
                <p className="hero-subtitle">
                  Digite o problema e o tutor irá te guiar passo a passo de forma interativa até a resposta.
                </p>
              </>
            )}

            {/* Seletor de Modo (oculta se estiver em loading ou com resultado ativo) */}
            {!solvedData && !isLoading && (
              <div className="mode-selector">
                <button 
                  className={`mode-btn ${mode === 'resolver' ? 'active' : ''}`}
                  onClick={() => setMode('resolver')}
                >
                  <Sparkles size={14} />
                  Resolver
                </button>
                <button 
                  className={`mode-btn ${mode === 'tutor' ? 'active' : ''}`}
                  onClick={() => setMode('tutor')}
                >
                  <Calculator size={14} />
                  Modo Tutor
                </button>
              </div>
            )}

            {/* Caixa de Entrada do Problema (oculta se o resultado ou tutor estiverem ativos) */}
            {!solvedData && !isLoading && (
              <>
                <div className="input-card">
                  <textarea
                    className="math-textarea"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      mode === 'resolver' 
                        ? "Digite seu problema... ex: integral de x² + 3x dx"
                        : "Digite seu problema para o tutor... ex: integral de sen(x) cos(x) dx"
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSolve();
                      }
                    }}
                  />
                  <div className="input-actions">
                    <button 
                      className="action-left-btn"
                      onClick={() => alert('Recurso estético de foto: a simulação de upload por imagem foi iniciada. Digite os termos do problema na caixa de texto para que a engine local resolva para você!')}
                    >
                      <Camera size={16} />
                      Foto
                    </button>
                    <button 
                      className="resolver-btn"
                      disabled={!inputText.trim()}
                      onClick={() => handleSolve()}
                    >
                      <Send size={15} />
                      Resolver
                    </button>
                  </div>
                </div>

                {/* Exemplos Rápidos */}
                <div className="examples-section">
                  <div className="examples-title">
                    <AlertCircle size={14} />
                    <span>Experimente um exemplo:</span>
                  </div>
                  <div className="examples-grid">
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de x² + 3x dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int (x^2 + 3x) \\, dx', { throwOnError: false }) }}
                    />
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de sen(x) cos(x) dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int \\operatorname{sen}(x) \\cos(x) \\, dx', { throwOnError: false }) }}
                    />
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de 1/(x²+1) dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int \\frac{1}{x^2+1} \\, dx', { throwOnError: false }) }}
                    />
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de raiz de x dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int \\sqrt{x} \\, dx', { throwOnError: false }) }}
                    />
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de e^(2x) dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int e^{2x} \\, dx', { throwOnError: false }) }}
                    />
                    <button 
                      className="example-pill" 
                      onClick={() => handleExampleClick('integral de ln(x) dx')}
                      dangerouslySetInnerHTML={{ __html: katex.renderToString('\\int \\ln(x) \\, dx', { throwOnError: false }) }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Mensagem de Erro */}
            {errorMessage && (
              <div className="result-card" style={{ width: '100%', borderColor: '#ef4444', background: 'rgba(239,68,68,0.03)' }}>
                <div style={{ display: 'flex', gap: '10px', color: '#ef4444', alignItems: 'center' }}>
                  <AlertCircle size={20} />
                  <span style={{ fontWeight: '600' }}>Erro de Compreensão Matemática</span>
                </div>
                <p style={{ marginTop: '10px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>{errorMessage}</p>
                <button 
                  className="empty-btn" 
                  onClick={() => setErrorMessage('')}
                  style={{ marginTop: '15px' }}
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Estado de Carregamento Animado */}
            {isLoading && (
              <div className="loading-container">
                <div className="loading-logo-box">
                  <Sparkles size={36} />
                </div>
                <div className="spinner"></div>
                <span className="loading-title">Efetuando Cálculo</span>
                <span className="loading-subtitle">{loadingMsg}</span>
              </div>
            )}

            {/* Exibição dos Resultados */}
            {solvedData && !isLoading && (
              <div className="results-container">
                {/* 1. Card da Resolução Analítica */}
                {mode === 'resolver' && (
                  <div className="result-card">
                    <div className="card-title-bar">
                    <div className="card-title-text">
                      <FileText size={18} className="card-title-icon" />
                      Resultado Analítico
                    </div>
                    <button 
                      className="tutor-header-btn" 
                      onClick={() => { setSolvedData(null); setInputText(''); }}
                    >
                      Resolver nova integral
                    </button>
                  </div>
                  <div className="math-result-display">
                    <div className="math-formula">
                      <div 
                        style={{ marginBottom: '12px', fontSize: '15px', fontWeight: '500', width: '100%', overflowX: 'auto', textAlign: 'center' }}
                        dangerouslySetInnerHTML={{ __html: katex.renderToString(solvedData.latexFormula, { displayMode: true, throwOnError: false }) }}
                      />
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center' }}>
                        Resultado:
                      </div>
                      <div 
                        className="formula-highlight" 
                        style={{ fontSize: '16px', fontWeight: '600', width: '100%', overflowX: 'auto', textAlign: 'center' }}
                        dangerouslySetInnerHTML={{ __html: katex.renderToString(solvedData.latexResult, { displayMode: true, throwOnError: false }) }}
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    Esta é a antiderivada geral da função. O termo <strong>C</strong> representa a constante arbitrária de integração.
                  </p>
                </div>
                )}

                {/* 2. Gráfico Interativo com Sliders */}
                <div className="result-card">
                  <div className="card-title-bar">
                    <div className="card-title-text">
                      <BarChart3 size={18} className="card-title-icon" />
                      Visualização Geométrica da Integral Definida
                    </div>
                  </div>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    A integral representa a <strong>área líquida sob a curva</strong>. Mova os controles abaixo para alterar o intervalo de integração <strong>[a, b]</strong> e veja a área atualizar em tempo real:
                  </p>
                  
                  {/* Gráfico Recharts */}
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartPoints}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="x" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'var(--card-bg)', 
                            borderColor: 'var(--card-border)',
                            color: 'var(--text-primary)',
                            borderRadius: '8px'
                          }} 
                        />
                        {/* Preenche a área integrada */}
                        <Area 
                          type="monotone" 
                          dataKey="yArea" 
                          stroke="none"
                          fill="url(#areaGradient)" 
                        />
                        {/* Linha principal da função */}
                        <Area 
                          type="monotone" 
                          dataKey="y" 
                          stroke="var(--primary)" 
                          strokeWidth={2.5}
                          fill="none" 
                        />
                        {/* Linhas verticais nos limites de integração */}
                        <ReferenceLine x={limits.a} stroke="var(--primary)" strokeWidth={1.5} strokeDasharray="4 4" />
                        <ReferenceLine x={limits.b} stroke="var(--primary)" strokeWidth={1.5} strokeDasharray="4 4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Sliders de Controle */}
                  <div className="chart-controls-panel">
                    <div className="control-row">
                      <span className="control-label">Limite a (esq):</span>
                      <input
                        type="range"
                        className="control-slider"
                        min={solvedData.sliderLimits?.min || -5}
                        max={solvedData.sliderLimits?.max || 5}
                        step={solvedData.sliderLimits?.step || 0.1}
                        value={limits.a}
                        onChange={(e) => setLimits((prev) => ({ ...prev, a: parseFloat(e.target.value) }))}
                      />
                      <span className="control-value">{limits.a.toFixed(1)}</span>
                    </div>
                    <div className="control-row">
                      <span className="control-label">Limite b (dir):</span>
                      <input
                        type="range"
                        className="control-slider"
                        min={solvedData.sliderLimits?.min || -5}
                        max={solvedData.sliderLimits?.max || 5}
                        step={solvedData.sliderLimits?.step || 0.1}
                        value={limits.b}
                        onChange={(e) => setLimits((prev) => ({ ...prev, b: parseFloat(e.target.value) }))}
                      />
                      <span className="control-value">{limits.b.toFixed(1)}</span>
                    </div>
                    <div className="integration-summary">
                      <span>Integral Definida de <strong>{limits.a.toFixed(1)}</strong> a <strong>{limits.b.toFixed(1)}</strong>:</span>
                      <span className="summary-value">
                        ∫ = {definedArea.toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Card do Passo a Passo Didático (Visualizador Interativo) */}
                {mode === 'resolver' && (
                  <div className="result-card">
                    <div className="card-title-bar">
                      <div className="card-title-text">
                        <Sparkles size={18} className="card-title-icon" />
                        Explicações Passo a Passo
                      </div>
                    </div>
                    
                    <div className="steps-visualizer-grid">
                      {/* Coluna Esquerda: Linha do Tempo */}
                      <div className="visualizer-sidebar">
                        <div className="steps-timeline">
                          {solvedData.steps.map((step, idx) => {
                            const isActive = idx === activeStepIndex;
                            const isPast = idx < activeStepIndex;
                            let timelineClass = 'timeline-item';
                            if (isActive) timelineClass += ' active';
                            if (!isActive && !isPast) timelineClass += ' inactive';
                            if (isPast) timelineClass += ' completed';
                            
                            return (
                              <div 
                                key={idx} 
                                className={timelineClass}
                                onClick={() => setActiveStepIndex(idx)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                  <div className="step-header">{step.title}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Coluna Direita: Foco Visual e Controles */}
                      <div className="visualizer-main">
                        <div className="visualizer-focus-board">
                          {solvedData.steps[activeStepIndex] && (
                            <>
                              <h3 className="focus-title">{solvedData.steps[activeStepIndex].title}</h3>
                              <p className="focus-desc">{renderMixedText(solvedData.steps[activeStepIndex].desc)}</p>
                              <div 
                                className="focus-math"
                                dangerouslySetInnerHTML={{ __html: katex.renderToString(solvedData.steps[activeStepIndex].math, { displayMode: true, throwOnError: false }) }}
                              />
                            </>
                          )}
                        </div>
                        
                        {/* Controles de Reprodução */}
                        <div className="playback-controls">
                          <button 
                            className="playback-btn" 
                            disabled={activeStepIndex === 0}
                            onClick={() => setActiveStepIndex(0)}
                            title="Primeiro Passo"
                          >
                            |&lt;
                          </button>
                          <button 
                            className="playback-btn" 
                            disabled={activeStepIndex === 0}
                            onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                            title="Passo Anterior"
                          >
                            &lt;
                          </button>
                          <input 
                            type="range" 
                            className="playback-slider"
                            min={0} 
                            max={solvedData.steps.length - 1} 
                            value={activeStepIndex}
                            onChange={(e) => setActiveStepIndex(parseInt(e.target.value))}
                          />
                          <button 
                            className="playback-btn" 
                            disabled={activeStepIndex === solvedData.steps.length - 1}
                            onClick={() => setActiveStepIndex(Math.min(solvedData.steps.length - 1, activeStepIndex + 1))}
                            title="Próximo Passo"
                          >
                            &gt;
                          </button>
                          <button 
                            className="playback-btn" 
                            disabled={activeStepIndex === solvedData.steps.length - 1}
                            onClick={() => setActiveStepIndex(solvedData.steps.length - 1)}
                            title="Último Passo"
                          >
                            &gt;|
                          </button>
                        </div>
                        <div className="playback-status">
                          Passo {activeStepIndex + 1} de {solvedData.steps.length}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exibição do Tutor IA (Modo Chat) */}
                {mode === 'tutor' && (
                  <div style={{ width: '100%' }}>
                    <TutorChat 
                      problemData={solvedData}
                      onReset={() => { setSolvedData(null); setInputText(''); }}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Histórico Tab */
          <div className="history-section">
            <div className="history-title-bar">
              <h1 className="hero-title" style={{ fontSize: '32px', marginBottom: '0' }}>Histórico</h1>
              <span className="history-count">
                {history.length} {history.length === 1 ? 'problema resolvido' : 'problemas resolvidos'}
              </span>
            </div>

            {/* Barra de Pesquisa no Histórico */}
            {history.length > 0 && (
              <div className="search-container">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar termos de integrais resolvidas anteriormente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {/* Lista ou Vazio */}
            {history.length === 0 ? (
              <div className="empty-history">
                <div className="empty-icon-box">
                  <Clock size={24} />
                </div>
                <span className="empty-title">Nenhum problema resolvido ainda</span>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '300px' }}>
                  Suas integrais resolvidas aparecerão aqui para você consultá-las rapidamente quando desejar.
                </p>
                <button className="empty-btn" onClick={() => setActiveTab('resolver')}>
                  Resolver primeiro problema
                </button>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="empty-history" style={{ padding: '40px 20px' }}>
                <span className="empty-title">Nenhum resultado encontrado</span>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Não encontramos correspondência para "{searchQuery}" nas buscas anteriores.
                </p>
              </div>
            ) : (
              <>
                <div className="history-list">
                  {filteredHistory.map((item) => (
                    <div 
                      key={item.id} 
                      className="history-item"
                      onClick={() => handleHistoryItemClick(item)}
                    >
                      <div className="history-item-left">
                        <span className="history-item-query">{item.query}</span>
                        <span className="history-item-date">{item.date}</span>
                      </div>
                      <div className="history-item-right">
                        <span>{item.functionName}</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="empty-btn"
                  onClick={handleClearHistory}
                  style={{ alignSelf: 'center', marginTop: '20px', borderColor: '#ef4444', color: '#ef4444', background: 'transparent' }}
                >
                  Limpar todo o histórico
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}