import colors from 'tailwindcss/colors'
import { PluginAPI } from 'tailwindcss/types/config'
import typographyPlugin from '@tailwindcss/typography'

const heading = (theme: PluginAPI['theme']) =>
  ({
    fontWeight: theme('fontWeight.bold'),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }) as Record<string, string>

const gray = colors.gray // or slate, zinc, neutral, stone

const prose = (theme: PluginAPI['theme']) => ({
  css: {
    a: {
      color: theme('colors.link'),
      textDecoration: 'none',
    },
    h1: {
      lineHeight: theme('lineHeight.snug'),
    },
    h2: {
      lineHeight: theme('lineHeight.snug'),
    },
    h3: {
      lineHeight: theme('lineHeight.snug'),
    },
    h4: {
      lineHeight: theme('lineHeight.snug'),
    },
    h5: {
      lineHeight: theme('lineHeight.snug'),
    },
    h6: {
      lineHeight: theme('lineHeight.snug'),
    },
  },
})

export default {
  darkMode: 'class',
  plugins: [
    typographyPlugin,
    ({ addBase, addComponents, theme }: PluginAPI) => {
      addBase({
        h1: {
          ...heading(theme),
          fontSize: theme('fontSize.4xl'),
          textAlign: 'center',
        },
        h2: {
          ...heading(theme),
          fontSize: theme('fontSize.3xl'),
        },
        h3: {
          ...heading(theme),
          fontSize: theme('fontSize.2xl'),
        },
        h4: {
          ...heading(theme),
          fontSize: theme('fontSize.xl'),
        },
        h5: {
          ...heading(theme),
          fontSize: theme('fontSize.lg'),
        },
        h6: {
          ...heading(theme),
        },
      })
      addComponents({
        '.object-position-custom': {
          objectPosition: '50% 30%',
        },
      })
    },
  ],
  theme: {
    extend: {
      colors: {
        background: {
          bright: colors.white,
          brighten: gray['200'],
          dark: gray['800'],
          darken: gray['700'],
        },
        link: {
          bright: colors.blue['400'],
          dark: colors.blue['600'],
        },
        text: {
          bright: gray['50'],
          dark: gray['900'],
        },
      },
      screens: {
        12: { raw: '(min-aspect-ratio: 2/1)' },
      },
      typography: (theme: PluginAPI['theme']) => ({
        DEFAULT: prose(theme),
        sm: prose(theme),
        base: prose(theme),
        lg: prose(theme),
        xl: prose(theme),
        '2xl': prose(theme),
      }),
    },
  },
}
