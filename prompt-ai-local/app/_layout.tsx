import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { Modal } from 'react-native';
import Onboarding from '@/components/Onboarding';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showOnboarding, setShowOnboarding] = useState(true); // Always show onboarding on app start

  const handleOnboardingDone = () => {
    setShowOnboarding(false); // Hide onboarding when done
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
          headerTintColor: Colors[colorScheme ?? 'light'].text,
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <Modal
        visible={showOnboarding}
        animationType="slide"
        onRequestClose={handleOnboardingDone}
      >
        <Onboarding onDone={handleOnboardingDone} />
      </Modal>
    </>
  );
}