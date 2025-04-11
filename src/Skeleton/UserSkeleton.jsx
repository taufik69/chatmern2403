import React from "react";

const UserSkeleton = () => {
  return (
    <>
      <div>
        {[...new Array(6)].map((_, index) => (
          <div
            key={index}
            className={
              6 - 1 === index
                ? "flex items-center justify-between mt-3 pb-2"
                : "flex items-center justify-between mt-3 border-b border-b-gray-800 pb-2"
            }
          >
            {/* Avatar Skeleton */}
            <div className="w-[50px] h-[50px] rounded-full bg-gray-700 animate-pulse"></div>

            {/* Text Skeleton */}
            <div className="flex flex-col gap-2 w-1/2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2"></div>
            </div>

            {/* Button Skeleton */}
            <div className="w-[40px] h-[40px] bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserSkeleton;
