import axiosInstance from "../utils/axiosInterceptor";

export default async function get(url, callBack, errorCallBack) {
  try {
    const response = await axiosInstance.get(`${url}`);
    callBack(response);
  } catch (error) {
    if (errorCallBack) errorCallBack(error);
  }
}
