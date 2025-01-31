import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function ReportView() {
  const navigate = useNavigate();
  const [reportData] = useState({
    overview: {
      workable: { count: 123, percentage: 30 },
      needOneSplit: { count: 234, percentage: 50 },
      needTwoSplits: { count: 100, percentage: 20 }
    },
    simulationConditions: {
      weather: 'Optimal',
      batterySize: '525 kWh, 686kWh',
      batteryUsage: 'start 85% - end 20%'
    },
    details: [
      { blockId: '8b09fac2-B8', base: 'Bellevue', busLength: '40 ft', status: 'Work', batteryCapacity: '525', energyNeeded: '425.98' },
      { blockId: '8b09fac2-B8', base: 'Bellevue', busLength: '35 ft', status: '1 split', batteryCapacity: '525', energyNeeded: '645.97' },
      { blockId: '8b09fac2-B8', base: 'Bellevue', busLength: '60 ft', status: '2+split', batteryCapacity: '525', energyNeeded: '12090.12' },
      // ... 更多数据
    ]
  });

  const [activeView, setActiveView] = useState('block');

  const handleFurtherSimulation = () => {
    navigate('/simulation');
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Fleet and Service Data</h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">
                Download
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-slate-50">
                Share report
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleFurtherSimulation}
              >
                Further Simulation
              </button>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Analysis Report</h2>

          {/* Overview Section */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Overview</h3>
                <div className="flex mb-4">
                  <div className="bg-teal-100 px-4 py-2 flex-1 text-center">
                    {reportData.overview.workable.count} blocks, {reportData.overview.workable.percentage}%
                  </div>
                  <div className="bg-pink-100 px-4 py-2 flex-1 text-center">
                    {reportData.overview.needOneSplit.count} blocks, {reportData.overview.needOneSplit.percentage}%
                  </div>
                  <div className="bg-red-100 px-4 py-2 flex-1 text-center">
                    {reportData.overview.needTwoSplits.count} blocks, {reportData.overview.needTwoSplits.percentage}%
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal-100"></div>
                    <span>Workable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-100"></div>
                    <span>Need 1 split</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100"></div>
                    <span>Need 2 or more splits</span>
                  </div>
                </div>
              </div>

              {/* Simulation Conditions - 移到这里 */}
              <div className="ml-8 bg-white p-4 rounded-lg border w-64">
                <h4 className="font-medium mb-2">Simulation conditions</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Weather:</span>
                    <span className="ml-2">{reportData.simulationConditions.weather}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Battery size:</span>
                    <span className="ml-2">{reportData.simulationConditions.batterySize}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Battery usage:</span>
                    <span className="ml-2">{reportData.simulationConditions.batteryUsage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Details</h3>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded ${activeView === 'block' ? 'bg-slate-800 text-white' : 'bg-white border'}`}
                  onClick={() => setActiveView('block')}
                >
                  View by block ID
                </button>
                <button
                  className={`px-4 py-2 rounded ${activeView === 'base' ? 'bg-slate-800 text-white' : 'bg-white border'}`}
                  onClick={() => setActiveView('base')}
                >
                  View by base
                </button>
                <button
                  className={`px-4 py-2 rounded ${activeView === 'type' ? 'bg-slate-800 text-white' : 'bg-white border'}`}
                  onClick={() => setActiveView('type')}
                >
                  View by bus type
                </button>
              </div>
            </div>

            {/* Details Table */}
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Block ID
                      <span className="ml-1">↓</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base
                      <span className="ml-1">↓</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bus length
                      <span className="ml-1">↓</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                      <span className="ml-1">↓</span>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Battery capacity(kWh)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Energy needed(kWh)
                      <span className="ml-1">↓</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.details.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.blockId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.base}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.busLength}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'Work' ? 'bg-teal-100 text-teal-800' :
                          item.status === '1 split' ? 'bg-pink-100 text-pink-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.batteryCapacity}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.energyNeeded}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 text-sm text-gray-600">
              15 items/page 1 2 4 5...160 page | next page | previous page
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 