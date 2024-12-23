import axios from "axios"
import { BASE_URL } from "../constants/url"
import { PlansContentType } from "../components/plans/plansContent/PlansContent"
import { ApartmentType } from "../types/apartament"

type ErrorType = {
  response: {
    data: {
      message: string
    }
  }
}
export type DataType = {
  apartments: PlansContentType[]
  count: number
}
export type ApartmentDataType = {
  apartment: ApartmentType
  token: string
}

const API_URL = `${BASE_URL}/api/apartments`

export const getApartments = async (params?: any) => {
  try {
    const response = await axios.get(`${API_URL}/get-apartments/`,
      {
        params,
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
export const getCountApartments = async (params?: any) => {
  try {
    const response = await axios.get(`${API_URL}/get-apartments/`,
      {
        params,
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

export const getSingleApartment = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/get-single-apartment/`,
      {
        params: {
          id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    return response.data as ApartmentDataType
  } catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`)
  }
}

