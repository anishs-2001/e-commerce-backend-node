import EcSuppliers from "../../models/ec_suppliers";
import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { ManagedUpload } from "aws-sdk/clients/s3";

//Third party API
const s3 = new AWS.S3({
    accessKeyId: 'AKIA5IOGN2NXNVX6UNHV',
    secretAccessKey: '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',
});

const supplierRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
        const { full_name, e_mail, password, profile_pic } = req.body;

        const file = req?.file as Express.Multer.File;
        console.log(file);

        //Third party API method from its documentation
        const params: AWS.S3.PutObjectRequest = {
            Bucket: 'ecommercebucket1',
            Key: file?.originalname,
            Body: Readable.from(file?.buffer),
            ContentType: file?.mimetype,
        };

        s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        });

        await EcSuppliers.create({ full_name, e_mail, password, profile_pic: 'sample' }, { raw: true });

        res.status(200).json({ message: "Successfully inserted data in the table." })
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });//internal server error
    }
};

export default supplierRegistration;