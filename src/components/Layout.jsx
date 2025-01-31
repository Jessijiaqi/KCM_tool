import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="w-full min-h-screen flex bg-slate-200">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-lg fixed h-full">
        <div className="h-14 flex items-center px-4 border-b border-slate-200">
          <span className="font-medium text-lg">EcoRider</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link 
            to="/" 
            className={`flex items-center px-4 py-2 text-slate-600 rounded-md ${
              isActive('/') ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/fleet-service" 
            className={`flex items-center px-4 py-2 text-slate-600 rounded-md ${
              isActive('/fleet-service') ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
          >
            Fleet and Service Data
          </Link>
          <Link 
            to="/simulation" 
            className={`flex items-center px-4 py-2 text-slate-600 rounded-md ${
              isActive('/simulation') ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
          >
            Simulation
          </Link>
          <Link 
            to="/account" 
            className={`flex items-center px-4 py-2 text-slate-600 rounded-md ${
              isActive('/account') ? 'bg-slate-100' : 'hover:bg-slate-50'
            }`}
          >
            Account
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        {/* 顶部导航栏 */}
        <header className="h-14 flex items-center justify-between px-6 bg-slate-500 shadow-md fixed w-[calc(100%-16rem)] z-10">
          <div></div>
          <div className="flex items-center gap-4 text-white">
            <span className="text-sm font-medium">King County Metro</span>
            <span className="text-sm">Jane Doe</span>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="flex-1 p-8 mt-14">
          {children}
        </main>
      </div>
    </div>
  );
} 