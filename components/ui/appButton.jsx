import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { getTypeStyle } from '@/constants/typographyStyles';

const buttonTextVariantMap = {
  lg: 'button-sm',
  sm: 'button-xsm',
};

export default function AppButton({
  text,
  size = 'lg',
  type = 'primary',   // primary | secondary | ghost | bare
  state = 'normal',   // normal | pressed | disabled
  onPress,
  ...props
}) {
  const isDisabled = state === 'disabled';

  const colorSet =
    colors.semantic.button[type][isDisabled ? 'disabled' : state];

  const hasBorder = colorSet.border !== 'transparent';
  const isBare = type === 'bare';

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        isBare && styles.barePadding,
        {
          backgroundColor: colorSet.bg,
          borderColor: colorSet.border,
          borderWidth: hasBorder ? 1 : 0,
          opacity: pressed && !isDisabled ? 0.85 : 1,
        },
      ]}
    >
      <Text 
        style={[
          getTypeStyle(buttonTextVariantMap[size] ?? 'button-lg'),
          { color: colorSet.text },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    maxWidth: 300,
    width: '100%',
  },

  lg: {
    height: 52,
    paddingHorizontal: 32,
  },

  sm: {
    height: 32,
    paddingHorizontal: 16,
  },

  barePadding: {
    paddingHorizontal: 0,
  },
});
