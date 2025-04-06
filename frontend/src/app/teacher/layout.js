import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TeacherNavbar from "@/components/custom/navbar/TeacherNavbar";
import TeacherSidebar from "@/components/custom/navbar/TeacherSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Teacher Dashboard",
  description: "This is the teacher dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TeacherNavbar/>
        
        {children}
      </body>
    </html>
  );
}
