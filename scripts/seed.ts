import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

import {
  users,
  customers,
  invoices,
  revenue,
} from "../app/lib/placeholder-data";
import bcrypt from "bcrypt";

async function seedUsers(sql: NeonQueryFunction<false, false>) {
  try {
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
    `;
    console.log("Table users created successfully");

    const insertedUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const result = await sql`
                INSERT INTO users (id, name, email, password)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                ON CONFLICT (id) DO NOTHING;
            `;
      insertedUsers.push(result);
    }

    console.log(`Seeded ${insertedUsers.length} users`);
    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCustomers(sql: NeonQueryFunction<false, false>) {
  try {
    const createTable = await sql`
        CREATE TABLE IF NOT EXISTS customers (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            image_url VARCHAR(255) NOT NULL
        )
        `;
    console.log("Table customers created successfully");

    const insertedCustomers = [];
    for (const customer of customers) {
      const result = await sql`
                INSERT INTO customers (id, name, email, image_url)
                VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
                ON CONFLICT (id) DO NOTHING;
            `;
      insertedCustomers.push(result);
    }

    console.log(`Seeded ${insertedCustomers.length} customers`);
    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedInvoices(sql: NeonQueryFunction<false, false>) {
  try {
    const createTable = await sql`
        CREATE TABLE IF NOT EXISTS invoices (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            customer_id UUID NOT NULL,
            amount INT NOT NULL,
            status VARCHAR(255) NOT NULL,
            date DATE NOT NULL
        )
        `;
    console.log("Table invoices created successfully");

    const insertedInvoices = [];
    for (const invoice of invoices) {
      const result = await sql`
                INSERT INTO invoices (customer_id, amount, status, date)
                VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
                ON CONFLICT (id) DO NOTHING;
            `;
      insertedInvoices.push(result);
    }

    console.log(`Seeded ${insertedInvoices.length} invoices`);
    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedRevenue(sql: NeonQueryFunction<false, false>) {
  try {
    const createTable = await sql`
        CREATE TABLE IF NOT EXISTS revenue (
            month VARCHAR(4) NOT NULL UNIQUE,
            revenue INT NOT NULL
        )
        `;
    console.log("Table revenue created successfully");

    const insertedRevenue = [];
    for (const rev of revenue) {
      const result = await sql`
                INSERT INTO revenue (month, revenue)
                VALUES (${rev.month}, ${rev.revenue})
                ON CONFLICT (month) DO NOTHING;
            `;
      insertedRevenue.push(result);
    }

    console.log(`Seeded ${insertedRevenue.length} revenue`);
    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function main() {
  // On vérifie si DATABASE_URL est défini et non vide
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // On initialise la connexion à la base de données
  const sql = neon(process.env.DATABASE_URL);

  // On active l'extension uuid-ossp pour pouvoir utiliser uuid_generate_v4()
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Fonction pour créer la table user et lui importer la data
  await seedUsers(sql);
  await seedCustomers(sql);
  await seedInvoices(sql);
  await seedRevenue(sql);
}

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
