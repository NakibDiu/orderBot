import axiosInstance from "../utils/axiosInterceptor";

export default async function post(
  url,
  data,
  callBack,
  errorCallBack,
  isMultipart = false
) {
  let config = {
    method: "post",
    url,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${"token"}`,
    },
    data,
  };

  if (isMultipart) {
    config = {
      ...config,
      "Content-Type": "multipart/form-data",
    };
  }

  try {
    const response = await axiosInstance.post(`${url}`, data, config);
    callBack(response);
  } catch (error) {
    errorCallBack(error);
  }
}
