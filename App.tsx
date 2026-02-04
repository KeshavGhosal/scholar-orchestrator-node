
import React, { useState, useCallback } from 'react';
import { QuizQuestion, ChatMessage } from './types';
import QuizCard from './components/QuizCard';
import ChatPanel from './components/ChatPanel';
import { explainConcept } from './services/geminiService';

const APP_QUESTION: QuizQuestion = {
  id: 'q1',
  question: 'Which of the following statements regarding the replaceOne() method for the MongoDB Shell (mongosh) are true? (Select all that apply.)',
  options: [
    {
      id: 'a',
      text: 'This method is used to replace a single document that matches the filter document.',
      isCorrect: true,
      explanation: 'Exactly! replaceOne finds the first doc that hits your filter and swaps it out.'
    },
    {
      id: 'b',
      text: 'This method accepts a filter document, a replacement document, and an optional options document.',
      isCorrect: true,
      explanation: "Yup. The syntax is db.collection.replaceOne(filter, replacement, options)."
    },
    {
      id: 'c',
      text: 'This method can replace multiple documents in a collection.',
      isCorrect: false,
      explanation: 'Nope! It says "One" in the name for a reason, dude. It only touches the first match.'
    },
    {
      id: 'd',
      text: 'This method returns a document containing an acknowledgement of the operation, a matched count, modified count, and an upserted ID (if applicable).',
      isCorrect: true,
      explanation: 'Spot on! The shell returns this stats object so you know exactly what happened.'
    }
  ]
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await explainConcept(text);
      const aiMsg: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = { role: 'model', content: "My MongoDB connection timed out... just kidding, it was my brain. Try again?" };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAskAI = useCallback((context: string) => {
    handleSendMessage(context);
  }, [handleSendMessage]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0c111c] text-white">
      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          <header className="mb-12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                MongoBuddy Assistant
              </h1>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Yo! I'm your study partner for all things MongoDB. Test your knowledge on the <code className="text-green-400 px-1.5 py-0.5 bg-[#161b22] rounded font-mono">replaceOne()</code> method below.
            </p>
          </header>

          <div className="flex flex-col gap-8 items-center md:items-start">
            <QuizCard 
              question={APP_QUESTION} 
              onAskAI={handleAskAI}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-2xl">
                <h4 className="font-bold text-green-400 mb-2">Pro Tip 💡</h4>
                <p className="text-sm text-gray-400">
                  <code className="text-gray-200">replaceOne()</code> replaces the **entire** document. If you only want to change specific fields, use <code className="text-blue-400">updateOne()</code> with <code className="text-blue-400">$set</code>.
                </p>
              </div>
              <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-2xl">
                <h4 className="font-bold text-blue-400 mb-2">The "_id" Rule</h4>
                <p className="text-sm text-gray-400">
                  The <code className="text-gray-200">_id</code> field is immutable. Your replacement document must either match the original <code className="text-gray-200">_id</code> or omit it entirely!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Side Chat Sidebar */}
      <ChatPanel 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default App;
