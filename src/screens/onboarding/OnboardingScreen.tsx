import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {onboardingImages} from '../../assets/images';
import {Button, FadeIn} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
const pages = [
  [
    'Scenic Fishing Spots',
    'Discover breathtaking lakes hand-picked for their beauty and their catch.',
    '⌖',
  ],
  [
    'Every Spot on the Map',
    'Browse all locations and plan the route to your next adventure.',
    '⌁',
  ],
  [
    'Track Your Sessions',
    'Start a live session, log the conditions, catches and notes.',
    '◷',
  ],
  [
    'Game for Friends',
    'Pass-and-play challenges and honest questions for the campfire.',
    '♠',
  ],
  [
    'Draw & Create',
    'Take on creative prompts and save your artwork to a personal gallery.',
    '✎',
  ],
];
export function OnboardingScreen() {
  const {setOnboarded} = useApp();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {toValue: 1, duration: 900, useNativeDriver: true}),
    );
    animation.start();
    const id = setTimeout(() => setLoading(false), 1200);
    return () => {
      clearTimeout(id);
      animation.stop();
    };
  }, [spin]);
  if (loading) {
    return (
      <View style={styles.loader}>
        <FadeIn style={styles.brand}>
          <Text style={styles.logo}>Wavora Journey</Text>
          <Text style={styles.tag}>F I S H & C R E A T E</Text>
          <Animated.View
            style={[
              styles.spinner,
              {
                transform: [
                  {
                    rotate: spin.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={styles.preparing}>Preparing your adventure…</Text>
        </FadeIn>
      </View>
    );
  }
  const item = pages[page];
  return (
    <View style={styles.screen}>
      <FadeIn key={page}>
        <Image source={onboardingImages[page]} style={styles.heroImage} />
        <View style={styles.iconCircle}>
          <Text style={styles.heroIcon}>{item[2]}</Text>
        </View>
        <Text style={styles.title}>{item[0]}</Text>
        <Text style={styles.text}>{item[1]}</Text>
      </FadeIn>
      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => setPage(i)}
              style={[styles.dot, i === page && styles.dotActive]}
            />
          ))}
        </View>
        <Button
          title={page === pages.length - 1 ? 'Get Started' : 'Next'}
          onPress={() =>
            page === pages.length - 1 ? setOnboarded(true) : setPage(page + 1)
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 48,
  },
  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.52,
    borderRadius: 18,
  },
  brand: {alignItems: 'center'},
  logo: {fontSize: 34, fontWeight: '900', color: 'white'},
  tag: {color: colors.orange, fontWeight: '800', fontSize: 13, marginTop: 8},
  spinner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: colors.orange,
    borderTopColor: 'transparent',
    marginTop: 40,
  },
  preparing: {color: colors.muted, marginTop: 30},
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    marginLeft: 20,
    borderWidth: 4,
    borderColor: colors.background,
  },
  heroIcon: {fontSize: 28, color: '#071724'},
  title: {color: colors.text, fontSize: 27, fontWeight: '900', marginTop: 14},
  text: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 7,
    maxWidth: Dimensions.get('window').width - 50,
  },
  footer: {marginTop: 'auto', paddingBottom: 24},
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 18,
  },
  dot: {width: 7, height: 7, borderRadius: 4, backgroundColor: '#24455C'},
  dotActive: {width: 24, backgroundColor: colors.orange},
});
