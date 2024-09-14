import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

import { LinearGradient } from "expo-linear-gradient";

export default function CartItem({ item, onRemove }) {
  const [quantities, setQuantities] = useState(item.quantity);
  console.log(item);

  useEffect(() => {
    setQuantities(item.quantity);
  }, [item]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if all quantities are zero after render
    if (quantities <= 0) {
      onRemove(item.id);
    }
  }, [quantities]);

  const increaseQuantity = () => {
    // setQuantities((prevQuantities) => prevQuantities + 1);
    dispatch(addToCart(item));
  };

  const decreaseQuantity = () => {
    dispatch(removeFromCart({ id: item.id, size: item.size }));
  };

  //   // Check if all quantities are zero
  //   if (Object.keys(quantities).length === 0) {
  //     onRemove(item.id);
  //     return null; // Remove component if all quantities are zero
  //   }

  return (
    <LinearGradient
      colors={["#282A32", "#0C0F14"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image source={item.imagelink_square} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialIngredient}>{item.special_ingredient}</Text>

        <View key={item.size} style={styles.sizeRow}>
          <Text style={styles.size}>{item.size}</Text>
          <Text style={styles.price}>
            {item.currency} {item.price}
          </Text>
        </View>
        <View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decreaseQuantity(item.size)}>
              <Ionicons
                name="remove-circle-outline"
                size={44}
                color="#FFA500"
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantities}</Text>
            <TouchableOpacity onPress={() => increaseQuantity(item.size)}>
              <Ionicons name="add-circle-outline" size={44} color="#FFA500" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: 10,
  },
  detailsContainer: {
    width: "60%",
    paddingLeft: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  specialIngredient: {
    color: "#FFA500",
    fontSize: 14,
    marginBottom: 10,
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  size: {
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#0C0F14",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D17842",
    borderRadius: 5,
    padding: 20,
    paddingVertical: 10,
  },
  price: {
    color: "#fff",
    fontSize: 26,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quantity: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
    backgroundColor: "#0C0F14",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D17842",
    borderRadius: 5,
    padding: 30,
    paddingVertical: 10,
  },
});
