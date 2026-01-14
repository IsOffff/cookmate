const mysql = require('mysql2');

// créer la connexion
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'RAKKAZHAFSA',       
  database: 'recipes_db'
});

// connecter
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL');
});

module.exports = db;
