import React, { useState } from 'react';
import { generateReport } from '../services/geminiService';
import { Loader2, Copy, Check } from 'lucide-react';

export const ReportGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [positive, setPositive] = useState('');
  const [improve, setImprove] = useState('');
  const [social, setSocial] = useState('Interage bem com os colegas');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!name || !positive) return;
    setLoading(true);
    try {
      const text = await generateReport(name, positive, improve, social);
      setResult(text);
      setCopied(false);
    } catch (e) {
      alert('Erro ao gerar relatório.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Dados do Aluno</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Aluno</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              placeholder="Ex: Joãozinho"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pontos Fortes / Avanços</label>
            <textarea
              value={positive}
              onChange={(e) => setPositive(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none h-24 resize-none"
              placeholder="Ex: Reconhece as cores, gosta de música, coordenação motora fina melhorou..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pontos a Desenvolver</label>
            <textarea
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none h-20 resize-none"
              placeholder="Ex: Dificuldade em dividir brinquedos, resistência ao sono..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Socialização</label>
            <select
              value={social}
              onChange={(e) => setSocial(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
            >
              <option>Interage bem com todos</option>
              <option>Prefere brincar sozinho</option>
              <option>Lidera as brincadeiras</option>
              <option>Ainda em adaptação</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !name}
            className="w-full py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Escrever Relatório'}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Resultado</h2>
          {result && (
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {copied ? <><Check size={16} /> Copiado</> : <><Copy size={16} /> Copiar</>}
            </button>
          )}
        </div>
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="O relatório gerado aparecerá aqui. Você poderá editá-lo antes de copiar."
          className="flex-1 w-full p-4 border rounded-xl focus:ring-2 focus:ring-gray-200 outline-none resize-none bg-gray-50 font-serif text-lg leading-relaxed text-gray-700"
        />
      </div>
    </div>
  );
};
