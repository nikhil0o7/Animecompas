import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/Home";
import AnimeTable from "./pages/AnimeData";
import RecommendedAnime from "./pages/RecommendedAnime";
import { QueryClient, QueryClientProvider } from "react-query";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="AnimeData" component={AnimeTable} />
            <Stack.Screen
              name="RecommendedAnime"
              component={RecommendedAnime}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
