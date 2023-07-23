import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    setName(user.name);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async (ev) => {
    ev.preventDefault();
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect("/account/bookings/" + bookingId);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white p-4   rounded-2xl">
      <div className="text-center font-semibold">
        Price: ${place.price}/ per night
      </div>
      <div className="grid grid-cols-2 ">
        <div className="border   py-2 px-4 rounded-2xl">
          <label> Check in:</label>
          <input
            type="date"
            className=""
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="border   py-2 px-4 rounded-2xl">
          <label> Check Out:</label>
          <input
            type="date"
            className=""
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>
      <div className="border   py-2 px-4 rounded-2xl">
        <label>No of guests</label>
        <input
          type="number"
          placeholder="4"
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
      </div>
      {checkIn && checkOut && (
        <div className="border mb-4  py-2 px-4 rounded-2xl">
          <label>Name:</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="9999999999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      )}
      <button className="primary mt-2" onClick={bookThisPlace}>
        Book this place
        {numberOfNights > 0 && (
          <>
            <span> ${numberOfNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default BookingWidget;
