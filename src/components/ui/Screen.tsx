import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {colors} from '../../constants/theme';
export function Screen({
  children,
  scroll = true,
  style,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const {width, height} = useWindowDimensions();
  const compact = width < 360 || height < 700;
  const responsiveContent = {
    paddingHorizontal: compact ? 12 : Math.max(16, width * 0.045),
    paddingTop: compact ? 20 : Platform.OS === 'ios' ? 54 : 28,
    paddingBottom: compact ? 96 : 110,
  };
  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, responsiveContent, style]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, responsiveContent, styles.flex, style]}>
      {children}
    </View>
  );
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {content}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  flex: {flex: 1},
  screen: {flex: 1, backgroundColor: colors.background},
  content: {
    width: '100%',
    alignSelf: 'center',
  },
});
