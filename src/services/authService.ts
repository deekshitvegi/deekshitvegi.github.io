
// CHANGE THIS VALUE TO UPDATE YOUR ADMIN PASSWORD
const ADMIN_ACCESS_KEY = 'vkt2026';

export interface UserSession {
    email: string;
    role: 'admin' | 'user';
    timestamp: number;
}

const AUTH_KEY = 'vkt_auth_session';

export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false;
    const session = getSession();
    return !!session && session.role === 'admin';
};

export const getSession = (): UserSession | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
};

export const login = (email: string, password?: string): UserSession => {
    const role = password === ADMIN_ACCESS_KEY ? 'admin' : 'user';
    
    const session: UserSession = {
        email,
        role,
        timestamp: Date.now()
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    }
    
    return session;
};

export const logout = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);
        window.location.hash = '#home';
        window.location.reload();
    }
};
