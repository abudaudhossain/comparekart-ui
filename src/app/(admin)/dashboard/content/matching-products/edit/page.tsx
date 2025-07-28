import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/common/Breadcrumbs'
import GroupEditForm from '@/components/content/GroupEditForm'
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'



const EditGroup = async () => {


    return (
        <div>
            <Breadcrumbs pageTitle="Update Product Group" />
            <div className="space-y-6">
                <Suspense fallback={<div>Loading offer form...</div>}>
                    <GroupEditForm

                    />
                </Suspense>
            </div>
        </div>
    );
};

export default EditGroup;
