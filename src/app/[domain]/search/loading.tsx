import React from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function SearchPageLoading() {
  return (
    <MaxWidthWrapper className="my-4 mt-[160px] pt-16">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-300 mb-4 w-1/2"></div>
        <div className="flex space-x-4">
          <div className="w-1/4 bg-gray-300 h-96 rounded"></div>
          <div className="w-3/4">
            <div className="h-20 bg-gray-300 mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
