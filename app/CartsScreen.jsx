import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CartItem from "../components/CartItem"; // Import the CartItem component
import { useSelector } from "react-redux";

export default function CartsScreen() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [items, setItems] = useState(cartItems);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems, totalAmount]);

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item, index) => (
          <CartItem key={index} item={item} onRemove={removeItem} />
        ))}
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: $ {totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f14",
    paddingTop: 45,
    paddingBottom: 70,
  },
  totalContainer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#333",
    width: "100%",
    alignItems: "center",
  },
  totalText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    flexGrow: 1,
    marginLeft: 20,
  },
  payButtonText: {
    color: "#0c0f14",
    fontSize: 18,
    fontWeight: "bold",
  },
});
