import { Pressable, View } from 'react-native';
import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';

export default function DisplayInput({
  label,
  value,
  onPress,
  placeHolder,
  isTextArea
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={{
        paddingVertical: 12,
        width: '100%',
      }}>
        <AppText variant="body-sm-strong">
          {label}
        </AppText>
        <View style={{
          width: '100%',
          height: isTextArea ? 120 : "",
          marginTop: 4,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: colors.semantic.input.border.normal.color,
          borderRadius: isTextArea ? 16 :  999,
          backgroundColor: colors.semantic.input.background,
        }}>
          <AppText variant="body-xsm" color="secondary">
            {value || placeHolder}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
