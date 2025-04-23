import axios from "axios";

const baseURL='http://localhost:8000/api/v1/images' 



async function addImages(productid,formData) {
    try {
        
        const response= await axios.post(`${baseURL}/addImage/${productid}`,formData)
        if( response) return true;
        else return false;

    } catch (error) {
        console.log(" Error occured while getting images :: ", error)
    }
}



async function deleteImages(imageid) {
    try {
        
        const response= await axios.post(`${baseURL}/deleteImage/${imageid}`)
        if( response) return true;
        else return false;

    } catch (error) {
        console.log(" Error occured while getting images :: ", error)
    }
}


async function changeColor(imageid,data) {
    try {
        
        const response= await axios.patch(`${baseURL}/changeColor/${imageid}`,data)
        if( response) return true;
        else return false;

    } catch (error) {
        console.log(" Error occured while getting images :: ", error)
    }
}

async function getImages(productid) {
    try {
        
        const response= await axios.get(`${baseURL}/getImages/${productid}`)
        if( response) {
            if(response.data.data.length !==0) return response.data.data;
            else return false;
        }
        else return false;

    } catch (error) {
        console.log(" Error occured while getting images :: ", error)
    }
}


export {
    addImages,
    deleteImages,
    changeColor,
    getImages
}