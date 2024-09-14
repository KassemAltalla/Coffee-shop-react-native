import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CoffeeData from "@/data/CoffeeData";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Alert } from "react-native";

export default function CoffeeDetailsScreen({ route }) {
  const coffee = route.params; // يتم تمرير بيانات القهوة عبر التوجيه
  // console.log(coffee2);

  // const coffee = CoffeeData[1];
  const [selectedSize, setSelectedSize] = useState(coffee.prices[0].size);

  const selectedPrice = coffee.prices.find(
    (price) => price.size === selectedSize
  );

  const navigation = useNavigation();

  const screenHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();

  const handleAddToCart = (size) => {
    // البحث عن السعر الخاص بالحجم المختار في مصفوفة prices
    const selectedPrice = coffee.prices.find(
      (priceObj) => priceObj.size === size
    );

    if (selectedPrice) {
      dispatch(
        addToCart({
          id: coffee.id,
          name: coffee.name,
          price: selectedPrice.price, // استخدام السعر الخاص بالحجم المختار
          size: size,
          currency: selectedPrice.currency, // إضافة العملة إذا كنت تحتاجها
          imagelink_square: coffee.imagelink_square,
        })
      );
    } else {
      console.error("Selected size not found in prices array");
    }

    // إظهار رسالة منبثقة
    Alert.alert(
      "تمت الإضافة",
      `${coffee.name} (${size}) تمت إضافتها إلى السلة.`
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* القسم الأول: صورة القهوة */}
      <View style={[styles.imageSection, { height: screenHeight * 0.6 }]}>
        <Image
          source={coffee.imagelink_portrait}
          style={styles.coffeeImage}
          resizeMode="cover"
        />
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.backBtn}
          onPress={() => navigation.navigate("Home")} // الانتقال إلى CoffeeDetailsScreen مع تمرير بيانات القهوة
        />
        <View style={styles.infoContainer}>
          <View style={styles.textInfo}>
            <Text style={styles.name}>{coffee.name}</Text>
            <Text style={styles.specialIngredient}>
              {coffee.special_ingredient}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFA500" />
              <Text style={styles.ratingText}>
                {coffee.average_rating} ({coffee.ratings_count})
              </Text>
            </View>
          </View>

          <View style={styles.iconsContainer}>
            <View style={styles.iconBox}>
              <Ionicons name="cafe" size={24} color="#FFA500" />
              <Text style={styles.iconText}>Coffee</Text>
            </View>
            <View style={styles.iconBox}>
              <Ionicons name="water" size={24} color="#FFA500" />
              <Text style={styles.iconText}>{coffee.ingredients}</Text>
            </View>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>{coffee.roasted}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* القسم الثاني: وصف القهوة */}
      <View style={styles.detailsSection}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{coffee.description}</Text>

        <View style={styles.sizesContainer}>
          {coffee.prices.map((price) => (
            <TouchableOpacity
              key={price.size}
              style={[
                styles.sizeBox,
                selectedSize === price.size && styles.selectedSizeBox,
              ]}
              onPress={() => setSelectedSize(price.size)}
            >
              <Text style={styles.sizeText}>{price.size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {selectedPrice.currency} {selectedPrice.price}
          </Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(selectedSize)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f14",
  },
  imageSection: {
    flex: 0.6,
  },
  coffeeImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    position: "absolute",
    bottom: "0%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#111a",
    padding: 10,
  },
  textInfo: {
    flex: 0.7,
    justifyContent: "space-evenly",
  },
  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  specialIngredient: {
    color: "#FFA500",
    fontSize: 16,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
  },
  iconsContainer: {
    flex: 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  iconBox: {
    backgroundColor: "#141921",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    flexGrow: 1,
    minHeight: 50,
    margin: 5,
  },
  iconText: {
    color: "#fff",
    marginTop: 4,
    fontSize: 12,
    textAlign: "center",
  },
  detailsSection: {
    flex: 0.4,
    padding: 20,
  },
  descriptionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 20,
  },
  sizesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  sizeBox: {
    backgroundColor: "#141921",
    padding: 10,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
  },
  selectedSizeBox: {
    borderColor: "#FFA500",
    borderWidth: 2,
  },
  sizeText: {
    color: "#fff",
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 80,
  },
  priceText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addToCartText: {
    color: "#0c0f14",
    fontSize: 16,
    fontWeight: "bold",
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 10,
    backgroundColor: "#333",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
});
