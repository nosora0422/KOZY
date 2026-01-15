export const fonts = {
  400: 'OpenSans_400Regular',
  600: 'OpenSans_600SemiBold',
  700: 'OpenSans_700Bold',
};

// fallback if something unexpected comes in
export function getFontFamilyFromWeight(weight) {
  const w = Number(weight) || 400;
  return fonts[w] ?? fonts[400];
}
