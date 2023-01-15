interface IUserData {
  firstName: string
  lastName: string
  phone: string
  email: string
  id: string
}

interface IUserOrder {
  isActive: boolean
  orderNumber: number
  amount: number
  quantity: number
  date: Date
}


interface IUserAddresses {
  index: string
  region: string
  district: string
  street: string
  house: string
  corpus: string
  flat: string
}

export interface IProfile {
  isLogged?: boolean
  userData: Partial<IUserData>
  userAddresses?: IUserAddresses[]
  userOrders?: IUserOrder[]
}
