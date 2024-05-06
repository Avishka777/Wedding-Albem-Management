import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AlbemCard from "../components/AlbemCard";

export default function Home() {
  const [albems, setAlbems] = useState([]);

  useEffect(() => {
    const fetchAlbems = async () => {
      const res = await fetch("/api/albem/getalbems");
      const data = await res.json();
      setAlbems(data.albems);
    };
    fetchAlbems();
  }, []);

  return (
    <div>
      <div className="sm:mx-20 p-3 gap-8 py-7">
        {albems && albems.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold sm:ml-20 mx-10">
              Our Wedding Albems...
            </h2>
            <hr class="border-b-1 border-gray-500 sm:mx-20 mx-10" />
            <div className="flex flex-wrap gap-4 mx-10 sm:mx-auto ">
              {albems.map((albem) => (
                <AlbemCard key={albem._id} albem={albem} />
              ))}
            </div>
            <Link
              to={"/albems"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View More...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
