"use client";

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    onCommandOpen?: () => void; // If you have a modal to toggle
}

export default function SearchInput({
    placeholder = "Search or type command...",
    onSearch,
    onCommandOpen,
}: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState("");
    const [showClear, setShowClear] = useState(false);

    // Debounce logic (300ms)
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch?.(query.trim());
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query, onSearch]);


    useEffect(() => {
        const listener = (e: globalThis.KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (onCommandOpen) {
                    onCommandOpen();
                } else {
                    inputRef.current?.focus();
                }
            }
        };

        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
    }, [onCommandOpen]);


    const handleClear = () => {
        setQuery("");
        setShowClear(false)
        onSearch?.("");
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
                {/* Search icon */}
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                        className="fill-gray-500 dark:fill-gray-400"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        />
                    </svg>
                </span>

                {/* Input */}
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowClear(e.target.value.length > 0);
                    }}
                    type="text"
                    placeholder={placeholder}
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />

                {/* Clear (X) Button */}
                {showClear ? (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white/80"
                    >
                        ✕
                    </button>
                ) : (<button
                    type="button"
                    className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
                >
                    <span>⌘</span>
                    <span>K</span>
                </button>)}

                {/* Shortcut Button */}

            </div>
        </form>
    );
}
