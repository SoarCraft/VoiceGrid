import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
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
            <Sider theme="light" collapsible>
              <div className="text-center py-4 text-xl">VoiceGrid</div>

              <Menu defaultSelectedKeys={['1']} mode="inline" items={[
                {
                  key: "1",
                  label: "Datasets",
                }
              ]} />
            </Sider>

            <Layout>
              <Header className="!bg-white">
                123
              </Header>

              <Content className="m-4">
                <div className="p-6 min-h-80 bg-white rounded-lg">
                  {children}
                </div>
              </Content>

              <Footer className="text-center">
                SoarCraft ©{new Date().getFullYear()} Part of CheersYou
              </Footer>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
