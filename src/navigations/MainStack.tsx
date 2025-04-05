import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DashboardScreen} from '../screens';
import BottomTabs from './BottomTabs';

export type HomeStackParamList = {
  DashboardScreen: any;
};
const Stack = createNativeStackNavigator<HomeStackParamList>();
const MainStack = () => {
  return (
    <>
      {/* <Stack.Screen name="DashboardScreen" component={DashboardScreen} /> */}
      <Stack.Screen
        name="DashboardScreen"
        component={BottomTabs}
        options={{gestureEnabled: false}}
      />
    </>
  );
};

export default MainStack;
