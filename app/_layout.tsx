import React, { useMemo } from 'react';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './index';
import Explore from './explore';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme({ fallbackSourceColor: '#3E8260' });

  // Create theme based on color scheme
  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  const SCREEN_CONFIG = [
    {
      name: 'History',
      component: Explore,
      options: {
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Icon
            name='cog'
            size={size}
            color={color}
          />
        ),
      },
    },
    {
      name: 'index',
      component: HomeScreen,
      options: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Icon
            name='home'
            size={size}
            color={color}
          />
        ),
      },
    },
    {
      name: 'explore',
      component: Explore,
      options: {
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Icon
            name='cog'
            size={size}
            color={color}
          />
        ),
      },
    },
  ];

  return (
    <PaperProvider theme={paperTheme}>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route }) => {
              navigation.dispatch(CommonActions.navigate(route.name));
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              return options.tabBarIcon?.({ focused, color, size: 24 });
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return options.tabBarLabel?.toString() || route.name;
            }}
          />
        )}>
        {SCREEN_CONFIG.map((screen) => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Tab.Navigator>
    </PaperProvider>
  );
}
