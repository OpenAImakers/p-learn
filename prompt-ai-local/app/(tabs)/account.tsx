import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { ToggleSwitch } from '@/components/ToggleSwitch';
import { SwipeableCard } from '@/components/SwipeableCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const cardData = [
  { id: '1', title: 'Notifications', description: 'Manage your notification settings' },
  { id: '2', title: 'Privacy', description: 'Control your data and privacy options' },
  { id: '3', title: 'Security', description: 'Update your password and 2FA' },
];

export default function Account() {
  const theme = useColorScheme() ?? 'light';
  const [cards, setCards] = useState(cardData);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleSwipe = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Account Settings</ThemedText>
      </ThemedView>
      <ThemedView style={styles.toggleSection}>
        <ThemedText>Enable Notifications</ThemedText>
        <ToggleSwitch
          isOn={notificationEnabled}
          onToggle={() => setNotificationEnabled(!notificationEnabled)}
        />
      </ThemedView>
      <ThemedView style={[styles.cardContainer, {
        backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background,
      }]}>
        <ThemedText type="subtitle">Swipe to Dismiss</ThemedText>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <SwipeableCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              onSwipe={handleSwipe}
              index={index}
            />
          ))
        ) : (
          <ThemedText style={styles.noCardsText}>No settings available</ThemedText>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
     paddingTop: 40,
    alignItems: 'center',
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  noCardsText: {
    marginTop: 20,
    fontSize: 16,
    opacity: 0.6,
  },
});