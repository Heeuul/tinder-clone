import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'; 
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'; 
import { View, Text, TouchableOpacity, Image } from 'react-native'; 
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native'; 
import Swiper from 'react-native-deck-swiper'; 
import { db } from '../firebase'; 

import useAuth from '../hooks/useAuth'; 
import GenerateID from '../lib/GenerateID';

export default function HomeScreen() 
{
  const navigation = useNavigation(); 
  const { user, Logout } = useAuth(); 
  const [profiles, SetProfiles] = useState([]); 
  const swipeRef = useRef(null); 

  useLayoutEffect(() => onSnapshot(doc(db, "users", user.uid), snapshot => 
  {
    if(!snapshot.exists()) 
      navigation.navigate("Modal"); 
  }), []); 

  useEffect(() => 
  {
    let unsub; 

    async function FetchCards() 
    {
      const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(snapshot => snapshot.docs.map(doc => doc.id)); 
      const passedUserIDs = passes.length > 0 ? passes : ["test"]; 

      unsub = onSnapshot(query(collection(db, "users"), where("id", "not-in", [...passedUserIDs])), snapshot => 
      {
        SetProfiles(snapshot.docs.filter(doc => doc.id !== user.uid) 
                                 .map(doc => 
                                  ({ 
                                    id: doc.id, 
                                    ...doc.data(), 
                                  }))); 
      }); 
    }; 
    
    FetchCards(); 
    return unsub; 
  }, []); 

  function SwipeLeft(cardIndex) 
  {
    if(!profiles[cardIndex]) return; 

    const userSwiped = profiles[cardIndex]; 
    
    console.log("You swiped PASS on " + userSwiped.displayName); 
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped); 
  }
  async function SwipeRight(cardIndex) 
  {
    if(!profiles[cardIndex]) return; 
    
    const userSwiped = profiles[cardIndex]; 
    const loggedInProfile = await(await getDoc(doc(db, "users", user.uid))).data(); 

    // Check if user swiped on you (do in cloud server if possible) 
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(docSnapshot => 
    {
      if(docSnapshot.exists()) 
      {
        // User has matched previously before you matched them 
        console.log("You matched with " + userSwiped.displayName); 
        
        // Create a MATCH in db 
        setDoc(doc(db, "matches", GenerateID(user.uid, userSwiped.id)), 
        {
          users: 
          {
            [user.uid]: loggedInProfile, 
            [userSwiped.id]: userSwiped, 
          }, 
          usersMatched: [user.uid, userSwiped.id], 
          timestamp: serverTimestamp(), 
        }); 

        navigation.navigate("Match", { loggedInProfile, userSwiped, }); 
      }
      else 
      {
        // You swiping first or not getting swiped on 
        console.log("You swiped on " + userSwiped.displayName + `(${userSwiped.job})`); 
      }
      
      setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped); 
    }); 
    
    console.log("You swiped MATCH on " + userSwiped.displayName + `(${userSwiped.job})`); 
    setDoc(doc(db, "users", user.uid, "matches", userSwiped.id), userSwiped); 
  }

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
        
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}> 
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
          ref={swipeRef} 
          cards={profiles} 
          containerStyle={{backgroundColor: "transparent"}} 
          stackSize={5} 
          animateCardOpacity 
          verticalSwipe={false} 
          overlayLabels=
          {{
            left: 
            {
              title: "NOPE", 
              style: { label: { textAlign: "right", color: "lightcoral", }, }, 
            }, 
            right: 
            {
              title: "MATCH", 
              style: { label: { color: "darkseagreen", }, }, 
            }, 
          }} 
          onSwipedLeft={(cardIndex) => SwipeLeft(cardIndex)} 
          onSwipedRight={(cardIndex) => SwipeRight(cardIndex)} 
          backgroundColor='#4FD0E9' 
          renderCard={card => card ? 
          (
            <View key={card.id} className="relative bg-white h-3/4 rounded-xl"> 
              <Image 
                source={{uri: card.photoURL}} 
                className="absolute h-full w-full rounded-xl top-0" 
              /> 

              <View className="absolute bg-white bottom-0 w-full flex-row items-center justify-between h-20 px-6 py-2 rounded-b-xl overflow-visible shadow-xl"> 
                <View> 
                  <Text className="text-xl font-bold">{card.displayName}</Text> 
                  <Text>{card.occupation}</Text> 
                </View> 
                <Text className="text-2xl">{card.age}</Text> 
              </View> 
            </View> 
          ) : (
            <View className="relative bg-white h-3/4 rounded-xl justify-center items-center overflow-visible shadow-xl"> 
              <Text className="font-bold pb-5">No more profiles</Text> 
              <Image 
                className="h-20 w-full" 
                style={{resizeMode: 'contain'}} 
                source={{uri: "https://links.papareact.com/6gb"}} 
              /> 
            </View> 
          )} 
        /> 
      </View> 

      <View className="flex-row justify-evenly pb-5"> 
        <TouchableOpacity 
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200" 
          onPress={() => swipeRef.current.swipeLeft()} 
          > 
          <Entypo name='cross' size={24} color={"red"} /> 
        </TouchableOpacity> 
        <TouchableOpacity 
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200" 
          onPress={() => swipeRef.current.swipeRight()} 
        > 
          <AntDesign name='heart' size={24}  color={"green"}/> 
        </TouchableOpacity> 
      </View> 
    </SafeAreaView>
  ); 
}; 