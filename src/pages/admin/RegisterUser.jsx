import { useState } from 'react';
import axios from 'axios'; // تأكد من استيراد الانستانس الخاص بك إذا وجد
import { UserPlus, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast'; // مكتبة التنبيهات الموجودة في package.json

const RegisterUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // الحالة الافتراضية للنموذج
    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'USER',       // Default Role
        privilageType: 0    // Default Privilege
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // تحويل privilageType لرقم لضمان التوافق مع الـ Backend
            const payload = {
                ...formData,
                privilageType: parseInt(formData.privilageType)
            };

            // استدعاء API
            await axios.post('/api/Auth/register', payload);
            
            toast.success('User created successfully!');
            setFormData(initialFormState); // تصفير النموذج
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Failed to create user.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserPlus className="w-8 h-8 text-blue-600" />
                    Register New User
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Create a new account with specific roles and privileges.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                            <input
                                required
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. John"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                            <input
                                required
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Doe"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="john.doe@company.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <input
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-slate-500">Must be at least 8 characters with symbols.</p>
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="USER">Standard User</option>
                                <option value="ADMIN">Administrator</option>
                                <option value="MANAGER">Manager</option>
                            </select>
                        </div>

                        {/* Privilege Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Privilege Level</label>
                            <select
                                name="privilageType"
                                value={formData.privilageType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value={0}>Level 0 (Basic)</option>
                                <option value={1}>Level 1 (Editor)</option>
                                <option value={2}>Level 2 (Full Access)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Save size={18} /> Create Account
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;