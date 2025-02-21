import React from 'react';
import { Activity, Sun as Lung, Brain, LucideKey as Kidney } from 'lucide-react';
import type { Patient } from '../types/patient';

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string;
  onSelectPatient: (id: string) => void;
}

const getRiskColor = (score: number): string => {
  if (score <= 15) return 'bg-green-100 text-green-800';
  if (score <= 39) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
}) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Patients</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              selectedPatientId === patient.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {patient.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Room {patient.room} • {patient.age}y
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(
                  patient.riskScores.mortality
                )}`}
              >
                {patient.riskScores.mortality}% Risk
              </span>
            </div>
            <div className="mt-2 flex space-x-4">
              <div className="flex items-center text-sm">
                <Activity className="w-4 h-4 mr-1 text-red-500" />
                <span>{patient.riskScores.sepsis}%</span>
              </div>
              <div className="flex items-center text-sm">
                <Lung className="w-4 h-4 mr-1 text-blue-500" />
                <span>{patient.riskScores.ventilationWeaning}%</span>
              </div>
              <div className="flex items-center text-sm">
                <Brain className="w-4 h-4 mr-1 text-purple-500" />
                <span>{patient.riskScores.deliriumRisk}%</span>
              </div>
              <div className="flex items-center text-sm">
                <Kidney className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{patient.riskScores.renalReplacement}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};