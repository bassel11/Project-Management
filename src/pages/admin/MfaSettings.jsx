import { useState } from 'react';
import axios from 'axios';
import { LockKeyhole, ShieldCheck, Smartphone, Mail, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const MfaSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        deliveryMethod: 2 // Default to Authenticator App (Assuming 2 based on best practice)
    });

    // تعريف طرق التسليم بناء على Enum في الباك اند
    // 0: SMS, 1: Email, 2: Authenticator App (مثال افتراضي)
    const deliveryMethods = [
        { id: 0, label: 'SMS Message', icon: Smartphone, desc: 'Send code via text message' },
        { id: 1, label: 'Email Address', icon: Mail, desc: 'Send code via registered email' },
        { id: 2, label: 'Authenticator App', icon: ShieldCheck, desc: 'Use Google/Microsoft Authenticator' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!formData.userId) {
            toast.error('User ID is required');
            return;
        }

        setIsLoading(true);

        try {
            await axios.post('/api/Auth/enable-mfa', formData);
            toast.success(`MFA enabled for User ID: ${formData.userId}`);
            setFormData({ ...formData, userId: '' }); // Reset User ID only
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.message || 'Failed to enable MFA.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <LockKeyhole className="w-8 h-8 text-amber-500" />
                    Multi-Factor Authentication
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Enforce MFA on specific user accounts for enhanced security.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-6 sm:p-8">
                
                {/* Security Notice */}
                <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-500">Admin Action Required</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                            Enabling MFA will force the user to set up their verification method upon next login. Ensure the user is notified.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* User ID Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target User ID</label>
                        <input
                            required
                            name="userId"
                            value={formData.userId}
                            onChange={(e) => setFormData({...formData, userId: e.target.value})}
                            type="text"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-mono"
                            placeholder="GUID or User ID string"
                        />
                    </div>

                    {/* Delivery Method Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Delivery Method</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {deliveryMethods.map((method) => {
                                const Icon = method.icon;
                                const isSelected = formData.deliveryMethod === method.id;
                                return (
                                    <div 
                                        key={method.id}
                                        onClick={() => setFormData({...formData, deliveryMethod: method.id})}
                                        className={`cursor-pointer relative p-4 rounded-xl border-2 transition-all ${
                                            isSelected 
                                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                                            : 'border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <Icon className={`w-6 h-6 ${isSelected ? 'text-amber-600 dark:text-amber-500' : 'text-slate-400'}`} />
                                            <span className={`text-sm font-semibold ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                                                {method.label}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end border-t border-slate-100 dark:border-zinc-800">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Activating...' : 'Enable MFA Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MfaSettings;