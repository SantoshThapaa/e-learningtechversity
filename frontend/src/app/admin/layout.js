import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/components/custom/navbar/AdminSidebar";
import TopNavbar from "@/components/custom/navbar/AdminTopNavbar";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNavbar/>
        <AdminSidebar/>
        {children}
      </body>
    </html>
  );
}
