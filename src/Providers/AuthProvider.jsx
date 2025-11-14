import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile 
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

// Create a context for authentication
export const AuthContext = createContext(null);

// Initialize Firebase Auth
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    // Create new user with email & password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in existing user with email & password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // Sign out the current user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

 

    const updateUserProfile = (profile) => {
        if (!auth.currentUser) return Promise.reject("No user is logged in");
        setLoading(true);
        return updateProfile(auth.currentUser, profile).finally(() => setLoading(false));
    };

    // Watch for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                // do something
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo )
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })
            }
            else{
                // do something
                localStorage.removeItem('access-token')
            }
            console.log("currentUser:", currentUser);
            setLoading(false);
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, [axiosPublic]);

    // Authentication information to share with children components
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    };

    // Provide the auth context
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
