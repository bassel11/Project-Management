import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StartPage = () => {
    const { user, isAuthenticated, token } = useSelector((state) => state.auth)
    const isAuth = Boolean(isAuthenticated || token || user)
    if (isAuth) return <Navigate to="/app" replace />

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900 text-gray-900 dark:text-slate-100">
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">CMS</div>
                    <h1 className="text-lg font-semibold">Committee Management System</h1>
                </div>
                <nav className="flex items-center gap-3">
                    <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600">Sign in</Link>
                    <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Get started</Link>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
                <section className="flex-1">
                    <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">Manage committees, meetings and decisions — all in one place</h2>
                    <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">Plan meetings, record minutes, track decisions, assign tasks and keep audit trails with role-based access and secure identity management.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm">Create account</Link>
                        <Link to="/login" className="px-6 py-3 border border-gray-200 rounded-md text-gray-700">Sign in</Link>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/60 dark:bg-zinc-800/60 rounded-lg">
                            <h4 className="font-semibold">Secure Identity</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-300">OAuth2 and refresh token flows with role-based access control.</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-zinc-800/60 rounded-lg">
                            <h4 className="font-semibold">Audit & Monitoring</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-300">Full audit trails and monitoring hooks for compliance.</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-zinc-800/60 rounded-lg">
                            <h4 className="font-semibold">Meetings & Decisions</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-300">Schedule meetings, record minutes and manage decisions in one flow.</p>
                        </div>
                        <div className="p-4 bg-white/60 dark:bg-zinc-800/60 rounded-lg">
                            <h4 className="font-semibold">Task & Notification</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-300">Assign tasks and send notifications via the Notification microservice.</p>
                        </div>
                    </div>
                </section>

                <aside className="flex-1 max-w-lg w-full">
                    <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-lg p-6">
                        <h3 className="font-semibold mb-3">Quick demo</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300 mb-4">Sign up to explore projects, meetings and the analytics dashboard with sample data.</p>
                        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-md">
                            <ul className="text-sm space-y-2 text-gray-700 dark:text-slate-300">
                                <li>• Create committees and add members</li>
                                <li>• Schedule meetings and capture minutes</li>
                                <li>• Track decisions and follow-up tasks</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </main>

            <footer className="border-t border-gray-200 dark:border-zinc-800 mt-12 py-6">
                <div className="max-w-7xl mx-auto px-6 text-sm text-gray-600 dark:text-slate-400 flex justify-between">
                    <span>© {new Date().getFullYear()} Committee Management System</span>
                    <span>Built for enterprise workflows</span>
                </div>
            </footer>
        </div>
    )
}

export default StartPage
