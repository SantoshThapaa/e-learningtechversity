import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Dashboard",
  description: "This is the student dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StudentNavbar/>
        {children}
      </body>
    </html>
  );
}
