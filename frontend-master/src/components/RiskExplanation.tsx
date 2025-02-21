import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface RiskFactor {
  description: string;
  contribution: number;
  trend: 'up' | 'down' | 'stable';
}

interface RiskExplanationProps {
  riskScore: number;
  factors: RiskFactor[];
  suggestions: string[];
}

export const RiskExplanation: React.FC<RiskExplanationProps> = ({
  riskScore,
  factors,
  suggestions,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
          Risk Analysis ({riskScore}% Mortality Risk)
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Contributing Factors
          </h3>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center">
                  {factor.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-red-500 mr-2" />
                  )}
                  {factor.trend === 'down' && (
                    <TrendingDown className="w-4 h-4 text-green-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-700">
                    {factor.description}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {factor.contribution}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            AI Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-blue-50 p-2 rounded text-sm text-blue-700"
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};