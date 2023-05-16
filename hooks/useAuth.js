import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'; 
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'; 

import * as Google from 'expo-auth-session/providers/google'; 
import * as WebBrowser from 'expo-web-browser'; 

import { auth } from '../firebase'; 

const AuthContext = createContext({}); 
const config = 
{
  androidClientId: "1016653517588-mqjom06t1b4fa3fquvemi47oga24uk07.apps.googleusercontent.com", 
  expoClientId: "1016653517588-7rktniqr550dl9nu2rnnkqb4csbljuoj.apps.googleusercontent.com", 
  scopes: ["profile", "email"], 
  permissions: ["public_profile", "email", "gender", "locaion"], 
}; 
WebBrowser.maybeCompleteAuthSession(); 

export const AuthProvider = ({children}) => 
{
  const [error, setError] = useState(null); 
  const [user, setUser] = useState(null); 
  const [loadingInitial, setLoadingInitial] = useState(true); // can be used for splash screen 
  const [loading, setLoading] = useState(false); 

  const [request, response, promptAsync] = Google.useAuthRequest(config); 

  // Fires when user logs in/out 
  //?Direct return to auto-trigger unsubscribe cleanup upon end 
  useEffect(() => onAuthStateChanged(auth, (user) => 
  {
    setUser(user ? user : null); 
    setLoadingInitial(false); 
  }), []); 

  function LoginWithGoogle() 
  {
    setLoading(true); 
    
    promptAsync().then((loginResult) => 
    {
      if(loginResult.type === 'success') 
      {
        const { idToken, accessToken } = loginResult.authentication; 
        const credential = GoogleAuthProvider.credential(idToken, accessToken); 
        
        signInWithCredential(auth, credential); 
      } 
      
      return Promise.reject(); 
    }).catch(error => setError(error)) 
    .finally(() => setLoading(false)); 
  } 
  
  function Logout() 
  {
    setLoading(true); 
    signOut(auth).catch(error => setError(error)) 
                 .finally(setLoading(false)); 
  } 

  const authMemo = useMemo(() => 
  ({
    user, 
    loading, 
    error, 
    LoginWithGoogle, 
    Logout, 
  }), [user, loading, error]); 

  return (
    <AuthContext.Provider value={authMemo}> 
      {!loadingInitial && children} 
    </AuthContext.Provider> 
  ); 
}; 

export default function useAuth() { return useContext(AuthContext); } 