import React, { useState } from 'react';
import { Recycle } from 'lucide-react';
import WasteBinStatus from './components/WasteBinStatus';
import RecyclingGuide from './components/RecyclingGuide';
import RewardSystem from './components/RewardSystem';
import type { WasteBin } from './types';

const mockBins: WasteBin[] = [
  {
    id: '1',
    location: 'Main Entrance',
    type: 'recyclable',
    currentLevel: 30,
    capacity: 100,
    lastEmptied: new Date('2024-03-10T08:00:00')
  },
  {
    id: '2',
    location: 'Food Court',
    type: 'compost',
    currentLevel: 75,
    capacity: 100,
    lastEmptied: new Date('2024-03-10T08:00:00')
  },
  {
    id: '3',
    location: 'Exhibition Hall',
    type: 'general',
    currentLevel: 60,
    capacity: 100,
    lastEmptied: new Date('2024-03-10T08:00:00')
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'bins' | 'guide' | 'rewards'>('bins');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Recycle className="w-8 h-8 mr-2" />
              <h1 className="text-2xl font-bold">Eco-Event Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex space-x-4">
            {[
              { id: 'bins', label: 'Smart Bins' },
              { id: 'guide', label: 'Recycling Guide' },
              { id: 'rewards', label: 'Rewards' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'bins' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBins.map((bin) => (
                <WasteBinStatus key={bin.id} bin={bin} />
              ))}
            </div>
          )}
          
          {activeTab === 'guide' && <RecyclingGuide />}
          
          {activeTab === 'rewards' && <RewardSystem />}
        </div>
      </main>
    </div>
  );
}

export default App;