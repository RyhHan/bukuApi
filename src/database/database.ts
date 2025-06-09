import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DBNAME || "buku";
const dbUser = process.env.DBUSER || "default_user";
const dbPassword = process.env.DBPASSWORD || "default_password";
const database = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql"
})

database.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

export default database;