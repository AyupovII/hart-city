import axios from "axios"
import { BASE_URL } from "../constants/url"

type ErrorType = {
  response: {
    data: {
      message: string
    }
  }
}
export type FilterType = {
  filters: {
    maxPrice: number
    minPrice: number
    maxArea: number
    minArea: number
    rooms: number[]
    floors: number[]
    type: {
      id: number
      value: string
    }[]
  }

}


const API_URL = `${BASE_URL}/api/filter`

export const getApartmentsFilter = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/apartments-filter/`,
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
    return response.data as FilterType
  } catch (error: ErrorType | any) {
    throw new Error(`Ошибка! ${error?.response?.data?.message}`)
  }
}

