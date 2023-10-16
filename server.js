const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://cesarcayaffa0:admin123@cluster0.xhaajgp.mongodb.net/myapp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Esquema para las notas
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Esquema para las colecciones
const collectionSchema = new mongoose.Schema({
  name: String,
  notes: [noteSchema],
});

const Collection = mongoose.model('Collection', collectionSchema);

app.post('/create-user', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.send('User created successfully');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', name: user.name });
    } else {
      res.json({ message: 'Invalid credentials' });
    }
});

// Ruta para crear una nueva colección
app.post('/create-collection', async (req, res) => {
  const { name } = req.body;
  const collection = new Collection({ name });
  await collection.save();
  res.send('Collection created successfully');
});

// Ruta para agregar una nota a una colección
app.post('/add-note', async (req, res) => {
  const { collectionId, title, content } = req.body;
  const collection = await Collection.findById(collectionId);
  if (collection) {
    collection.notes.push({ title, content });
    await collection.save();
    res.send('Note added successfully');
  } else {
    res.send('Collection not found');
  }
});

// Ruta para obtener todas las colecciones
app.get('/collections', async (req, res) => {
  const collections = await Collection.find();
  res.json(collections);
});

// Ruta para eliminar una colección específica
app.delete('/delete-collection/:id', async (req, res) => {
  const { id } = req.params;
  await Collection.findByIdAndDelete(id);
  res.send('Collection deleted successfully');
});

// Ruta para obtener las notas de una colección específica
app.get('/collections/:collectionId/notes', async (req, res) => {
  const { collectionId } = req.params;
  const collection = await Collection.findById(collectionId);
  if (collection) {
    res.json(collection.notes);
  } else {
    res.send('Collection not found');
  }
});

// Ruta para eliminar una nota específica de una colección
app.delete('/collections/:collectionId/notes/:noteId', async (req, res) => {
  const { collectionId, noteId } = req.params;
  const collection = await Collection.findById(collectionId);
  if (collection) {
    const noteIndex = collection.notes.findIndex(note => note._id.toString() === noteId);
    if (noteIndex !== -1) {
      collection.notes.splice(noteIndex, 1);
      await collection.save();
      res.send('Note deleted successfully');
    } else {
      res.send('Note not found');
    }
  } else {
    res.send('Collection not found');
  }
});

// Ruta para obtener los detalles de una nota específica
app.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const collection = await Collection.findOne({ "notes._id": noteId });
  if (collection) {
    const note = collection.notes.id(noteId);
    res.json(note);
  } else {
    res.send('Note not found');
  }
});

// Ruta para actualizar una nota específica
app.put('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const { collectionId, title, content } = req.body;
  const collection = await Collection.findOne({ "notes._id": noteId });
  if (collection) {
    const note = collection.notes.id(noteId);
    note.collectionId = collectionId;
    note.title = title;
    note.content = content;
    await collection.save();
    res.send('Note updated successfully');
  } else {
    res.send('Note not found');
  }
});



app.listen(3000, () => console.log('Server running on port 3000'));

