import axios from "axios";
axios.defaults.headers.common["Authorization"] = `jhsajdkhsakdjhsdjakjdhsajdsd`;
// const BASE_URL = "http://142.93.208.119:80";
const BASE_URL = "http://13.126.67.127:8080";

async function get(url, id, month, year) {
  try {
    const result = await axios.get(`${BASE_URL}${url}`, {
      params: { empId: id, month: month, year: year },
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
    console.log("res: ", res);
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

async function getEmp(url, month, year) {
  try {
    const result = await axios.get(`${BASE_URL}${url}`, {
      params: { month: month, year: year },
    });
    return result.data.excpences;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function scoreSummaryGet(url, id, month, year) {
  try {
    const result = await axios.get(`${BASE_URL}${url}`, {
      params: { empId: id, month: month, year: year },
    });
    return result.data;
  } catch (error) {
    console.log("get: ", error);
  }
}

export { get, post, update, getEmp, scoreSummaryGet };
