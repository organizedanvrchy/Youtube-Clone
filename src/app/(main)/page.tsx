"use client";

import useSWR from "swr";
import Loading from "../loading";

import Thumbnail from "@/components/ui/Thumbnail";
import { fetchVideos } from "@/lib/api";
import { useState } from "react";
import { SearchBadge } from "@/components/ui/SearchBadge";

export default function Home() {
	const [badge, setBadge] = useState("All");

	const {
		data: videoResults,
		error,
		isLoading,
	} = useSWR(`fetchVideo/${badge}`, () => fetchVideos(badge, 12));

	if (error) {
		throw new Error("Error fetching video data");
	}

	return (
		<>
			<div className="px-2 md:pl-[252px] fixed top-16 py-2 left-0 w-screen z-20 dark:bg-black bg-white">
				<SearchBadge
					badges={["Popular", "Music", "Gaming"]}
					currentBadge={badge}
					setBadge={setBadge}
				/>
			</div>

			<div className="flex flex-wrap">
				{isLoading && Array(9).fill(null).map((i, idx) => <Loading key={idx} />)}
				{error && <p>Failed to load videos. Please try again later.</p>}
				{!videoResults?.length && !isLoading && !error && (
					<p>No videos available for the selected badge.</p>
				)}
				{videoResults?.map((video) => (
					<Thumbnail key={video.id} video={video} />
				))}
			</div>
		</>
	);
}
