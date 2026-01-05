import { baseColors } from './base';

export const semanticColors = {
  text: {
    primary: baseColors.bodyInverted,
    secondary: baseColors.gray700,
    disabled: baseColors.gray400,
    placeholder: baseColors.gray400,
    error: baseColors.warning,
  },

  input: {
    bg: baseColors.background,
    text: baseColors.bodyInverted,
    placeholder: baseColors.gray400,

    border: {
      normal: {
        color: baseColors.primary,
        width: 1,
      },
      focused: {
        color: baseColors.primary,
        width: 2,
      },
      error: {
        color: baseColors.warning,
        width: 2,
      },
      disabled: {
        color: baseColors.gray200,
        width: 1,
      },
    },
  },

  button: {
    primary: {
      normal: {
        bg: baseColors.primary,
        text: baseColors.body,
        border: 'transparent',
      },
      pressed: {
        bg: baseColors.primary,
        text: baseColors.body,
        border: 'transparent',
      },
      disabled: {
        bg: '#3f3f3fff',
        text: baseColors.body,
        border: '#3f3f3fff',
      },
    },

    secondary: {
      normal: {
        bg: 'transparent',
        text: baseColors.bodyInverted,
        border: baseColors.bodyInverted,
      },
      pressed: {
        bg: 'transparent',
        text: baseColors.bodyInverted,
        border: baseColors.bodyInverted,
      },
      disabled: {
        bg: 'transparent',
        text: baseColors.gray700,
        border: '#3A3A3A',
      },
    },

    ghost: {
      normal: {
        bg: 'transparent',
        text: baseColors.bodyInverted,
        border: 'transparent',
      },
      pressed: {
        bg: baseColors.gray400,
        text: baseColors.bodyInverted,
        border: 'transparent',
      },
      disabled: {
        bg: 'transparent',
        text: baseColors.gray700,
        border: 'transparent',
      },
    },

    bare: {
      normal: {
        bg: 'transparent',
        text: baseColors.bodyInverted,
        border: 'transparent',
      },
      pressed: {
        bg: 'transparent',
        text: baseColors.bodyInverted,
        border: 'transparent',
      },
      disabled: {
        bg: 'transparent',
        text: baseColors.gray700,
        border: 'transparent',
      },
    },
  },
};
