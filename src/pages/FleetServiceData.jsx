import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function FleetServiceData() {
  const [files, setFiles] = useState({
    operational: null,
    base: null
  });
  const [fileData, setFileData] = useState({
    operational: null,
    base: null
  });
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState({
    employeeName: 'Jane Doe',
    date: '2024-12-10',
    time: '11:11:00',
    baseInfo: [
      { baseName: 'South', busType: '60-foot', currentFleetNumber: 14, futureCapacity: 14 },
      { baseName: 'South', busType: '40-foot', currentFleetNumber: 12, futureCapacity: 12 },
      { baseName: 'North', busType: '60-foot', currentFleetNumber: 14, futureCapacity: 14 },
      { baseName: 'North', busType: '40-foot', currentFleetNumber: 23, futureCapacity: 23 },
      { baseName: 'Bellevue', busType: '60-foot', currentFleetNumber: 11, futureCapacity: 23 },
      { baseName: 'Bellevue', busType: '40-foot', currentFleetNumber: 26, futureCapacity: 33 },
      { baseName: 'East', busType: '60-foot', currentFleetNumber: 11, futureCapacity: 23 },
      { baseName: 'East', busType: '40-foot', currentFleetNumber: 26, futureCapacity: 33 },
    ],
    busTypes: [
      { type: '60-foot', manufacturer: 'New Flyer', efficiencyOptimal: '2.90 kWh/mile', efficiencyExtreme: '3.66 kWh/mile', batteryCapacity: '525 kWh' },
      { type: '60-foot', manufacturer: 'Gillig', efficiencyOptimal: '2.90 kWh/mile', efficiencyExtreme: '3.66 kWh/mile', batteryCapacity: '686 kWh' },
      { type: '40-foot', manufacturer: 'New Flyer', efficiencyOptimal: '2.08 kWh/mile', efficiencyExtreme: '2.80 kWh/mile', batteryCapacity: '525 kWh' },
    ],
    batterySettings: {
      usage: 'Conservative (20%-85%)'
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (fileType) => (event) => {
    const uploadedFile = event.target.files[0];
    setFiles(prev => ({
      ...prev,
      [fileType]: uploadedFile
    }));
    
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Please upload a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        if (fileExtension === '.csv') {
          const text = e.target.result;
          const lines = text.split(/\r\n|\n/).filter(line => line.trim());
          const rows = lines.map(line => {
            return line.split(',').map(cell => {
              const value = cell.trim();
              if (value.match(/^\d{2}:\d{2}:\d{2}$/)) {
                return value;
              }
              if (!isNaN(value) && value !== '') {
                return Number(value).toFixed(2);
              }
              return value;
            });
          });

          const headers = rows[0];
          const data = rows.slice(1).filter(row => row.length === headers.length);
          
          setFileData(prev => ({
            ...prev,
            [fileType]: { headers, data }
          }));
          setError(null);
        } else {
          setError('Excel file support coming soon');
          return;
        }
      } catch (err) {
        setError('Error processing file: ' + err.message);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    if (fileExtension === '.csv') {
      reader.readAsText(uploadedFile);
    } else {
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  const handleProcessFiles = async () => {
    if (!files.operational || !files.base) {
      setError('Please upload both operational and base data files');
      return;
    }

    setIsProcessing(true);
    try {
      // 模拟文件处理时间
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 这里可以添加实际的文件处理逻辑，更新 previewData
      setShowPreview(true);
    } catch (err) {
      setError('Error processing files: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const formData = new FormData();
      formData.append('operational', files.operational);
      formData.append('base', files.base);
      
      // 这里可以添加实际的报告生成逻辑
      
      // 导航到报告页面
      navigate('/fleet-service/report');
      
    } catch (err) {
      setError('Error generating report: ' + err.message);
    }
  };

  const FileUploadArea = ({ type, title }) => (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
      <input
        type="file"
        id={`file-upload-${type}`}
        className="hidden"
        onChange={handleFileUpload(type)}
        accept=".csv,.xlsx,.xls"
      />
      <label
        htmlFor={`file-upload-${type}`}
        className="cursor-pointer inline-flex flex-col items-center"
      >
        <div className="mb-4">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <span className="text-slate-600 font-medium mb-2">
          Upload {title}
        </span>
        <span className="text-slate-500 text-sm">CSV or Excel files</span>
      </label>
    </div>
  );

  const FilePreview = ({ type, title }) => {
    const file = files[type];
    const data = fileData[type];

    return file && (
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">{title} Preview</h3>
        <div className="overflow-auto border border-gray-200 rounded-lg" 
             style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {data && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {data.headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 border-r last:border-r-0 sticky top-0 bg-gray-50 z-10"
                      style={{ minWidth: header === 'Block Id' ? '120px' : 'auto' }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-sm text-gray-900 border-r last:border-r-0"
                        style={{
                          textAlign: cellIndex === 0 ? 'left' : 'right',
                          fontFamily: 'monospace'
                        }}
                      >
                        {cell || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Total {data?.data.length || 0} rows
        </div>
      </div>
    );
  };

  // 预览页面组件
  const DataPreview = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex gap-8">
            <span className="text-gray-600">Employee Name: {previewData.employeeName}</span>
            <span className="text-gray-600">Date: {previewData.date}</span>
            <span className="text-gray-600">Time: {previewData.time}</span>
          </div>
        </div>
      </div>

      {/* Base Info */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Base Info</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <span>Edit</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Fleet Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Future Capacity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previewData.baseInfo.map((base, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">{base.baseName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{base.busType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{base.currentFleetNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{base.futureCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bus Type */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bus Type</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <span>Edit</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bus Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manufacturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Energy efficiency(optimal)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Energy efficiency(extreme)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Battery capacity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previewData.busTypes.map((bus, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">{bus.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{bus.manufacturer}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{bus.efficiencyOptimal}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{bus.efficiencyExtreme}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{bus.batteryCapacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Battery Settings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Battery Settings</h2>
          <button className="flex items-center text-blue-600 hover:text-blue-700">
            <span>Edit</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Battery Usage</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">{previewData.batterySettings.usage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
      </div>
    </div>
  );

  // 加载动画组件
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-500 mb-4"></div>
        <p className="text-slate-600">Processing files...</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto w-full">
        {!showPreview ? (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h1 className="text-2xl font-bold mb-4">Fleet and Service Data</h1>
            <p className="text-slate-600 mb-6">
              Input current fleet and service data to generate current fleet service report.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <FileUploadArea type="operational" title="Operational Data" />
                  <FilePreview type="operational" title="Operational Data" />
                </div>
                <div>
                  <FileUploadArea type="base" title="Base Data" />
                  <FilePreview type="base" title="Base Data" />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  disabled={!files.operational || !files.base || !!error}
                  onClick={handleProcessFiles}
                >
                  Process Files
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <DataPreview />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold">Fleet service report history</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Employee Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">File Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-600">Jane Doe</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Fleet and Service data 1</td>
                  <td className="px-6 py-4 text-sm text-slate-600">2024-12-10</td>
                  <td className="px-6 py-4 text-sm text-slate-600">11:11:00</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <button className="text-blue-500 hover:text-blue-600">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
} 