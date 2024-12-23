import axios from "axios"
import { LiveRequestRegistrationType } from "../types/form"
import { BASE_URL } from "../constants/url"

type ErrorType = {
  response: {
    data: {
      message: string
    }
  }
}
const API_URL = `${BASE_URL}/api/auth`

export const signIn = async ({ login, password }: { login: string, password: string }) => {
  await axios.post(`${API_URL}/login`,
    {
      login,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then(res => {
    localStorage.setItem('token', res.data.token)
    return res.data
  })
    .catch((error: ErrorType | any) => { throw new Error(`Ошибка! ${error?.response?.data?.message}`) })
}
export const recoveryPassCheckCode = async ({ userId, passwordRecoveryCode }: { userId: string, passwordRecoveryCode: string }) => {
  await axios.post(`${API_URL}/recovery-pass-check-code`,
    {
      userId,
      passwordRecoveryCode,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then(res => {

    return res.data
  })
    .catch((error: ErrorType | any) => { throw new Error(`Ошибка! ${error?.response?.data?.message}`) })
}
export const recoveryPassFinish = async ({ userId, passwordRecoveryCode, password }: { userId: string, passwordRecoveryCode: string, password: string }) => {
  await axios.post(`${API_URL}/recovery-pass-finish`,
    {
      userId,
      passwordRecoveryCode,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then(res => {

    return res.data
  })
    .catch((error: ErrorType | any) => { throw new Error(`Ошибка! ${error?.response?.data?.message}`) })
}

export const regStart = async (body: LiveRequestRegistrationType) => {
  try {
    const response = await axios.post(`${API_URL}/reg-start`, {
      ...body
    }, {
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

export const recoveryPassStart = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/recovery-pass-start`, {
      email
    }, {
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