import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // console.log('supabase user:', user);

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
      setLoading(true); // We start loading here because a request is happening
  
      if (userData?.email) {
        try {
          // 1. Get JWT token
          const userInfo = { email: userData.email };
          const tokenResponse = await axiosPublic.post('/users/jwt', userInfo);
  
          if (tokenResponse.data.token) {
            localStorage.setItem('access-token', tokenResponse.data.token);
  
            // 2. Check if user exists in MongoDB
            const res = await axiosPublic.get(`/users/${userData.email}`);
            if (!res.data) {
              // User doesn't exist, create it
              const newUser = {
                email: userData.email,
                name: userData.full_name,
                profilePicture: userData.avatar_url,
              };
              await axiosPublic.post('/users/create-user', newUser);
              console.log('User saved to MongoDB');
            } else {
              console.log('User already exists in MongoDB');
              setUser(res.data.data);
            }
          }
        } catch (err) {
          console.error('Error during auth flow:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // No user, remove token
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });
  
    return () => {
      subscription?.unsubscribe();
    };
  }, [axiosPublic]);
  

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
