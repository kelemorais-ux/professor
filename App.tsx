import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PlanGenerator } from './components/PlanGenerator';
import { ReportGenerator } from './components/ReportGenerator';
import { MoldsAndDecor } from './components/MoldsAndDecor';
import { Library } from './components/Library';
import { ActivitiesAndInclusion } from './components/ActivitiesAndInclusion';
import { ViewState } from './types';
import { BookOpen, Calendar, Star, Users } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LESSON_PLANS:
        return <PlanGenerator />;
      case ViewState.REPORTS:
        return <ReportGenerator />;
      case ViewState.MOLDS:
        return <MoldsAndDecor />;
      case ViewState.LIBRARY:
        return <Library />;
      case ViewState.ACTIVITIES:
        return <ActivitiesAndInclusion mode="ACTIVITIES" />;
      case ViewState.INCLUSIVE:
        return <ActivitiesAndInclusion mode="INCLUSIVE" />;
      case ViewState.DASHBOARD:
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-bg">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 md:hidden flex items-center px-4 bg-white border-b border-gray-100">
           {/* Header space for mobile menu button which is fixed in Sidebar component */}
           <span className="ml-12 font-bold text-lg text-primary">EducaKids AI</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

// Dashboard Component Internal
const Dashboard: React.FC<{ onViewChange: (view: ViewState) => void }> = ({ onViewChange }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Olá, Professor(a)! 🍎</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          O que vamos preparar hoje? Use nossa inteligência artificial para facilitar seu planejamento e focar no que importa: as crianças.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Novo Plano de Aula" 
          desc="Crie planos alinhados à BNCC em segundos."
          icon={Calendar} 
          color="bg-secondary"
          onClick={() => onViewChange(ViewState.LESSON_PLANS)} 
        />
        <DashboardCard 
          title="Relatórios" 
          desc="Gere avaliações descritivas individuais."
          icon={Users} 
          color="bg-primary"
          onClick={() => onViewChange(ViewState.REPORTS)} 
        />
        <DashboardCard 
          title="Contar Histórias" 
          desc="Acesse clássicos ou crie histórias inéditas."
          icon={BookOpen} 
          color="bg-accent"
          onClick={() => onViewChange(ViewState.LIBRARY)} 
        />
        <DashboardCard 
          title="Atividades" 
          desc="Banco de ideias para dinâmica em sala."
          icon={Star} 
          color="bg-purple-500"
          onClick={() => onViewChange(ViewState.ACTIVITIES)} 
        />
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; desc: string; icon: React.ElementType; color: string; onClick: () => void }> = ({ title, desc, icon: Icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group text-left h-full flex flex-col items-start"
  >
    <div className={`p-4 rounded-xl ${color} text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-gray-500">{desc}</p>
  </button>
);

export default App;
