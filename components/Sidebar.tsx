import React from 'react';
import { ViewState } from '../types';
import { 
  BookOpen, 
  ClipboardList, 
  Scissors, 
  FileText, 
  Heart, 
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, toggleSidebar }) => {
  
  const menuItems = [
    { view: ViewState.DASHBOARD, label: 'Início', icon: LayoutDashboard },
    { view: ViewState.LIBRARY, label: 'Biblioteca', icon: BookOpen },
    { view: ViewState.LESSON_PLANS, label: 'Planos de Aula', icon: ClipboardList },
    { view: ViewState.ACTIVITIES, label: 'Atividades', icon:  ClipboardList }, 
    { view: ViewState.MOLDS, label: 'Moldes & Mural', icon: Scissors },
    { view: ViewState.REPORTS, label: 'Relatórios', icon: FileText },
    { view: ViewState.INCLUSIVE, label: 'Educação Inclusiva', icon: Heart },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:relative md:translate-x-0
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Toggle Button (Fixed) */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-primary text-white rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={sidebarClasses}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-center bg-primary/10">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span>🧸</span> EducaKids
          </h1>
        </div>
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  onViewChange(item.view);
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};
