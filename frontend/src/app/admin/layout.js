import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminTopNavbar from "@/components/custom/navbar/AdminTopNavbar";
import AdminSidebar from "@/components/custom/navbar/AdminSidebar";


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
        <AdminTopNavbar/>
        {children}
      </body>
      
    </html>
    
  );
}
