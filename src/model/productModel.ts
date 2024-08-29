class ProductModel {
    idProduct: number;
    nameProduct ?: string;  // co the null
    dOm ?: Date;
    expiry ?: Date;
    origin ?: string;
    description ?: string;
    quantity ?: number;
    price ?: number;
    rank ?: number;

    constructor(
        idProduct: number,
        nameProduct ?: string,  // co the null
        dOm ?: Date,
        expiry ?: Date,
        origin ?: string,
        description ?: string,
        quantity ?: number,
        price ?: number,
        rank ?: number
     
    ){
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.dOm = dOm;
        this.expiry = expiry;
        this.description = description;
        this.origin = origin
        this.quantity = quantity;
        this.price = price;
        this.rank = rank;
    }
}


export default ProductModel;