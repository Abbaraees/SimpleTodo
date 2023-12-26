import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import Home from "./Home";
import FinishedScreen from "./Finished";

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name == "Home")
              return <Ionicons name="home-outline" size={24} color={focused ? "black" : "grey"} />
            else
              return <Ionicons name="checkmark" size={24} color={focused ? "black" : "grey"} />
          },
          tabBarActiveTintColor: 'black',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Finished" component={FinishedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}