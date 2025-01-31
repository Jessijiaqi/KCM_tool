import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full min-h-screen flex bg-slate-200">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-lg fixed h-full">
        <div className="h-14 flex items-center px-4 border-b border-slate-200">
          <span className="font-medium text-lg">EcoRider</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/" className="flex items-center px-4 py-2 text-slate-600 bg-slate-100 rounded-md">
            Home
          </Link>
          <Link to="/fleet-service" className="flex items-center px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-md">
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
        {/* 顶部导航栏 */}
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
            <h1 className="text-2xl font-bold mb-2">
              Welcome to EcoRider, a zero emissions bus feasibility simulator!
            </h1>
            <p className="text-slate-600">
              It can help your fleet simulate the transition from diesel buses to zero emission buses.
              <br />
              To begin,
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Step 1: Prepare File</h2>
              </div>
              <p className="text-slate-600 mb-4">Download the example files and prepare your data:</p>
              <div className="space-y-2 mb-4 pl-4">
                <div className="text-slate-600">
                  <span>1. Operational data</span>
                </div>
                <div className="text-slate-600">
                  <span>2. Base data</span>
                </div>
                <div className="text-slate-600">
                  <span>3. Bus data</span>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                You can download the sample file and prepare your data in this format, you need to upload them during step 2.
              </p>
              <div className="flex gap-3 pt-2 border-t border-slate-200">
                <button className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">
                  operation-sample.csv
                </button>
                <button className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50">
                  base-sample.csv
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Step 2: Input Current Fleet and Service Data</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Input the data or file required in step 1 to generate current fleet service
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <p className="text-slate-600 text-sm">When you are ready preparing the cvs file, click this button to continue</p>
                <Link to="/fleet-service">
                  <button className="border rounded px-6 py-2 hover:bg-slate-50">Start</button>
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h2 className="text-xl font-semibold">Step 3: Zero Emissions Simulation</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Play with the variables to replace all the diesel bus into electric bus.
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <p className="text-slate-600 text-sm">When you are ready preparing the fleet and service data, click this button to continue</p>
                <button className="border rounded px-6 py-2 hover:bg-slate-50">Start</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 