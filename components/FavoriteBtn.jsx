import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CoffeeData from "@/data/CoffeeData";
import BeansData from "@/data/BeansData";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoriteSlice";

const FavoriteBtn = ({ item }) => {
  const dispatch = useDispatch();

  // جلب المفضلات من الـRedux store
  const favorites = useSelector((state) => state.favorites.favorites);

  // التحقق مما إذا كان العنصر في قائمة المفضلات
  const isFavorite = favorites.includes(item.id);

  // دالة التبديل بين مفضل وغير مفضل
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item.id));
  };

  return (
    <View style={styles.btn}>
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"} // اختيار الأيقونة بناءً على حالة المفضلة
          size={24}
          color={isFavorite ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteBtn;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#333",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
