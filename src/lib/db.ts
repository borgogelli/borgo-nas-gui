// lib/db.ts
import {type Database as DatabaseType} from 'better-sqlite3'
import Database from 'better-sqlite3'

// const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
// const dbPath = path.resolve('C:/Users/Borgo/workspace-java/borgo-nas-cli/data/nas.sqlite')
// let dbname = 'nas.sqlite'
//const dbPath = path.resolve(process.cwd(), folder, dbname);
// const dbPath = path + '/' + dbname  

      if (!process.env.DATABASE_PATH) {
        throw new Error('DATABASE_PATH env var is required');
        } 
const dbPath : string = process.env.DATABASE_PATH

const globalForDb = globalThis as unknown as {
  sqlite?: DatabaseType
}

export let db : DatabaseType;

if(globalForDb.sqlite){
    db = globalForDb.sqlite
}else{    
    try {
        db = new Database(dbPath, { readonly: true });
            console.log('Connessione al database SQLite avvenuta con successo.');
            console.log('##### dbpath: ' + globalForDb);
            // Questo garantisce una sola istanza del client DB anche se i file vengono ricaricati più volte durante lo sviluppo.
            // Evita ricreazioni durante HMR / reload
            if (process.env.NODE_ENV !== 'production') {
                        globalForDb.sqlite = db; // salva l’istanza globale QUI
            }
    } catch (err: any) {
         console.error('Errore nella connessione al database:', err.message);
         throw err; // eventualmente rilancia l’errore per far fallire la startup
    }
}
 


