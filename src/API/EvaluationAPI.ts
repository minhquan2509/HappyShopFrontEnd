import React from "react";
import { my_request } from "./Request";
import Evaluation from "../model/EvaluationModel";
import EvaluationModel from "../model/EvaluationModel";

async function getEvaluation(url: string): Promise<EvaluationModel[]> {
    const result: EvaluationModel[] = [];
    //goi request
    const response = await my_request(url);

    //lay ra toan bo hinh anh cua product
    const responseData = response._embedded.evaluationses;

    for (const key in responseData) {
        result.push({
            idEvaluation: responseData[key].idEvaluation,
            comment: responseData[key].comment,
            rank: responseData[key].rank,
            idUser: 0,
            idProduct: 0,
        });
    }
    return result;
}
export async function getAllEvaluation(idProduct: number): Promise<EvaluationModel[]> {


    //xac dinh endpoint
    const endpoint: string = `http://localhost:8080/product/${idProduct}/evaluationsList`;


    return getEvaluation(endpoint);
}

export async function get1EvaluationOf1Product(idProduct: number): Promise<EvaluationModel[]> {


    //xac dinh endpoint
    const endpoint: string = `http://localhost:8080/product/${idProduct}/evaluationsList?sort=idEvaluation,asc&page=0&size=1`;


    return getEvaluation(endpoint);
}