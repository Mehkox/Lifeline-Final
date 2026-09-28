import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MedicalScreen from "./src/screens/MedicalScreen";
import QuizScreen from "./src/screens/QuizScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medical"
          component={MedicalScreen}
          options={{ title: "Medical Profile" }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Quiz" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
