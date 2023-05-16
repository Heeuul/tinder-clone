import { View, Text, TouchableOpacity, Button } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 
import React from 'react'; 

import useAuth from '../hooks/useAuth'; 

export default function HomeScreen() 
{
  const navigation = useNavigation(); 
  const { Logout } = useAuth(); 

  return (
    <View>
      <Text>HomeScreen</Text> 
      
      <TouchableOpacity 
        onPress={() => navigation.navigate("Chat")} 
        className="items-center self-center rounded-full bg-blue-300" 
      >
        <Text className="text-white">Go to Chat Screen</Text> 
      </TouchableOpacity> 

      <Button title='Logout' onPress={ Logout } /> 
    </View>
  ); 
}; 