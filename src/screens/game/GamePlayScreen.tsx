import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Empty, Header, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {AppRoute} from '../../navigation/types';
import {useApp} from '../../store/AppContext';

export function GamePlayScreen({route}: {route: Extract<AppRoute, {name: 'GamePlay'}>}) {
  const {back, tripPlans, spots, toggleTripItem, deleteTripPlan} = useApp();
  const plan = tripPlans.find(item => item.id === route.params.planId);
  if (!plan) {
    return <Screen><Header title="Field brief" onBack={back} /><Empty icon="🧭" title="Brief not found" text="This plan may have been removed." /></Screen>;
  }
  const spot = spots.find(item => item.id === plan.spotId);
  const checked = plan.checklist.filter(item => item.done).length;
  const remove = () => Alert.alert('Delete field brief?', 'The checklist and plan will be removed.', [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Delete', style: 'destructive', onPress: () => { deleteTripPlan(plan.id); back(); }},
  ]);
  return (
    <Screen>
      <Header eyebrow={`${plan.date} · ${plan.timeWindow}`} title={plan.title} onBack={back} />
      <View style={styles.scoreCard}>
        <View>
          <Text style={styles.scoreLabel}>CONDITION FIT</Text>
          <Text style={styles.scoreCopy}>{plan.technique} · {plan.targetSpecies}</Text>
        </View>
        <Text style={styles.score}>{plan.readiness}</Text>
      </View>
      <Card style={styles.location}>
        <Text style={styles.locationName}>⌖ {spot?.name ?? 'Unknown water'}</Text>
        <Text style={styles.locationMeta}>{spot?.region}</Text>
        <Text style={styles.locationText}>{spot?.conditions}</Text>
      </Card>
      <View style={styles.sectionRow}>
        <Text style={styles.section}>PACK & VERIFY</Text>
        <Text style={styles.count}>{checked}/{plan.checklist.length}</Text>
      </View>
      {plan.checklist.map(item => (
        <Pressable key={item.id} onPress={() => toggleTripItem(plan.id, item.id)} style={[styles.item, item.done && styles.itemDone]}>
          <View style={[styles.check, item.done && styles.checkDone]}>
            <Text style={styles.checkText}>{item.done ? '✓' : ''}</Text>
          </View>
          <Text style={[styles.itemText, item.done && styles.itemTextDone]}>{item.label}</Text>
        </Pressable>
      ))}
      <View style={styles.rule}>
        <Text style={styles.ruleTitle}>LOCAL RULE NOTE</Text>
        <Text style={styles.ruleText}>{spot?.rules}</Text>
      </View>
      <Button title="Delete brief" variant="danger" onPress={remove} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scoreCard: {backgroundColor: '#123C3A', borderRadius: 18, padding: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  scoreLabel: {color: '#72D8C1', fontSize: 10, fontWeight: '900', letterSpacing: 1},
  scoreCopy: {color: 'white', marginTop: 5, fontWeight: '700'},
  score: {color: '#72D8C1', fontSize: 36, fontWeight: '900'},
  location: {marginTop: 12},
  locationName: {color: colors.text, fontSize: 17, fontWeight: '900'},
  locationMeta: {color: colors.orange, marginTop: 4, fontWeight: '700'},
  locationText: {color: colors.muted, lineHeight: 19, marginTop: 9},
  sectionRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 10},
  section: {color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1.2},
  count: {color: colors.orange, fontWeight: '900'},
  item: {flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.surface, borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border},
  itemDone: {backgroundColor: '#0E332E', borderColor: '#236A5B'},
  check: {width: 24, height: 24, borderRadius: 7, borderWidth: 2, borderColor: colors.muted, alignItems: 'center', justifyContent: 'center'},
  checkDone: {backgroundColor: colors.green, borderColor: colors.green},
  checkText: {color: '#071724', fontWeight: '900'},
  itemText: {color: colors.text, flex: 1, fontWeight: '700'},
  itemTextDone: {color: '#8FCABD', textDecorationLine: 'line-through'},
  rule: {padding: 15, backgroundColor: '#3A280E', borderRadius: 15, marginVertical: 14},
  ruleTitle: {color: colors.orange, fontSize: 10, fontWeight: '900'},
  ruleText: {color: '#E3D2AE', lineHeight: 18, marginTop: 6, fontSize: 12},
});
