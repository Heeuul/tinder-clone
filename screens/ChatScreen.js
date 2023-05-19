import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import Header from "../components/Header";
import ChatList from "../components/ChatList";

export default function ChatScreen() {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
}
