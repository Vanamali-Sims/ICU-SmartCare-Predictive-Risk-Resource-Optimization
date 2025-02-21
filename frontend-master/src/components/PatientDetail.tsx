import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  Bell, 
  Calculator, 
  Clock, 
  FileText, 
  Phone, 
  Video, 
  Clipboard, 
  Droplet, 
  Gauge, 
  Sun as Lung,
  AlertCircle,
  BellRing,
  Flag,
  Stethoscope,
  LightbulbIcon,
  CheckCircle
} from 'lucide-react';
import type { Patient } from '../types/patient';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PatientDetailProps {
  patient: Patient;
  riskHistory: { timestamp: string; value: number }[];
}

interface RiskFactor {
  metric: string;
  value: string;
  description: string;
  contribution: number;
}

interface TreatmentSimulator {
  vasopressor: number;
  fluidBolus: number;
  peep: number;
  fio2: number;
}

interface AlertLevel {
  level: number;
  riskThreshold: string;
  status: 'in-progress' | 'completed';
  actions: { icon: React.ReactNode; text: string }[];
  timestamp: string;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, riskHistory }) => {
  const [treatment, setTreatment] = useState<TreatmentSimulator>({
    vasopressor: 0.15,
    fluidBolus: 10,
    peep: 8,
    fio2: 60
  });

  const chartData = {
    labels: riskHistory.map(point => point.timestamp),
    datasets: [
      {
        label: 'Risk Score',
        data: riskHistory.map(point => point.value),
        borderColor: 'rgb(56, 189, 248)', // sky-400
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Risk Score Trend (48h)',
        color: '#1e293b', // slate-800
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
          color: '#1e293b', // slate-800
        },
        ticks: {
          maxTicksLimit: 6,
          color: '#1e293b', // slate-800
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with opacity
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Risk Score (%)',
          color: '#1e293b', // slate-800
        },
        ticks: {
          color: '#1e293b', // slate-800
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with opacity
        }
      },
    },
  };

  const riskFactors: RiskFactor[] = [
    {
      metric: "MAP <65mmHg (45m)",
      value: patient.vitalSigns.bloodPressure.systolic < 65 ? "Critical" : "Normal",
      description: "Sustained hypotension despite current interventions",
      contribution: 32
    },
    {
      metric: "Lactate Δ+1.7mmol/L",
      value: "Rising",
      description: "Rising lactate indicates worsening tissue perfusion",
      contribution: 28
    },
    {
      metric: "FiO2 ↑40% in 2h",
      value: "Increasing",
      description: "Increasing oxygen requirements suggest respiratory deterioration",
      contribution: 22
    }
  ];

  const alertLevels: AlertLevel[] = [
    {
      level: 3,
      riskThreshold: "≥50% Risk",
      status: 'in-progress',
      actions: [
        { icon: <Phone className="w-4 h-4" />, text: "Auto-Page Resident" },
        { icon: <Video className="w-4 h-4" />, text: "Attending Video Call" },
        { icon: <Clipboard className="w-4 h-4" />, text: "Protocol Checklist" }
      ],
      timestamp: "Initiated 5 minutes ago"
    },
    {
      level: 2,
      riskThreshold: "≥26% Risk",
      status: 'completed',
      actions: [
        { icon: <BellRing className="w-4 h-4" />, text: "Mobile Push Notification" },
        { icon: <FileText className="w-4 h-4" />, text: "AI SBAR to Charge Nurse" }
      ],
      timestamp: "Completed 15 minutes ago"
    },
    {
      level: 1,
      riskThreshold: "≥25% Risk",
      status: 'completed',
      actions: [
        { icon: <Flag className="w-4 h-4" />, text: "In-Dashboard Flag" },
        { icon: <Clipboard className="w-4 h-4" />, text: "Protocol Checklist" }
      ],
      timestamp: "Completed 30 minutes ago"
    }
  ];

  const handleSliderChange = (
    field: keyof TreatmentSimulator,
    value: number
  ) => {
    setTreatment(prev => ({ ...prev, [field]: value }));
  };

  const getAlertStatusStyle = (status: AlertLevel['status']) => {
    return status === 'in-progress' 
      ? 'bg-red-50 border-l-4 border-red-500' 
      : status === 'completed'
      ? 'bg-green-50 border-l-4 border-green-500'
      : 'bg-gray-50';
  };

  return (
    <div className="h-screen overflow-y-auto bg-medical-50">
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Risk Score Trend - High Priority */}
          <div className="bg-gradient-to-br from-medical-100 to-medical-200 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Risk Score Trend</h2>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-medical-600 mr-2" />
                <span className="text-lg font-semibold text-medical-600">48h History</span>
              </div>
            </div>
            <div className="h-64 bg-white rounded-lg p-4 shadow-inner">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Risk Analysis Section - Critical */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg p-6 border border-red-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Risk Analysis</h2>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                <span className="text-2xl font-bold text-red-600">
                  {patient.riskScores.mortality}% Risk
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {riskFactors.map((factor, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-red-500">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center">
                      <ArrowUpRight className="w-4 h-4 text-red-500 mr-2" />
                      <span className="font-medium text-gray-900">{factor.metric}</span>
                    </div>
                    <span className="text-gray-700">{factor.contribution}% contribution</span>
                  </div>
                  <p className="text-gray-600 text-sm">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Escalation Section - Warning */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border border-orange-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Alert Escalation</h2>
              <div className="flex items-center">
                <Bell className="w-5 h-5 text-orange-600 mr-2" />
                <span className="text-2xl font-bold text-orange-600">
                  Active Alerts
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {alertLevels.map((alert) => (
                <div 
                  key={alert.level}
                  className={`rounded-lg p-4 ${getAlertStatusStyle(alert.status)}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Level {alert.level}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{alert.riskThreshold}</span>
                    </div>
                    <div className="flex items-center">
                      {alert.status === 'in-progress' ? (
                        <>
                          <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-yellow-500">In-Progress</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-500">Completed</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    {alert.actions.map((action, index) => (
                      <div key={index} className="flex items-center">
                        {action.icon}
                        <span className="ml-2">{action.text}</span>
                      </div>
                    ))}
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Treatment Simulator Section - Action Required */}
          <div className="bg-gradient-to-br from-medical-100 to-medical-200 rounded-xl shadow-lg p-6 border border-medical-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Treatment Simulator</h2>
              <div className="flex items-center">
                <Calculator className="w-5 h-5 text-medical-700 mr-2" />
                <span className="text-2xl font-bold text-medical-700">
                  {patient.riskScores.mortality}% Projected Risk
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <Gauge className="w-4 h-4 mr-2" />
                  <span className="font-medium">Vasopressor Dose (mcg/kg/min)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={treatment.vasopressor}
                  onChange={(e) => handleSliderChange('vasopressor', parseFloat(e.target.value))}
                  className="w-full accent-medical-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{treatment.vasopressor}</span>
                  <span>1.0</span>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Droplet className="w-4 h-4 mr-2" />
                  <span className="font-medium">Fluid Bolus (mL/kg)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={treatment.fluidBolus}
                  onChange={(e) => handleSliderChange('fluidBolus', parseFloat(e.target.value))}
                  className="w-full accent-medical-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{treatment.fluidBolus}</span>
                  <span>30</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Gauge className="w-4 h-4 mr-2" />
                    <span className="font-medium">PEEP (cmH2O)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={treatment.peep}
                    onChange={(e) => handleSliderChange('peep', parseFloat(e.target.value))}
                    className="w-full accent-medical-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>5</span>
                    <span>{treatment.peep}</span>
                    <span>20</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <Lung className="w-4 h-4 mr-2" />
                    <span className="font-medium">FiO2 (%)</span>
                  </div>
                  <input
                    type="range"
                    min="21"
                    max="100"
                    step="1"
                    value={treatment.fio2}
                    onChange={(e) => handleSliderChange('fio2', parseFloat(e.target.value))}
                    className="w-full accent-medical-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>21</span>
                    <span>{treatment.fio2}</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SBAR Report Section - Information */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-center mb-6">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">SBAR Report</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center text-blue-700 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <h3 className="font-semibold">Situation</h3>
                </div>
                <p className="text-gray-700">
                  {patient.age}yo {patient.name.split(' ')[0]} with septic shock
                </p>
              </div>

              <div>
                <div className="flex items-center text-blue-700 mb-2">
                  <Clipboard className="w-4 h-4 mr-2" />
                  <h3 className="font-semibold">Background</h3>
                </div>
                <p className="text-gray-700">
                  CRRT Day 3, P/F ratio 189
                </p>
              </div>

              <div>
                <div className="flex items-center text-blue-700 mb-2">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  <h3 className="font-semibold">Assessment</h3>
                </div>
                <p className="text-gray-700">
                  44% mortality risk - rising lactate
                </p>
              </div>

              <div>
                <div className="flex items-center text-blue-700 mb-2">
                  <LightbulbIcon className="w-4 h-4 mr-2" />
                  <h3 className="font-semibold">Recommendation</h3>
                </div>
                <p className="text-gray-700">
                  Consider CVVHDF + broaden abx
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PatientDetail };