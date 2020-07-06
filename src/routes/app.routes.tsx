import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import ContactProfile from '../pages/ContactProfile';
import CreateContact from '../pages/CreateContact';
import EditContact from '../pages/EditContact';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="ContactProfile" component={ContactProfile} />
      <App.Screen name="CreateContact" component={CreateContact} />
      <App.Screen name="EditContact" component={EditContact} />
    </App.Navigator>
  );
};

export default AppRoutes;
