import { View, Text, TouchableOpacity, Image } from 'react-native'; 
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native'; 
import Swiper from 'react-native-deck-swiper'; 
import React from 'react'; 

import useAuth from '../hooks/useAuth'; 

const DUMMY_DATA = 
[
  {
    id: 1, 
    firstName: "Thomas", 
    lastName: "Miller", 
    occupation: "Signal and Track Switch Repairer", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male20151083594850952.jpg", 
    age: 30, 
  }, 
  {
    id: 2, 
    firstName: "Barbara", 
    lastName: "Hendrickson", 
    occupation: "Skincare Specialist", 
    photoURL: "https://www.fakepersongenerator.com/Face/female/female10221841618.jpg", 
    age: 44, 
  }, 
  {
    id: 3, 
    firstName: "Jovita", 
    lastName: "Currie", 
    occupation: "Skincare Specialist", 
    photoURL: "https://www.fakepersongenerator.com/Face/female/female20151024199909973.jpg", 
    age: 29, 
  }, 
  {
    id: 4, 
    firstName: "Jeanne", 
    lastName: "Whitehead", 
    occupation: "Insurance Sales Agent", 
    photoURL: "https://www.fakepersongenerator.com/Face/female/female1021482539795.jpg", 
    age: 32, 
  }, 
  {
    id: 5, 
    firstName: "Barry", 
    lastName: "Brown", 
    occupation: "First-Line Supervisors of Police and Detective", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male1085647567596.jpg", 
    age: 47, 
  }, 
  {
    id: 6, 
    firstName: "Edward", 
    lastName: "Crawford", 
    occupation: "Nuclear Medicine Technologist", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male108578967902.jpg", 
    age: 37, 
  }, 
  {
    id: 7, 
    firstName: "John", 
    lastName: "Gilbert", 
    occupation: "Prosthodontist", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male1084775750458.jpg", 
    age: 35, 
  }, 
  {
    id: 8, 
    firstName: "Janet", 
    lastName: "Imel", 
    occupation: "Interior Designer", 
    photoURL: "https://www.fakepersongenerator.com/Face/female/female20091023325237976.jpg", 
    age: 26, 
  }, 
  {
    id: 9, 
    firstName: "Laverne", 
    lastName: "Delacruz", 
    occupation: "Midwive", 
    photoURL: "https://www.fakepersongenerator.com/Face/female/female201610250091.jpg", 
    age: 29, 
  }, 
  {
    id: 10, 
    firstName: "Marc", 
    lastName: "Casper", 
    occupation: "Security Guard", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male20161086397872161.jpg", 
    age: 39, 
  }, 
  {
    id: 11, 
    firstName: "Keith", 
    lastName: "Flanigan", 
    occupation: "Tax Preparer", 
    photoURL: "https://www.fakepersongenerator.com/Face/male/male20121083483988281.jpg", 
    age: 41, 
  }, 
]; 

export default function HomeScreen() 
{
  const navigation = useNavigation(); 
  const { user, Logout } = useAuth(); 

  return (
    <SafeAreaView className="flex-1"> 
      {/* Header */} 
      <View className="flex-row items-center justify-between relative px-5"> 
        <TouchableOpacity onPress={Logout}> 
          <Image 
            source={{uri: user.photoURL}} 
            className="h-10 w-10 rounded-full" 
          /> 
        </TouchableOpacity> 
        
        <TouchableOpacity> 
          <Image 
            source={require("../images/logo.png")} 
            className="h-14 w-14 rounded-full" 
          /> 
        </TouchableOpacity> 
        
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}> 
          <Ionicons 
            name='chatbubbles-sharp' 
            size={30} 
            color={"#FF5864"}
          /> 
        </TouchableOpacity> 
      </View> 

      {/* End of Header */} 
      {/* Cards */} 
      <View className="flex-1 -mt-6"> 
        <Swiper 
          cards={DUMMY_DATA} 
          containerStyle={{backgroundColor: "transparent"}} 
          stackSize={5} 
          animateCardOpacity 
          verticalSwipe={false} 
          renderCard={card => 
          (
            <View key={card.id} className="relative bg-white h-3/4 rounded-xl"> 
              <Image 
                source={{uri: card.photoURL}} 
                className="absolute h-full w-full rounded-xl top-0" 
              /> 

              <View className="absolute bg-white bottom-0 w-full flex-row justify-between h-20 px-6 py-2 rounded-b-xl overflow-visible shadow-xl"> 
                <View> 
                  <Text className="text-xl font-bold">{card.firstName} {card.lastName}</Text> 
                  <Text>{card.occupation}</Text> 
                </View> 
                <Text className="text-2xl">{card.age}</Text> 
              </View> 
            </View> 
          )} 
        /> 
      </View> 
    </SafeAreaView>
  ); 
}; 