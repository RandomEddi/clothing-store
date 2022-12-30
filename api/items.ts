import { appApiInstance } from 'api'
import { AppDispatch } from 'store'
import { itemsActions } from 'store//slices'
import { IItem, ErrorResponse } from 'types'

export const getItems = (dispatch: AppDispatch) => async () => {
  appApiInstance
    .get<IItem[] | ErrorResponse>('/catalog')
    .then((resp) => resp.data)
    .then((data) => {
      if (Array.isArray(data)) {
        dispatch(itemsActions.updateItems(data))
      } else {
        console.log(data.message)
      }
    })
    .catch((e) => {
      const error = e as ErrorResponse
      console.log(error.message)
    })
}

export const getCertainItem = async (
  id: string
): Promise<IItem | ErrorResponse> => {
  const { data } = await appApiInstance.get<IItem | ErrorResponse>(
    `/catalog/${id}`
  )
  return data
}
