import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Chip, Field, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
export function GameSetupScreen() {
  const {back, navigate} = useApp();
  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3']);
  const [rounds, setRounds] = useState(3);
  const update = (index: number, value: string) =>
    setPlayers(current =>
      current.map((name, itemIndex) => (itemIndex === index ? value : name)),
    );
  const remove = (index: number) =>
    setPlayers(current =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  const add = () =>
    setPlayers(current => [...current, `Player ${current.length + 1}`]);
  const valid = players.length >= 2 && players.every(name => name.trim());
  return (
    <Screen>
      <Header title="Game Setup" onBack={back} />
      <Label>Players ({players.length})</Label>
      {players.map((player, index) => (
        <View key={index} style={styles.player}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{player.trim()[0] || 'P'}</Text>
          </View>
          <Field
            value={player}
            onChangeText={value => update(index, value)}
            placeholder={`Player ${index + 1}`}
            style={styles.field}
          />
          <Text onPress={() => remove(index)} style={styles.remove}>
            ×
          </Text>
        </View>
      ))}
      <Button title="+ Add Player" variant="secondary" onPress={add} />
      <Label>Number of Rounds</Label>
      <View style={styles.row}>
        {[2, 3, 5, 8].map(value => (
          <Chip
            key={value}
            label={String(value)}
            active={rounds === value}
            onPress={() => setRounds(value)}
          />
        ))}
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Truth or Lie</Text>
        <Text style={styles.infoText}>
          Each player gets a question and chooses Truth or Lie. The turn then
          passes automatically.
        </Text>
      </View>
      <View style={styles.start}>
        <Button
          title="Start Game →"
          disabled={!valid}
          onPress={() =>
            navigate('GamePlay', {
              players: players.map(name => name.trim()),
              rounds,
            })
          }
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  player: {flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8},
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {color: 'white', fontWeight: '900'},
  field: {flex: 1},
  remove: {fontSize: 25, color: colors.red, padding: 7},
  row: {flexDirection: 'row', gap: 8, flexWrap: 'wrap'},
  info: {
    marginTop: 22,
    padding: 16,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {color: colors.orange, fontWeight: '900', fontSize: 16},
  infoText: {color: colors.muted, lineHeight: 19, marginTop: 6},
  start: {marginTop: 24},
});
