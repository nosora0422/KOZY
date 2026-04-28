import React from 'react';
import { Text } from 'react-native';
import { getTypeStyle } from '@/constants/typographyStyles';
import { colors } from '@/constants/colors';


export default function AppText({
  children,
  variant = 'body-md',
  color = 'primary', // fallback for semantic text colors
  textColor, // new prop for custom color
  style,
  ...props
}) {
  // Determine color: textColor prop > semantic.text > base
  let resolvedColor = textColor;
  if (!resolvedColor) {
    resolvedColor = colors.semantic?.text?.[color] || colors.base?.[color] || colors.semantic.text.primary;
  }
  return (
    <Text
      {...props}
      style={[
        {
          color: resolvedColor,
        },
        getTypeStyle(variant),
        style,
      ]}
    >
      {children}
    </Text>
  );
}
