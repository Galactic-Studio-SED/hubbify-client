import Header from "../containers/Header";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import convertDate from "../utils/ConvertDate";

const HomePage = () => {
  const [comments, setComments] = useState([]);
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
        const messageError = error.response?.data?.message;
        if (error.response?.data?.statusCode === 429) {
          toast.error(
            "You have exceeded the number of requests. Try again later.",
            {
              toastId: "error",
            }
          );
        }

        if (messageError) {
          console.log(messageError);

          toast.error("Error while fetching comments. " + messageError, {
            toastId: "error",
          });
        }

        //navigate('/login', { state: { from: location }, replace: true });
      }
    };

    fetchComment();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
    try {
      const response = axiosPrivate.delete(`/comments/own/${commentId}`);

      toast.success("Comment deleted successfully.", {
        toastId: "success",
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      const messageError = error.response?.data?.message || "";
      console.log(messageError);
      if (error.response?.data?.statusCode === 429) {
        toast.error(
          "You have exceeded the number of requests. Try again later.",
          {
            toastId: "error",
          }
        );
      } else {
        toast.error("Error while deleting comment. " + messageError, {
          toastId: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
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
