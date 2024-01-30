import EcBills from "../../types/modelTypes/ec_bills";
import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../../src/config/sequelize-config";

EcBills.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    invoice_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    total_amount: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    products: {
        type: DataTypes.JSON, 
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
},
{
    sequelize,
    modelName: 'ec_bills',
    tableName: 'ec_bills',
});

export default EcBills;