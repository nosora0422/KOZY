import AppText from './appText';
import { Pressable, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

const STATUS_MAP = {
  varified: {
    text: 'Varified',
    icon: 'star',
  },
  unvarified: {
    text: 'Unvarified',
    icon: 'star-border',
  },
};

export default function Badge({
  status,
  onPress
}) {
    const { text, icon } = STATUS_MAP[status] ?? STATUS_MAP.unvarified;

    return (
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <AppText variant="caption" color="primary">
                    {text}
                </AppText>
                <MaterialIcons name={icon} size={16} color="#fff" />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 26,
    gap: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.base.primary,
    paddingHorizontal: 8,
    paddingVertical: 4
  }
});