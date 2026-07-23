import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import {fallbackSpotImage, spotImages} from '../../assets/images';
import {Button, Card, Chip, FadeIn, Header, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
import {AppRoute} from '../../navigation/types';

export function SpotDetailsScreen({
  route,
}: {
  route: Extract<AppRoute, {name: 'SpotDetails'}>;
}) {
  const {spots, back, toggleSaved, setTab} = useApp();
  const spot = spots.find(item => item.id === route.params.id) ?? spots[0];
  const coordinate = {
    latitude: spot.coordinates[0],
    longitude: spot.coordinates[1],
  };
  const openFullMap = () => {
    setTab('Map');
    back();
  };
  return (
    <Screen style={styles.screen}>
      <Image
        source={spotImages[spot.id] || fallbackSpotImage}
        style={styles.hero}
      />
      <View style={styles.content}>
        <Header
          eyebrow={`⌖ ${spot.region} · ${spot.country}`}
          title={spot.name}
          onBack={back}
        />
        <FadeIn>
          <Button
            title={spot.saved ? 'Saved ✓' : 'Save Spot'}
            variant={spot.saved ? 'green' : 'primary'}
            onPress={() => toggleSaved(spot.id)}
          />
          <Text style={styles.heading}>About</Text>
          <Text style={styles.copy}>{spot.about}</Text>
          <Text style={styles.heading}>Location</Text>
          <View style={styles.mapCard}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={StyleSheet.absoluteFill}
              initialRegion={{
                ...coordinate,
                latitudeDelta: 0.16,
                longitudeDelta: 0.16,
              }}
              mapType="standard"
              showsCompass
              showsScale
              pitchEnabled={false}
              toolbarEnabled={false}>
              <Marker
                coordinate={coordinate}
                pinColor={colors.orange}
                title={spot.name}
                description={spot.region}>
                <Callout>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{spot.name}</Text>
                    <Text>{spot.region}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>
            <View pointerEvents="none" style={styles.coordinateBadge}>
              <Text style={styles.coordinateText}>
                {spot.coordinates.map(value => value.toFixed(4)).join(', ')}
              </Text>
            </View>
          </View>
          <View style={styles.mapButton}>
            <Button
              title="Open Full Map"
              variant="secondary"
              onPress={openFullMap}
            />
          </View>
          <View style={styles.row}>
            <Card style={styles.half}>
              <Text style={styles.mini}>Conditions</Text>
              <Text style={styles.cardText}>{spot.conditions}</Text>
            </Card>
            <Card style={styles.half}>
              <Text style={styles.mini}>Best Time</Text>
              <Text style={styles.cardText}>{spot.bestTime}</Text>
            </Card>
          </View>
          <Text style={styles.heading}>Available Facilities</Text>
          <View style={styles.chips}>
            {spot.facilities.map(item => (
              <Chip key={item} label={`✓ ${item}`} />
            ))}
          </View>
          <Text style={styles.heading}>Fish Species</Text>
          <View style={styles.chips}>
            {spot.species.map(item => (
              <Chip key={item} label={`◉ ${item}`} active />
            ))}
          </View>
          <Text style={styles.heading}>Rules & Restrictions</Text>
          <View style={styles.warning}>
            <Text style={styles.warningText}>⚠ {spot.rules}</Text>
          </View>
        </FadeIn>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {paddingHorizontal: 0, paddingTop: 0},
  hero: {width: '100%', height: 300},
  content: {
    paddingHorizontal: 18,
    marginTop: -20,
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  heading: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 9,
  },
  copy: {color: '#C7D5DF', lineHeight: 22},
  mapCard: {
    height: 210,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#DCE8ED',
  },
  coordinateBadge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(7,23,36,.9)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 9,
  },
  coordinateText: {color: colors.text, fontSize: 11, fontWeight: '700'},
  mapButton: {marginTop: 10},
  callout: {width: 150, padding: 4},
  calloutTitle: {fontSize: 15, fontWeight: '800', marginBottom: 3},
  row: {flexDirection: 'row', gap: 10, marginTop: 18},
  half: {flex: 1},
  mini: {color: colors.muted, fontSize: 11, marginBottom: 7},
  cardText: {
    color: colors.text,
    fontWeight: '700',
    lineHeight: 18,
    fontSize: 13,
  },
  chips: {flexDirection: 'row', gap: 7, flexWrap: 'wrap'},
  warning: {
    backgroundColor: colors.amberSurface,
    borderWidth: 1,
    borderColor: '#68450D',
    padding: 16,
    borderRadius: 16,
  },
  warningText: {color: '#EFA02D', lineHeight: 20},
});
