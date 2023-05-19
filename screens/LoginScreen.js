import { View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native'; 
import React, { useLayoutEffect } from 'react'; 

import useAuth from '../hooks/useAuth'; 
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() 
{
  const { LoginWithGoogle, loading } = useAuth(); 
  const navigation = useNavigation(); 

  useLayoutEffect(() => 
  {
    navigation.setOptions({headerShown: false}); 
  }, []); 

  return (
    <View className="flex-1"> 
      <ImageBackground 
        source={{uri:"https://tinder.com/static/tinder.png"}} 
        className="flex-1" 
        resizeMode='cover' 
      > 
        <TouchableOpacity 
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl" 
          style={{marginHorizontal: "25%"}} 
          onPress={LoginWithGoogle} 
        > 
          <Text className="text-center font-semibold">Sign in & get swiping</Text> 
        </TouchableOpacity> 
      </ImageBackground> 
    </View> 
  ); 
} 