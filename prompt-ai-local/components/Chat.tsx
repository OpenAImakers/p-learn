import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendToDeepseek } from '../backend/server';

// chat messages
const sampleMessages = [
  { id: '1', sender: 'User', text: 'Just exploring the app!', timestamp: '10:32 AM' },
  { id: '2', sender: 'AI', text: 'Great! Try typing a question or command below.', timestamp: '10:33 AM' },
];

export default function Chat() {
  const [messages, setMessages] = useState(sampleMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        sender: 'User',
        text: inputText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      // Call backend service for AI response
      const aiText = await sendToDeepseek(inputText);
      setMessages((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          sender: 'AI',
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const renderMessage = ({ item }) => (
    <ThemedView
      style={[
        styles.messageContainer,
        item.sender === 'User' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <ThemedText
        style={[
          styles.messageText,
          item.sender === 'User' ? styles.userMessageText : styles.aiMessageText,
        ]}
      >
        {item.text}
      </ThemedText>
      <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.fullScreenContainer} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="arrow-up" size={24} color="#ffffff" />
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,

  },
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#000000ff',
  },
  aiMessageText: {
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    backgroundColor: 'none',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 40 : 50,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#000000ff',
    padding: 10,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});