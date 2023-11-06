import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RoomDetails = () => {
  const loadedRoom = useLoaderData();
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
    console.log(booking);

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
          alert("booking successfull!");
        }
      });
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
