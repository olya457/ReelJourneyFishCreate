import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Chip, Field, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';

const windows = ['First light', 'Morning', 'Golden hour', 'Night'];
const techniques = ['Spinning', 'Fly', 'Float', 'Trolling'];

export function GameSetupScreen() {
  const {back, navigate, spots, addTripPlan} = useApp();
  const [spotId, setSpotId] = useState(spots.find(item => item.saved)?.id ?? spots[0].id);
  const spot = spots.find(item => item.id === spotId) ?? spots[0];
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [timeWindow, setTimeWindow] = useState(windows[0]);
  const [technique, setTechnique] = useState(techniques[0]);
  const [target, setTarget] = useState(spot.species[0]);
  const readiness = useMemo(() => {
    let score = 62;
    if (timeWindow === 'First light' || timeWindow === 'Golden hour') {
      score += 14;
    }
    if (
      spot.bestTime.toLowerCase().includes('morning') &&
      timeWindow === 'Morning'
    ) {
      score += 10;
    }
    if (technique === 'Fly' && /trout/i.test(target)) {
      score += 8;
    }
    return Math.min(score, 94);
  }, [spot, target, technique, timeWindow]);
  const chooseSpot = (id: string) => {
    const next = spots.find(item => item.id === id);
    if (!next) {
      return;
    }
    setSpotId(id);
    setTarget(next.species[0]);
  };
  const create = () => {
    const id = `trip-${Date.now()}`;
    addTripPlan({
      id,
      spotId,
      title: title.trim() || `${target} field brief`,
      date,
      timeWindow,
      technique,
      targetSpecies: target,
      readiness,
      createdAt: new Date().toISOString(),
      checklist: [
        {id: 'permit', label: 'Verify permit and local rules', done: false},
        {id: 'tackle', label: `${technique} tackle for ${target}`, done: false},
        {id: 'weather', label: 'Check wind and weather before leaving', done: false},
        {id: 'safety', label: 'Pack water, first aid and safety gear', done: false},
        {id: 'release', label: 'Bring measuring tool and release kit', done: false},
      ],
    });
    navigate('GamePlay', {planId: id});
  };
  return (
    <Screen>
      <Header eyebrow="TRIP LAB / NEW BRIEF" title="Plan the water" onBack={back} />
      <Label>Brief title</Label>
      <Field
        value={title}
        onChangeText={setTitle}
        placeholder={`${spot.name} exploration`}
      />
      <Label>Date (YYYY-MM-DD)</Label>
      <Field value={date} onChangeText={setDate} placeholder="2026-07-25" />
      <Label>Water</Label>
      <View style={styles.wrap}>
        {spots.map(item => (
          <Chip key={item.id} label={item.name} active={spotId === item.id} onPress={() => chooseSpot(item.id)} />
        ))}
      </View>
      <View style={styles.waterCard}>
        <Text style={styles.waterTitle}>{spot.region}</Text>
        <Text style={styles.waterText}>{spot.conditions}</Text>
        <Text style={styles.best}>Best window: {spot.bestTime}</Text>
      </View>
      <Label>Target species</Label>
      <View style={styles.wrap}>
        {spot.species.map(item => (
          <Chip key={item} label={item} active={target === item} onPress={() => setTarget(item)} />
        ))}
      </View>
      <Label>Time window</Label>
      <View style={styles.wrap}>
        {windows.map(item => <Chip key={item} label={item} active={timeWindow === item} onPress={() => setTimeWindow(item)} />)}
      </View>
      <Label>Technique</Label>
      <View style={styles.wrap}>
        {techniques.map(item => <Chip key={item} label={item} active={technique === item} onPress={() => setTechnique(item)} />)}
      </View>
      <View style={styles.fit}>
        <View>
          <Text style={styles.fitLabel}>CONDITION FIT</Text>
          <Text style={styles.fitText}>Based on water profile, timing and target</Text>
        </View>
        <Text style={styles.fitValue}>{readiness}/100</Text>
      </View>
      <Button title="Generate field brief →" disabled={!date.trim()} onPress={create} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', gap: 7, flexWrap: 'wrap'},
  waterCard: {backgroundColor: '#123C3A', padding: 14, borderRadius: 15, marginTop: 12},
  waterTitle: {color: 'white', fontWeight: '900'},
  waterText: {color: '#B8D2CD', lineHeight: 18, marginTop: 5, fontSize: 12},
  best: {color: '#72D8C1', fontWeight: '800', marginTop: 8, fontSize: 12},
  fit: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: colors.surface, borderRadius: 15, borderWidth: 1, borderColor: colors.border, marginVertical: 22},
  fitLabel: {color: colors.orange, fontSize: 10, fontWeight: '900'},
  fitText: {color: colors.muted, fontSize: 11, marginTop: 4},
  fitValue: {color: colors.text, fontSize: 22, fontWeight: '900'},
});
