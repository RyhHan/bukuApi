import { Model, DataTypes } from 'sequelize';
import database from '../database/database';

class Buku extends Model {
    public id!: number;
    public userId!: string;
    public judul!: string;
    public penulis!: string;
    public tahunTerbit!: number;
    public description!: string;
    public status!: string;
    public coverUrl!: string;
}

Buku.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahunTerbit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'belum dibaca'
    },
    coverUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize: database,
        tableName: 'buku'
    }
).sync()
    .then(() => {
        console.log("Buku model synchronized successfully.");
    })
    .catch((error) => {
        console.error("Error synchronizing Buku model:", error);
    });

export default Buku;