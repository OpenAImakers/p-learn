import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Sidebar from '@/components/Sidebar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const screens = [
  { name: 'Home', route: '/', icon: 'home' },
  { name: 'Explore', route: '/explore', icon: 'paper-plane' },
  { name: 'Account', route: '/account', icon: 'person' },
];

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
      <TouchableOpacity
        key="menu-button"
        onPress={toggleSidebar}
        style={{
        position: 'absolute',
        top: 40,
        left : 17,
        zIndex: 1001,
        borderRadius: 8,
        }}
      >
        <Ionicons name="menu" size={30} color={Colors[colorScheme ?? 'light'].text} />
      </TouchableOpacity>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} screens={screens} />
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' }, headerMode: 'none' }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="explore" />
        <Tabs.Screen name="account" />
      </Tabs>
    </View>
  );
}