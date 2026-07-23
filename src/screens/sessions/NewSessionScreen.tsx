import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {
  Marker,
  MapPressEvent,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {Button, Chip, Field, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';

const sessionTypes = [
  {label: 'Morning', name: 'Morning Session', icon: '☀'},
  {label: 'Afternoon', name: 'Afternoon Session', icon: '◐'},
  {label: 'Evening', name: 'Evening Session', icon: '☾'},
  {label: 'Night', name: 'Night Session', icon: '✦'},
];

export function NewSessionScreen() {
  const {back, navigate, spots} = useApp();
  const firstSpot = spots[0];
  const [sessionType, setSessionType] = useState(sessionTypes[0]);
  const [location, setLocation] = useState(firstSpot.name);
  const [custom, setCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [coordinate, setCoordinate] = useState({
    latitude: firstSpot.coordinates[0],
    longitude: firstSpot.coordinates[1],
  });
  const [weather, setWeather] = useState('Clear');
  const [method, setMethod] = useState('Spinning');
  const chooseSpot = (id: string) => {
    const spot = spots.find(item => item.id === id);
    if (!spot) {
      return;
    }
    setCustom(false);
    setLocation(spot.name);
    setCoordinate({
      latitude: spot.coordinates[0],
      longitude: spot.coordinates[1],
    });
  };
  const chooseCustom = () => {
    setCustom(true);
    setLocation(customName);
  };
  const markMap = (event: MapPressEvent) =>
    setCoordinate(event.nativeEvent.coordinate);
  const start = () =>
    navigate('LiveSession', {
      name: sessionType.name,
      location: custom ? customName.trim() : location,
      weather,
      method,
      coordinates: [coordinate.latitude, coordinate.longitude],
    });
  const disabled = custom && !customName.trim();
  return (
    <Screen>
      <Header title="New Session" onBack={back} />
      <Label>Session Time *</Label>
      <View style={styles.wrap}>
        {sessionTypes.map(item => (
          <Chip
            key={item.label}
            label={`${item.icon} ${item.label}`}
            active={sessionType.label === item.label}
            onPress={() => setSessionType(item)}
          />
        ))}
      </View>
      <Text style={styles.sessionName}>{sessionType.name}</Text>
      <Label>Location *</Label>
      <View style={styles.wrap}>
        {spots.slice(0, 4).map(spot => (
          <Chip
            key={spot.id}
            label={spot.name}
            active={!custom && location === spot.name}
            onPress={() => chooseSpot(spot.id)}
          />
        ))}
      </View>
      <View style={styles.customChip}>
        <Chip
          label="＋ Custom Location"
          active={custom}
          onPress={chooseCustom}
        />
      </View>
      {custom && (
        <View>
          <Label>Location Name *</Label>
          <Field
            value={customName}
            onChangeText={value => {
              setCustomName(value);
              setLocation(value);
            }}
            placeholder="River bend, private pier…"
          />
          <Label>Tap the map to place a marker</Label>
          <View style={styles.map}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={StyleSheet.absoluteFill}
              initialRegion={{
                ...coordinate,
                latitudeDelta: 0.12,
                longitudeDelta: 0.12,
              }}
              onPress={markMap}
              mapType="standard"
              showsCompass>
              <Marker
                draggable
                coordinate={coordinate}
                pinColor={colors.orange}
                onDragEnd={event => setCoordinate(event.nativeEvent.coordinate)}
              />
            </MapView>
            <View pointerEvents="none" style={styles.coords}>
              <Text style={styles.coordsText}>
                {coordinate.latitude.toFixed(5)},{' '}
                {coordinate.longitude.toFixed(5)}
              </Text>
            </View>
          </View>
        </View>
      )}
      <Label>Weather</Label>
      <View style={styles.wrap}>
        {['Clear', 'Cloudy', 'Rain', 'Windy'].map(item => (
          <Chip
            key={item}
            label={item}
            active={weather === item}
            onPress={() => setWeather(item)}
          />
        ))}
      </View>
      <Label>Fishing Method</Label>
      <View style={styles.wrap}>
        {['Spinning', 'Fly', 'Bait', 'Trolling'].map(item => (
          <Chip
            key={item}
            label={item}
            active={method === item}
            onPress={() => setMethod(item)}
          />
        ))}
      </View>
      <Label>Notes (optional)</Label>
      <Field multiline placeholder="Trying the new spinner…" />
      <View style={styles.start}>
        <Button title="Start Session →" disabled={disabled} onPress={start} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', gap: 7, flexWrap: 'wrap'},
  sessionName: {
    color: colors.orange,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 10,
  },
  customChip: {marginTop: 8, alignSelf: 'flex-start'},
  map: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  coords: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(7,23,36,.9)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  coordsText: {color: colors.text, fontWeight: '700', fontSize: 11},
  start: {marginTop: 22},
});
