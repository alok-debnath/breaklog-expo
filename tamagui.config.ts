import { defaultConfig, themes } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui' // or '@tamagui/core'

export const config = createTamagui({
  ...defaultConfig,
  themes: themes,
})

type CustomConfig = typeof config

// ensure types work
declare module 'tamagui' {
  interface TamaguiCustomConfig extends CustomConfig {}
}