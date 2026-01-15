import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ShieldCheck, 
  Users, 
  CalendarClock, 
  FileSignature, 
  ArrowRight, 
  LayoutDashboard,
  CheckCircle2,
  Building2,
  Lock
} from 'lucide-react';

const StartPage = () => {
  // 1. Logic: Authentication Check
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const isAuth = Boolean(isAuthenticated || token || user);

  if (isAuth) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden relative">
      
      {/* 2. Dynamic Background (Light & Dark Compatible) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light Mode Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 blur-[100px] animate-pulse dark:hidden" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/50 blur-[100px] animate-pulse delay-1000 dark:hidden" />
        
        {/* Dark Mode Blobs */}
        <div className="hidden dark:block absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] animate-pulse" />
        <div className="hidden dark:block absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px] animate-pulse delay-1000" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* 3. Navigation Bar */}
      <header className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CMS <span className="hidden sm:inline font-medium text-slate-500 dark:text-slate-500 text-sm ml-1">Enterprise</span>
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="hidden sm:flex text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Employee Login
            </Link>
            <Link 
              to="/signup" 
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full text-sm font-bold hover:bg-blue-700 dark:hover:bg-blue-50 transition-all shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* 4. Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-ping" />
              v1.0 Enterprise Release
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Committee Management <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Redefined.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl border-l-2 border-slate-300 dark:border-slate-800 pl-6">
              A unified secure platform to manage the entire meeting lifecycle. 
              Schedule agendas, record minutes, and track decisions with military-grade security.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" />
                Access Portal
              </Link>
              <Link to="/" className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all">
                Learn More
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-6 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Microsoft AD Integration
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Digital Signature
              </div>
            </div>
          </div>

          {/* Right Column: Abstract UI Visualization */}
          <div className="relative hidden lg:block perspective-1000">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[100px] opacity-20 animate-pulse" />
            
            {/* 3D Card Container */}
            <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white dark:border-slate-800 rounded-2xl p-6 shadow-2xl transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-all duration-700 ease-out dark:shadow-blue-900/10">
              
              {/* Fake UI: Header */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>
              
              {/* Fake UI: List Items */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <CalendarClock size={20} />
                  </div>
                  <div>
                    <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
                    <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileSignature size={20} />
                  </div>
                  <div>
                    <div className="h-2 w-40 bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
                    <div className="h-2 w-24 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="h-2 w-36 bg-slate-200 dark:bg-slate-700 rounded-full mb-2" />
                    <div className="h-2 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Security Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="bg-emerald-100 dark:bg-emerald-500/10 p-2 rounded-lg text-emerald-600 dark:text-emerald-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">System Status</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Encrypted & Secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Lock className="text-blue-500 dark:text-blue-400" />}
            title="Unified Identity"
            desc="Centralized RBAC supporting SSO for employees and secure database accounts for external partners."
          />
          <FeatureCard 
            icon={<CalendarClock className="text-purple-500 dark:text-purple-400" />}
            title="Meeting Automation"
            desc="Smart scheduling, automated invites, and real-time quorum management for all committee sessions."
          />
          <FeatureCard 
            icon={<FileSignature className="text-emerald-500 dark:text-emerald-400" />}
            title="Decisions & Minutes"
            desc="Transform discussions into actionable decisions, with automated tracking and digital signatures."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-slate-500 text-sm bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <p>© {new Date().getFullYear()} Enterprise Committee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Reusable Feature Component (Clean & Typed-free)
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-lg dark:hover:bg-slate-900 transition-all duration-300">
    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default StartPage;