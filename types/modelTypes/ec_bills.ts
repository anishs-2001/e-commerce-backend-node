import { Model } from 'sequelize';

class EcBills extends Model {
    public id!: number;
    public invoice_number!: string;
    public total_amount!: number;
    public products!: JSON
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default EcBills;