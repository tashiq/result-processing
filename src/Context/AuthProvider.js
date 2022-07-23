import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const toSave = useFirebase();
    return (
        <AuthContext.Provider value={toSave}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;