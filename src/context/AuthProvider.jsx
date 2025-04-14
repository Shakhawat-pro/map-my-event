import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { AuthContext } from './AuthContext';
import useAxiosPublic from '../hooks/useAxiosPublic';

// Initialize Supabase client

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


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
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const userData = session?.user?.user_metadata || null;
            setUser(userData);
            
            setLoading(false);
            if (userData?.email) {
                try {
                    const res = await axiosPublic.get(`/users/${userData.email}`);
                    if (!res.data) {
                        // User doesn't exist in MongoDB
                        const newUser = {
                            email: userData.email,
                            name: userData.full_name,
                            profilePicture: userData.avatar_url,
                        };
                        console.log(newUser);
                        
                        await axiosPublic.post('/users/create-user', newUser);
                        console.log('User saved to MongoDB');
                    } else {
                        console.log('User already exists in MongoDB');
                    }
                } catch (err) {
                    console.error('Error checking/saving user:', err);
                }
            }
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