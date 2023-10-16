import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; 
import { Picker } from '@react-native-picker/picker'; 

const CreateNote = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [collection, setCollection] = useState('');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.159:3000/collections')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSave = () => {
    axios.post('http://192.168.0.159:3000/add-note', { collectionId: collection, title, content: note })
      .then(response => {
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
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
      <Picker
        selectedValue={collection}
        style={styles.collectionInput}
        onValueChange={(itemValue) => setCollection(itemValue)}
      >
        <Picker.Item label="Selecciona una colección..." value="" />
        {collections.map((collection) => (
          <Picker.Item key={collection._id} label={collection.name} value={collection._id} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon name="save" size={20} color="white" />
        <Text style={styles.saveButtonText}>Guardar</Text>
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
  collectionInput: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
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
  saveButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize:16
   },
});

export default CreateNote;


