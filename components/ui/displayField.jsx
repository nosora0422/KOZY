import { children } from 'react';
import AppText from './appText';
import { View } from 'react-native';

export default function DisplayField({
  title,
  children,
  ...props
}) {
  return (
    <View {...props}>
      <AppText variant="body-sm-strong" color="primary" style={{ marginBottom: 4 }}>
        {title}
      </AppText>
      <AppText variant="body-xsm" color="primary">
        {children}
      </AppText>
    </View>
  );
}