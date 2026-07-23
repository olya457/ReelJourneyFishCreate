import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card, Field, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
import {AppRoute} from '../../navigation/types';

export function LiveSessionScreen({
  route,
}: {
  route: Extract<AppRoute, {name: 'LiveSession'}>;
}) {
  const {back, addSession} = useApp();
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [catches, setCatches] = useState(0);
  useEffect(() => {
    if (paused) {
      return;
    }
    const id = setInterval(() => setSeconds(value => value + 1), 1000);
    return () => clearInterval(id);
  }, [paused]);
  const time = new Date(seconds * 1000).toISOString().slice(11, 19);
  const finish = () => {
    addSession({
      id: String(Date.now()),
      name: route.params.name || 'Fishing Session',
      location: route.params.location || 'Unknown',
      duration: time,
      catches,
      weight: `${(catches * 1.4).toFixed(1)} kg`,
    });
    back();
    back();
  };
  return (
    <Screen>
      <Header
        eyebrow={route.params.location}
        title={route.params.name || 'Live Session'}
        onBack={back}
      />
      <View style={styles.live}>
        <Text style={styles.badge}>LIVE</Text>
        <Text style={styles.timer}>{time}</Text>
        <Text style={styles.meta}>
          {catches} catches · {route.params.weather}
        </Text>
      </View>
      <Button
        title="🎣 Add Catch"
        onPress={() => setCatches(value => value + 1)}
      />
      <Label>Notes</Label>
      <Field placeholder="Add a note…" />
      <Label>Catches ({catches})</Label>
      {Array.from({length: catches}).map((_, index) => (
        <Card key={index} style={styles.catchCard}>
          <Text style={styles.catch}>🐟 Catch #{index + 1}</Text>
          <Text style={styles.catchMeta}>Rainbow Trout · Silver spinner</Text>
        </Card>
      ))}
      <View style={styles.row}>
        <View style={styles.flex}>
          <Button
            title={paused ? '▶ Resume' : 'Ⅱ Pause'}
            variant="secondary"
            onPress={() => setPaused(value => !value)}
          />
        </View>
        <View style={styles.flex}>
          <Button title="Finish ✓" variant="green" onPress={finish} />
        </View>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  live: {alignItems: 'center', marginVertical: 15},
  badge: {color: colors.green, fontWeight: '900', fontSize: 11},
  timer: {
    fontSize: 45,
    color: colors.text,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
    marginVertical: 5,
  },
  meta: {color: colors.muted},
  row: {flexDirection: 'row', gap: 10, marginTop: 14},
  flex: {flex: 1},
  catchCard: {marginBottom: 8},
  catch: {color: colors.text, fontWeight: '800'},
  catchMeta: {color: colors.muted, marginTop: 5, fontSize: 12},
});
