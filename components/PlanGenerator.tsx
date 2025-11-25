import React, { useState } from 'react';
import { generateLessonPlan } from '../services/geminiService';
import { LessonPlan } from '../types';
import { Loader2, Download, Printer } from 'lucide-react';

export const PlanGenerator: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [age, setAge] = useState('3 a 4 anos');
  const [duration, setDuration] = useState('4 horas');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<LessonPlan | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateLessonPlan(theme, age, duration);
      setPlan(result);
    } catch (error) {
      alert('Erro ao gerar plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📋 Gerador de Plano de Aula BNCC
        </h2>
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tema da Aula</label>
            <input
              type="text"
              required
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Ex: O Ciclo da Água, Animais da Fazenda, Cores..."
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Faixa Etária</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary outline-none bg-white"
            >
              <option>Bebês (0 a 1 ano e 6 meses)</option>
              <option>Crianças bem pequenas (1 ano e 7 meses a 3 anos e 11 meses)</option>
              <option>Crianças pequenas (4 anos a 5 anos e 11 meses)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Ex: 50 minutos, 1 tarde"
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-secondary outline-none"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-secondary hover:bg-teal-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : '✨ Gerar Plano com IA'}
            </button>
          </div>
        </form>
      </div>

      {plan && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-secondary animate-fade-in">
          <div className="flex justify-between items-start mb-6 border-b pb-4">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">{plan.theme}</h3>
              <p className="text-gray-500 mt-1">{plan.ageGroup}</p>
            </div>
            <button 
                onClick={() => window.print()} 
                className="p-2 text-gray-500 hover:text-primary hover:bg-orange-50 rounded-full transition-colors"
                title="Imprimir"
            >
                <Printer size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="font-bold text-secondary text-lg mb-2">🎯 Objetivos de Aprendizagem</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {plan.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">🏛️ Códigos BNCC</h4>
              <div className="flex flex-wrap gap-2">
                {plan.bnccCodes.map((code, i) => (
                  <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm font-mono text-primary font-bold">
                    {code}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h4 className="font-bold text-secondary text-lg mb-2">🛠️ Recursos Necessários</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {plan.resources.map((res, i) => <li key={i}>{res}</li>)}
              </ul>
            </section>

            <section>
              <h4 className="font-bold text-secondary text-lg mb-2">👣 Desenvolvimento (Passo a Passo)</h4>
              <div className="space-y-3">
                {plan.steps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-secondary/10 text-secondary font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

             <section>
              <h4 className="font-bold text-secondary text-lg mb-2">📝 Avaliação</h4>
              <p className="text-gray-700 italic">{plan.evaluation}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
