type searchQueryType = {
    supplier_registration_id: string;
    $or?: {
        [key: string]: string | {
            [key: string]: RegExp;
        };
    }[] | undefined;
}

export default searchQueryType;