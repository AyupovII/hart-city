  export type ApartmentType={
    images: {
        layoutPhotos: string[]
    },
    paymentsMethods: {id: number, name: string}[],
    rooms: number,
    name: string,
    price: number,
    type: string,
    area: number,
    finishing: string,
    floor: number
  }