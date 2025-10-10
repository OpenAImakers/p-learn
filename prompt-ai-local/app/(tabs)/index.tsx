import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Chat from '@/components/Chat';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.desktopContainer}>

      {/* Chat Section*/}
      <ThemedView style={styles.chatContainer}>
        <Chat />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  desktopTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 40,
    width: 40,
  },
  chatContainer: {
    flex: 1, // This makes the chat take all remaining space
  },
});