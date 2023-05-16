import { View, Text, Button } from 'react-native'; 
import React from 'react'; 

import useAuth from '../hooks/useAuth'; 
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() 
{
  const { LoginWithGoogle, loading } = useAuth(); 
  const navigation = useNavigation(); 

  return (
    <View>
      <Text>{loading ? "Loading..." : "LoginScreen"}</Text> 
      <Button 
        title='Login with Google' 
        onPress={() => LoginWithGoogle() } 
      /> 
    </View>
  ); 
}; 