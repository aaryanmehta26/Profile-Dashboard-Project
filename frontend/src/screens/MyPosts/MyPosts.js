import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const userLogin = useSelector((state) => state);
  const navigate = useNavigate();

  const { userInfo } = userLogin;

  const fetchPosts = async () => {
    /** FETCHING POSTS */
    const { data } = await axios.get("/api/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();

    /** if not logged in, redirect back to landing page */
    if (!JSON.parse(localStorage.getItem("userInfo"))) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <MainScreen
      title={`Welcome Back ${
        (userInfo && userInfo.name) ||
        JSON.parse(localStorage.getItem("userInfo"))?.name
      }..`}
    >
      <div className="row">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="col-md-6"
            style={{ marginBottom: "20px", display: "flex" }}
          >
            <Card
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Body style={{ flex: 1 }}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {post.category}
                </Card.Subtitle>
                <Card.Text
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                  }}
                >
                  {post.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </MainScreen>
  );
};

export default MyPosts;
