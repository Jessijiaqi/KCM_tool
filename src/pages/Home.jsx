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

      {/* 其余内容保持不变... */}
    </div>
  );
} 