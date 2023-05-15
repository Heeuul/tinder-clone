import { View, Text } from 'react-native'; 
import React from 'react'; 

import GoogleLoginButton from '../components/googleLoginButton'; 

export default function LoginScreen() 
{
  return (
    <View>
      <Text>LoginScreen</Text> 
      <GoogleLoginButton /> 
    </View>
  ); 
}