import Breadcrumbs from '@/components/common/Breadcrumbs'
import ProductEditForm from '@/components/ProductPage/ProductEdit/ProductEditFrom'
import React, { Suspense } from 'react'

const EditProduct = () => {
    return (

        <div>
            <Breadcrumbs pageTitle="Update Products" />
            <div className="space-y-6">
                <Suspense fallback={<div>Loading offer form...</div>}>
                    <ProductEditForm />
                </Suspense>

            </div>
        </div>
    )
}

export default EditProduct