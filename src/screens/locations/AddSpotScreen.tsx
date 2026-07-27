import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Field, Header, Label, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {AppRoute} from '../../navigation/types';
import {useApp} from '../../store/AppContext';

export function AddSpotScreen({
  route,
}: {
  route: Extract<AppRoute, {name: 'AddSpot' | 'EditSpot'}>;
}) {
  const {spots, addSpot, updateSpot, back} = useApp();
  const existing =
    route.name === 'EditSpot'
      ? spots.find(item => item.id === route.params.id)
      : undefined;
  const [name, setName] = useState(existing?.name ?? '');
  const [description, setDescription] = useState(existing?.about ?? '');
  const [species, setSpecies] = useState(existing?.species.join(', ') ?? '');
  const [photoUri, setPhotoUri] = useState<string | undefined>(
    existing?.photoUri,
  );
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(
    existing?.coordinates,
  );
  const [locating, setLocating] = useState(false);

  const addPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.didCancel) {
      return;
    }
    if (result.errorCode) {
      Alert.alert('Photo unavailable', result.errorMessage);
      return;
    }
    setPhotoUri(result.assets?.[0]?.uri);
  };

  const addLocation = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Location permission required',
          'Allow location access to mark your current fishing spot.',
        );
        return;
      }
    } else {
      const granted = await new Promise<boolean>(resolve => {
        Geolocation.requestAuthorization(
          () => resolve(true),
          () => resolve(false),
        );
      });
      if (!granted) {
        Alert.alert(
          'Location permission required',
          'Allow location access to mark your current fishing spot.',
        );
        return;
      }
    }
    setLocating(true);
    Geolocation.getCurrentPosition(
      position => {
        setCoordinates([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setLocating(false);
      },
      error => {
        setLocating(false);
        Alert.alert('Location unavailable', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const save = () => {
    if (!name.trim()) {
      return;
    }
    const spot = {
      id: existing?.id ?? `custom-${Date.now()}`,
      name: name.trim(),
      region: existing?.region ?? 'Custom spot',
      country: existing?.country ?? '',
      about: description || 'A personal fishing location.',
      conditions:
        existing?.conditions ?? 'Add notes during your next visit.',
      bestTime: existing?.bestTime ?? 'Any time',
      facilities: existing?.facilities ?? [],
      species: species
        .split(',')
        .map(x => x.trim())
        .filter(Boolean),
      rules:
        existing?.rules ?? 'Check local regulations before fishing.',
      coordinates: coordinates ?? [0, 0],
      photoUri,
      saved: existing?.saved ?? true,
      custom: true,
    };
    if (existing) {
      updateSpot(spot);
    } else {
      addSpot(spot);
    }
    back();
  };
  return (
    <Screen>
      <Header title={existing ? 'Edit Location' : 'Add Location'} onBack={back} />
      <Label>Photos</Label>
      <View style={styles.photoRow}>
        <Pressable style={styles.photoPlaceholder} onPress={addPhoto}>
          {photoUri ? (
            <Image source={{uri: photoUri}} style={styles.photo} />
          ) : (
            <Text style={styles.photoText}>＋ Add</Text>
          )}
        </Pressable>
      </View>
      <Label>Location Name *</Label>
      <Field value={name} onChangeText={setName} placeholder="Hidden Creek" />
      <Label>Mark on Map</Label>
      <Pressable style={styles.mapPlaceholder} onPress={addLocation}>
        <Text style={styles.mapMarker}>
          {locating
            ? 'Finding location…'
            : coordinates
              ? `${coordinates[0].toFixed(5)}, ${coordinates[1].toFixed(5)}`
              : '＋ Add current location'}
        </Text>
      </Pressable>
      <Label>Description</Label>
      <Field
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="A quiet river bend, shaded and full of bass."
      />
      <Label>Fish Species</Label>
      <Field
        value={species}
        onChangeText={setSpecies}
        placeholder="Smallmouth Bass, Perch"
      />
      <View style={styles.save}>
        <Button
          title={existing ? 'Save Changes' : 'Save Location'}
          disabled={!name.trim()}
          onPress={save}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoRow: {flexDirection: 'row'},
  photoPlaceholder: {
    height: 82,
    width: 110,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#24506A',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoText: {color: '#8FA8B9'},
  photo: {width: '100%', height: '100%'},
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#103A57',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarker: {color: colors.text, fontWeight: '700'},
  save: {marginTop: 22},
});
