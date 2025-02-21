import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, ArrowDown, ArrowUp, Heart, Settings as Lungs, Thermometer, Clock, User, Weight, Ruler } from 'lucide-react';
import type { Patient } from '../types/patient';

interface DashboardOverviewProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  onAcknowledge: (id: string) => void;
}

const getRiskLevelStyle = (level: Patient['riskLevel'], isAcknowledged: boolean) => {
  if (level === 'critical' && !isAcknowledged) {
    return 'bg-red-50 border-red-300 shadow-red-100 animate-pulse-slow';
  }
  
  switch (level) {
    case 'critical':
      return 'bg-red-50 border-red-200 shadow-red-50';
    case 'high':
      return 'bg-orange-50 border-orange-200 shadow-orange-50';
    case 'moderate':
      return 'bg-yellow-50 border-yellow-200 shadow-yellow-50';
    case 'low':
      return 'bg-green-50 border-green-200 shadow-green-50';
    default:
      return 'bg-medical-50 border-medical-200 shadow-medical-50';
  }
};

const getRiskLevelTextStyle = (level: Patient['riskLevel']) => {
  switch (level) {
    case 'critical':
      return 'text-red-700 bg-red-50';
    case 'high':
      return 'text-orange-700 bg-orange-50';
    case 'moderate':
      return 'text-yellow-700 bg-yellow-50';
    case 'low':
      return 'text-green-700 bg-green-50';
    default:
      return 'text-gray-900 bg-gray-50';
  }
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  patients,
  onSelectPatient,
  onAcknowledge,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sortedPatients = [...patients].sort((a, b) => {
    const riskOrder = { critical: 0, high: 1, moderate: 2, low: 3 };
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-medical-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ICU Patient Monitor</h1>
            <p className="text-gray-700 text-sm">Real-time patient monitoring dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold text-gray-900">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-sm text-gray-700">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedPatients.map((patient) => (
            <div
              key={patient.id}
              className={`rounded-xl border shadow-sm transition-all hover:shadow-md ${getRiskLevelStyle(
                patient.riskLevel,
                patient.isAcknowledged
              )}`}
            >
              <div className="grid grid-cols-12 gap-4 p-4">
                {/* Left section - Patient Info */}
                <div className="col-span-3 border-r border-medical-200 pr-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{patient.bedNumber}</span>
                      <span className="text-sm text-gray-700">| {patient.room}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRiskLevelTextStyle(patient.riskLevel)}`}>
                      {patient.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{patient.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{patient.age}y</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Weight className="w-3 h-3" />
                      <span>{patient.vitalSigns.weight}kg</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Ruler className="w-3 h-3" />
                      <span>{patient.vitalSigns.bsa}m²</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-700">
                    <p>{patient.doctorName}</p>
                  </div>
                </div>

                {/* Middle section - Vital Signs */}
                <div className="col-span-6 grid grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-medium text-gray-700">Heart Rate</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">{patient.vitalSigns.heartRate}</span>
                      <span className="text-xs ml-1 text-gray-600">bpm</span>
                      {patient.vitalSigns.heartRate > 100 ? (
                        <ArrowUp className="w-4 h-4 text-red-500 ml-1" />
                      ) : patient.vitalSigns.heartRate < 60 ? (
                        <ArrowDown className="w-4 h-4 text-blue-500 ml-1" />
                      ) : null}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lungs className="w-4 h-4 text-medical-700" />
                      <span className="text-xs font-medium text-gray-700">Resp Rate</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">{patient.vitalSigns.respiratoryRate}</span>
                      <span className="text-xs ml-1 text-gray-600">/min</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-medical-700" />
                      <span className="text-xs font-medium text-gray-700">BP</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">
                        {patient.vitalSigns.bloodPressure.systolic}/{patient.vitalSigns.bloodPressure.diastolic}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 shadow-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <Thermometer className="w-4 h-4 text-medical-700" />
                      <span className="text-xs font-medium text-gray-700">Temp</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">{patient.vitalSigns.temperature}</span>
                      <span className="text-xs ml-1 text-gray-600">°C</span>
                    </div>
                  </div>
                </div>

                {/* Right section - Risk Scores */}
                <div className="col-span-3 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-xs text-gray-700 mb-1">Risk Score</div>
                      <div className="text-xl font-bold text-red-600">{patient.riskScores.mortality}%</div>
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-sm">
                      <div className="text-xs text-gray-700 mb-1">LOS</div>
                      <div className="text-xl font-bold text-gray-900">{patient.lengthOfStay}d</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onSelectPatient(patient.id)}
                      className="flex-1 bg-medical-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-medical-800 transition-colors"
                    >
                      Details
                    </button>
                    {patient.riskLevel === 'critical' && !patient.isAcknowledged && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAcknowledge(patient.id);
                        }}
                        className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};