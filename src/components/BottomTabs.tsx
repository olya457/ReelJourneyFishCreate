import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/theme';
import {useApp} from '../store/AppContext';
import {TabName} from '../navigation/types';

const tabs: TabName[] = ['Spots', 'Map', 'Sessions', 'Game', 'Draw'];
const accessibilityLabels: Record<TabName, string> = {
  Spots: 'Discover',
  Map: 'Atlas',
  Sessions: 'Logbook',
  Game: 'Trip Lab',
  Draw: 'Sketch',
};
const emojis: Record<TabName, string> = {
  Spots: '🎣',
  Map: '🗺️',
  Sessions: '📘',
  Game: '🌊',
  Draw: '🎨',
};

export function BottomTabs() {
  const {tab, setTab} = useApp();
  return (
    <View style={styles.wrap}>
      {tabs.map(name => {
        const active = tab === name;
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityLabel={accessibilityLabels[name]}
            accessibilityState={{selected: active}}
            key={name}
            style={[styles.item, active && styles.itemActive]}
            onPress={() => setTab(name)}>
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Text style={[styles.icon, active && styles.iconActive]}>
                {emojis[name]}
              </Text>
            </View>
            <Text style={[styles.dot, active && styles.dotActive]}>
              •
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#091D2C',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 20,
  },
  itemActive: {
    backgroundColor: 'rgba(255, 159, 67, 0.08)',
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2A3D',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(255, 159, 67, 0.18)',
    borderColor: colors.orange,
  },
  icon: {
    fontSize: 22,
    opacity: 0.76,
  },
  iconActive: {
    opacity: 1,
  },
  dot: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 14,
    color: 'transparent',
  },
  dotActive: {
    color: colors.orange,
  },
});
