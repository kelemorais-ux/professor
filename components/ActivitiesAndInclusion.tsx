import React, { useState } from 'react';
import { generateActivityIdea } from '../services/geminiService';
import { Loader2, Heart, Lightbulb } from 'lucide-react';

interface Props {
  mode: 'ACTIVITIES' | 'INCLUSIVE';
}

export const ActivitiesAndInclusion: React.FC<Props> = ({ mode }) => {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const isInclusive = mode === 'INCLUSIVE';
  const title = isInclusive ? 'Educação Inclusiva' : 'Banco de Atividades';
  const description = isInclusive 
    ? 'Encontre adaptações e atividades sensoriais para incluir todos os alunos, independente de suas necessidades.'
    : 'Ideias criativas para dinâmicas de sala de aula, brincadeiras de roda e projetos artísticos.';
  const placeholder = isInclusive
    ? 'Ex: Atividade sensorial para aluno com autismo, adaptação para cadeirante...'
    : 'Ex: Brincadeira para dia da árvore, atividade de coordenação motora...';

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    try {
      const ideas = await generateActivityIdea(topic, isInclusive);
      setResult(ideas);
    } catch (error) {
      alert("Erro ao buscar ideias.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className={`mb-8 p-8 rounded-3xl text-white shadow-lg ${isInclusive ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-gradient-to-r from-orange-400 to-red-400'}`}>
         <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                {isInclusive ? <Heart size={32} /> : <Lightbulb size={32} />}
            </div>
            <h2 className="text-3xl font-bold">{title}</h2>
         </div>
         <p className="text-lg opacity-90 max-w-2xl">{description}</p>
       </div>

       <div className="grid gap-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <form onSubmit={handleGenerate} className="flex gap-4">
             <input
               value={topic}
               onChange={(e) => setTopic(e.target.value)}
               placeholder={placeholder}
               className="flex-1 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
               style={{ borderColor: isInclusive ? '#d8b4fe' : '#fdba74' }}
             />
             <button
               type="submit"
               disabled={loading || !topic}
               className={`px-8 font-bold text-white rounded-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50 ${isInclusive ? 'bg-purple-500 hover:bg-purple-600' : 'bg-primary hover:bg-orange-600'}`}
             >
               {loading ? <Loader2 className="animate-spin" /> : 'Sugerir'}
             </button>
           </form>
         </div>

         {result && (
           <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 animate-fade-in" style={{ borderColor: isInclusive ? '#a855f7' : '#fb923c' }}>
             <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
               💡 Sugestões da IA
             </h3>
             <div 
                className="prose prose-lg max-w-none text-gray-700 space-y-4"
                dangerouslySetInnerHTML={{ __html: result }} // Result comes as HTML list from prompt instructions
             />
           </div>
         )}
       </div>
    </div>
  );
};
