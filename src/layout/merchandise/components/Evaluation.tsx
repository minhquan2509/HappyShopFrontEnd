import React, { useState, useEffect } from "react";
import {getAllEvaluation } from "../../../API/EvaluationAPI";
import EvaluationModel from "../../../model/EvaluationModel";
import renderRating from "../../utils/star";
interface Evaluation {
    idProduct: number;
}
const Evaluation: React.FC<Evaluation> = (props) => {

    const idProduct: number = props.idProduct;


    const [listEvaluation, setListEvaluation] = useState<EvaluationModel[]>([]);
    const [loadingData, setLoadingData] = useState(true);
    const [bugs, setBugs] = useState(null);


    useEffect(() => {
        getAllEvaluation(idProduct).then(
             listEvaluation=> {
                setListEvaluation(listEvaluation);
                setLoadingData(false);
            }
        ).catch(
            error => {
                setLoadingData(false);
                setBugs(error.message);
            }
        )
    }, []
    )

    if (loadingData) {
        return (
            <div>
                <h1>Loading Data....</h1>
            </div>
        );
    }
    if (bugs) {
        return (
            <div>
                <h1>Error: {bugs}</h1>
            </div>
        );
    }
    return (
        <div className="row text-center" >
            <h3>Đánh Giá Sản Phẩm</h3>
            {
                listEvaluation.map((evaluation, index) => (
                    <div className="row text-align:right">
                    <div className="col-4"><h3>{renderRating(evaluation.rank?evaluation.rank:0)}</h3></div>
                        <div className="col-8"><p>{evaluation.comment}</p></div>
                    </div>
                )
                )
            }

        </div>


    );
}

export default Evaluation;