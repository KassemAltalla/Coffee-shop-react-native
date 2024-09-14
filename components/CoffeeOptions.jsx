import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import CoffeeData from "@/data/CoffeeData";
import CoffeeCart from "./CoffeeCart";
import { useNavigation } from "@react-navigation/native";

export default function CoffeeOptions() {
  const [activeOption, setActiveOption] = useState("All");

  const options = ["All", "Cappucchino", "Espresso", "Americano", "Macchiato"];

  const filteredCoffeeData =
    activeOption === "All"
      ? CoffeeData
      : CoffeeData.filter((item) => item.name === activeOption);

  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setActiveOption(option)}
            style={styles.optionContainer}
          >
            <Text
              style={[
                styles.optionText,
                activeOption === option && styles.activeOptionText,
              ]}
            >
              {option}
            </Text>
            {activeOption === option && <View style={styles.activeUnderline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredCoffeeData.map((item) => (
          <TouchableOpacity
            key={item.index}
            onPress={() => navigation.navigate("CoffeeDetailsScreen", item)} // الانتقال إلى CoffeeDetailsScreen مع تمرير بيانات القهوة
          >
            <CoffeeCart
              id={item.id}
              name={item.name}
              image={item.imagelink_square}
              special_ingredient={item.special_ingredient}
              prices={item.prices}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    marginTop: 20,
    marginBottom: 20,
  },
  optionContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  optionText: {
    color: "rgba(255, 255, 255, 0.7)", // لون أبيض باهت
    fontSize: 16,
  },
  activeOptionText: {
    color: "#FFA500", // اللون البرتقالي
  },
  activeUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: "#FFA500", // اللون البرتقالي للخط السفلي
    width: "100%",
  },
});
