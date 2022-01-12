import { Card, Col, Row, Button, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const LikedPost = () => {
  type PostData = { date: string; explanation: string; media_type: string; title: string; url: string; copyright: string; hdurl: string; service_version: string; liked: boolean };
  const [data, setData] = useState<PostData[]>(Object.values(JSON.parse(localStorage.getItem("likedPost") || "{}")));
  const [expandRead, setExpandRead] = useState({} as Record<string, boolean>);

  useEffect(() => {
    const posts: PostData[] | null = Object.values(JSON.parse(localStorage.getItem("likedPost") || "{}"));
    let readObj = {} as Record<string, boolean>;
    posts.forEach((post: PostData) => {
      readObj[post["title"]] = false;
    });
  }, []);

  const handleExpandRead = (key: string): void => {
    setExpandRead((prevState) => {
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  const handleRemovePost = (title: string) => {
    const prevData = JSON.parse(localStorage.getItem("likedPost") || "{}");
    if (title in prevData) {
      let newData = prevData;
      delete newData[title];
      localStorage.setItem("likedPost", JSON.stringify(newData));
      setData(Object.values(newData));
    }
  };

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      {data.length === 0 && <Empty description="You don't have any liked posts" />}
      <Row gutter={16}>
        {data.map((result, idx) => {
          if (result["media_type"] !== "image") return;
          return (
            <Col key={idx} span={8}>
              <Card
                key={idx}
                style={{ width: 300 }}
                cover={<img alt={result["title"]} src={result["url"]} />}
                title={result["title"]}
                actions={[<DeleteOutlined onClick={() => handleRemovePost(result["title"])} />]}
              >
                {expandRead[result.title] ? result["explanation"] : `${result["explanation"].slice(0, 500)}...`}
                <br />
                <Button style={{ marginTop: "5px" }} onClick={() => handleExpandRead(result.title)}>
                  Show {expandRead[result.title] ? " Less" : " More"}
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default LikedPost;
