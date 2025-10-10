import React, { useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

type Slide = {
  key: string;
  title: string;
  text: string;
  image?: any;
  backgroundColor: string;
};

const slides: Slide[] = [
  {
    key: 'one',
    title: 'Welcome to My App',
    text: 'This is your first step into an amazing experience!',
    image: require('@/assets/images/welcome.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Discover Features',
    text: 'Explore, account settings, and more await you.',
    image: require('@/assets/images/features.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'three',
    title: 'Get Started',
    text: "Ready to dive in? Let's go!",
    image: require('@/assets/images/start.png'),
    backgroundColor: '#fff',
  },
];

type OnboardingProps = {
  onDone: () => void;
};

export default function Onboarding({ onDone }: OnboardingProps) {
  const sliderRef = useRef<AppIntroSlider>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const renderItem = ({ item, index }: { item: Slide; index: number }) => {
    const isLastSlide = index === slides.length - 1;

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start(() => onDone());
    };

    return (
      <ThemedView style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        {item.image && <Image source={item.image} style={styles.image} />}
        <ThemedText type="title" style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={styles.text}>{item.text}</ThemedText>

        {/* Small button only on last slide */}
        {isLastSlide && (
          <Animated.View style={[styles.smallButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity onPress={handlePress} style={styles.smallButton}>
              <IconSymbol name="arrow.right" size={20} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </ThemedView>
    );
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={renderItem}
      showSkipButton={false}
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{ display: 'none' }} // hide dots
      activeDotStyle={{ display: 'none' }}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#fff',
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
  text: {
    textAlign: 'center',
    opacity: 0.7,
    color: '#000',
    fontSize: 15,
  },
  smallButtonContainer: {
    position: 'absolute',
    bottom: -250,
    right: 30,
  },
  smallButton: {
    backgroundColor: '#e27500ff',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
