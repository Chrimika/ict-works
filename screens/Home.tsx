import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenue sur ICT4D</Text>
      
      <Text style={styles.intro}>
        Cette plateforme est conçue pour vous aider dans la filière avec :
      </Text>
      
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <Icon name="forum" size={30} color="#4CAF50" />
          <Text style={styles.featureText}>Communication dans la filière</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="event" size={30} color="#2196F3" />
          <Text style={styles.featureText}>Annonces des événements</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="info" size={30} color="#FF9800" />
          <Text style={styles.featureText}>Informations sur la filière</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Icon name="update" size={30} color="#9C27B0" />
          <Text style={styles.featureText}>En cours d'évolution (en attente d'idées)</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={()=>{navigation.navigate('event')}} style={styles.exploreButton}>
        <Text style={styles.exploreText}>Événement récent</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontFamily: 'UbuntuMono-Bold',
    fontSize: 32,
    color: '#37474F',
    marginBottom: 8,
    textAlign: 'center',
  },
  intro: {
    fontSize: 16,
    color: '#607D8B',
    textAlign: 'center',
    marginVertical: 16,
  },
  featuresContainer: {
    width: '100%',
    paddingVertical: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 18,
    color: '#455A64',
    marginLeft: 16,
    fontFamily: 'UbuntuMono-Regular',
  },
  exploreButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exploreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
