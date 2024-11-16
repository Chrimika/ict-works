import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button, Text, Card, Avatar } from "react-native-paper";
import Geolocation from 'react-native-geolocation-service';  // Utilisation de react-native-geolocation-service
import { launchCamera } from 'react-native-image-picker';  // Utilisation de react-native-image-picker
import axios from "axios";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';  // Importation des permissions

// Demander la permission pour la localisation
const requestLocationPermission = async () => {
  const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  
  if (result === RESULTS.GRANTED) {
    console.log("La permission d'accès à la localisation a été accordée.");
    return true;
  } else {
    console.log("La permission d'accès à la localisation a été refusée.");
    return false;
  }
};

const HomeScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);

  const getLocation = async () => {
    const permissionGranted = await requestLocationPermission();  // Vérifier la permission avant d'obtenir la localisation
    
    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          Alert.alert("Erreur", "Impossible d'obtenir la localisation.");
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert("Permission refusée", "Veuillez autoriser l'accès à la localisation.");
    }
  };

  const pickImage = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
    });

    if (!result.didCancel) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !description || !location || !photo) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("latitude", location.latitude);
    formData.append("longitude", location.longitude);
    formData.append("photo", {
      uri: photo,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post("https://example.com/api/endpoint", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Succès", "Les données ont été envoyées.");
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Formulaire de collecte"
          subtitle="Remplissez les champs pour envoyer vos données"
          left={(props) => <Avatar.Icon {...props} icon="form-textbox" />}
        />
        <Card.Content style={styles.cardContent}>
          <TextInput
            label="Nom"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />
          <Button
            icon="map-marker"
            mode="contained"
            onPress={getLocation}
            style={styles.button}
          >
            Obtenir ma position
          </Button>
          {location && (
            <Text style={styles.location}>
              📍 Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          )}
          <Button
            icon="camera"
            mode="contained"
            onPress={pickImage}
            style={styles.button}
          >
            Prendre une photo
          </Button>
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
            Envoyer
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Prendre tout l'espace disponible
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  card: {
    elevation: 3,
    borderRadius: 10,
    flexGrow: 1,  // S'assure que le Card occupe toute la hauteur disponible
  },
  cardContent: {
    flexGrow: 1,  // Permet au contenu du card de s'étirer pour remplir l'espace
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#6200ee",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#03dac6",
    marginHorizontal: 10,
  },
  location: {
    fontSize: 14,
    marginTop: 10,
    fontStyle: "italic",
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
