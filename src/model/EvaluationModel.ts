class EvaluationModel {
    idEvaluation: number;
    comment?: string;
    rank?: number;
    idUser?: number;
    idProduct?: number;

    constructor(
        idEvaluation: number,
        comment: string,
        rank: number,
        idUser: number,
        idProduct: number
    ) {
        this.idEvaluation = idEvaluation;
        this.comment = comment;
        this.rank = rank;
        this.idUser = idUser;
        this.idProduct = idProduct;
    }
}
export default EvaluationModel;