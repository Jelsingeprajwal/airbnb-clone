import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";
  console.log(place);
  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8 ">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a
        href={"https://maps.google.com/?q=" + place.address}
        target={"_blank"}
        className="text-sm my-2 flex w-fit gap-1 underline font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
            clipRule="evenodd"
          />
        </svg>
        {place.address}
      </a>
      <PlaceGallery place={place} />
      <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-8">
        <div>
          <div className="my-4 ">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div>
            <b>Check-in:</b> {place.checkIn} <br />
            <b>Check-out</b> {place.checkOut} <br />
            Max Number of Guests {place.maxGuests}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-2xl my-4">Extra Info</h2>
        <div className="text-gray-700 leading-5 mt-2 mb-4 text-justify">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
