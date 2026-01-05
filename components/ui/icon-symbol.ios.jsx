import { SymbolView } from 'expo-symbols';

/**
 * Icon component using SF Symbols (iOS only via expo-symbols)
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}) {
  return (
    <SymbolView
      name={name}
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
