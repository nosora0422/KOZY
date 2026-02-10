import { View, StyleSheet } from 'react-native';
import AppText from '@/components/ui/appText';

export default function InfoList({ title, items }) {
  return (
    <View style={styles.container}>
      {title && (
        <AppText variant="body-sm-strong" color="primary" style={styles.title}>
          {title}
        </AppText>
      )}

      <View style={styles.list}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <AppText variant="body-sm" color="primary" style={styles.bullet}>
              •
            </AppText>
            <AppText variant="body-sm" color="primary" style={styles.text}>
              {item}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 12,
  },
  list: {
    gap: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    marginRight: 8,
  },
  text: {
    flex: 1,
  },
});
