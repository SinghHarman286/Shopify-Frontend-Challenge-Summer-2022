import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row, Button, Skeleton, notification } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import axios from "axios";

const Home: React.FC = () => {
  type ApiData = { date: string; explanation: string; media_type: string; title: string; url: string; copyright: string; hdurl: string; service_version: string };
  const [currentCounter, setCurrentCounter] = useState(0);
  const [data, setData] = useState<ApiData[]>([]);
  const [expandRead, setExpandRead] = useState({} as Record<string, boolean>);
  const [likedPost, setLikedPost] = useState(JSON.parse(localStorage.getItem("likedPost") || "{}") as Record<string, ApiData & { liked: boolean }>);
  const [isLoading, setIsLoading] = useState(false);
  const { Meta } = Card;

  const openNotification = () => {
    notification.info({
      message: "Warning",
      description: "If the data is not loading, then its an error with the API. I have noticed that sometimes API times out. In this scenario, please refresh the page and try again :)",
    });
  };

  const getStartAndEndDates = (counter: number): string[] => {
    const DATEGAP = 10;
    let endDate: Date | string = new Date();
    endDate.setDate(endDate.getDate() - counter * DATEGAP);
    endDate = endDate.toISOString().slice(0, 10);
    let startDate: Date | string = new Date();
    startDate.setDate(startDate.getDate() - counter * DATEGAP - DATEGAP);
    startDate = startDate.toISOString().slice(0, 10);
    return [endDate, startDate];
  };

  const fetchRequest = useCallback(async () => {
    const [endDate, startDate] = getStartAndEndDates(currentCounter);
    if (currentCounter === 0) openNotification();
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=SZJt1mvKDC4CIcqi6oZLh1PjgaVjzHBxypKRlHnE&end_date=${endDate}&start_date=${startDate}`);
      setData((prevData) => [...prevData, ...response.data]);
      let readObj: Record<string, boolean> = {};
      response.data.forEach((res: ApiData) => {
        readObj[res.title] = false;
      });
      setExpandRead((prevState) => ({ ...prevState, ...readObj }));
    } catch (err) {
      alert("API NETWORK ERROR, please refresh the page");
      window.location.reload();
      console.log(err);
    }
    setIsLoading(false);
  }, [currentCounter]);

  const handleExpandRead = (key: string): void => {
    setExpandRead((prevState) => {
      return { ...prevState, [key]: !prevState[key] };
    });
  };

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const handleOnScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setCurrentCounter((prevCounter) => prevCounter + 1);
    }
  };
  const handleLikedPost = (post: ApiData) => {
    const title = post["title"];
    const prevLikedPost = JSON.parse(localStorage.getItem("likedPost") || "{}");
    let liked: boolean;
    if (title in prevLikedPost) {
      liked = !prevLikedPost[title].liked;
    } else {
      liked = true;
    }
    localStorage.setItem("likedPost", JSON.stringify({ ...prevLikedPost, [title]: { ...post, liked } }));
    setLikedPost((prevState) => ({ ...prevState, [title]: { ...post, liked } }));
  };
  return (
    <div style={{ overflowY: "scroll", height: "100vh" }} onScroll={handleOnScroll}>
      <Row>
        {data.map((result, idx) => {
          if (result["media_type"] !== "image") return;
          return (
            <Col className="gutter-row" key={idx} xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Card
                key={idx}
                style={{ width: 300 }}
                cover={<img alt={result["title"]} src={result["url"]} />}
                title={result["title"]}
                actions={[
                  <HeartTwoTone
                    onClick={() => handleLikedPost(result)}
                    style={{ animation: "pulse .5s" }}
                    twoToneColor={likedPost && likedPost[result["title"]] && likedPost[result["title"]].liked ? "red" : "#BFBFBF"}
                  />,
                ]}
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
        <Col span={8}>
          <Card style={{ width: 300, marginTop: 16 }} actions={[<HeartTwoTone twoToneColor="#BFBFBF" />]}>
            <Skeleton loading={isLoading} avatar active>
              <Meta />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
