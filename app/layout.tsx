import { AudioOutlined } from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
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
          <Layout className="!min-h-screen antialiased">
            <Header className="!bg-white flex items-center">
              <div className="mr-6 text-xl flex gap-2">
                <AudioOutlined />
                VoiceGrid
              </div>

              <Menu mode="horizontal" defaultSelectedKeys={['1']} items={[
                {
                  key: "1",
                  label: "Datasets",
                }
              ]} />
            </Header>

            <Content className="flex flex-col gap-6 mx-5 mt-6">
              {children}
            </Content>

            <Footer className="text-center">
              SoarCraft ©{new Date().getFullYear()} Part of CheersYou
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
