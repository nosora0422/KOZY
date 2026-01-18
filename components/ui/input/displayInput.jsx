import { Pressable, View } from 'react-native';
import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';

export default function DisplayInput({
  label,
  value,
  onPress,
  isMulti = false,
  max = 3,
  placeholder,
  style
}) {
  // normalize value
  const values = isMulti
    ? Array.isArray(value) ? value : []
    : value ? [value] : [];

  return (
    <Pressable onPress={onPress} style={style}>
      <View style={{ paddingVertical: 12 }}>
        <AppText variant="body-sm-strong">
          {label}
        </AppText>

        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {isMulti
            ? Array.from({ length: max }).map((_, index) => {
                const item = values[index];

                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderColor: colors.semantic.input.border.normal.color,
                      borderRadius: 999,
                      backgroundColor: colors.semantic.input.background,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <AppText
                      variant="body-xsm"
                      color={item ? 'primary' : 'secondary'}
                    >
                      {item || placeholder}
                    </AppText>
                  </View>
                );
              })
            : (
              <View
                style={{
                  width: '100%',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderWidth: 1,
                  borderColor: colors.semantic.input.border.normal.color,
                  borderRadius: 999,
                  backgroundColor: colors.semantic.input.background,
                  justifyContent: 'center',
                }}
              >
                <AppText
                  variant="body-xsm"
                  color={value ? 'primary' : 'secondary'}
                >
                  {value || placeholder}
                </AppText>
              </View>
            )}
        </View>
      </View>
    </Pressable>
  );
}
