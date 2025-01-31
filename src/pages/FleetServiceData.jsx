import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FleetServiceData() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    // 这里可以添加文件处理逻辑
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
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h1 className="text-2xl font-bold mb-4">Fleet and Service Data</h1>
            <p className="text-slate-600 mb-6">
              Input current fleet and service data to generate current fleet service report.
            </p>

            {/* 文件上传区域 */}
            <div className="space-y-6">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".csv"
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
                  <span className="text-slate-500 text-sm">CSV files only</span>
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

              {/* 提交按钮 */}
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  disabled={!file}
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