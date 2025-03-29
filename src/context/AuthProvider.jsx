import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { AuthContext } from './AuthContext';

// Initialize Supabase client

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
console.log(user);

    const [loading, setLoading] = useState(true);

    // Sign in with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) throw error;
        return data;
    };

    // Email/password sign up
    const createUser = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    // Email/password sign in
    const signInUser = async (email, password) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    // Sign out
    const logOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    // Handle auth state changes
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user?.user_metadata || null);
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        signInWithGoogle,
        createUser,
        signInUser,
        logOut,
        supabase, // Expose supabase client if needed
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;