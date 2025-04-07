import React, { useState } from 'react';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  contact: string;
  specialization: string[];
  availability: string;
}

const agencies: Agency[] = [
  {
    id: '1',
    name: 'GreenCycle Solutions',
    contact: 'contact@greencycle.com',
    specialization: ['Plastic', 'Paper', 'Electronics'],
    availability: '24/7'
  },
  {
    id: '2',
    name: 'EcoWaste Management',
    contact: 'support@ecowaste.com',
    specialization: ['Organic Waste', 'Composting'],
    availability: 'Mon-Sat, 8AM-6PM'
  }
];

const RecyclingAgencyMessaging: React.FC = () => {
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!selectedAgency || !message.trim()) return;
    
    // Simulate sending message
    const notification = `Message sent to ${selectedAgency.name}: ${message}`;
    setNotifications([notification, ...notifications]);
    setMessage('');
  };

  const handleEmergencyAlert = (agency: Agency) => {
    const alert = `Emergency pickup requested from ${agency.name}`;
    setNotifications([alert, ...notifications]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="w-6 h-6 mr-2" />
        Recycling Agency Communication
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Agencies</h3>
          <div className="space-y-4">
            {agencies.map((agency) => (
              <div
                key={agency.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedAgency?.id === agency.id
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedAgency(agency)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{agency.name}</h4>
                    <p className="text-sm text-gray-600">{agency.contact}</p>
                    <p className="text-sm text-gray-600">Available: {agency.availability}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {agency.specialization.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmergencyAlert(agency);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    title="Request Emergency Pickup"
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Message Center</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={!selectedAgency}
              />
              <button
                onClick={handleSendMessage}
                disabled={!selectedAgency || !message.trim()}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:bg-gray-300"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recent Notifications</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notifications.map((notif, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                    {notif}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclingAgencyMessaging; 