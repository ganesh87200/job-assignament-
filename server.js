const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const cors = require('cors');
app.use(cors());


app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(contact);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete('/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.send({ message: 'Contact deleted' });
});

mongoose.connect('mongodb://localhost:27017/contacts', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(5000, () => console.log('Server started on port 5000'));
