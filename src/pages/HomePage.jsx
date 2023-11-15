import Header from "../containers/Header";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [comments, setComments] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // To cancel the fetch request

    const fetchComment = async () => {
      try {
        const response = await axiosPrivate.get("/comments", {
          signal: controller.signal,
        });

        if (isMounted) {
          // To avoid memory leak
          setComments(response.data.data);
        }
      } catch (error) {
        console.log(error.message);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    };

    fetchComment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const convertDate = (date) => {
    const inputDate = new Date(date);
    const currentDate = new Date();

    const diff = currentDate - inputDate;
    const diffInMinutes = diff / 1000 / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    let message = "";

    if (diffInMinutes < 1) {
      message = "less than 1 minute ago";
    } else if (diffInMinutes < 60) {
      message = `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
      message = `${Math.floor(diffInHours)} hours ago`;
    } else {
      message = `${Math.floor(diffInDays)} days ago`;
    }

    const minute = inputDate.getMinutes();
    const hour = inputDate.getHours();
    const day = inputDate.getDate();
    const wordDay = inputDate.toLocaleString("default", { weekday: "long" });
    const ampm = hour >= 12 ? "pm" : "am";

    message += ` - ( ${day} ${wordDay}  ${hour}:${minute} ${ampm} )`;
    return message;
  };

  const handleUpdateComment = (commentId, updatedContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
  };

  return (
    <>
      <div className="bg-gray-100 min-h-creen">
        <Header />
        <div className="mt-3 max-w-[1440px] px-8 mx-auto">
          <CommentInput setComments={setComments} />
        </div>
        <div className="mt-3 max-w-[1440px] flex flex-col gap-3 px-8 mx-auto">
          {comments &&
            comments?.map((comment) => (
              <Comment
                key={comment?.comment_id}
                id={comment?.comment_id}
                userId={comment?.user_id}
                name={comment?.username}
                content={comment?.content}
                createdAt={convertDate(comment?.comment_created_at)}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
