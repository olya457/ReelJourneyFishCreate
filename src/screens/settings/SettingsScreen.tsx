import React, {useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {Chip, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
export function SettingsScreen() {
  const {back} = useApp();
  const [notifications, setNotifications] = useState(true);
  const [metric, setMetric] = useState(true);
  const shareApp = async () => {
    await Share.share({
      message:
        'Discover fishing locations with Wavora Journey: https://wavora.app',
    });
  };
  const rateApp = async () => {
    const url =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/us/search?term=Wavora%20Journey'
        : 'market://details?id=com.reeljourneyfishcreate';
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Store unavailable', 'Please try again later.');
    }
  };
  return (
    <Screen>
      <Header title="Settings" onBack={back} />
      <Label>Notifications</Label>
      <View style={styles.toggle}>
        <View>
          <Text style={styles.title}>Push Notifications</Text>
          <Text style={styles.sub}>Bite alerts, tips & reminders</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{true: colors.green}}
        />
      </View>
      <Label>Measurement</Label>
      <View style={styles.row}>
        <Chip label="Metric" active={metric} onPress={() => setMetric(true)} />
        <Chip
          label="Imperial"
          active={!metric}
          onPress={() => setMetric(false)}
        />
      </View>
      <Label>About</Label>
      <Pressable style={styles.link} onPress={shareApp}>
        <Text style={styles.title}>Share App</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
      <Pressable style={styles.link} onPress={rateApp}>
        <Text style={styles.title}>Rate App</Text>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
  },
  title: {color: colors.text, fontWeight: '700'},
  sub: {color: colors.muted, fontSize: 11, marginTop: 3},
  row: {flexDirection: 'row', gap: 8},
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 17,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  arrow: {fontSize: 22, color: colors.muted},
});
