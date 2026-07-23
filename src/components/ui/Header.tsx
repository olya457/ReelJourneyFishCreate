import React from 'react';
import {
  Pressable,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {colors} from '../../constants/theme';
export function Header({
  eyebrow,
  title,
  right,
  onBack,
  brandMark,
}: {
  eyebrow?: string;
  title: string;
  right?: React.ReactNode;
  onBack?: () => void;
  brandMark?: ImageSourcePropType;
}) {
  const {width} = useWindowDimensions();
  const compact = width < 360;
  return (
    <View style={[styles.header, compact && styles.headerCompact]}>
      {onBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.back}
          onPress={onBack}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      )}
      <View style={styles.headerTitle}>
        {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
        <View style={styles.titleRow}>
          <Text
            style={[styles.title, compact && styles.titleCompact]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {title}
          </Text>
          {brandMark && (
            <Image
              source={brandMark}
              resizeMode="contain"
              style={[styles.brandMark, compact && styles.brandMarkCompact]}
            />
          )}
        </View>
      </View>
      {right}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  headerCompact: {gap: 8, marginBottom: 12},
  headerTitle: {flex: 1},
  titleRow: {flexDirection: 'row', alignItems: 'center', gap: 8},
  eyebrow: {color: colors.muted, fontSize: 12, marginBottom: 2},
  title: {color: colors.text, fontSize: 25, fontWeight: '800'},
  titleCompact: {fontSize: 21},
  brandMark: {width: 42, height: 42},
  brandMarkCompact: {width: 32, height: 32},
  back: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 13,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backText: {color: colors.text, fontSize: 12, fontWeight: '700'},
});
