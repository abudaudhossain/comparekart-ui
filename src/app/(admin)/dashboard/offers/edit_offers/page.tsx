import Breadcrumbs from '@/components/common/Breadcrumbs'
import OfferEditForm from '@/components/offerPage/offerEdit/OfferEditForm'
import React, { Suspense } from 'react'

const EditOffer = () => {
    return (

        <div>
            <Breadcrumbs pageTitle="Edit Products" />
            <div className="space-y-6">
                <Suspense fallback={<div>Loading offer form...</div>}>
                    <OfferEditForm />
                </Suspense>

            </div>
        </div>
    )
}

export default EditOffer