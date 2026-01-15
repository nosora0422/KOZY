import { typography } from './typography';
import { getFontFamilyFromWeight } from './fonts';

export function getTypeStyle(variant) {
  // Find the variant inside your grouped object
  const groups = Object.values(typography);
  for (const group of groups) {
    if (group?.[variant]) {
      const token = group[variant];

      return {
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        // RN-safe: use correct font file instead of relying on fontWeight
        fontFamily: getFontFamilyFromWeight(token.fontWeight),
      };
    }
  }

  // fallback to something safe
  return {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: getFontFamilyFromWeight(400),
  };
}
