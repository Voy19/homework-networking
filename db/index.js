var sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('db/networking-homework-db.sqlite', (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
        db.run(
          `CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT, 
            lastName TEXT, 
            role TEXT CHECK(role IN ('ADMIN', 'USER', 'MODERATOR')),
            country TEXT,
            address TEXT,
            zipCode TEXT
          )`,
          (err) => {
            if (!err) {
              // Table just created, creating some rows
              const insert = `INSERT INTO users (
                firstName,
                lastName,
                role,
                country,
                address,
                zipCode
              ) VALUES (?,?,?,?,?,?)`;
            
              db.run(insert, ['admin', 'admin', 'ADMIN', 'country', 'address', 'code']);
              db.run(insert, ['user', 'user', 'USER', 'country', 'address', 'code']);
              db.run(insert, ['moderator', 'moderator', 'MODERATOR', 'country', 'address', 'code']);
            }
        });

        db.run(
          `CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER, 
            items BLOB, 
            status TEXT CHECK(status IN ('PENDING', 'CANCELLED', 'COMPLETE'))
          )`,
          (err) => {
            if (!err) {
              // Table just created, creating some rows
              const insert = 'INSERT INTO orders (userId, items, status) VALUES (?,?,?)';
              db.run(insert, [1, [1,2,3], 'PENDING']);
              db.run(insert, [2, [2,3], 'CANCELLED']);
              db.run(insert, [3, [1], 'COMPLETE']);
            }
        });
    }
});

db.query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};


module.exports = db;
