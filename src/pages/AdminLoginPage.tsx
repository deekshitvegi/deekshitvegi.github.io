
import React, { useState } from 'react';
import { ThemeClasses } from '../types';
import { login } from '../services/authService';

interface AdminLoginPageProps {
    themeClasses: ThemeClasses;
    onLogin: (role: 'admin' | 'user') => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ themeClasses, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const session = login(email, password);
        if (session) {
            onLogin(session.role);
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${themeClasses.cardBg} border ${themeClasses.border}`}>
                <div className="text-center mb-8">
                    <h1 className={`text-3xl font-bold ${themeClasses.accent}`}>Account Login</h1>
                    <p className={`mt-2 opacity-70 ${themeClasses.text}`}>Sign in to access resources or manage the site.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text}`}>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 rounded-lg border ${themeClasses.border} ${themeClasses.mainBg} ${themeClasses.text} focus:ring-2 focus:ring-red-500 outline-none transition-colors`}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text}`}>Password (Optional for Guests)</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            className={`w-full p-3 rounded-lg border ${error ? 'border-red-500' : themeClasses.border} ${themeClasses.mainBg} ${themeClasses.text} focus:ring-2 focus:ring-red-500 outline-none transition-colors`}
                            placeholder="Admin key (if applicable)..."
                        />
                        {error && <p className="text-red-500 text-sm mt-2">Login failed.</p>}
                        <p className="text-xs mt-1 opacity-60">If you are a visitor, you can leave this blank.</p>
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-bold shadow-lg ${themeClasses.button} transition-transform hover:scale-[1.02]`}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
