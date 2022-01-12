import React from "react";
import { Layout, Menu } from "antd";
import { RocketOutlined, HomeFilled, HeartFilled } from "@ant-design/icons";
import styles from "./Wrapper.module.css";

const Wrapper: React.FC<{ handleMenuChange({ key }: { key: string }): void }> = ({ children, handleMenuChange }) => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header>
        <div className={styles["logo"]} style={{ marginLeft: "20px" }}>
          <RocketOutlined style={{ color: "white", fontSize: "3em" }} />
          <span style={{ color: "white", fontSize: "2em" }}>Spacestagram</span>
        </div>
        <Menu style={{ float: "right", marginRight: "20px" }} theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} onClick={handleMenuChange}>
          <Menu.Item key="1">
            <HomeFilled /> Home{" "}
          </Menu.Item>
          <Menu.Item key="2">
            <HeartFilled /> Liked Posts
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        className={styles["site-layout-background"]}
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "50vh",
        }}
      >
        <div style={{ height: "100%", overflowY: "scroll" }}>{children}</div>
      </Content>
      <Footer style={{ color: "white", textAlign: "center", backgroundColor: "#021529" }}>
        Created by Harman Singh, <a href="https://www.linkedin.com/in/h286sing/">Linkedin</a>, <a href="https://github.com/SinghHarman286">Github</a>
      </Footer>
    </Layout>
  );
};

export default Wrapper;
