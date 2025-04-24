import axios from "axios";

const baseURL='http://localhost:8000/api/v1/qnas'


async function addQuestion(productid,data) {
    try {
        
        const response= await axios.post(`${baseURL}/add-question/${productid}`,data,{
            withCredentials:true
        })
        if(response) return true;
        else return false;
    } catch (error) {
        console.log("Error while adding question ::",error)
    }
}

async function removeQuestion(questionid) {
    try {

        const response= await axios.post(`${baseURL}/remove-question/${questionid}`,{},{
            withCredentials:true
        })
        if(response) return true;
        else return false;
    } catch (error) {
        console.log("Error while removing question ::",error)
    }
}


async function addAnswer(questionid,data) {
    try {

        const response= await axios.post(`${baseURL}/add-answer/${questionid}`,data,{
            withCredentials:true
        })
        if(response) return true;
        else return false;
    } catch (error) {
        console.log("Error while adding answer ::",error)
    }
}


async function removeAnswer(questionid) {
    try {

        const response= await axios.post(`${baseURL}/remove-answer/${questionid}`,{},{
            withCredentials:true
        })
        if(response) return true;
        else return false;
    } catch (error) {
        console.log("Error while removing answer ::",error)
    }
}


async function getQnas(productid) {
    try {

        const response= await axios.get(`${baseURL}/get-qna/${productid}`)
        if(response) return response.data.data;
        else return null;
        
    } catch (error) {
        console.log("Error while getting QnA ::",error)
    }
}


export {
    getQnas,
    addQuestion,
    addAnswer,
    removeQuestion,
    removeAnswer
}