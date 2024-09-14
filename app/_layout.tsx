import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import Home from "./Home";
import CoffeeDetailsScreen from "./CoffeeDetailsScreen";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { FONTFAMILY } from "@/assets/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeansDetailsScreen from "./BeansDetailsScreen";
import FavoritesScreen from "./FavoritesScreen";
import CartsScreen from "./CartsScreen";
import { Provider } from "react-redux";
import store from "../store";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CoffeeStack() {
  return (
    <>
      <StatusBar
        backgroundColor="#262B33" // تعيين لون الخلفية لشريط الحالة
        barStyle="light-content" // تعيين لون النص في شريط الحالة إلى أبيض
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#222222", // تعيين خلفية الشريط العلوي
          },
          headerTintColor: "#222",
        }}
      >
        <Stack.Screen
          name="Home2"
          component={Home}
          options={{
            headerTitle: () => (
              <Text
                style={{
                  color: "#FFA500",
                  fontSize: 20,
                  fontFamily: FONTFAMILY.poppins_extralight,
                }}
              >
                Coffe Shop
              </Text>
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                {/* <Text style={{ color: "#fff" }}>Icon</Text> */}
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="CoffeeDetailsScreen"
          component={CoffeeDetailsScreen}
          options={{
            headerShown: false, // إظهار شريط العنوان
            headerBackTitle: "Back", // نص زر الرجوع
          }}
        />
        <Stack.Screen
          name="BeansDetailsScreen"
          component={BeansDetailsScreen}
          options={({ navigation }) => ({
            headerShown: false, // Show header with back button
            headerBackTitle: "Back", // Text for back button
          })}
        />
      </Stack.Navigator>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    TitleFont: require("@/assets/fonts/Poppins-ExtraLight.ttf"), // استبدل YourFont باسم ملف الخط
  });

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="#262B33" // تعيين لون الخلفية لشريط الحالة
        barStyle="light-content" // تعيين لون النص في شريط الحالة إلى أبيض
      />
      <Tab.Navigator
        screenOptions={{
          tabBarBackground: () => (
            <BlurView
              intensity={50}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
              }}
            />
          ),

          tabBarStyle: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0, // لإزالة الحد العلوي
          },
          headerStyle: {
            backgroundColor: "#222222", // تعيين خلفية الشريط العلوي
            borderWidth: 0,
          },
          headerTintColor: "#222", // لون النص في الشريط العلوي
        }}
      >
        <Tab.Screen
          name="Home"
          component={CoffeeStack}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="CartsScreen"
          component={CartsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
}
