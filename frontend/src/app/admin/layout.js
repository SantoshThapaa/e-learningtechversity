import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminTopNavbar from "@/components/custom/navbar/AdminTopNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "This is the admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AdminTopNavbar />
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
