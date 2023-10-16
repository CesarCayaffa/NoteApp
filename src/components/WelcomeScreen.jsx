import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({ route, navigation }) => {
  const name = route.params ? route.params.name : 'Usuario';

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAddNote = () => {
    navigation.navigate('CreateNote');
  };

  const handleOpenCollections = () => {
    navigation.navigate('Collections');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>BLOC DE NOTAS</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="white" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>¡Bienvenido, <Text style={styles.userName}>{name}</Text> !</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>Presiona el icono "+" para crear una nueva nota. Presiona el icono de la carpeta para ver o crear colecciones.</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.collectionsButton} onPress={handleOpenCollections}>
        <Icon name="folder-open" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E8F0F2',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 50,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#0056b3', // Cambié el color a un azul más oscuro aquí
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    
   },
   logoutButtonText:{
     color:'white',
     marginLeft :5,
     fontSize :16
   },
   welcomeText:{
     fontSize :24,
     fontWeight:'bold',
     textAlign:'center',
     marginTop :20 // Reduje el margen superior aquí para acercar el texto al recuadro
   },
   userName:{
     color:'#007BFF'
   },
   instructionsContainer:{
     flex :1,
     justifyContent:'center'
   },
   instructions:{
     fontSize :18,
     textAlign:'center'
   },
   addButton:{
     position:'absolute',
     right :10,
     bottom :10,
     backgroundColor:'#007BFF',
     width :70,
     height :70,
     borderRadius :35, // Hice que el botón sea completamente redondo aquí
     alignItems:'center',
     justifyContent:'center'
   },
   collectionsButton:{
     position:'absolute',
     left :10,
     bottom :10,
     backgroundColor:'#007BFF',
     width :70,
     height :70,
     borderRadius :35, // Hice que el botón sea completamente redondo aquí
     alignItems:'center',
     justifyContent:'center'
   }
});

export default WelcomeScreen;



