import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FleetServiceData() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    
    // 检查文件类型
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = uploadedFile.name.toLowerCase().slice(uploadedFile.name.lastIndexOf('.'));
    
    if (!validExtensions.includes(fileExtension)) {
      setError('Please upload a CSV or Excel file');
      return;
    }

    // 读取文件
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        if (fileExtension === '.csv') {
          // CSV 文件处理
          const text = e.target.result;
          const rows = text.split('\n').map(row => row.split(','));
          const headers = rows[0];
          const data = rows.slice(1);
          setFileData({ headers, data });
        } else {
          // Excel 文件处理 - 这里需要添加 Excel 处理逻辑
          // 可以使用 xlsx 库来处理
          setError('Excel file support coming soon');
          return;
        }
        
        setError(null);
        validateData(fileData.headers, fileData.data);
        
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

  const validateData = (headers, data) => {
    // 这里添加数据验证逻辑
    // 例如：检查必需的列是否存在
    const requiredColumns = ['route_id', 'stop_id', 'arrival_time']; // 示例必需列
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    
    if (missingColumns.length > 0) {
      setError(`Missing required columns: ${missingColumns.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const handleGenerateReport = async () => {
    if (!file || !fileData) return;

    try {
      // 这里可以添加生成报告的逻辑
      // 例如：发送数据到服务器
      const formData = new FormData();
      formData.append('file', file);
      
      // 假设有一个API端点来处理上传
      // const response = await fetch('/api/generate-report', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // 如果成功，可以显示成功消息或重定向到报告页面
      alert('Report generated successfully!');
      
      // 可以清除文件状态
      // setFile(null);
      // setFileData(null);
      
    } catch (err) {
      setError('Error generating report: ' + err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-slate-200">
      {/* 侧边栏 - 与 App.jsx 相同 */}
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
        {/* 顶部导航栏 - 与 App.jsx 相同 */}
        <header className="h-14 flex items-center justify-between px-6 bg-slate-500 shadow-md">
          <div></div>
          <div className="flex items-center gap-4 text-white">
            <span className="text-sm font-medium">King County Metro</span>
            <span className="text-sm">Jane Doe</span>
          </div>
        </header>

        {/* 主内容区 */}
        <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
          {/* 文件上传区域 */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h1 className="text-2xl font-bold mb-4">Fleet and Service Data</h1>
            <p className="text-slate-600 mb-6">
              Input current fleet and service data to generate current fleet service report.
            </p>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx,.xls"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex flex-col items-center"
                >
                  <div className="mb-4">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="text-slate-600 font-medium mb-2">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-slate-500 text-sm">CSV or Excel files</span>
                </label>
              </div>

              {/* 已上传文件显示 */}
              {file && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-slate-600 font-medium">{file.name}</span>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-slate-400 hover:text-slate-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {/* 文件预览 */}
              {fileData && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">File Preview</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {fileData.headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {fileData.data.slice(0, 5).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 提交按钮 */}
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  disabled={!file || !!error}
                  onClick={handleGenerateReport}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* 历史记录表格 */}
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