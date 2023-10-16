import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

const Notes = ({ route, navigation }) => {
  const [notes, setNotes] = useState([]);
  const { collectionId } = route.params;

  useEffect(() => {
    // Obtén las notas de la colección del servidor cuando el componente se monta y cuando la lista de notas cambia
    axios.get(`http://192.168.0.159:3000/collections/${collectionId}/notes`)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [notes]);

  const handleEditNote = (noteId) => {
    // Aquí puedes agregar la lógica para editar una nota
    // Por ejemplo, podrías navegar a una pantalla de edición de notas
    navigation.navigate('EditNote', { noteId });
  };

  const handleDeleteNote = (noteId) => {
    // Envía una solicitud al servidor para eliminar una nota
    axios.delete(`http://192.168.0.159:3000/collections/${collectionId}/notes/${noteId}`)
      .then(response => {
        // Actualiza la lista de notas después de eliminar una nota
        setNotes(notes.filter(note => note._id !== noteId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditNote(item._id)}>
                <Icon name="edit" size={20} color="white" />
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteNote(item._id)}>
                <Icon name="trash" size={20} color="white" />
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
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
    noteContainer: {
      paddingVertical: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    noteTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007BFF',
    },
    noteContent: {
      fontSize: 18,
      color: '#333',
      marginTop: 5,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    editButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 25, // Hice que el botón sea completamente redondo aquí
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      
     },
     deleteButton:{
       backgroundColor:'#FF0000',
       paddingVertical :5,
       paddingHorizontal :10,
       borderRadius :25, // Hice que el botón sea completamente redondo aquí
       alignItems:'center',
       justifyContent:'center',
       flexDirection:'row'
     },
     buttonText:{
       color:'white',
       marginLeft :5,
       fontSize :16
     }
  });
  

export default Notes