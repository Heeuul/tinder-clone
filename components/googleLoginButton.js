import * as Google from 'expo-auth-session/providers/google';  
import * as WebBrowser from 'expo-web-browser'; 
import { Button } from 'react-native'; 
import React from 'react'; 

import useAuth from '../hooks/useAuth'; 

WebBrowser.maybeCompleteAuthSession(); 

export default function GoogleLoginButton() 
{
  const { googleLoginConfig } = useAuth(); 
  const [request, response, promptAsync] = Google.useAuthRequest(googleLoginConfig); 

  return (
    <Button 
        title='Google Login' 
        disabled={!request} 
        onPress={() => { promptAsync().then((loginResult) => console.log("Login result: " + loginResult.type)); }} 
    /> 
  )
}