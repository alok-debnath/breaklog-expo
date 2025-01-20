import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { config } from "@/tamagui.config";

export default function RootLayout() {
  return (
    <TamaguiProvider config={config} defaultTheme="light_blue">
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        {/* <Stack.Screen name="about" options={{ title: "About" }} /> */}
      </Stack>
    </TamaguiProvider>
  );
}
