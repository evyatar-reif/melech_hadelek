import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import CarPicker from './screens/CarPicker';
// import {Provider} from 'react-redux';
// import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CarPicker" component={CarPicker} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}
