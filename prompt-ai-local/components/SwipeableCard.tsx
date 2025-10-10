import { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

type CardProps = {
  id: string;
  title: string;
  description: string;
  onSwipe: (id: string) => void;
  index: number;
};

export function SwipeableCard({ id, title, description, onSwipe, index }: CardProps) {
  const theme = useColorScheme() ?? 'light';
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          const direction = gesture.dx > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH;
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: direction, y: 0 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => onSwipe(id));
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 8,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateX: pan.x }, { rotate }],
          opacity,
          zIndex: 1000 - index, // Higher index = lower zIndex (top card has highest zIndex)
          backgroundColor: theme === 'light' ? Colors.light.card : Colors.dark.card, // Ensure opaque
          top: 50 + index * 10, // Slight vertical offset to avoid overlap
        },
      ]}
      {...panResponder.panHandlers}
    >
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText style={styles.cardDescription}>{description}</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 32,
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Web-compatible shadow
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
  },
});