import React, { useState } from 'react';
import { generateStory } from '../services/geminiService';
import { Book as BookIcon, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { Book } from '../types';

// Mock static books
const MOCK_BOOKS: Book[] = [
  { id: '1', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', description: 'Um clássico sobre amizade e amor.', coverUrl: 'https://picsum.photos/seed/prince/200/300' },
  { id: '2', title: 'Menina Bonita do Laço de Fita', author: 'Ana Maria Machado', description: 'História sobre diversidade e autoestima.', coverUrl: 'https://picsum.photos/seed/menina/200/300' },
  { id: '3', title: 'A Lagarta Comilona', author: 'Eric Carle', description: 'Ensina sobre metamorfose e dias da semana.', coverUrl: 'https://picsum.photos/seed/lagarta/200/300' },
  { id: '4', title: 'Elmer, o Elefante Xadrez', author: 'David McKee', description: 'Celebração das diferenças.', coverUrl: 'https://picsum.photos/seed/elmer/200/300' },
];

export const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'collection' | 'generator'>('collection');
  const [storyTopic, setStoryTopic] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateStory = async () => {
    if (!storyTopic) return;
    setLoading(true);
    try {
      const story = await generateStory(storyTopic);
      setGeneratedStory(story);
    } catch (e) {
      alert("Erro ao criar história.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('collection')}
          className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'collection' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📚 Acervo Clássico
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'generator' ? 'border-b-2 border-secondary text-secondary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ✨ Criador de Histórias
        </button>
      </div>

      {activeTab === 'collection' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {MOCK_BOOKS.map(book => (
            <div key={book.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="aspect-[2/3] overflow-hidden bg-gray-100">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
              <h3 className="text-xl font-bold text-secondary mb-2 flex items-center gap-2">
                <Sparkles size={20} />
                Crie uma História Única
              </h3>
              <p className="text-gray-600 mb-4">
                Precisa de uma história sobre um tema específico para sua aula? A IA escreve para você.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sobre o que deve ser a história?</label>
                <textarea
                  value={storyTopic}
                  onChange={(e) => setStoryTopic(e.target.value)}
                  placeholder="Ex: Um dinossauro que queria ser astronauta, ou a importância de escovar os dentes..."
                  className="w-full p-3 rounded-xl border border-white shadow-sm focus:ring-2 focus:ring-secondary outline-none h-32 resize-none"
                />
                <button
                  onClick={handleGenerateStory}
                  disabled={loading || !storyTopic}
                  className="w-full py-3 bg-secondary hover:bg-teal-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Escrever História'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
             {generatedStory ? (
               <article className="prose prose-lg max-w-none text-gray-700">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BookOpen className="text-primary" /> História Gerada
                 </h3>
                 <div className="whitespace-pre-wrap leading-relaxed font-serif">
                    {generatedStory}
                 </div>
               </article>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                 <BookIcon size={48} className="mb-4 opacity-20" />
                 <p>Sua história aparecerá aqui...</p>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};
