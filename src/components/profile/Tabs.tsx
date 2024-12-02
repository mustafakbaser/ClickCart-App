import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <nav className="space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
              activeTab === tab.id
                ? 'bg-brand-primary text-white'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}