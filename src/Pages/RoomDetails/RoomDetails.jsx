import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState("");
  const { _id, img, name, available, price, description } = loadedRoom;

  const { user } = useAuth();

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const checkIn = form.checkIn.value;
    const checkOut = form.checkOut.value;

    const booking = {
      _id,
      img,
      name,
      available,
      price,
      checkIn,
      checkOut,
      user: user.email,
    };

    if (user) {
      fetch("http://localhost:5001/booking", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(booking),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            alert("booking successfull");
          }
        });
    } else {
      alert("booking failed");
      return navigate("/login");
    }
  };

  const handleReviews = () => {
    console.log("clicked...");
  };

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div>
        <img src={img} alt="" />
        <h2>Package Name: {name}</h2>
        <p>Rooms Available: {available}</p>
        <p>Price: {price}</p>
        <p>{description}</p>
      </div>
      {/* Review System */}

      <div className="mt-20">
        <h2 className="text-4xl font-semibold">Your Review </h2>
        <textarea
          className="border-2"
          name=""
          id=""
          cols="80"
          rows="6"
        ></textarea>
        <button onClick={handleReviews} className="btn btn-neutral">
          Submit
        </button>
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Booking</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleBooking} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Check In</span>
                </label>
                <input
                  type="date"
                  placeholder="email"
                  className="input input-bordered"
                  name="checkIn"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Check Out</span>
                </label>
                <input
                  type="date"
                  placeholder="password"
                  className="input input-bordered"
                  name="checkOut"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Book Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
