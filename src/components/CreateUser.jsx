import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const CreateUser = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://192.168.0.159:3000/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    .then(response => response.text())
    .then(text => {
      console.log(text);
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión después de crear un usuario
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Crear</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button:{
     backgroundColor:'#007BFF',
     padding :15,
     borderRadius :25, // Hice que el botón sea completamente redondo aquí
     alignItems:'center',
     justifyContent:'center',
     marginBottom :10
   },
   buttonText:{
     color:'white',
     fontSize :16
   }
});

export default CreateUser;

