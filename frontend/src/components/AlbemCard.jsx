import React from "react";
import { Link } from "react-router-dom";

export default function AlbemCard({ albem }) {
  return (
    <div className="min-w-full">
      <div className="group relative mx-auto border border-teal-500 hover:border-2 h-[480px] overflow-hidden rounded-lg sm:w-[800px] w-[300px] transition-all">
        <Link to={`/albem/${albem.slug}`}>
          <img
            src={albem.image}
            alt="albem Image"
            className="h-auto sm:w-[800px] sm:h-[400px]   object-cover transition-all duration-300 z-20 mx-auto"
          />
        </Link>

        <div className="p-3 flex flex-col gap-2">
          <p className="italic text-xl font-semibold line-clamp-2 mx-auto">
            {albem.title}
          </p>
          <p className="italic text-base text-gray-500 mx-auto">
            {albem.content}
          </p>
        </div>
      </div>
    </div>
  );
}
