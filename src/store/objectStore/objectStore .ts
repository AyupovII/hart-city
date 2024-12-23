import { makeAutoObservable } from "mobx";
import { Option } from '../../types/common'

export type ParamsFilterType = {
    id?: number
    page?: number
    limit?: number
    type?: number
    floors?: string
    rooms?: string
    area?: number[]
    price?: number[]
    areaFrom?: number
    areaTo?: number
    priceFrom?: number
    priceTo?: number
}
export type ParamsFilterType1 = {
    typeValue: Option[] | null
    floorsValue: Option[] | null
    roomsValue: Option[] | null
    areaValue: number[]
    priceValue: number[]
}
class ObjectStore {
    params: ParamsFilterType = {
        page: 1,
        limit: 12
    };
    paramsFilter?: ParamsFilterType1 = {
        typeValue: null,
        floorsValue: [],
        roomsValue: [],
        areaValue: [0, 0],
        priceValue: [0, 0]
    }
    countUrlParams = 2

    constructor() {
        makeAutoObservable(this);
    }

    setParams(params: ParamsFilterType) {
        this.params = { ...this.params, ...params } as typeof this.params;
        const { page, limit, ...paramsCount } = this.params
        this.setCountUrlParams(Object.entries(paramsCount).filter(([_, value]) => Boolean(value)).length)
    }
    setCountUrlParams(сount: number) {
        this.countUrlParams = сount
    }
    paramsReset() {
        this.params = {
            page: this.params.page,
            limit: this.params.limit
        };
    }
    setParamsFilter(params: any) {
        this.paramsFilter = { ...this.paramsFilter, ...params } as typeof this.paramsFilter;
    }
    paramsFilterReset() {
        this.paramsFilter = undefined
        this.countUrlParams = 0;
    };
}
    export const objectStore = new ObjectStore();
