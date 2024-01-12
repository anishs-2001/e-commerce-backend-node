import { Model } from 'sequelize';

class EcCart extends Model {
    public id!: number;
    public registration_id!: string;
    public product_id!: string;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

export default EcCart;