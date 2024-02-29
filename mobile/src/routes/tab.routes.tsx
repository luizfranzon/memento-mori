import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { AntDesign } from '@expo/vector-icons';

import Home from "../screens/Home"
import Logs from "../screens/Logs"

const Tab = createBottomTabNavigator()

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, tabBarStyle: {
          backgroundColor: '#000000',
          height: 70,
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },

      }} >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => <AntDesign size={size} color={focused ? "#b1261f" : color} name="home" />,
          tabBarShowLabel: false
        }}
      />

      <Tab.Screen
        name="Logs"
        component={Logs}
        options={{
          tabBarIcon: ({ color, size, focused }) => <AntDesign size={size} color={focused ? "#b1261f" : color} name="database" />,
          tabBarShowLabel: false
        }}
      />
    </Tab.Navigator>
  )
}