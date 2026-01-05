import React from 'react';
import { Text } from 'react-native';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';

function getVariantStyle(variant) {
  if (variant.startsWith('headline')) {
    return typography.heading[variant];
  }

  if (variant.includes('strong')) {
    return typography.bodyStrong[variant];
  }

  if (variant.startsWith('body')) {
    return typography.body[variant];
  }

  if (variant.startsWith('button')) {
    return typography.button[variant];
  }

  return typography.caption.caption;
}

export default function AppText({
  children,
  variant = 'body-md',
  color = 'primary',
  style,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[
        {
          color: colors.semantic?.text?.[color] ?? colors.semantic.text.primary,
        },
        getVariantStyle(variant),
        style,
      ]}
    >
      {children}
    </Text>
  );
}
