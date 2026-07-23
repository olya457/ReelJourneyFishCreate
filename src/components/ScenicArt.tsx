import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/theme';
export function ScenicArt({compact = false}: {compact?: boolean}) {
  return (
    <View style={[styles.sky, compact && styles.compact]}>
      <View style={styles.sun} />
      <View style={[styles.mountain, styles.mountainLeft]} />
      <View style={[styles.mountain, styles.mountainRight]} />
      <View style={styles.water} />
      <Text style={styles.mark}>⌖</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  sky: {
    height: 240,
    overflow: 'hidden',
    backgroundColor: '#153D5B',
    borderRadius: 16,
  },
  compact: {height: 130},
  sun: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFB444',
    top: 35,
    right: 46,
    opacity: 0.9,
  },
  mountain: {
    position: 'absolute',
    width: 230,
    height: 230,
    backgroundColor: '#0D2A3E',
    transform: [{rotate: '45deg'}],
  },
  mountainLeft: {left: -25, bottom: 20},
  mountainRight: {
    right: -30,
    bottom: 8,
    transform: [{rotate: '35deg'}],
  },
  water: {
    position: 'absolute',
    height: '38%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0C5374',
    opacity: 0.85,
  },
  mark: {
    position: 'absolute',
    color: colors.orange,
    fontSize: 30,
    left: '48%',
    top: '42%',
  },
});
