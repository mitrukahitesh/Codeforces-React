import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
import Home from './activity/home'
import User from './activity/user'
import Problem from './activity/problem'

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#3081cc',
    height: 70
  },
  headerTintColor: '#ffffff',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: config,
    close: config
  }
};

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions} headerMode='float'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Contests' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ title: "User" }}
        />
        <Stack.Screen
          name="Problem"
          component={Problem}
          options={{ title: "Problem Set" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;