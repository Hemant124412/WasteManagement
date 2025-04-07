export interface WasteBin {
  id: string;
  location: string;
  type: 'general' | 'recyclable' | 'compost';
  currentLevel: number;
  capacity: number;
  lastEmptied: Date;
  sensorId?: string;
  maintenanceHistory?: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  timestamp: Date;
  action: 'emptied' | 'cleaned' | 'repaired';
  notes?: string;
}

export interface RecyclingPoint {
  points: number;
  actions: string[];
  timestamp: Date;
  binId?: string;
  verifiedBy?: string;
}

export interface Attendee {
  id: string;
  name: string;
  points: number;
  recyclingHistory: RecyclingPoint[];
  badges?: string[];
  level?: number;
  totalWasteSaved?: number;
}

export interface DisposalGuideline {
  wasteType: string;
  instructions: string;
  binType: 'general' | 'recyclable' | 'compost';
  imageUrl: string;
  additionalInfo: string[];
  environmentalImpact: string;
  qrCode?: string;
}

export interface RecyclingAgency {
  id: string;
  name: string;
  contact: string;
  specialization: string[];
  availability: string;
  rating?: number;
  lastPickup?: Date;
  nextScheduledPickup?: Date;
}