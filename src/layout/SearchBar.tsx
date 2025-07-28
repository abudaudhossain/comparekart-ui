"use client"
import { Search, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/navigation';


interface SearchProps {
    className?: string;
}

const SearchBar: React.FC<SearchProps> = ({ className }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<{
        id: string,
        title: string
    }[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const showSuggestions = isFocused && query.trim() !== ''

    const fetchSuggestions = debounce(async (value: string) => {
        if (!value) return setSuggestions([]);
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products-options`, {
                params: {
                    statusParam: 'ASSIGNED',
                    search: value
                }
            });
            setSuggestions(response.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, 300)

    useEffect(() => {
        fetchSuggestions(query);
        return () => {
            fetchSuggestions.cancel();
        };
    }, [query]);

    const handleClear = () => {
        setQuery('')
        inputRef.current?.focus()
        setSuggestions([]);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() !== '') {
            router.push(`/products?search=${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <div className={`w-full pb-[16px] sm:pb-0 sm:w-auto ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search Product..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        className={`dark:bg-dark-900 h-11 w-full border bg-white py-2.5 pl-4 pr-14 text-[18px] text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:border-gray-800 dark:text-white/90 dark:placeholder:text-white/30 md:w-[400px] lg:w-[520px] ${isFocused ? "rounded-t-sm" : "rounded-sm"}`}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white/80 border-r-3 pr-1"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>
                    )}
                    <Search
                        onClick={(e) => handleSubmit(e)}
                        size={20}
                        strokeWidth={3}
                        className={`${isFocused ? 'text-[#FF6600]' : 'text-gray-500'} absolute right-2.5 top-3 inline-flex  items-center gap-0.5 rounded-lg cursor-pointer`}
                    />

                    {showSuggestions && (
                        <div className="absolute top-full left-0 z-10 mt-0 w-full rounded-b-sm border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-dark-800">
                            {loading ? (
                                <div className="text-gray-500 dark:text-white/60 px-2 py-1">Loading...</div>
                            ) : (
                                <ul className="space-y-2 text-base text-gray-700 dark:text-white/80">
                                    {suggestions.map((item, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer rounded p-2 hover:bg-[#E2EBF4]"
                                            onMouseDown={() => {
                                                setQuery(item.title);
                                                setIsFocused(false);
                                                router.push(`/products/${item.id}`);
                                            }}
                                        >
                                            {item.title}
                                        </li>
                                    ))}
                                    {suggestions.length === 0 && (
                                        <li className="text-gray-400 dark:text-white/40 px-2">No results found</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SearchBar;
