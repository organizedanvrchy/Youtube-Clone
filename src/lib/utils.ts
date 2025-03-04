import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatCount(viewCount: number): string {
	if (viewCount < 1000) {
		return viewCount.toString();
	} else if (viewCount < 1000000) {
		return (viewCount / 1000).toFixed(1) + "K";
	} else {
		return (viewCount / 1000000).toFixed(1) + "M";
	}
}

export function formatPublishedDate(publishedDate: string): string {
	const currentDate = new Date();
	const published = new Date(publishedDate);

	const secondsAgo = Math.floor(currentDate.getTime() - published.getTime()) / 1000;

	if (secondsAgo < 60) {
		return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
	} else if (secondsAgo < 3600) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
	} else if (secondsAgo < 86400) {
		const hoursAgo = Math.floor(secondsAgo / 3600);
		return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
	} else if (secondsAgo < 2592000) {
		const daysAgo = Math.floor(secondsAgo / 86400);
		return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
	} else if (secondsAgo < 31536000) {
		const monthsAgo = Math.floor(secondsAgo / 2592000);
		return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
	} else {
		const yearsAgo = Math.floor(secondsAgo / 31536000);
		return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
	}
}