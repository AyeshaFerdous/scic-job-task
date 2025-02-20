import {  onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../../firebase.config';



export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
     
    
    
    const logOut =()=>{
        setLoading(true)
       return signOut(auth);
    }
    
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
          
              setUser(currentUser);
              setLoading(false)
            
          })
          return ()=>{
              unsubscribe();
          }
      },[])

     
    const authInfo = {
        setUser,
        user,
        logOut,
        loading,
        setLoading,
       
       
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;