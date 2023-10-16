import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

// Importa el componente Notes
import Notes from './Notes';

const Collections = ({ navigation }) => {
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    // Obtén las colecciones del servidor cuando el componente se monta y cuando la lista de colecciones cambia
    axios.get('http://192.168.0.159:3000/collections')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [collections]);

  const handleAddCollection = () => {
    if (newCollectionName.length > 0) {
      // Envía una solicitud al servidor para crear una nueva colección
      axios.post('http://192.168.0.159:3000/create-collection', { name: newCollectionName })
        .then(response => {
          setNewCollectionName('');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleDeleteCollection = (id) => {
    // Envía una solicitud al servidor para eliminar una colección
    axios.delete(`http://192.168.0.159:3000/delete-collection/${id}`)
      .catch(error => {
        console.error(error);
      });
  };

  const handleOpenCollection = (id) => {
    // Navega al componente Notes y pasa el ID de la colección como parámetro
    navigation.navigate('Notes', { collectionId: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.newCollectionContainer}>
        <TextInput
          style={styles.newCollectionInput}
          placeholder="Nombre de la nueva colección aquí..."
          value={newCollectionName}
          onChangeText={setNewCollectionName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCollection}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={collections}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.collectionContainer}>
            <TouchableOpacity onPress={() => handleOpenCollection(item._id)}>
              <Text style={styles.collectionName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteCollection(item._id)}>
              <Icon name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#E8F0F2',
    },
    newCollectionContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    newCollectionInput: {
      flex: 1,
      height: 50,
      borderColor: '#007BFF',
      borderWidth: 1,
      marginRight: 10,
      borderRadius: 5,
      paddingLeft: 10,
      fontSize: 16,
      color: '#333',
    },
    addButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      width: 50,
      height: 50,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      
     },
     collectionContainer:{
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between',
       paddingVertical :10,
       borderBottomColor :'gray',
       borderBottomWidth :1,
     },
     collectionName:{
       fontSize :18,
       fontWeight:'bold'
     },
     deleteButton:{
       backgroundColor:'#FF0000',
       padding :10,
       width: 50,
       height: 50,
       borderRadius :50,
       alignItems:'center',
       justifyContent:'center'
     }
  });

export default Collections; 
