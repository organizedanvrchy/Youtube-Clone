"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { fetchSearchQuery } from "@/lib/api";
import { SearchListResponse } from "../../../../types/custom_types";
import { formatPublishedDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Search = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q");

    if (!searchQuery) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-gray-500">No search query provided.</p>
            </div>
        );
    }

    const {
        data: searchResults,
        error,
        isLoading,
    } = useSWR<SearchListResponse>(
        `fetchVideos/${searchQuery}`,
        (key: string) => fetchSearchQuery(searchQuery)
    );

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-red-500">Error fetching search results. Please try again later.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="px-3">
                <h3 className="text-2xl font-semibold my-5">Loading...</h3>
                <div className="grid gap-6">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex animate-pulse gap-4">
                            <div className="w-32 h-32 bg-gray-300 rounded-lg"></div>
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-[-64px] px-3">
            <h3 className="scroll-m-20 my-5 text-2xl font-semibold tracking-tight">
                Search Results
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults?.items.map((item) => (
                    <Link
                        href={`/watch/${item.id.videoId}`}
                        key={item.id.videoId}
                        className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800"
                    >
                        <div className="relative w-full h-48 md:h-56">
                            <Image
                                src={item.snippet.thumbnails.medium.url}
                                alt={item.snippet.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <h4 className="text-lg font-semibold line-clamp-2">
                                {item.snippet.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatPublishedDate(item.snippet.publishedAt)}
                            </p>
                            <div className="flex items-center space-x-3 mt-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="/pro_pic.jpg" alt="Channel Avatar" />
                                    <AvatarFallback>?</AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                                    {item.snippet.channelTitle}
                                </p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
                                {item.snippet.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Search;
