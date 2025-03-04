import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import TopNavigation from "@/components/ui/TopNavigation";
import "./globals.css";
import FooterMenu from "@/components/ui/FooterMenu";
import ContextProvider from "@/components/ui/ContextProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Youtube Clone",
	description: "Youtube",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ContextProvider>
						<main className='pt-0'>{children}</main>
						<TopNavigation />
						<FooterMenu />
					</ContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
