import Footer from "@/components/Footer";
import Navbar from "@/layout/Navbar";

export default function ClientUiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="">
        <Navbar />
        <div className="">
            {children}
        </div>
        <Footer />
    </div>;
}
