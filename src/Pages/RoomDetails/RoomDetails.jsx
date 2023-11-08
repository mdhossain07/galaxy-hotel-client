import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState("");
  const [myReviews, setMyReviews] = useState([]);
  const { _id, img, name, rating, available, price, description, size } =
    loadedRoom;

  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/review?sid=${_id}`)
      .then((res) => setMyReviews(res.data));
  }, [_id]);

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
      email: user?.email,
    };

    try {
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
              Swal.fire("Success!", "Booking Successfull", "success");
            }
          });
      } else {
        Swal.fire("Error!", "You need to Login First", "error");
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviews = () => {
    const allReviews = {
      reviews,
      sid: _id,
    };

    if (user?.email) {
      fetch("http://localhost:5001/review", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(allReviews),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            console.log(data);
            Swal.fire("Success!", "Your review has been added", "success");
          }
        });
    } else {
      Swal.fire("Error!", "You need to login first", "error");
      return navigate("/login");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-around gap-10">
        <div className="md:w-1/2 mt-10">
          <img className="w-full rounded-lg mb-10 " src={img} alt="" />
          <h2 className="text-2xl font-semibold mb-5">Description of Room</h2>
          <p className="w-[400px] md:w-full mb-10">{description}</p>
          <div className="flex flex-col md:flex-row w-[400px] md:w-full text-center md:mx-auto bg-[#F5F6F7] p-5 rounded-xl border border-[#AA8453] gap-5 md:gap-20 text-md font-semibold mt-10">
            <p className="">
              Room Size <br /> <span className="text-xl">{size}</span>
            </p>

            <p className="">
              Price <br /> <span className="text-xl">${price}/night</span>
            </p>

            <p className="">
              Availability <br />
              <span className="text-xl">{available} Rooms</span>
            </p>

            <p className="">
              Rating <br />
              <span className="text-xl">{rating}/5</span>
            </p>
          </div>

          {/* Show Review Area */}

          <div className="mt-20">
            <h2 className="text-2xl font-semibold">Reviews: </h2>
            {myReviews.length ? (
              <div>
                {myReviews.map((review, index) => (
                  <Reviews user={user} key={index} review={review}></Reviews>
                ))}
              </div>
            ) : (
              <h2 className="font-semibold text-2xl text-center">
                No Reviews Yet
              </h2>
            )}
          </div>

          {/* Review Textarea */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold">Post a Review </h2>
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
        </div>

        {/* Booking Form */}
        <div className="hero h-[500px] w-1/2 ">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Booking Form</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
              <form onSubmit={handleBooking} className="card-body bg-[#F2F3F5]">
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
    </div>
  );
};

const Reviews = ({ review }) => {
  const { reviews } = review;
  return (
    <div className="mt-5">
      <p className="text-md font-medium">{reviews}</p>
      {/* <p>{user?.displayName}</p> */}
      {/* <img className="rounded-full" src={user?.photoURL} alt="" /> */}
    </div>
  );
};

Reviews.propTypes = {
  review: PropTypes.object,
  user: PropTypes.object,
};

export default RoomDetails;
