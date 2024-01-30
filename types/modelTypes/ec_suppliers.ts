import { Model } from 'sequelize';

class EcSuppliers extends Model {
    public id?: number;
    public full_name!: string;
    public e_mail!: string;
    public password!: string;
    public profile_pic!: string;
    public registration_id?: string;
    public registration_time_stamp?: Date;
    public createdAt?: Date;
    public updatedAt?: Date;

    //other methods or static properties can be added here
}

//since it is a default export, not needeed to use the same EcSuppliers name while importing
export default EcSuppliers;
