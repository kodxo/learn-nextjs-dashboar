import { neon } from '@neondatabase/serverless';


function main() {

const sql = neon(process.env.DATABASE_URL);
    console.log(sql)

    // Fonction pour créer la table user et lui importer la data
}

main()