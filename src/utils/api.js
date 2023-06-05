import axios from "axios";
axios.defaults.headers.common['Authorization'] = `jhsajdkhsakdjhsdjakjdhsajdsd`;
const BASE_URL = 'http://142.93.208.119:80';


async function get(url, id){
    try {
    const result = await axios.get(`${BASE_URL}${url}`, { params: { empId: id } });
     return result.data.excpences;
    } catch (error) {
        console.log("get: ", error)
    }
}

async function post(url, data){
      console.log("data: ", data)
      try {
        const res = await axios.post(`${BASE_URL}${url}`, data);
         return res;
        } catch (error) {
            console.log("get: ", error)
     }
}

export {get, post}