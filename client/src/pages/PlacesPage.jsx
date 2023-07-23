import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => setPlaces(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new
        </Link>
      </div>
      <div>
        <div className="mt-4 flex flex-col gap-3">
          {places.length > 0 &&
            places.map((place, index) => (
              <Link
                key={index}
                to={"/account/places/" + place._id}
                className="flex bg-gray-100 gap-4 p-4 rounded-2xl cursor-pointer"
              >
                <div className=" flex w-32 h-32 bg-gray-300 shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      className="object-cover"
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl  font-semibold">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PlacesPage;
