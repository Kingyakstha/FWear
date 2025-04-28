import axios from "axios";

const baseurl = "http://localhost:8000/api/v1";

async function getRequest(url) {
    console.log("inside get Request");
    try {
        const response = await axios({
            method: "get",
            url: url,
            baseURL: baseurl,
        });
        console.log(response.data);
    } catch (error) {
        console.log("Error in get req http client", error);
    }
}

async function postRequest(url, data) {
    console.log("inside post Request");
    try {
        const response = await axios({
            method: "post",
            url: url,
            baseURL: baseurl,
            data: data,
        });
        console.log(response);
    } catch (error) {
        console.log("Error in post req http client", error);
    }
}

async function patchRequest(url, data) {
    console.log("inside patch Request");
    try {
        const response = await axios({
            method: "patch",
            url: url,
            baseURL: baseurl,
            data: data,
        });
        console.log(response);
    } catch (error) {
        console.log("Error in patch http client", error);
    }
}

export { getRequest, postRequest, patchRequest };
