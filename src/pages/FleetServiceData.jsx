import { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleGenerateReport = async () => {
    if (!files.operational || !files.base) {
      setError('Please upload both operational and base data files');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('operational', files.operational);
      formData.append('base', files.base);
      
      alert('Report generated successfully!');
      
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

  return (
    <div className="w-full min-h-screen flex bg-slate-200">
      <aside className="w-64 bg-white border-r border-slate-200 shadow-lg fixed h-full">
        <div className="h-14 flex items-center px-4 border-b border-slate-200">
          <span className="font-medium text-lg">EcoRider</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/" className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            Home
          </Link>
          <Link to="/fleet-service" className="flex items-center px-4 py-2 text-slate-600 bg-slate-100 rounded-md">
            Fleet and Service Data
          </Link>
          <Link to="/simulation" className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            Simulation
          </Link>
          <Link to="/account" className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
            Account
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        <header className="h-14 flex items-center justify-between px-6 bg-slate-500 shadow-md">
          <div></div>
          <div className="flex items-center gap-4 text-white">
            <span className="text-sm font-medium">King County Metro</span>
            <span className="text-sm">Jane Doe</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
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
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

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
        </main>
      </div>
    </div>
  );
} 