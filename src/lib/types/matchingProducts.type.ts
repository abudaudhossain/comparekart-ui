import { ProductCardProps } from "./product.type";

export interface matchingProducts {
    id: string,
    title: string | null,
    subTitle: string | null,
    image: string | null,
    gtin: string,
    isHome: boolean,
    status: string,
    createdAt: Date | string,
}


export interface MatchingProductsPropsHome {
    id: string,
    title: string | null,
    subTitle: string | null,
    image: string | null,
    gtin: string,
    isHome: boolean,
    status: string,
    createdAt: Date | string,
    updatedAt: Date | string,
    productCount: number,
    products: ProductCardProps[] | []
}