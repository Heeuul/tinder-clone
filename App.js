import { NavigationContainer } from '@react-navigation/native'; 

import { AuthProvider } from './hooks/useAuth'; 
import StackNavigator from './StackNavigator'; 

/* 
Contents: 
> Tailwind CSS (nativewindcss) 
> Navigation (react-navigation/native) 
> useContext API 
> Build (EAS) 
> Authenthication (expo-auth-session, Google Console, Firebase) 
> Swipeable cards (react-native-deck-swiper) 
> Matching algorithm 
> 1-on-1 private messaging 
*/ 

export default function App() 
{
  return (
    <NavigationContainer> 
      <AuthProvider> 
        <StackNavigator /> 
      </AuthProvider> 
    </NavigationContainer> 
  ); 
} 