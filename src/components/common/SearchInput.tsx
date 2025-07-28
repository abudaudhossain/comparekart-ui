import React, { useEffect, useState } from "react";

type SearchInputProps = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    delay?: number; // Optional debounce delay in ms
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const SearchInput: React.FC<SearchInputProps> = ({
    searchValue,
    setSearchValue,
    delay = 300,
}) => {
    const [localValue, setLocalValue] = useState(searchValue);

    useEffect(() => {
        setLocalValue(searchValue); // sync if external changes
    }, [searchValue]);

    // Memoized debounced setter
    const debouncedSetSearchValue = React.useMemo(
        () => debounce(setSearchValue, delay),
        [setSearchValue, delay]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalValue(value);
        debouncedSetSearchValue(value);
    };

    return (
        <div>

            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder="Search..."
                className={`border p-2 rounded-md min-w-[250px] bg-white`}
            />
        </div>
    );
};

export default SearchInput;
