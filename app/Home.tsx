import { Text, View } from "react-native";
import CoffeeOptions from "../components/CoffeeOptions";
import { ScrollView } from "react-native";
import BeansCarts from "../components/BeansCarts";

export default function Home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#0C0F14",
        padding: 18,
      }}
    >
      <Text style={{ color: "#ffffff", fontSize: 50 }}>
        Find the best coffee for you
      </Text>
      <CoffeeOptions />
      <Text style={{ color: "#fff", fontSize: 25, marginVertical: 20 }}>
        Coffee beans
      </Text>
      <BeansCarts />
    </ScrollView>
  );
}
