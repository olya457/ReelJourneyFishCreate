import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';
import {colors, radius} from '../../constants/theme';

export function Field(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor="#69879A"
      {...props}
      style={[styles.input, props.multiline && styles.multiline, props.style]}
    />
  );
}
export function Label({children}: PropsWithChildren) {
  return <Text style={styles.label}>{children}</Text>;
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    minHeight: 48,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
  },
  multiline: {height: 88, textAlignVertical: 'top', paddingTop: 13},
  label: {
    color: colors.muted,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 7,
    marginTop: 14,
  },
});
