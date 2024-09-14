import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Alert } from "react-native";

// const { height, width } = Dimensions.get("window");

const CoffeeCart = (props) => {
  const dispatch = useDispatch();
  const [coffee, setCoffee] = useState(props);

  useEffect(() => {
    setCoffee(props);
  }, [props]);

  const handleAddToCart = () => {
    console.log(coffee.id);
    console.log(coffee.name);
    console.log(coffee.prices[1].price);
    console.log(coffee.prices[1].size);
    console.log(coffee.prices[1].currency);
    console.log(coffee.image);
    dispatch(
      addToCart({
        id: coffee.id,
        name: coffee.name,
        price: coffee.prices[1].price,
        size: coffee.prices[1].size,
        currency: coffee.prices[1].currency,
        imagelink_square: coffee.image,
      })
    );
    // إظهار رسالة منبثقة
    Alert.alert("تمت الإضافة", `${coffee.name}  تمت إضافتها إلى السلة.`);
  };

  return (
    <View style={styles.cart}>
      <LinearGradient
        colors={["#282A32", "#0C0F14"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <Image source={props.image} alt="" style={styles.coffeeImg} />

        <Text style={styles.CoffeeName}>{props.name}</Text>
        <Text style={styles.ingredient}>{props.special_ingredient}</Text>
        <View style={styles.cartbotton}>
          <Text style={styles.price}>
            {props.prices[1].currency} {props.prices[1].price}
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                handleAddToCart();
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("@/assets/icons/plus.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CoffeeCart;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
    justifyContent: "space-around",
    borderRadius: 20,
  },
  cart: {
    borderWidth: 0.2,
    borderColor: "#aaa",
    margin: 10,
    width: 150,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
  },
  CoffeeName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.3,
  },
  coffeeImg: {
    borderRadius: 20,
    width: "100%",
    height: "50%",
  },
  ingredient: {
    color: "#aaad",
    fontSize: 12,
    // marginVertical: 15,
  },
  price: {
    color: "#D17842",
  },
  cartbotton: {
    // marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
