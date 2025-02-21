import React, { useState, useEffect } from 'react';
import { DashboardOverview } from './components/DashboardOverview';
import { PatientDetail } from './components/PatientDetail';
import type { Patient } from './types/patient';

// Mock data with realistic medical scenarios
const initialPatients: Patient[] = [
  {
    id: 'ICU-2024-001',
    name: 'John Doe',
    age: 65,
    room: 'ICU-A',
    bedNumber: 'A-101',
    admissionDate: '2024-02-20',
    diagnosis: 'Septic Shock',
    doctorName: 'Dr. Sarah Chen',
    lengthOfStay: 5,
    riskLevel: 'critical',
    isAcknowledged: false,
    vitalSigns: {
      heartRate: 110,
      respiratoryRate: 22,
      bloodPressure: { systolic: 95, diastolic: 60 },
      spO2: 92,
      temperature: 38.5,
      weight: 82.5,
      bsa: 1.98
    },
    riskScores: {
      sepsis: 75,
      ventilationWeaning: 45,
      deliriumRisk: 30,
      renalReplacement: 60,
      mortality: 68,
      apache: 85,
      sofa: 12,
    },
    riskBreakdown: { static: 35, dynamic: 45, established: 20 },
    interventions: [],
    tasks: []
  },
  {
    id: 'ICU-2024-002',
    name: 'Maria Garcia',
    age: 54,
    room: 'ICU-A',
    bedNumber: 'A-102',
    admissionDate: '2024-02-22',
    diagnosis: 'Acute Respiratory Failure',
    doctorName: 'Dr. James Wilson',
    lengthOfStay: 3,
    riskLevel: 'high',
    isAcknowledged: true,
    vitalSigns: {
      heartRate: 95,
      respiratoryRate: 26,
      bloodPressure: { systolic: 135, diastolic: 85 },
      spO2: 89,
      temperature: 37.8,
      weight: 65.0,
      bsa: 1.72
    },
    riskScores: {
      sepsis: 45,
      ventilationWeaning: 65,
      deliriumRisk: 25,
      renalReplacement: 30,
      mortality: 42,
      apache: 65,
      sofa: 8,
    },
    riskBreakdown: { static: 25, dynamic: 35, established: 40 },
    interventions: [],
    tasks: []
  },
  {
    id: 'ICU-2024-003',
    name: 'Robert Smith',
    age: 72,
    room: 'ICU-B',
    bedNumber: 'B-101',
    admissionDate: '2024-02-21',
    diagnosis: 'Post-CABG Recovery',
    doctorName: 'Dr. Michael Chang',
    lengthOfStay: 4,
    riskLevel: 'moderate',
    isAcknowledged: true,
    vitalSigns: {
      heartRate: 88,
      respiratoryRate: 18,
      bloodPressure: { systolic: 128, diastolic: 75 },
      spO2: 95,
      temperature: 36.9,
      weight: 78.2,
      bsa: 1.89
    },
    riskScores: {
      sepsis: 25,
      ventilationWeaning: 35,
      deliriumRisk: 40,
      renalReplacement: 20,
      mortality: 35,
      apache: 45,
      sofa: 6,
    },
    riskBreakdown: { static: 30, dynamic: 30, established: 40 },
    interventions: [],
    tasks: []
  },
  {
    id: 'ICU-2024-004',
    name: 'Emily Johnson',
    age: 28,
    room: 'ICU-B',
    bedNumber: 'B-102',
    admissionDate: '2024-02-23',
    diagnosis: 'Diabetic Ketoacidosis',
    doctorName: 'Dr. Lisa Brown',
    lengthOfStay: 2,
    riskLevel: 'low',
    isAcknowledged: true,
    vitalSigns: {
      heartRate: 98,
      respiratoryRate: 20,
      bloodPressure: { systolic: 118, diastolic: 72 },
      spO2: 97,
      temperature: 37.2,
      weight: 58.5,
      bsa: 1.62
    },
    riskScores: {
      sepsis: 15,
      ventilationWeaning: 10,
      deliriumRisk: 20,
      renalReplacement: 15,
      mortality: 12,
      apache: 25,
      sofa: 3,
    },
    riskBreakdown: { static: 20, dynamic: 20, established: 60 },
    interventions: [],
    tasks: []
  }
];

// Function to generate random vital sign fluctuations
const getRandomFluctuation = (baseValue: number, range: number): number => {
  return +(baseValue + (Math.random() - 0.5) * range).toFixed(1);
};

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  // Update vital signs every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prevPatients =>
        prevPatients.map(patient => ({
          ...patient,
          vitalSigns: {
            ...patient.vitalSigns,
            heartRate: getRandomFluctuation(patient.vitalSigns.heartRate, 5),
            respiratoryRate: getRandomFluctuation(patient.vitalSigns.respiratoryRate, 2),
            bloodPressure: {
              systolic: getRandomFluctuation(patient.vitalSigns.bloodPressure.systolic, 4),
              diastolic: getRandomFluctuation(patient.vitalSigns.bloodPressure.diastolic, 3)
            },
            spO2: getRandomFluctuation(patient.vitalSigns.spO2, 1),
            temperature: getRandomFluctuation(patient.vitalSigns.temperature, 0.2)
          }
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (patientId: string) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === patientId
          ? { ...patient, isAcknowledged: true }
          : patient
      )
    );
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-medical-100">
      {selectedPatient ? (
        <div className="h-screen flex flex-col">
          <div className="bg-white border-b border-medical-200 px-4 py-3 flex justify-between items-center shadow-sm">
            <button
              onClick={() => setSelectedPatientId(null)}
              className="text-medical-600 hover:text-medical-800 font-medium flex items-center"
            >
              ← Back to Overview
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <PatientDetail
              patient={selectedPatient}
              riskHistory={generateRiskHistory(selectedPatient.riskScores.mortality)}
            />
          </div>
        </div>
      ) : (
        <DashboardOverview
          patients={patients}
          onSelectPatient={setSelectedPatientId}
          onAcknowledge={handleAcknowledge}
        />
      )}
    </div>
  );
}

// Generate 48 hours of risk history data
const generateRiskHistory = (currentRisk: number) => {
  return Array.from({ length: 48 }, (_, i) => ({
    timestamp: new Date(Date.now() - (47 - i) * 3600000).toLocaleTimeString(),
    value: Math.max(0, Math.min(100, currentRisk + (Math.random() - 0.5) * 10)),
  }));
};

export default App;