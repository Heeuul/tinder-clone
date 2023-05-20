import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import GetMatchedUserInfo from "../lib/GetMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import Global from "../Global";
import { db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function ChatRow({ matchDetails }) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, SetMatchedUserInfo] = useState(null);
  const [lastMessage, SetLastMessage] = useState("");

  useEffect(() => {
    SetMatchedUserInfo(GetMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc"),
          limit(1)
        ),
        (snapshot) => SetLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={Global.cardShadow}
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{ uri: matchedUserInfo?.photoURL }}
      />

      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
}
