import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteCard({ coffee }) {
  const {
    name,
    special_ingredient,
    average_rating,
    ratings_count,
    imagelink_portrait,
    ingredients,
    roasted,
    description,
  } = coffee;

  return (
    <View style={styles.card}>
      {/* Image Section */}
      <View style={styles.imageSection}>
        <Image
          source={imagelink_portrait}
          style={styles.coffeeImage}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.textInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.specialIngredient}>{special_ingredient}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFA500" />
              <Text style={styles.ratingText}>
                {average_rating} ({ratings_count})
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
              <Text style={styles.iconText}>{ingredients}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.detailsSection}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 550,
    width: "90%",
    backgroundColor: "#141921",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  imageSection: {
    flex: 0.6,
    position: "relative",
  },
  coffeeImage: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#111a",
    padding: 10,
  },
  textInfo: {
    flex: 0.7,
    justifyContent: "space-between",
    height: 80,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  specialIngredient: {
    color: "#FFA500",
    fontSize: 16,
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
    justifyContent: "space-between",
  },
  iconBox: {
    backgroundColor: "#141921",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 60,
    margin: 5,
  },
  iconText: {
    color: "#fff",
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
  },
});
