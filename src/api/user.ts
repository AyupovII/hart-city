import axios from "axios"
import { BASE_URL } from "../constants/url"

type ErrorType = {
  response: {
    data: {
      message: string
    }
  }
}
const API_URL = `${BASE_URL}/api/user`


export const getUser = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

  })
  return response.json()
}

export const updatePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await axios.post(`${API_URL}/update-photo`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response
  }
  catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`);
  }
}

export const changePassword = async ({ oldPassword, password }: { oldPassword: string, password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`,
      {
        oldPassword,
        password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    return response;
  } catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`);
  }
};
// https://art-city.wptt.ru/api/auth/reg-start


