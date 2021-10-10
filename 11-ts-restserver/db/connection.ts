import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'root', 'Cigoher22', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false,
});

export default db;