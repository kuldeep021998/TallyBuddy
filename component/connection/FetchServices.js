import axios from 'axios';
const ServerURL = 'https://campusshala.com:3018';

const getData = async url => {
  try {
    console.log(url);
    var response = await axios.get(`${ServerURL}/${url}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const getToken = async url => {
  var response = await fetch(`${ServerURL}/admin/getToken`);
  var result = await response.json();
  return result.token;
};

const isValidAuth = async url => {
  try {
    var token = await getToken();
    //alert(localStorage.getItem('token'))
    var response = await fetch(`${ServerURL}/admin/isUserAuth`, {
      headers: {authorization: token},
    });
    var result = await response.json();
    return result;
  } catch (e) {
    return null;
  }
};

const postDataAxios = async (url, body) => {
  try {
    var response = await axios.post(`${ServerURL}/${url}`, body, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    var result = await response.data;
    return result;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const postData = async (url, body) => {
  try {
    console.log(url);
    var response = await axios.post(`${ServerURL}/${url}`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const putData = async (url, body) => {
  try {
    console.log(url);
    var response = await axios.put(`${ServerURL}/${url}`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

const deleteData = async (url, body) => {
  try {
    console.log(url);
    var response = await axios.delete(`${ServerURL}/${url}`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export {
  ServerURL,
  postData,
  getData,
  isValidAuth,
  postDataAxios,
  putData,
  deleteData,
};
