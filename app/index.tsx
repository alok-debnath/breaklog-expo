import { Link, router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text variant='headlineMedium'>Index!</Text>
        <Button
          style={styles.button}
          icon='camera'
          mode='contained'
          onPress={() => router.push('/explore')}>
          Go Explore
        </Button>
        <Link
          href='/explore'
          style={styles.button}>
          Go to About screen
        </Link>
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
