export interface GetOneBasketDto {
  query: {
    _user: string
  }
}

export interface GetOrdersDto {
  query: {
    _basket: string
  }
}

export interface GetRoomsDto {
  query: {
    _building?: string
    _type?: string
    page?: number | string
    limit?: number | string
    isFree?: string
  }
}

export interface GetBookReviewDto {
  query: {
    _room: string
  }
}
