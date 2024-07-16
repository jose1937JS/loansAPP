import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/HomeScreen';
import LoanDetailScreen from '../pages/LoanDetailScreen';
// import Header from '../components/Header';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // header: () => <Header />
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="LoanDetailScreen" component={LoanDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;