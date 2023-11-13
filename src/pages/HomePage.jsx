import React from "react";
import Header from "../containers/Header";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-creen">
        <Header></Header>
        <div className="mt-3 max-w-[1440px] px-8 mx-auto">
          <CommentInput></CommentInput>
        </div>
        <div className="mt-3 max-w-[1440px] flex flex-col gap-3 px-8 mx-auto">
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
          <Comment></Comment>
        </div>
      </div>
    </>
  );
};

export default HomePage;
