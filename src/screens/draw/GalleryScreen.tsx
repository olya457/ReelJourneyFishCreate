import React, {useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Button, Empty, Header, Screen} from '../../components/UI';
import {colors} from '../../constants/theme';
import {useApp} from '../../store/AppContext';
import {Artwork} from '../../types';
import {appAssets} from '../../assets/images';

function ArtworkCanvas({
  artwork,
  large = false,
}: {
  artwork: Artwork;
  large?: boolean;
}) {
  const [size, setSize] = useState({width: 1, height: 1});
  return (
    <View
      onLayout={event =>
        setSize({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
      style={[styles.canvas, large ? styles.canvasLarge : styles.canvasSmall]}>
      {artwork.points.map((point, index) => {
        const dotSize = Math.max(
          2,
          point.size * Math.min(size.width, size.height),
        );
        return (
          <View
            key={`${artwork.id}-${index}`}
            style={[
              styles.dot,
              {
                left: point.x * size.width - dotSize / 2,
                top: point.y * size.height - dotSize / 2,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: point.color,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

export function GalleryScreen() {
  const {back, artworks, deleteArtwork} = useApp();
  const [selected, setSelected] = useState<Artwork | null>(null);
  const remove = (artwork: Artwork) =>
    Alert.alert(
      'Delete drawing?',
      'This artwork will be permanently removed.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteArtwork(artwork.id);
            if (selected?.id === artwork.id) {
              setSelected(null);
            }
          },
        },
      ],
    );
  return (
    <Screen>
      <Header
        title="My Gallery"
        onBack={back}
        brandMark={appAssets.wavoraJourneyFishMark}
      />
      {artworks.length === 0 ? (
        <Empty
          icon="🖼️"
          title="Gallery is empty"
          text="Create a drawing and tap Save to add it to your personal gallery."
          action={<Button title="Start Drawing" onPress={back} />}
        />
      ) : (
        <View style={styles.grid}>
          {artworks.map(artwork => (
            <View key={artwork.id} style={styles.item}>
              <ArtworkCanvas artwork={artwork} />
              <Text style={styles.title} numberOfLines={2}>
                {artwork.title}
              </Text>
              <Text style={styles.date}>
                {new Date(artwork.createdAt).toLocaleDateString()}
              </Text>
              <View style={styles.actions}>
                <View style={styles.flex}>
                  <Button
                    title="Open"
                    variant="secondary"
                    onPress={() => setSelected(artwork)}
                  />
                </View>
                <Pressable
                  style={styles.delete}
                  onPress={() => remove(artwork)}>
                  <Text style={styles.deleteText}>×</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
      <Modal
        visible={Boolean(selected)}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setSelected(null)}>
        {selected && (
          <View style={styles.viewer}>
            <Header title={selected.title} onBack={() => setSelected(null)} />
            <Text style={styles.prompt}>{selected.prompt}</Text>
            <ArtworkCanvas artwork={selected} large />
            <View style={styles.viewerActions}>
              <View style={styles.flex}>
                <Button
                  title="Close"
                  variant="secondary"
                  onPress={() => setSelected(null)}
                />
              </View>
              <View style={styles.flex}>
                <Button
                  title="Delete"
                  variant="danger"
                  onPress={() => remove(selected)}
                />
              </View>
            </View>
          </View>
        )}
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  grid: {flexDirection: 'row', gap: 12, flexWrap: 'wrap'},
  item: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 9,
    borderWidth: 1,
    borderColor: colors.border,
  },
  canvas: {borderRadius: 11, overflow: 'hidden', backgroundColor: '#F5F1E8'},
  canvasSmall: {height: 145},
  canvasLarge: {flex: 1, minHeight: 320, borderRadius: 18},
  dot: {position: 'absolute'},
  title: {color: colors.text, fontWeight: '800', fontSize: 13, marginTop: 10},
  date: {color: colors.muted, fontSize: 11, marginVertical: 6},
  actions: {flexDirection: 'row', gap: 7},
  flex: {flex: 1},
  delete: {
    width: 42,
    borderRadius: 12,
    backgroundColor: '#421A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {color: colors.red, fontSize: 25},
  viewer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 18,
    paddingTop: 50,
    paddingBottom: 28,
  },
  prompt: {color: colors.muted, lineHeight: 20, marginBottom: 13},
  viewerActions: {flexDirection: 'row', gap: 10, marginTop: 14},
});
