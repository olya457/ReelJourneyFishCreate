import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Field, Header, Label, Screen} from '../../components/UI';
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
      coordinates: existing?.coordinates ?? [0, 0],
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
  save: {marginTop: 22},
});
