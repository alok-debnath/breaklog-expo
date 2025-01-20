import { StyleSheet, Text, View } from "react-native";
import { Button, Label, Switch, XStack, YStack } from "tamagui";

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <Button>Plain</Button>
      </View>
      <View>
        <Text>Edit app/index.tsx to edit this screen..</Text>
      </View>
      <YStack padding="$3" minWidth={300} space="$4">
        <View>
          <XStack alignItems="center" space="$4">
            <Label width={90} htmlFor="notify">
              Notifications
            </Label>
            <Switch id="notify">
              <Switch.Thumb animation="quick" />
            </Switch>
          </XStack>
        </View>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#5442f5",
  },
});
