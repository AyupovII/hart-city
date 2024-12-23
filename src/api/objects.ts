import axios from "axios"
import { ObjectType } from "../types/objects"
import { BASE_URL } from "../constants/url"

type ErrorType = {
  response: {
    data: {
      message: string
    }
  }
}
export type DataType = {
  objects: ObjectType[]
  count: number
}


const API_URL = `${BASE_URL}/api/objects`

export const getMainPageObjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/main-page-objects/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return response.data.objects as ObjectType[]
  } catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`)
  }
}

export const getObjects = async ({ page, limit }: { page: number, limit: number }) => {
  try {
    const response = await axios.get(`${API_URL}/get-objects/`,
      {
        params: {
          page,
          limit
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return response.data as DataType
  } catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`)
  }
}
