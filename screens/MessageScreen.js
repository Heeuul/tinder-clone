import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import GetMatchedUserInfo from "../lib/GetMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

export default function MessageScreen() {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, SetInput] = useState("");
  const [messages, SetMessages] = useState([]);

  const { matchDetails } = params;
  function SendMessage() {}

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={GetMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            className="pl-4"
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              messages.userID === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChange={SetInput}
            onSubmitEditing={SendMessage}
            value={input}
          />
          <TouchableOpacity>
            <Text className="text-[#FF5864] text-lg">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
