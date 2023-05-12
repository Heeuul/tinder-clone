import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 

import HomeScreen from './screens/HomeScreen'; 
import ChatScreen from './screens/ChatScreen'; 
import LoginScreen from './screens/LoginScreen'; 

export default function App() 
{
  const Stack = createNativeStackNavigator(); 
  const user = false; 
  
  return (
    <NavigationContainer> 
      <Stack.Navigator> 
        {
          user ? 
          (
            <> 
              <Stack.Screen 
                name='Home' 
                component={HomeScreen} 
              /> 
              <Stack.Screen 
                name='Chat' 
                component={ChatScreen} 
              /> 
            </> 
          ) 
          : 
          ( 
            <Stack.Screen 
              name='Login' 
              component={LoginScreen} 
            /> 
          ) 
        } 
      </Stack.Navigator> 
    </NavigationContainer> 
  ); 
} 