import React, { useState } from 'react';
import { Trophy, Star, Award, Gift, TrendingUp, Medal } from 'lucide-react';
import type { Attendee } from '../types';

const mockAttendee: Attendee = {
  id: '1',
  name: 'Hemant Singh',
  points: 150,
  badges: ['Early Adopter', 'Recycling Pro', 'Compost Master'],
  level: 2,
  totalWasteSaved: 45.5,
  recyclingHistory: [
    {
      points: 50,
      actions: ['Recycled 10 bottles'],
      timestamp: new Date('2024-03-10T10:00:00'),
      binId: 'bin-1',
      verifiedBy: 'sensor-1'
    },
    {
      points: 100,
      actions: ['Composted food waste', 'Used reusable container'],
      timestamp: new Date('2024-03-11T15:30:00'),
      binId: 'bin-2',
      verifiedBy: 'staff-1'
    }
  ]
};

const LEVELS = [
  { name: 'Beginner', threshold: 0, color: 'gray' },
  { name: 'Recycler', threshold: 100, color: 'green' },
  { name: 'Eco Warrior', threshold: 250, color: 'blue' },
  { name: 'Sustainability Champion', threshold: 500, color: 'purple' },
  { name: 'Earth Guardian', threshold: 1000, color: 'yellow' }
];

const RewardSystem: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'rewards' | 'history' | 'achievements'>('rewards');

  const currentLevel = LEVELS.reduce((acc, level) => {
    if (mockAttendee.points >= level.threshold) {
      return level;
    }
    return acc;
  }, LEVELS[0]);

  const nextLevel = LEVELS.find(level => level.threshold > mockAttendee.points) || LEVELS[LEVELS.length - 1];
  const progressToNextLevel = nextLevel.threshold === currentLevel.threshold
    ? 100
    : ((mockAttendee.points - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full bg-${currentLevel.color}-100 flex items-center justify-center`}>
              <Trophy className={`w-8 h-8 text-${currentLevel.color}-500`} />
            </div>
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {mockAttendee.level}
            </div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{mockAttendee.name}</h2>
            <p className="text-gray-600">{currentLevel.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Points</p>
            <p className="text-2xl font-bold text-green-500">{mockAttendee.points}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Waste Saved</p>
            <p className="text-2xl font-bold text-blue-500">{mockAttendee.totalWasteSaved}kg</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentLevel.name}</span>
          <span>{nextLevel.name}</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${currentLevel.color}-500 transition-all duration-500`}
            style={{ width: `${progressToNextLevel}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{mockAttendee.points} points</span>
          <span>{nextLevel.threshold} points needed</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        {(['rewards', 'history', 'achievements'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 capitalize ${
              selectedTab === tab
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {selectedTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { points: 100, reward: 'Free Eco-friendly Water Bottle', icon: Gift },
            { points: 200, reward: 'Sustainable Event T-shirt', icon: Gift },
            { points: 500, reward: 'VIP Access to Next Event', icon: Award },
            { points: 1000, reward: 'Zero-waste Workshop Session', icon: Medal }
          ].map((reward) => (
            <div key={reward.reward} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <reward.icon className="w-8 h-8 text-green-500 mr-3" />
              <div className="flex-1">
                <p className="font-medium">{reward.reward}</p>
                <p className="text-sm text-gray-600">{reward.points} points</p>
              </div>
              <button
                disabled={mockAttendee.points < reward.points}
                className={`px-4 py-2 rounded-lg ${
                  mockAttendee.points >= reward.points
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'history' && (
        <div className="space-y-4">
          {mockAttendee.recyclingHistory.map((history, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  {history.actions.map((action, i) => (
                    <p key={i} className="text-gray-700">{action}</p>
                  ))}
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-4">{new Date(history.timestamp).toLocaleDateString()}</span>
                    {history.binId && <span className="mr-4">Bin: {history.binId}</span>}
                    {history.verifiedBy && <span>Verified by: {history.verifiedBy}</span>}
                  </div>
                </div>
                <span className="text-green-600 font-semibold">+{history.points}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'achievements' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {mockAttendee.badges?.map((badge) => (
              <div key={badge} className="bg-gray-50 p-4 rounded-lg text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium">{badge}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">Statistics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Actions</p>
                <p className="text-xl font-bold text-blue-500">
                  {mockAttendee.recyclingHistory.reduce((acc, h) => acc + h.actions.length, 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-xl font-bold text-green-500">{mockAttendee.points}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-xl font-bold text-purple-500">{mockAttendee.level}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Waste Saved</p>
                <p className="text-xl font-bold text-yellow-500">{mockAttendee.totalWasteSaved}kg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardSystem;