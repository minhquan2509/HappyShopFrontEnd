import {Star, StarFill} from "react-bootstrap-icons";
const renderRating = (point: number) => {
    const stars = [];
    for(let i =1 ; i <= 5; i++){
        if(i <= point){
            stars.push(<StarFill className="text-warning"/>)
        }else{
            stars.push(<Star className="tex-secondary"/>)
        }
    }
    return stars;
}

export default renderRating;