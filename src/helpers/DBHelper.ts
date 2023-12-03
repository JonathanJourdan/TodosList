import { ITodo } from "../components/Todo/Todo/Todo";
import { IDBPDatabase, openDB } from 'idb';


/**
   * Object with the DB info
*/
export const DBConfig = {
  name: "TODOSDB",
  version: 1,
  store: {
    name: "todo"
  }
};


/**
   * Promise function for init or connect to the DB in local indexedDB
   * Take an optional parameter todosDefaultItems, it's a list of default todo items use for the initialisation of the db.
   * Return a db instance (IDBPDatabase)
   * @returns IDBPDatabase
*/
export const openInitializedDB = (todosDefaultItems?: ITodo[]) => {
  return new Promise<IDBPDatabase>((resolve, reject) => {
    const dbName = DBConfig.name;
    const storeName = DBConfig.store.name;
    const version = DBConfig.version;

    openDB(dbName, version, {
      upgrade(db) {
        const store = db.createObjectStore(storeName);
        if (todosDefaultItems != undefined && todosDefaultItems != null && todosDefaultItems.length > 0) {
          todosDefaultItems.forEach(todo => {
            store.put(todo, todo.id);
          });
        }
      }
    }).then(db => {
      resolve(db);
    }).catch(error => {
      reject("No dataBase found : " + error);
    });
  });
};


/**
   * Promise function for add or update a Todo item in the DB
   * Take a parameter addOrUpdateItem (ITodo), it's the new or updated todo item to add in the DB.
   * Return the key of the new or updated toto item (IDBValidKey)
   * @returns IDBValidKey
*/
export const addOrUpdateDataInDB = (addOrUpdateItem: ITodo) => {
  return new Promise<IDBValidKey>((resolve, reject) => {
    const storeName = DBConfig.store.name;
    openInitializedDB().then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      store.put(addOrUpdateItem, addOrUpdateItem.id).then(value => {
        tx.done.then(() => {
          resolve(value);
        }).catch(error => {
          reject("Error on init or open DB : " + error);
        });
      }).catch(error => {
        reject("Add or update item in db : " + error);
      });
    }).catch(error => {
      reject("On init or open DB : " + error);
    });
  });
};


/**
   * Promise function for get all items in the db.
   * Return an array of all items (todo) in the DB.
   * @returns ITodo[]
*/
export const getAllItems = () => {
  return new Promise<ITodo[]>((resolve, reject) => {
    openInitializedDB().then(db => {
      db.transaction(DBConfig.store.name).objectStore(DBConfig.store.name).getAll().then(items => {
        resolve(items);
      }).catch(error => {
        reject("Get all items in DB : " + error);
      });
    }).catch(error => {
      reject(error);
    });
  });
};

/**
   * Promise function for get one item in the db by key name.
   * Return a todo (Itodo) item.
   * Take the todoId at parameter
   * @returns ITodo
*/
export const getItemByKey = (todoId:string) => {
  return new Promise<ITodo>((resolve, reject) => {
    openInitializedDB().then(db => {
      db.transaction(DBConfig.store.name).objectStore(DBConfig.store.name).get(todoId).then(item => {
        resolve(item);
      }).catch(error => {
        reject("Get item in DB : " + error);
      });
    }).catch(error => {
      reject(error);
    });
  });
};