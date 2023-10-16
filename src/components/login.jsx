import React, { useState, useContext } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://192.168.0.159:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(response => response.json())
    .then(json => {
      if (json.message === 'Login successful') {
        navigation.navigate('Welcome', { name: json.name });  
      } else {
        Alert.alert("Error", json.message);
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al iniciar sesión.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
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
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Create User')}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

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
   },
   registerLink:{
     color:'#007BFF',
     textAlign:'center'
   }
});

export default Login;

