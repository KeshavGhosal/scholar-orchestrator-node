
import React, { useState } from 'react';
import { QuizQuestion, QuizOption } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  onAskAI: (context: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAskAI }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleOption = (id: string) => {
    if (showFeedback) return;
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedIds([]);
    setShowFeedback(false);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-xl max-w-2xl w-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-500/10 text-green-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider border border-green-500/20">
          Quiz Mode
        </span>
      </div>
      
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3 mb-8">
        {question.options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrect = option.isCorrect;
          
          let cardStyle = "border-[#30363d] hover:border-[#8b949e]";
          if (showFeedback) {
            if (isCorrect) {
              cardStyle = "border-green-500 bg-green-500/5";
            } else if (isSelected && !isCorrect) {
              cardStyle = "border-red-500 bg-red-500/5";
            }
          } else if (isSelected) {
            cardStyle = "border-blue-500 bg-blue-500/5";
          }

          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group flex items-start gap-4 ${cardStyle}`}
            >
              <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected ? 'bg-blue-500 border-blue-500' : 'border-[#30363d]'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-200 group-hover:text-white transition-colors">{option.text}</p>
                {showFeedback && (
                  <p className={`mt-2 text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    {option.explanation}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIds.length === 0}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-[#21262d] hover:bg-[#30363d] text-white font-bold rounded-xl border border-[#30363d] transition-all"
          >
            Try Again
          </button>
        )}
        
        <button
          onClick={() => onAskAI(`Explain why options ${question.options.filter(o => o.isCorrect).map(o => o.id.toUpperCase()).join(', ')} are correct for the replaceOne() method question.`)}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ask MongoBuddy AI
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
