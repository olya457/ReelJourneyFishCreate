import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Empty, Header, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';

export function GameScreen() {
  const {navigate, tripPlans, spots} = useApp();
  const saved = spots.filter(spot => spot.saved).length;
  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>FIELD PLANNING WORKSPACE</Text>
        <Header title="Trip Lab" />
        <Text style={styles.intro}>
          Turn a lake idea into a practical field brief with target species,
          timing and a gear checklist.
        </Text>
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{saved}</Text>
            <Text style={styles.metricLabel}>saved waters</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{tripPlans.length}</Text>
            <Text style={styles.metricLabel}>field briefs</Text>
          </View>
        </View>
      </View>
      <Button title="＋ Build a field brief" onPress={() => navigate('GameSetup')} />
      <Text style={styles.section}>YOUR BRIEFS</Text>
      {tripPlans.length === 0 ? (
        <Empty
          icon="🧭"
          title="No trips planned"
          text="Choose a water, target and technique. Trip Lab will prepare a focused checklist and readiness score."
        />
      ) : (
        tripPlans.map(plan => {
          const spot = spots.find(item => item.id === plan.spotId);
          const checked = plan.checklist.filter(item => item.done).length;
          return (
            <Pressable
              key={plan.id}
              onPress={() => navigate('GamePlay', {planId: plan.id})}>
              <Card style={styles.plan}>
                <View style={styles.planTop}>
                  <View style={styles.flex}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planMeta}>
                      {spot?.name ?? 'Custom water'} · {plan.date}
                    </Text>
                  </View>
                  <View style={styles.score}>
                    <Text style={styles.scoreValue}>{plan.readiness}</Text>
                    <Text style={styles.scoreLabel}>FIT</Text>
                  </View>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progress,
                      {width: `${(checked / plan.checklist.length) * 100}%`},
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {checked}/{plan.checklist.length} items packed · {plan.timeWindow}
                </Text>
              </Card>
            </Pressable>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: -18,
    marginTop: -54,
    padding: 22,
    paddingTop: 64,
    backgroundColor: '#123C3A',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 18,
  },
  kicker: {color: '#72D8C1', fontSize: 10, fontWeight: '900', letterSpacing: 1.4},
  intro: {color: '#C2DAD5', lineHeight: 20, maxWidth: 340},
  metrics: {flexDirection: 'row', gap: 10, marginTop: 18},
  metric: {backgroundColor: '#0B2C2B', borderRadius: 14, padding: 12, flex: 1},
  metricValue: {color: 'white', fontSize: 22, fontWeight: '900'},
  metricLabel: {color: '#85ADA5', fontSize: 11, marginTop: 2},
  section: {color: colors.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1.2, marginTop: 24, marginBottom: 10},
  plan: {marginBottom: 11},
  planTop: {flexDirection: 'row', alignItems: 'center'},
  flex: {flex: 1},
  planTitle: {color: colors.text, fontSize: 17, fontWeight: '900'},
  planMeta: {color: colors.muted, marginTop: 5, fontSize: 12},
  score: {width: 54, height: 54, borderRadius: 27, backgroundColor: '#123C3A', alignItems: 'center', justifyContent: 'center'},
  scoreValue: {color: '#72D8C1', fontSize: 18, fontWeight: '900'},
  scoreLabel: {color: '#72D8C1', fontSize: 8, fontWeight: '900'},
  progressTrack: {height: 5, borderRadius: 3, backgroundColor: colors.border, marginTop: 15, overflow: 'hidden'},
  progress: {height: 5, backgroundColor: colors.orange},
  progressText: {color: colors.muted, fontSize: 11, marginTop: 7},
});
