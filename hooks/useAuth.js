import React, { createContext, useContext } from 'react'; 

const AuthContext = createContext({}); 

export const AuthProvider = ({children}) => 
{
  const config = 
  {
    androidClientId: "1016653517588-mqjom06t1b4fa3fquvemi47oga24uk07.apps.googleusercontent.com", 
    expoClientId: "1016653517588-7rktniqr550dl9nu2rnnkqb4csbljuoj.apps.googleusercontent.com", 
    scopes: ["profile", "email"], 
    permissions: ["public_profile", "email", "gender", "locaion"], 
  }

  return (
    <AuthContext.Provider 
      value=
      {{
        user: null, 
        googleLoginConfig: config, 
      }}
    > 
      {children} 
    </AuthContext.Provider> 
  ); 
}

export default function useAuth() { return useContext(AuthContext); } 