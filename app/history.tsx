import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function History() {
  return (
    <>
      <View style={styles.container}>
        <Text variant='headlineMedium'>History!</Text>
        <Button
          style={styles.button}
          icon='camera'
          mode='contained'
          onPress={() => router.push('/')}>
          Go Home
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
  },
});
