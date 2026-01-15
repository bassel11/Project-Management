import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MyTasksSidebar from './MyTasksSidebar'
import ProjectSidebar from './ProjectsSidebar'
import WorkspaceDropdown from './WorkspaceDropdown'
import { 
    FolderOpenIcon, 
    LayoutDashboardIcon, 
    SettingsIcon, 
    UsersIcon, 
    UserPlus, 
    LockKeyhole 
} from 'lucide-react'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const { user } = useSelector((state) => state.auth)

    // --- خطوة التشخيص (Debug) ---
    // افتح الكونسول في المتصفح وتأكد مما يظهر هنا
    console.log("Current User Role:", user?.role); 
    // ---------------------------

    const menuItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
        
    ]

    const adminItems = [
        { name: 'Register User', href: '/admin/register', icon: UserPlus },
        { name: 'Security & MFA', href: '/admin/mfa', icon: LockKeyhole },
    ]

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }
        if(window.innerWidth < 640 && isSidebarOpen) {
             document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSidebarOpen, setIsSidebarOpen]);

    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-3 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200 
        ${isActive 
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
        }`;

    // --- منطق التحقق الآمن (Safe Check Logic) ---
    // نقوم بتحويل الدور لنص، إزالة المسافات، وتحويله لأحرف صغيرة للمقارنة
    // const isSuperAdmin = user?.role && (
    //     user.role.toString().trim().toLowerCase() === 'superadmin' || 
    //     user.role.toString().trim().toLowerCase() === 'admin' // في حال كان الاسم Admin فقط
    // );
    const isSuperAdmin = true; // للاختبار فقط

    return (
        <div ref={sidebarRef} className={`z-40 bg-white dark:bg-zinc-950 w-64 flex flex-col h-screen border-r border-slate-200 dark:border-zinc-800 fixed lg:static transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-0' : '-left-64'} lg:left-0`} >
            
            <WorkspaceDropdown />
            
            <div className='flex-1 overflow-y-auto custom-scrollbar flex flex-col py-4'>
                <div className='px-3 space-y-1'>
                    {menuItems.map((item) => (
                        <NavLink to={item.href} key={item.name} className={navLinkClass} >
                            <item.icon size={18} strokeWidth={2} />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                {/* الشرط المحدث والآمن */}
                {isSuperAdmin && (
                    <div className='mt-8 px-3 animate-fade-in-up'>
                        <p className='px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2'>
                            Administration
                        </p>
                        <div className='space-y-1'>
                            {adminItems.map((item) => (
                                <NavLink to={item.href} key={item.name} className={navLinkClass} >
                                    <item.icon size={18} strokeWidth={2} className="text-amber-600 dark:text-amber-500" />
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}

                <div className='mt-8'>
                     <MyTasksSidebar />
                     <ProjectSidebar />
                </div>
            </div>

            <div className='p-3 border-t border-slate-200 dark:border-zinc-800'>
                <button className='flex w-full items-center gap-3 py-2 px-4 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all'>
                    <SettingsIcon size={18} />
                    <span className='text-sm font-medium'>Settings</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar