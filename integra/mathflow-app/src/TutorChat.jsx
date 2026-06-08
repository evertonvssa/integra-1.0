import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';

function renderMixedText(text) {
  if (!text) return null;
  const parts = text.split(/\$(.*?)\$/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      try {
        const html = katex.renderToString(part, { displayMode: false, throwOnError: false });
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch (e) {
        return <span key={index}>${part}$</span>;
      }
    }
    return <span key={index}>{part}</span>;
  });
}

export default function TutorChat({ problemData, onReset }) {
  const [messages, setMessages] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState([]);
  
  const chatBodyRef = useRef(null);

  const steps = problemData.tutorSteps || [
    {
      question: `Vamos estudar a integral de f(x) = ${problemData.query}. Tente usar os sliders e o gráfico interativo para entender a área integrada!`,
      options: [
        { text: 'Entendi, vou testar!', isCorrect: true, feedback: 'Excelente! Sinta-se livre para arrastar os controles e observar os limites de integração no gráfico.' }
      ],
      tip: 'Olhe para a aba do gráfico na aba Resolver.'
    }
  ];

  // Iniciar o chat com a mensagem do Tutor
  useEffect(() => {
    setMessages([]);
    setCurrentStepIndex(0);
    setIsTyping(true);
    setSelectedOptionIndex(null);
    setIsAnsweredCorrectly(false);
    setIncorrectAttempts([]);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 'msg-init-1',
          sender: 'tutor',
          text: steps[0].question
        }
      ]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [problemData]);

  // Rolar automaticamente para o final do chat a cada nova mensagem ou animação de digitação
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const currentStep = steps[currentStepIndex];

  const handleOptionClick = (option, index) => {
    if (isAnsweredCorrectly || isTyping) return;
    
    setSelectedOptionIndex(index);
    
    // 1. Adicionar resposta do usuário na tela
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option.text
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simular o Tutor pensando e respondendo
    setTimeout(() => {
      setIsTyping(false);
      
      const tutorReply = {
        id: `tutor-reply-${Date.now()}`,
        sender: 'tutor',
        text: option.feedback
      };
      
      setMessages((prev) => [...prev, tutorReply]);

      if (option.isCorrect) {
        setIsAnsweredCorrectly(true);
        // Avançar para a próxima etapa depois de uma breve pausa
        setTimeout(() => {
          if (currentStepIndex < steps.length - 1) {
            // Avança a etapa
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            setIsTyping(true);
            
            setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                {
                  id: `tutor-question-${Date.now()}`,
                  sender: 'tutor',
                  text: steps[nextIndex].question
                }
              ]);
              // Resetar estados da nova etapa
              setSelectedOptionIndex(null);
              setIsAnsweredCorrectly(false);
              setIncorrectAttempts([]);
            }, 1000);
          } else {
            // Fim do Tutor IA! Parabenizar
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                {
                  id: `tutor-finish-${Date.now()}`,
                  sender: 'tutor',
                  text: `🎉 Parabéns! Você completou toda a jornada do Modo Tutor para este problema! O resultado final da integral é: $${problemData.latexResult}$. Agora você domina os conceitos envolvidos! Gostaria de resolver outro problema?`
                }
              ]);
            }, 1000);
          }
        }, 1500);
      } else {
        // Resposta incorreta, marcar para desabilitar ou pintar em vermelho
        setIncorrectAttempts((prev) => [...prev, index]);
        setSelectedOptionIndex(null);
      }
    }, 1200);
  };

  const handleTipClick = () => {
    if (isAnsweredCorrectly || isTyping) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `tip-${Date.now()}`,
          sender: 'tutor',
          text: `💡 Dica do Tutor: ${currentStep.tip || 'Tente reler as opções com calma e eliminar as alternativas incorretas.'}`
        }
      ]);
    }, 800);
  };

  return (
    <div className="tutor-card">
      {/* Header do Chat */}
      <div className="tutor-chat-header">
        <div className="tutor-info">
          <div className="tutor-avatar">🤖</div>
          <div>
            <div className="tutor-name">Tutor IA</div>
            <div className="tutor-sub">{problemData.functionName || 'Expressão matemática'}</div>
          </div>
        </div>
        <div className="tutor-header-actions">
          <button className="tutor-header-btn" onClick={onReset}>
            🔄 Novo problema
          </button>
        </div>
      </div>

      {/* Corpo da Conversa */}
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`message-row ${msg.sender}`}>
            <div className="msg-bubble">
              {renderMixedText(msg.text)}
            </div>
          </div>
        ))}
        
        {/* Animação de digitação do Tutor */}
        {isTyping && (
          <div className="message-row tutor">
            <div className="msg-bubble">
              <div className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer com Opções de Múltipla Escolha e Controles */}
      <div className="chat-footer-wrapper" style={{ padding: '0 20px 20px', background: 'var(--card-bg)' }}>
        {/* Opções ativas da etapa atual (apenas se o tutor não estiver digitando e a etapa não estiver respondida) */}
        {!isTyping && !isAnsweredCorrectly && currentStepIndex < steps.length && (
          <div className="options-container">
            {currentStep.options.map((option, idx) => {
              const isIncorrect = incorrectAttempts.includes(idx);
              let btnClass = '';
              if (isIncorrect) btnClass = 'selected-incorrect';
              
              return (
                <button
                  key={idx}
                  className={`option-btn ${btnClass}`}
                  disabled={isIncorrect || isAnsweredCorrectly}
                  onClick={() => handleOptionClick(option, idx)}
                >
                  <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                    {String.fromCharCode(65 + idx)})
                  </span>{' '}
                  {renderMixedText(option.text)}
                </button>
              );
            })}
          </div>
        )}

        {/* Fim da Jornada do Tutor */}
        {!isTyping && currentStepIndex >= steps.length - 1 && isAnsweredCorrectly && (
          <div className="options-container">
            <button className="option-btn selected-correct" onClick={onReset} style={{ justifyContent: 'center' }}>
              🎯 Resolver um Novo Problema
            </button>
          </div>
        )}

        {/* Linha Inferior com Botão de Dica */}
        <div className="chat-footer" style={{ border: 'none', padding: '15px 0 0' }}>
          <input
            type="text"
            className="chat-input-box"
            placeholder="Escolha uma das opções acima para responder..."
            disabled
          />
          <button
            className="chat-action-btn tip-btn"
            disabled={isAnsweredCorrectly || isTyping || currentStepIndex >= steps.length}
            onClick={handleTipClick}
          >
            💡 Dica
          </button>
        </div>
      </div>
    </div>
  );
}
