import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
import {Spot} from '../../types';

export function MapScreen() {
  const {spots, navigate} = useApp();
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] = useState<Spot>();
  const focus = (spot: Spot) => {
    setSelected(spot);
    mapRef.current?.animateToRegion(
      {
        latitude: spot.coordinates[0],
        longitude: spot.coordinates[1],
        latitudeDelta: 3,
        longitudeDelta: 3,
      },
      500,
    );
  };
  return (
    <View style={styles.screen}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: 42.8,
          longitude: -112,
          latitudeDelta: 32,
          longitudeDelta: 32,
        }}
        mapType="standard"
        showsCompass
        showsScale
        toolbarEnabled={false}>
        {spots
          .filter(s => s.coordinates[0] || s.coordinates[1])
          .map(spot => (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.coordinates[0],
                longitude: spot.coordinates[1],
              }}
              pinColor={selected?.id === spot.id ? colors.orange : colors.blue}
              onPress={() => focus(spot)}>
              <Callout onPress={() => navigate('SpotDetails', {id: spot.id})}>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{spot.name}</Text>
                  <Text>{spot.region}</Text>
                  <Text style={styles.details}>Tap to view details</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      {selected && (
        <View style={styles.previewOverlay} pointerEvents="box-none">
          <View style={styles.preview}>
            <Pressable
              style={styles.close}
              onPress={() => setSelected(undefined)}
              hitSlop={12}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
            <Text style={styles.name}>{selected.name}</Text>
            <Text style={styles.about} numberOfLines={2}>
              {selected.about}
            </Text>
            <Pressable
              style={styles.detailsButton}
              onPress={() => navigate('SpotDetails', {id: selected.id})}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {flex: 1},
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 20,
    elevation: 20,
  },
  preview: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    padding: 18,
    paddingTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 21,
    elevation: 21,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface2,
    zIndex: 22,
    elevation: 22,
  },
  closeText: {color: colors.text, fontSize: 24, lineHeight: 26},
  name: {fontSize: 20, color: colors.text, fontWeight: '800'},
  about: {color: colors.muted, lineHeight: 18, marginTop: 5, marginRight: 30},
  detailsButton: {
    marginTop: 16,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  callout: {width: 180, padding: 5},
  calloutTitle: {fontWeight: '800', fontSize: 16},
  details: {color: '#287FC0', marginTop: 5},
});
