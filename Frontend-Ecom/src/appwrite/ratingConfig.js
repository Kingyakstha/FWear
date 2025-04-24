import axios from "axios";

const baseURL='http://localhost:8000/api/v1/ratings'


async function addRating(productid,data) {
    try {

        const response= await axios.post(`${baseURL}/add-rating/${productid}`,data,{
            withCredentials:true
        })
        if(response) return true;
        else return false;

    } catch (error) {
        console.log("Error occured while getting ratings ::",error)
    }
}


async function changeRating(ratingid,data) {
    try {

        const response= await axios.post(`${baseURL}/change-rating/${ratingid}`,data,{
            withCredentials:true
        })
        if(response) return true;
        else return false;
        
    } catch (error) {
        console.log("Error occured while changing ratings ::",error)
    }
}

async function removeRating(ratingid) {
    try {

        const response= await axios.post(`${baseURL}/remove-rating/${ratingid}`,{},{
            withCredentials:true
        })
        if(response) return true;
        else return false;
        
    } catch (error) {
        console.log("Error occured while removing ratings ::",error)
    }
}


export {
    addRating,
    changeRating,
    removeRating
}