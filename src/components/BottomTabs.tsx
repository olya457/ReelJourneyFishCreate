import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/theme';
import {useApp} from '../store/AppContext';
import {TabName} from '../navigation/types';

const tabs: TabName[] = ['Spots', 'Map', 'Sessions', 'Game', 'Draw'];

export function BottomTabs() {
  const {tab, setTab} = useApp();
  return (
    <View style={styles.wrap}>
      {tabs.map(name => {
        const active = tab === name;
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{selected: active}}
            key={name}
            style={styles.item}
            onPress={() => setTab(name)}>
            <View
              style={[styles.indicator, active && styles.indicatorActive]}
            />
            <Text style={[styles.label, active && styles.active]}>{name}</Text>
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
    height: 82,
    paddingBottom: 18,
    flexDirection: 'row',
    backgroundColor: '#091D2C',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  item: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  indicator: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: 7,
  },
  indicatorActive: {backgroundColor: colors.orange},
  label: {color: colors.muted, fontSize: 11, fontWeight: '700'},
  active: {color: colors.orange},
});
