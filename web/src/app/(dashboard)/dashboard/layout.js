import { Inter } from "next/font/google";
import "./dashboard.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Professor Craft",
  description:
    "Professor craft is a management system made for professors to manage there workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <TooltipProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Header />
              {children}
            </div>
          </div>
        </TooltipProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
