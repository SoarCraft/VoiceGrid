import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceGrid",
  description: "Manage all your voice datasets in one place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="zh-Hans">
      <body className="antialiased">
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
