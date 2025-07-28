import React, { useState } from 'react'
import { DateRange } from 'react-day-picker';
import DatePicker from '../ui/DatePicker/DatePicker';
import UserIdFilter from '../common/UserIdFilter';
import { clientSideAxios } from '../../../lib/api/axios/clientSideAxios';
import successMessage from '@/lib/successMessage';
import { AxiosError } from 'axios';
import errorMessage from '@/lib/errorMessage';
interface CreatedInvoiceProps {
    onClose: () => void;
}


const InvoicesCreated: React.FC<CreatedInvoiceProps> = ({ onClose }) => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [filterUserId, setFilterUserId] = useState("")
    const [loading, setLoading] = useState(false)

    const createdInvoiceHandler = async () => {
        setLoading(true);
        try {


            const res = await clientSideAxios.post("/billing", {
                userId: filterUserId,
                periodStart: dateRange?.from,
                periodEnd: dateRange?.to
            });

            const data = res.data;
            setFilterUserId("")
            setDateRange(undefined)
            successMessage(data.message)
            onClose()
        } catch (error) {
            //console.log("error...", error)
            if (error instanceof Error && (error as AxiosError<{ message?: string }>).response?.data?.message) {
                errorMessage((error as AxiosError<{ message?: string }>).response?.data?.message || "An unknown error occurred");
            } else {
                errorMessage("An unknown error occurred");
            }
            onClose()
        }
    }

    return (
        <>
            <div className="m-6 flex flex-col justify-between">
                <h1>New Billing {dateRange?.from ? dateRange?.from?.toLocaleDateString() + " to " + dateRange?.to?.toLocaleDateString() : ""}</h1>
                <div className='flex items-center gap-2 my-4'>

                    <UserIdFilter filterUserId={filterUserId} setFilterUserId={setFilterUserId} />
                    <div className='min-w-[250px]'>

                        <DatePicker
                            range={dateRange} onChange={setDateRange}
                        />
                    </div>
                </div>
                <button
                    onClick={() => {
                        createdInvoiceHandler()
                    }}
                    className="w-[200px] text-center bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 "
                >
                    Create New Invoice
                </button>

            </div></>
    )
}

export default InvoicesCreated