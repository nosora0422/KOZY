import React from 'react';
import { Text } from 'react-native';
import { getTypeStyle } from '@/constants/typographyStyles';
import { colors } from '@/constants/colors';


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
        getTypeStyle(variant),
        style,
      ]}
    >
      {children}
    </Text>
  );
}
