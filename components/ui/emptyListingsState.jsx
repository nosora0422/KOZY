import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import AppButton from '@/components/ui/appButton';
import AppText from '@/components/ui/appText';

const DEFAULT_IMAGE = require('../../assets/images/No-Listings.png');

export default function EmptyListingsState({
  heading,
  description,
  imageSource = DEFAULT_IMAGE,
  actionText,
  onAction,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Image source={imageSource} style={styles.image} contentFit="contain" />
      <View style={styles.copy}>
        <AppText variant="headline-md" color="primary" style={styles.heading}>
          {heading}
        </AppText>
        {description ? (
          <AppText variant="body-sm" color="primary" style={styles.description}>
            {description}
          </AppText>
        ) : null}
      </View>
      {actionText && onAction ? (
        <AppButton text={actionText} type="primary" onPress={onAction} style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    paddingHorizontal: 32,
  },
  image: {
    width: '100%',
    maxWidth: 280,
    aspectRatio: 1,
  },
  copy: {
    gap: 16,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 300,
  },
  button: {
    maxWidth: 318,
  },
});
