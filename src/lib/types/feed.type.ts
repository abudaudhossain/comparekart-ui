export interface Feed {
    id: string;
    user: {
        id: string;
        name: string;
        role: {
            name: string;
        };
    };
    type: string;
    url: string;
    status: string;
    errorMessage: string;
    
    updatedAt: string,
    _count: {
        products: number
    }
}