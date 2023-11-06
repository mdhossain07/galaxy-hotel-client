import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import PropTypes from "prop-types";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState("");
  const [showReviews, setShowReviews] = useState([]);
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
    setShowReviews([...showReviews, reviews]);
    setReviews("");
  };

  console.log("reviews", reviews);
  console.log("show Reviews", showReviews);

  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div>
        <img src={img} alt="" />
        <h2>Package Name: {name}</h2>
        <p>Rooms Available: {available}</p>
        <p>Price: {price}</p>
        <p>{description}</p>
      </div>
      {/* Review Textarea */}

      <div className="mt-20">
        <h2 className="text-4xl font-semibold">Your Review </h2>
        <textarea
          className="border-2"
          onBlur={(e) => setReviews(e.target.value)}
          cols="80"
          rows="6"
        ></textarea>
        <button onClick={handleReviews} className="btn btn-neutral">
          Submit
        </button>
      </div>

      {/* Show Review Area */}
      {showReviews.map((review, index) => (
        <Reviews user={user} key={index} review={review}></Reviews>
      ))}

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

const Reviews = ({ review, user }) => {
  console.log(user);
  return (
    <div>
      <p>{review}</p>
      <p>{user?.email}</p>
      <p>{user?.displayName}</p>
      <img className="rounded-full" src={user?.photoURL} alt="" />
    </div>
  );
};

Reviews.propTypes = {
  review: PropTypes.string,
  user: PropTypes.object,
};

export default RoomDetails;
