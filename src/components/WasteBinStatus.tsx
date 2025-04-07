import React, { useState, useEffect } from 'react';
import { Trash2, Recycle, Leaf, Bell, TrendingUp, AlertTriangle, History, Wrench, MapPin, BarChart2 } from 'lucide-react';
import type { WasteBin, MaintenanceRecord } from '../types';

interface WasteBinStatusProps {
  bin: WasteBin;
}

const mockMaintenanceHistory: MaintenanceRecord[] = [
  {
    timestamp: new Date('2024-03-15T10:00:00'),
    action: 'emptied',
    notes: 'Regular collection'
  },
  {
    timestamp: new Date('2024-03-14T15:30:00'),
    action: 'cleaned',
    notes: 'Deep cleaning performed'
  },
  {
    timestamp: new Date('2024-03-13T09:00:00'),
    action: 'repaired',
    notes: 'Sensor calibration'
  }
];

const WasteBinStatus: React.FC<WasteBinStatusProps> = ({ bin }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [predictedFillTime, setPredictedFillTime] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'status' | 'maintenance' | 'analytics'>('status');

  const fillPercentage = (bin.currentLevel / bin.capacity) * 100;
  
  useEffect(() => {
    // Show notification when bin is near capacity
    if (fillPercentage > 80 && !showNotification) {
      setShowNotification(true);
      // Auto-hide notification after 5 seconds
      setTimeout(() => setShowNotification(false), 5000);
    }

    // Calculate predicted fill time based on historical data
    const hoursUntilFull = calculatePredictedFillTime(bin);
    if (hoursUntilFull) {
      setPredictedFillTime(`${Math.ceil(hoursUntilFull)} hours until full`);
    }
  }, [bin, fillPercentage]);

  const calculatePredictedFillTime = (bin: WasteBin): number | null => {
    const hoursSinceLastEmpty = (new Date().getTime() - bin.lastEmptied.getTime()) / (1000 * 60 * 60);
    const fillRate = bin.currentLevel / hoursSinceLastEmpty;
    
    if (fillRate <= 0) return null;
    
    const remainingCapacity = bin.capacity - bin.currentLevel;
    return remainingCapacity / fillRate;
  };

  const getIcon = () => {
    switch (bin.type) {
      case 'recyclable':
        return <Recycle className="w-6 h-6 text-green-600" />;
      case 'compost':
        return <Leaf className="w-6 h-6 text-brown-600" />;
      default:
        return <Trash2 className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    if (fillPercentage > 80) return 'red';
    if (fillPercentage > 50) return 'yellow';
    return 'green';
  };

  const getMaintenanceStatus = () => {
    const lastMaintenance = mockMaintenanceHistory[0];
    const daysSinceLastMaintenance = Math.floor(
      (new Date().getTime() - lastMaintenance.timestamp.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      days: daysSinceLastMaintenance,
      needsMaintenance: daysSinceLastMaintenance > 7
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      {showNotification && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg">
          <Bell className="w-4 h-4 mr-2" />
          Bin nearly full!
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getIcon()}
          <span className="text-lg font-semibold capitalize ml-2">{bin.type} Bin</span>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <BarChart2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {!showDetails ? (
        <div className="space-y-4">
          <div className="relative h-4 bg-gray-200 rounded-full mb-2">
            <div
              className={`absolute left-0 h-full rounded-full transition-all duration-500 bg-${getStatusColor()}-500`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Location:</span>
              </div>
              <p className="font-medium mt-1">{bin.location}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Fill Level:</span>
              </div>
              <p className={`font-medium mt-1 text-${getStatusColor()}-600`}>
                {fillPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex border-b">
            {(['status', 'maintenance', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 capitalize ${
                  selectedTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {selectedTab === 'status' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sensor ID:</span>
                <span className="font-medium">{bin.sensorId || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Emptied:</span>
                <span className="font-medium">{bin.lastEmptied.toLocaleDateString()}</span>
              </div>
              {predictedFillTime && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Prediction:
                  </span>
                  <span className="font-medium text-blue-600">{predictedFillTime}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacity:</span>
                <span className="font-medium">{bin.capacity} liters</span>
              </div>
            </div>
          )}

          {selectedTab === 'maintenance' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Maintenance Status:</span>
                <span className={`text-sm font-medium ${
                  getMaintenanceStatus().needsMaintenance ? 'text-red-600' : 'text-green-600'
                }`}>
                  {getMaintenanceStatus().needsMaintenance ? 'Needs Attention' : 'Good'}
                </span>
              </div>
              <div className="space-y-2">
                {mockMaintenanceHistory.map((record, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {record.action === 'emptied' ? (
                          <Trash2 className="w-4 h-4 text-blue-500 mr-2" />
                        ) : record.action === 'cleaned' ? (
                          <Wrench className="w-4 h-4 text-green-500 mr-2" />
                        ) : (
                          <History className="w-4 h-4 text-yellow-500 mr-2" />
                        )}
                        <span className="capitalize">{record.action}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {record.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    {record.notes && (
                      <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Daily Fill Rate</h4>
                <div className="h-20 flex items-end space-x-1">
                  {[0.3, 0.5, 0.8, 0.6, 0.4, 0.7, 0.9].map((rate, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-blue-500 rounded-t"
                      style={{ height: `${rate * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Average Fill Time</p>
                  <p className="text-lg font-medium">32 hours</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Collection Efficiency</p>
                  <p className="text-lg font-medium text-green-600">94%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WasteBinStatus;