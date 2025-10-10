import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface Screen {
  name: string;
  route: string;
  icon: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  screens: Screen[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, screens }) => {
  const slideAnim = useState(new Animated.Value(isOpen ? 0 : -250))[0];
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavigation = (route: string) => {
    router.push(route);
    toggleSidebar();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <ThemedView style={styles.sidebarContent}>
          <ThemedText type="title" style={styles.sidebarTitle}>
            prompt-ai
          </ThemedText>
          {screens.map((screen) => (
            <TouchableOpacity
              key={screen.route}
              style={styles.link}
              onPress={() => handleNavigation(screen.route)}
            >
              <Ionicons
                name={screen.icon}
                size={24}
                color="#4105f4ff"
                style={styles.icon}
                // Fallback for missing icons
                onError={() => console.warn(`Icon ${screen.icon} not found`)}
              />
              <ThemedText type="link">{screen.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </Animated.View>
      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleSidebar}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  sidebarContent: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4c13c6ff',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  icon: {
    marginRight: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 250,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});

export default Sidebar;