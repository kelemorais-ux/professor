import React, { useState } from 'react';
import { generateVisualResource } from '../services/geminiService';
import { Loader2, Image as ImageIcon, Download } from 'lucide-react';

export const MoldsAndDecor: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const url = await generateVisualResource(prompt);
      setImageUrl(url);
    } catch (error) {
      alert("Não foi possível gerar a imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">🎨 Moldes e Decoração</h2>
        <p className="text-gray-600">
          Descreva o que você precisa (ex: "Molde letra A com flores", "Desenho de borboleta simples para colorir") e a IA criará uma imagem para você usar como base.
        </p>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-md border border-gray-200 flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="O que você deseja criar hoje?"
          className="flex-1 p-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="bg-accent hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><ImageIcon size={20} /> Criar</>}
        </button>
      </div>

      {imageUrl ? (
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 animate-fade-in flex flex-col items-center">
          <div className="relative group w-full max-w-md aspect-square bg-gray-50 rounded-xl overflow-hidden border">
            <img src={imageUrl} alt="Generated Mold" className="w-full h-full object-contain p-4" />
          </div>
          <div className="mt-4 flex gap-4">
             <a 
                href={imageUrl} 
                download={`molde-${prompt.replace(/\s+/g, '-')}.png`}
                className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
             >
                <Download size={18} /> Baixar Imagem
             </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
            *Esta imagem foi gerada por IA. Você pode imprimi-la e usá-la como molde para EVA, feltro ou atividades de colorir.
          </p>
        </div>
      ) : (
        !loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
             {/* Placeholders to fill space nicely */}
             {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                    <Scissors size={24} className="text-gray-300" />
                 </div>
             ))}
          </div>
        )
      )}
    </div>
  );
};

// Helper for the placeholder
import { Scissors } from 'lucide-react';
