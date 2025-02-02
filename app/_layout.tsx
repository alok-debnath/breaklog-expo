import React, { useMemo } from 'react';
import { CommonActions, useNavigationState } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Appbar,
  Drawer,
  useTheme,
} from 'react-native-paper';
import { View, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from './index';
import Profile from './profile';
import History from './history';

const DrawerNav = createDrawerNavigator();

function CustomHeader({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const routeIndex = useNavigationState((state) => state.index);
  const currentRoute = useNavigationState((state) => state.routes[routeIndex]?.name);

  // Get the title based on current route
  const getHeaderTitle = () => {
    if (currentRoute === 'home') return 'Breaklog';
    return currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);
  };

  return (
    <Appbar.Header
      style={[
        styles.header,
        {
          backgroundColor: theme.colors.elevation.level2,
          shadowColor: theme.colors.shadow,
          marginTop: insets.top + 15,
        },
      ]}>
      <Appbar.Action
        icon='menu'
        onPress={() => navigation.toggleDrawer()}
        color={theme.colors.onSurface}
      />
      <Appbar.Content
        title={getHeaderTitle()}
        titleStyle={[styles.title, { color: theme.colors.onSurface }]}
      />
      <View style={styles.profileContainer}>
        <Appbar.Action
          icon='account-circle'
          size={34}
          onPress={() => navigation.navigate('profile')}
          style={[styles.profileIcon, { backgroundColor: theme.colors.surfaceVariant }]}
          color={theme.colors.primary}
        />
      </View>
    </Appbar.Header>
  );
}

function CustomDrawerContent(props: any) {
  const theme = useTheme();
  const routeIndex = useNavigationState((state) => state.index);
  const currentRoute = useNavigationState((state) => state.routes[routeIndex]?.name.toLowerCase());

  return (
    <View style={[{ backgroundColor: theme.colors.background }]}>
      <Drawer.Section
        title='Breaklog'
        style={[styles.drawerSection]}>
        {['home', 'history', 'profile'].map((route) => (
          <Drawer.Item
            key={route}
            label={route.charAt(0).toUpperCase() + route.slice(1)}
            icon={getIconForRoute(route)}
            onPress={() => props.navigation.navigate(route)}
            style={styles.drawerItem}
            active={currentRoute === route}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurface: currentRoute === route ? theme.colors.primary : theme.colors.onSurface,
              },
            }}
          />
        ))}
      </Drawer.Section>
    </View>
  );
}

function getIconForRoute(route: string) {
  switch (route) {
    case 'home':
      return 'home';
    case 'history':
      return 'history';
    case 'profile':
      return 'account-circle';
    default:
      return 'circle';
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({ fallbackSourceColor: '#3E8260' });
  const paperTheme = useMemo(
    () => ({
      ...(colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme),
      colors: colorScheme === 'dark' ? theme.dark : theme.light,
    }),
    [colorScheme, theme]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar
        backgroundColor={paperTheme.colors.surface}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <DrawerNav.Navigator
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          headerTransparent: true,
          drawerType: 'slide',
          drawerStyle: {
            backgroundColor: paperTheme.colors.surface,
            width: '75%',
            paddingTop: 0, // Remove default padding
            marginTop: 0, // Remove default margin
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <DrawerNav.Screen
          name='home'
          component={HomeScreen}
        />
        <DrawerNav.Screen
          name='history'
          component={History}
        />
        <DrawerNav.Screen
          name='profile'
          component={Profile}
        />
      </DrawerNav.Navigator>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 16, // Only horizontal margin
    borderRadius: 28,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  profileContainer: {
    marginRight: 8,
  },
  profileIcon: {
    borderRadius: 17,
  },
  drawerSection: {
    marginTop: 0, // Remove default margin
    width: '100%',
  },
  drawerItem: {
    marginVertical: 6,
    borderRadius: 12,
  },
});
