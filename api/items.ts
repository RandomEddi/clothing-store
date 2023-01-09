import { appApiInstance } from 'api'
import { IItem, ErrorResponse, ICatalogQueryParams } from 'types'

export const getItems = async (
  params: ICatalogQueryParams = {}
): Promise<IItem[]> => {
  try {
    const { data } = await appApiInstance.get<IItem[] | ErrorResponse>(
      `/catalog`,
      { params }
    )
    if (Array.isArray(data)) {
      return data
    } else {
      throw Error(data.message)
    }
  } catch (e) {
    const error = e as ErrorResponse
    console.log(error.message)
  }
  return []
}

export const getCertainItem = async (id: string) => {
  try {
    const { data } = await appApiInstance.get<IItem>(`/catalog/${id}`)
    if (!data) return null
    data.id = id
    return data
  } catch (e) {
    const error = e as ErrorResponse
    console.log(error.message)
  }
}
