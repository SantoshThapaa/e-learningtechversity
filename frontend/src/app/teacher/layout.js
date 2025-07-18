import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TeacherNavbar from "@/components/custom/navbar/TeacherNavbar";
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
  title: "Teacher Dashboard",
  description: "This is the teacher dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TeacherNavbar />
        {children}
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
