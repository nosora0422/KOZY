import { Pressable, View, StyleSheet } from 'react-native';
import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';

export default function RadioButton({ 
  label, 
  selected, 
  onPress, 
}) {
  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress} 
      hitSlop={16}
    >
      <View style={[styles.outer, selected && styles.outerSelected]}>
        {selected && <View style={styles.inner} />}
      </View>
      {label && <AppText variant="body-xsm">{label}</AppText>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.semantic.input.border.normal.color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerSelected: {
    borderColor: colors.semantic.input.border.normal.color,
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.semantic.input.border.normal.color,
  },
});
