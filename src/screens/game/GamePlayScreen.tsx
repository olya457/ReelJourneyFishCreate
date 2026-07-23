import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, FadeIn, Header, Screen} from '../../components/UI';
import {honestQuestions} from '../../data/content';
import {colors} from '../../constants/theme';
import {AppRoute} from '../../navigation/types';
import {useApp} from '../../store/AppContext';
type Answer = {truth: number; lie: number};
export function GamePlayScreen({
  route,
}: {
  route: Extract<AppRoute, {name: 'GamePlay'}>;
}) {
  const {back} = useApp();
  const players = route.params.players;
  const rounds = route.params.rounds;
  const [turn, setTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>(
    players.map(() => ({truth: 0, lie: 0})),
  );
  const questionIndex = (round - 1) * players.length + turn;
  const question = honestQuestions[questionIndex % honestQuestions.length];
  const choose = (choice: 'truth' | 'lie') => {
    setAnswers(current =>
      current.map((answer, index) =>
        index === turn ? {...answer, [choice]: answer[choice] + 1} : answer,
      ),
    );
    if (turn === players.length - 1) {
      if (round === rounds) {
        setFinished(true);
      } else {
        setTurn(0);
        setRound(value => value + 1);
      }
    } else {
      setTurn(value => value + 1);
    }
  };
  const totals = useMemo(
    () =>
      answers.reduce(
        (result, item) => ({
          truth: result.truth + item.truth,
          lie: result.lie + item.lie,
        }),
        {truth: 0, lie: 0},
      ),
    [answers],
  );
  if (finished) {
    return (
      <Screen>
        <Header title="Game Complete" onBack={back} />
        <View style={styles.finish}>
          <Text style={styles.trophy}>🏆</Text>
          <Text style={styles.finishTitle}>Thanks for being honest!</Text>
          <Text style={styles.finishMeta}>
            {totals.truth} truths · {totals.lie} lies
          </Text>
        </View>
        {players.map((player, index) => (
          <View key={`${player}-${index}`} style={styles.result}>
            <View>
              <Text style={styles.resultName}>{player}</Text>
              <Text style={styles.resultDetail}>
                Truth {answers[index].truth} · Lie {answers[index].lie}
              </Text>
            </View>
            <Text style={styles.resultTotal}>
              {answers[index].truth + answers[index].lie}
            </Text>
          </View>
        ))}
        <View style={styles.return}>
          <Button title="Return to Game Menu" onPress={back} />
        </View>
      </Screen>
    );
  }
  return (
    <Screen>
      <Header
        eyebrow={`Round ${round} of ${rounds}`}
        title={players[turn]}
        onBack={back}
      />
      <Text style={styles.turnLabel}>CURRENT PLAYER</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {players[turn][0]?.toUpperCase() || 'P'}
        </Text>
      </View>
      <FadeIn key={`${round}-${turn}`} style={styles.questionCard}>
        <Text style={styles.questionType}>HONEST QUESTION</Text>
        <Text style={styles.question}>{question}</Text>
      </FadeIn>
      <Text style={styles.instruction}>Answer aloud, then choose:</Text>
      <View style={styles.choiceRow}>
        <View style={styles.choice}>
          <Button
            title="✓ Truth"
            variant="green"
            onPress={() => choose('truth')}
          />
        </View>
        <View style={styles.choice}>
          <Button
            title="✦ Lie"
            variant="danger"
            onPress={() => choose('lie')}
          />
        </View>
      </View>
      <View style={styles.players}>
        {players.map((player, index) => (
          <View
            key={`${player}-${index}`}
            style={[styles.player, index === turn && styles.playerActive]}>
            <Text
              style={[
                styles.playerName,
                index === turn && styles.playerNameActive,
              ]}
              numberOfLines={1}>
              {player}
            </Text>
            <Text
              style={[
                styles.answerCount,
                index === turn && styles.playerNameActive,
              ]}>
              {answers[index].truth + answers[index].lie}/{rounds}
            </Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  turnLabel: {
    color: colors.muted,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    marginTop: 8,
  },
  avatarText: {fontSize: 25, fontWeight: '900', color: colors.background},
  questionCard: {
    flex: 1,
    maxHeight: 320,
    minHeight: 220,
    marginVertical: 22,
    borderRadius: 22,
    padding: 24,
    backgroundColor: '#1689D0',
    justifyContent: 'center',
  },
  questionType: {
    color: '#D9F1FF',
    fontSize: 11,
    fontWeight: '900',
    marginBottom: 18,
  },
  question: {color: 'white', fontSize: 25, lineHeight: 33, fontWeight: '900'},
  instruction: {color: colors.muted, textAlign: 'center', marginBottom: 12},
  choiceRow: {flexDirection: 'row', gap: 10},
  choice: {flex: 1},
  players: {flexDirection: 'row', gap: 7, marginTop: 'auto', paddingTop: 22},
  player: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  playerActive: {backgroundColor: colors.orange, borderColor: colors.orange},
  playerName: {color: colors.muted, fontSize: 11, fontWeight: '700'},
  playerNameActive: {color: colors.background},
  answerCount: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 3,
  },
  finish: {alignItems: 'center', paddingVertical: 20},
  trophy: {fontSize: 54},
  finishTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 8,
  },
  finishMeta: {color: colors.orange, fontWeight: '800', marginTop: 7},
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 9,
  },
  resultName: {color: colors.text, fontSize: 16, fontWeight: '800'},
  resultDetail: {color: colors.muted, marginTop: 4},
  resultTotal: {fontSize: 24, color: colors.orange, fontWeight: '900'},
  return: {marginTop: 18},
});
