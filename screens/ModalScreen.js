import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'; 
import React, { useLayoutEffect, useState } from 'react'; 
import { useNavigation } from '@react-navigation/native'; 

import useAuth from '../hooks/useAuth';

export default function ModalScreen() 
{
  const { user } = useAuth(); 
  const navigation = useNavigation(); 
  
  const [image, setImage] = useState(null); 
  const [job, setJob] = useState(null); 
  const [age, setAge] = useState(null); 

  const incompleteForm = !image || !job || !age; 

  useLayoutEffect(() => 
  {
    navigation.setOptions(
    { 
      headerShown: true, 
      headerTitle: "Update your profile", 
      headerStyle: { backgroundColor: "#FF5864", }, 
      headerTitleStyle: { color: "white", }, 
    }); 
  }, []); 

  function updateUserProfile() 
  {
    
  }; 
  
  return (
    <View className="flex-1 items-center pt-1"> 
      <Image 
        className="h-20 w-full" 
        source={{uri: "https://links.papareact.com/2pf"}} 
        resizeMode='contain' 
      /> 
      <Text className="text-xl text-gray-500 p-2 font-bold"> 
          Welcome {user.displayName} 
      </Text> 

      <Text className="text-center p-4 font-bold text-red-400"> 
        Step 1: The Profile Pic 
      </Text> 
      <TextInput 
        value={image} 
        onChangeText={text => setImage(text)} 
        className="text-center text-xl pb-2" 
        placeholder='Enter a Profile Pic URL' 
      /> 
      
      <Text className="text-center p-4 font-bold text-red-400"> 
        Step 2: The Job 
      </Text> 
      <TextInput 
        value={job} 
        onChangeText={text => setJob(text)} 
        className="text-center text-xl pb-2" 
        placeholder='Enter your occupation' 
      /> 

      <Text className="text-center p-4 font-bold text-red-400"> 
        Step 3: The Age 
      </Text> 
      <TextInput 
        value={age} 
        onChangeText={text => setAge(text)} 
        className="text-center text-xl pb-2" 
        placeholder='Enter your Age' 
        keyboardType='numeric'
        maxLength={2} 
      /> 

      <TouchableOpacity 
        className={`w-64 p-3 rounded-xl absolute bottom-10 ${incompleteForm ? "bg-gray-400" : "bg-red-400"}`} 
        disabled={incompleteForm} 
      > 
        <Text className="text-center text-white text-xl">Update Profile</Text> 
      </TouchableOpacity> 
    </View> 
  ); 
}; 