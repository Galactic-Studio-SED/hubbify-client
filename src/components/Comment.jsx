import React from "react";

const Comment = () => {
  return (
    <div className="bg-white p-5 rounded-lg ">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
          <div className="font-semibold text-royal-purple">Sally White</div>
          <span>|</span>
          <div className="text-gray-600">1 day ago</div>
        </div>

        <div className="text-justify text--deep-dark">
          <span className="font-medium">
            {`Hi, there! This is an app that allows users to search for recipes while keeping their health in check. The design of this app makes it easy for everyone to find different recipes of their choice along wit `}
          </span>
          <span className="font-semibold text-royal-purple">...view more</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
