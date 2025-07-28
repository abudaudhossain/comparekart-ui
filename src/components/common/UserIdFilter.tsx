"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getUsersOptions } from "../../../util/data/clients";
import { useStore } from "@/context/StoreContext";

type OptionType = {
    value: string;
    label: string;
};

interface UserIdFilterProps {
    filterUserId: string;
    setFilterUserId: (value: string) => void;
}

const UserIdFilter: React.FC<UserIdFilterProps> = ({
    filterUserId,
    setFilterUserId,

}) => {
    const { user } = useStore()
    const [options, setOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {

            const userOptions = await getUsersOptions();
            setOptions(userOptions.items.map(user => ({ value: user.id, label: user.name })));

        };
        fetchUsers();
    }, []);

    const selectedOption = options.find((opt) => opt.value === filterUserId) || null;

    return (
        <div className={`${user?.role == "ADMIN" ? "flex" : "hidden"} flex-col gap-1 w-[250px]`}>
            {/* <label className="text-sm font-medium text-gray-700">Filter by User</label> */}
            <Select
                value={selectedOption}
                onChange={(selected) => {
                    setFilterUserId(selected?.value || "");
                }}
                options={options}
                isClearable
                placeholder="Select a user..."
                className="text-sm z-99"
            />
        </div>
    );
};

export default UserIdFilter;
