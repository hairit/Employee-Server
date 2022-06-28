const { MongoClient } = require("mongodb");
// const connectionString = 'mongodb://localhost:27017/myDatabase';
// const createdatabase = (connectionString,dbName) => {
//     const uri = `${connectionString}/${dbName}`;
//     console.log(uri);
//     MongoClient.connect(uri,(err , db) => {
//         if(err) throw err;
//         console.log('Connected to database');
//         db.close();
//     })
// }
const connectionString = "mongodb://localhost:27017";
// const checkDatabaseExist = async (req,res,checkName) => {
//     const databaseName = 'GFG'
//     var result = false;
//     await MongoClient.connect(connectionString).then((client) => {
//         // Use admin request
//         const connect = client.db(databaseName).admin()
//         //check exist
//         connect.listDatabases((err,databases)=>{
//            if(err) throw err
//            console.log(databases.databases)
//            databases.databases.forEach(db => {
//                 console.log(String(db.name));
//                 if(String(db.name) === checkName) result = true
//                 console.log(result);
//            });
//         })
//         console.log(checkName);
//      }).catch((err) => {
//         // Printing the error message
//         console.log(err.Message)
//      })
//     res.send(result);
// }
const createCollection = (client, dbName, collectionName) => {
  client.connect((err, db) => {
    if (err) throw err;
    // if(checkDatabaseExist('manager')) console.log('Exist database with name manager');
    // else{
    let currentDB = db.db(dbName);
    currentDB.createCollection(collectionName, (err, res) => {
      if (err) throw err;
      console.log(
        `database created with the name ${dbName}, collection is created with the name ${collectionName}`
      );
      db.close();
    });
    //}
  });
};
createCollection(new MongoClient(connectionString), "manager", "employee");
