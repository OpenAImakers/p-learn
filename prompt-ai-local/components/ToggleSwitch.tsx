import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

export function ToggleSwitch({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  const [active, setActive] = useState(isOn);
  const theme = useColorScheme() ?? 'light';
  const animatedValue = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  const handleToggle = () => {
    setActive(!active);
    onToggle();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.timing(animatedValue, {
      toValue: active ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme === 'light' ? Colors.light.disabled : Colors.dark.disabled,
      theme === 'light' ? Colors.light.primary : Colors.dark.primary,
    ],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});