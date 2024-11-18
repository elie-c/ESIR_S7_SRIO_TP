// create-db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  // Créer la table 'users' si elle n'existe pas
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");

  // Insérer un utilisateur de test
  const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  stmt.run("test@example.com", "password123");  // Un utilisateur de test avec un email et un mot de passe
  stmt.finalize();
});

db.close();
