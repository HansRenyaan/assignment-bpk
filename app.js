const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact } = require('./utils/contacts');

const app = express();
const port = 3000;

// gunakan ejs

app.set('view engine', 'ejs');
//thrid-party Middelware
app.use(expressLayouts);
// built-in middleware

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {

//res.sendFile('./index.html',{ root: __dirname});

res.render('index', { 
  title: 'Halaman Home',
  layout: 'layouts/main-layout'
});
});

app.get('/contact', (req, res) => { 
  const contacts = loadContact();
    res.render('contact', {
      layout: 'layouts/main-layout',
      title: 'Halaman Contact',
      contacts,
    });
  });

//halaman form tambah data
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout'
  })
});

//proses data contact
app.post('/contact', (req, res)=> {
  addContact(req.body)
  res.redirect('/contact');
});

// Halaman Detail
  app.get('/contact/:nama', (req, res) => { 
    const contact = findContact(req.params.nama);

      res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact,
      });
    });

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

