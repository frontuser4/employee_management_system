import axios from "axios";
axios.defaults.headers.common["Authorization"] = `jhsajdkhsakdjhsdjakjdhsajdsd`;
const SALES_TG_URL = import.meta.env.VITE_APP_LOGIN_URL;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const BASE_URL = import.meta.env.VITE_APP_LOCAL_URL;
const APP_LOGIN = import.meta.env.VITE_APP_LOGIN_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers:{
    Authorization: `jhsajdkhsakdjhsdjakjdhsajdsd`
  }
});

async function loginPage(url, data) {
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
      params: { empId: id, month: month, year: year, level: users },
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

async function update(url, id, month, year, level, data) {
  try {
    const result = await axios({
      url: `${BASE_URL}${url}`,
      method: "put",
      data: data,
      headers: {
        "content-type": "multipart/form-data",
      },
      params: { empId: id, month: month, year: year, level: level },
    });
    return result.data;
  } catch (error) {
    console.log("get: ", error);
  }
}

async function getEmp(url, empId, desig, group) {
  try {
    const result = await axios.get(`${SALES_TG_URL}${url}`, {
      params: { empId: empId, desig: desig, empGroup: group },
      headers:{
        Authorization : `${localStorage.getItem('token')}`
      }
    });
    return result.data.empList;
  } catch (error) {
    console.log("emp get: ", error);
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

async function imageDelete(url, empId, date, imageFile) {
  const res = await axios({
    url: `${BASE_URL}${url}`,
    method: "delete",
    headers: {
      "content-type": "multipart/form-data",
    },
    params: { empId: empId, date: date, field: imageFile },
  });
  return res.data;
}

export {
  get,
  post,
  loginPage,
  update,
  getEmp,
  scoreSummaryGet,
  imageDelete,
  axiosInstance,
};