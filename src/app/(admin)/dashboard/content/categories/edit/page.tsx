import NotFound from '@/app/not-found';
import Breadcrumbs from '@/components/common/Breadcrumbs'
import CategoriesEditForm from '@/components/content/categories/CategoriesEditForm';
import GroupEditForm from '@/components/content/GroupEditForm'
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'



const EditGroup = async () => {


    return (
        <div>
            <Breadcrumbs pageTitle="Update Category" />
            <div className="space-y-6">
                <Suspense fallback={<div>Loading offer form...</div>}>
                    <CategoriesEditForm

                    />
                </Suspense>
            </div>
        </div>
    );
};

export default EditGroup;
