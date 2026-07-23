import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius, shadow} from '../../constants/theme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'green';
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <Text
        style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {backgroundColor: colors.orange, ...shadow},
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {backgroundColor: colors.red},
  green: {backgroundColor: colors.green},
  text: {color: '#071018', fontWeight: '800', fontSize: 15},
  secondaryText: {color: colors.text},
  pressed: {opacity: 0.78},
  disabled: {opacity: 0.45},
});
