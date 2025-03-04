import VideoIdNav from "@/components/ui/VideoIdNav";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <VideoIdNav />
            {children}
        </>
    );
}