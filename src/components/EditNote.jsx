import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 

const EditNote = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [collection, setCollection] = useState('');
  const [collections, setCollections] = useState([]);
  const { noteId } = route.params;

  useEffect(() => {
    axios.get('http://192.168.0.159:3000/collections')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`http://192.168.0.159:3000/notes/${noteId}`)
      .then(response => {
        const note = response.data;
        setTitle(note.title);
        setNote(note.content);
        setCollection(note.collectionId);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSave = () => {
    axios.put(`http://192.168.0.159:3000/notes/${noteId}`, { collectionId: collection, title, content: note })
    .then(response => {
      navigation.goBack();
    })
    .catch(error => {
      console.error(error);
    });

  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Título:</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Ingresa el título aquí..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.noteInput}
        placeholder="Escribe tu nota aquí..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon name="save" size={20} color="white" />
        <Text style={styles.saveButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E8F0F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  titleInput: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  noteInput: {
    flex: 1,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    
   },
   saveButtonText:{
     color:'white',
     marginLeft :5,
     fontSize :16
   }
});

export default EditNote;
