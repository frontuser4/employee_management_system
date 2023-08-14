import axios from "axios";
axios.defaults.headers.common["Authorization"] = `jhsajdkhsakdjhsdjakjdhsajdsd`;
const SALES_TG_URL = "http://142.93.208.119:80";
const BASE_URL = "http://64.227.141.209:8080";
const APP_LOGIN = 'http://142.93.208.119:8000';

async function loginPage(url, data){
    try {
      const loginRes = await axios.post(`${APP_LOGIN}${url}`, data);
      return loginRes;
    } catch (error) {
      return error;
    }
}

async function get(url, id, month, year, users) {
  try {
    const result = await axios.get(`${BASE_URL}${url}`, {
      params: { empId: id, month: month, year: year, user : users },
    });
    return result.data;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function post(url, data) {
  try {
    const res = await axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function update(url, id, month, year, data) {
  //  let empId = id;
  try {
    const result = await axios({
      url: `${BASE_URL}${url}`,
      method:'put',
      data: data,
      headers:{
        "content-type": "multipart/form-data",
      },
      params: { empId: id, month: month, year: year }
    })
    return result.data;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function getEmp(url, empId, desig) {
  try {
    const result = await axios.get(`${SALES_TG_URL}${url}`, {
      params: {empId: empId, desig: desig },
    });
    return result.data.empList;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function scoreSummaryGet(url, id, month, year) {
  try {
    const result = await axios.get(`${SALES_TG_URL}${url}`, {
      params: { empId: id, month: month, year: year },
    });
    return result.data;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function imageDelete(url, empId, date, imageFile){
  const res = await axios({
    url: `${BASE_URL}${url}`,
    method:'delete',
    headers:{
      "content-type": "multipart/form-data",
    },
    params: { empId: empId, date: date, field: imageFile}
  })
  return res.data;

} 

export { get, post, loginPage, update, getEmp, scoreSummaryGet, imageDelete };
