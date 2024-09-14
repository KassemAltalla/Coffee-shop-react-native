import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import BeansData from "../data/BeansData";
import CoffeeCart from "../components/CoffeeCart";
import { useNavigation } from "@react-navigation/native";

const BeansCarts = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      {BeansData.map((item) => (
        <TouchableOpacity
          key={item.index}
          onPress={() => navigation.navigate("BeansDetailsScreen", item)} // الانتقال إلى CoffeeDetailsScreen مع تمرير بيانات القهوة
        >
          <CoffeeCart
            name={item.name}
            image={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            prices={item.prices}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default BeansCarts;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 120,
  },
});
