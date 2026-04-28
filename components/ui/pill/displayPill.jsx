// components/ui/pill.js
import { View, StyleSheet } from 'react-native';
import AppText from '../appText';

export default function Pill({ label }) {
  return (
    <View style={styles.pill}>
      <AppText variant="body-xsm-strong" color="primary">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});