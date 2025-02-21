export interface VitalSigns {
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  spO2: number;
  temperature: number;
  weight: number;
  bsa: number; // Body Surface Area
}

export interface RiskScores {
  sepsis: number;
  ventilationWeaning: number;
  deliriumRisk: number;
  renalReplacement: number;
  mortality: number;
  apache: number;
  sofa: number;
}

export interface RiskBreakdown {
  static: number;
  dynamic: number;
  established: number;
}

export interface Intervention {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  impact: {
    before: number;
    after: number;
  };
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  bedNumber: string;
  admissionDate: string;
  diagnosis: string;
  doctorName: string;
  lengthOfStay: number; // in days
  vitalSigns: VitalSigns;
  riskScores: RiskScores;
  riskBreakdown: RiskBreakdown;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  interventions: Intervention[];
  tasks: Task[];
  isAcknowledged: boolean;
}

export interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  completed: boolean;
  type: 'medication' | 'assessment' | 'procedure' | 'other';
}