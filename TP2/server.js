// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurer le middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error("Impossible de se connecter à la base de données:", err.message);
  } else {
    console.log('Connexion à la base de données SQLite réussie');
  }
});

// Route pour servir le formulaire HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

// Route pour traiter la connexion
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Ceci est la méthode protégée, avec les prepare statement
  const query = db.prepare(`SELECT * FROM users WHERE email = ? AND password = ?`);
  query.get(email, password, (err, row) => {
    if (err) {
        console.error(err);
        res.status(500).send("Erreur dans la base de données.");
    } else {
      if (row) {
        res.send(`Bienvenue, ${row.email}!`);
      } else {
        console.log("Erreur avec "+ email+ " et "+password);
        res.send("Identifiants incorrects.");
      }
    }
  });
});

// Route pour traiter la connexion de manière naive
app.post('/login-naive', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  // Ceci est une méthode naïve, vulnérable aux injections SQL
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  db.get(query, (err, row) => {
    if (err) {
      res.status(500).send("Erreur dans la base de données.");
    } else {
      if (row) {
        res.send(`Bienvenue, ${row.email}!`);
      } else {
        res.send("Identifiants incorrects.");
      }
    }
  });
});

// Route pour traiter un pool de connexions
app.post('/login-pool', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
