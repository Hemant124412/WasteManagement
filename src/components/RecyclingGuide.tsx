import React, { useState } from 'react';
import { Search, Info, X, AlertTriangle, Leaf, Droplet } from 'lucide-react';
import type { DisposalGuideline } from '../types';

const guidelines: DisposalGuideline[] = [
  {
    wasteType: 'Plastic Bottles',
    instructions: 'Empty and rinse before disposing. Remove caps and labels.',
    binType: 'recyclable',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'Crush bottles to save space',
      'Remove all liquid contents',
      'Check bottom for recycling number',
      'Clean and dry before disposal',
      'Separate caps and labels',
      'No oil-contaminated bottles'
    ],
    environmentalImpact: 'Takes 450 years to decompose in nature. Recycling one plastic bottle saves enough energy to power a 60-watt light bulb for 6 hours.'
  },
  {
    wasteType: 'Food Waste',
    instructions: 'All food scraps go in the compost bin. No packaging.',
    binType: 'compost',
    imageUrl: 'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'No meat or dairy products',
      'Break down large pieces',
      'Mix with brown materials',
      'Keep moisture balanced',
      'Include fruit and vegetable scraps',
      'Coffee grounds and tea bags accepted',
      'Eggshells are welcome'
    ],
    environmentalImpact: 'Produces methane in landfills. Composting reduces greenhouse gas emissions and creates nutrient-rich soil.'
  },
  {
    wasteType: 'Paper Products',
    instructions: 'Flatten cardboard boxes. Keep paper clean and dry.',
    binType: 'recyclable',
    imageUrl: 'https://images.unsplash.com/photo-1589634749000-1e72ec00a13f?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'Remove tape and staples',
      'No food-contaminated paper',
      'Bundle newspapers together',
      'Shred sensitive documents',
      'Remove plastic windows from envelopes',
      'Break down boxes completely'
    ],
    environmentalImpact: 'Saves 17 trees per ton recycled. Reduces water pollution by 35% and air pollution by 74%.'
  },
  {
    wasteType: 'Glass Containers',
    instructions: 'Rinse thoroughly. Remove lids and caps.',
    binType: 'recyclable',
    imageUrl: 'https://images.unsplash.com/photo-1550438496-40dd3b1a66a5?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'Sort by color if required',
      'Remove metal and plastic lids',
      'No broken glass',
      'No window glass or mirrors',
      'No ceramics or pottery',
      'Labels can stay on'
    ],
    environmentalImpact: 'Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity.'
  },
  {
    wasteType: 'Electronics',
    instructions: 'Remove batteries. Handle with care.',
    binType: 'general',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'Remove personal data',
      'Separate batteries',
      'Keep cords untangled',
      'Handle screens carefully',
      'Check for special disposal requirements',
      'Consider donating working items'
    ],
    environmentalImpact: 'E-waste contains toxic materials. Proper recycling prevents soil and water contamination.'
  },
  {
    wasteType: 'Garden Waste',
    instructions: 'Cut large branches. Remove non-organic materials.',
    binType: 'compost',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
    additionalInfo: [
      'Chop branches into small pieces',
      'Mix green and brown materials',
      'Remove any plastic ties',
      'No treated wood',
      'Include grass clippings',
      'Leaves are excellent for composting'
    ],
    environmentalImpact: 'Composting garden waste reduces methane emissions and creates valuable fertilizer.'
  }
];

const RecyclingGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<DisposalGuideline | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'recyclable' | 'compost'>('all');

  const filteredGuidelines = guidelines.filter(guide => {
    const matchesSearch = guide.wasteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.instructions.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || guide.binType === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search waste types or instructions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'recyclable', 'compost'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeFilter === filter
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuidelines.map((guideline) => (
          <div
            key={guideline.wasteType}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedGuide(guideline)}
          >
            <div className="relative h-48">
              <img
                src={guideline.imageUrl}
                alt={guideline.wasteType}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Info className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{guideline.wasteType}</h3>
              <p className="text-gray-600 mb-2">{guideline.instructions}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                guideline.binType === 'recyclable' ? 'bg-green-100 text-green-800' :
                guideline.binType === 'compost' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {guideline.binType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedGuide.imageUrl}
                alt={selectedGuide.wasteType}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedGuide.wasteType}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  selectedGuide.binType === 'recyclable' ? 'bg-green-100 text-green-800' :
                  selectedGuide.binType === 'compost' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedGuide.binType}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Instructions</h3>
                <p className="text-gray-600">{selectedGuide.instructions}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Tips</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedGuide.additionalInfo.map((info, index) => (
                    <li key={index} className="text-gray-600">{info}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                <p className="text-gray-600">{selectedGuide.environmentalImpact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecyclingGuide;