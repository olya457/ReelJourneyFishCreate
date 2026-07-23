import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Field, Header, Label, Screen} from '../../components/UI';
import {useApp} from '../../store/AppContext';
export function AddSpotScreen() {
  const {addSpot, back} = useApp();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [species, setSpecies] = useState('');
  const save = () => {
    if (!name.trim()) {
      return;
    }
    addSpot({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      region: 'Custom spot',
      country: '',
      about: description || 'A personal fishing location.',
      conditions: 'Add notes during your next visit.',
      bestTime: 'Any time',
      facilities: [],
      species: species
        .split(',')
        .map(x => x.trim())
        .filter(Boolean),
      rules: 'Check local regulations before fishing.',
      coordinates: [0, 0],
      saved: true,
      custom: true,
    });
    back();
  };
  return (
    <Screen>
      <Header title="Add Location" onBack={back} />
      <Label>Photos</Label>
      <View style={styles.photoRow}>
        {['＋ Add', 'Photo', 'Photo'].map(x => (
          <View key={x} style={styles.photoPlaceholder}>
            <Text style={styles.photoText}>{x}</Text>
          </View>
        ))}
      </View>
      <Label>Location Name *</Label>
      <Field value={name} onChangeText={setName} placeholder="Hidden Creek" />
      <Label>Mark on Map</Label>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapMarker}>Location</Text>
      </View>
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
        <Button title="Save Location" disabled={!name.trim()} onPress={save} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photoRow: {flexDirection: 'row', gap: 10},
  photoPlaceholder: {
    height: 82,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#24506A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoText: {color: '#8FA8B9'},
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#103A57',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarker: {color: '#8FA8B9', fontWeight: '700'},
  save: {marginTop: 22},
});
