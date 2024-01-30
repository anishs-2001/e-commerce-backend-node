import EcCart from '../models/ec_cart';
import EcCustomers from  '../models/ec_customers';

const associate = () => {
    // EcCustomers.hasMany(EcCart, { foreignKey: 'registration_id', sourceKey:'registration_id' });
    // EcCart.belongsTo(EcCustomers, { foreignKey: 'registration_id'});
    EcCustomers.hasMany(EcCart, { foreignKey: "registration_id" });
    EcCart.belongsTo(EcCustomers, { foreignKey: "registration_id",targetKey: 'registration_id'});
  };
  
 export default associate;



