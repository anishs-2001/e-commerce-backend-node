import sequelize from "../config/sequelize-config";

const sequelizeSync = async (): Promise<void> => {
    //Syncing the models in node and schema in DB
    await sequelize.sync({ force: false })
        .then(() => {
            console.log('Database synced.');
        })
        .catch((error) => {
            console.error("Error syncing database:", error);
        });
};

export default sequelizeSync;
