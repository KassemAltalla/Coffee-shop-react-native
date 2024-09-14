import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import CoffeeData from "@/data/CoffeeData";
import FavoriteCard from "../components/FavoriteCard"; // استيراد مكون الكرت
import { useSelector } from "react-redux";
export default function FavoritesScreen() {
  // Filter favorite items
  // جلب قائمة المفضلات من Redux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // تصفية بيانات القهوة بناءً على قائمة المفضلات
  const favoriteCoffees = CoffeeData.filter((coffee) =>
    favorites.includes(coffee.id)
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorite Coffees</Text>
      {favoriteCoffees.map((coffee, index) => (
        <FavoriteCard key={index} coffee={coffee} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f14",
  },
  title: {
    fontSize: 30,
    marginTop: 80,
    color: "#fff",
    margin: "auto",
    marginBottom: 30,
    fontWeight: "600",
  },
});
