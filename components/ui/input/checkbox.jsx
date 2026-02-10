import { Pressable, View, StyleSheet } from 'react-native';
import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

export default function CheckBox({ 
  label, 
  selected, 
  onPress, 
}) {
  return (
    <Pressable 
      style={styles.container} 
      onPress={onPress} 
      hitSlop={16}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!selected }}
    >
      <View style={[styles.outer, selected && styles.outerSelected]}>
        {selected && <Feather name="check" size={12} color={colors.semantic.input.border.normal.color} />}
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
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.semantic.input.border.normal.color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerSelected: {
    borderColor: colors.semantic.input.border.normal.color,
  },
  inner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.semantic.input.border.normal.color,
  },
});
