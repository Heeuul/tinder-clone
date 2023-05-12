import { View, Text, TouchableOpacity } from 'react-native'; 
import React from 'react'; 
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() 
{
  const navigation = useNavigation(); 

  return (
    <View>
      <Text>HomeScreen</Text> 
      <TouchableOpacity 
        onPress={() => navigation.navigate("Chat")} 
        className="items-center self-center rounded-full bg-blue-300" 
      >
        <Text className="text-white">Go to Chat Screen</Text> 
      </TouchableOpacity> 
    </View>
  ); 
}