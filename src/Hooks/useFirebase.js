import initAuthentication from '../Firebase/Firebase.init'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { useEffect, useState } from 'react';


initAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = getAuth();
    // create user
    const createUser = (email, password, name) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(email, password)
            .then(result => {
                setUser(result.user)
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                setIsLoading(false);
                return { user };
            })
            .catch(err => {
                setError(err.code)
                alert(err.code)
                setIsLoading(false);
                return { error };
            });
    }
    // signin
    const emailSignIn = (email, pass, location, navigate) => {
        console.log(email, pass);
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, pass)
            .then(result => {
                setUser(result.user);
                const whereTo = location?.state?.from?.pathname || '/home';
                navigate(whereTo);
                setIsLoading(false);
                return error;
            })
            .catch(err => {
                setError(err.code);
                setIsLoading(false)
                return error;
            })
    }
    // sign out
    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({})
                setError(null)
            })
            .catch((err) => {
                setError(err.code);
            });
        setIsLoading(false);
    }
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser({})
        })

        setIsLoading(false);
    }, [auth])
    return {
        user, error, isLoading, createUser, emailSignIn, logout
    }
};

export default useFirebase;