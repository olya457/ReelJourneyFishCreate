import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {colors} from '../../constants/theme';
export function Empty({
  icon,
  title,
  text,
  action,
  image,
}: {
  icon: string;
  title: string;
  text: string;
  action?: React.ReactNode;
  image?: ImageSourcePropType;
}) {
  const {height} = useWindowDimensions();
  const compact = height < 700;
  return (
    <View style={[styles.empty, compact && styles.emptyCompact]}>
      {image ? (
        <Image
          source={image}
          resizeMode="contain"
          style={[styles.image, compact && styles.imageCompact]}
        />
      ) : (
        <Text style={[styles.icon, compact && styles.iconCompact]}>{icon}</Text>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      {action}
    </View>
  );
}
const styles = StyleSheet.create({
  empty: {
    flex: 1,
    minHeight: 420,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyCompact: {minHeight: 260, padding: 16},
  icon: {fontSize: 46, marginBottom: 16},
  iconCompact: {fontSize: 36, marginBottom: 10},
  image: {width: 92, height: 92, marginBottom: 16},
  imageCompact: {width: 70, height: 70, marginBottom: 10},
  title: {fontSize: 19, fontWeight: '800', color: colors.text},
  text: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginVertical: 9,
    maxWidth: 290,
  },
});
