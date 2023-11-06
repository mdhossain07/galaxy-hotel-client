import { Link, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";

const MyRooms = () => {
  const bookedRooms = useLoaderData();
  const [myRooms, setMyRooms] = useState(bookedRooms);

  const handleRemove = (id, checkIn) => {
    console.log("delete", id, checkIn);

    const checkInDate = moment(checkIn);
    console.log(checkInDate);
    const copyDate = checkInDate.clone();
    const cancelDate = copyDate.subtract(1, "day");
    console.log(cancelDate);
    const currentDate = moment();
    console.log(currentDate);
    const checkCancel = currentDate.isBefore(cancelDate);
    console.log(checkCancel);

    if (checkCancel) {
      fetch(`http://localhost:5001/booking/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.deletedCount > 0) {
            Swal.fire("Success!", "Booking Cancellation Done", "success");
            const remaining = myRooms.filter((room) => room._id !== id);
            setMyRooms(remaining);
          }
        });
    } else {
      Swal.fire("Error!", "Booking cancellation time expired", "error");
    }
  };

  return (
    <div className="">
      {myRooms.map((room, index) => (
        <BookedRoom
          key={index}
          handleRemove={handleRemove}
          room={room}
        ></BookedRoom>
      ))}
    </div>
  );
};

const BookedRoom = ({ room, handleRemove }) => {
  const { img, name, price, _id, checkIn } = room;
  return (
    <div className="flex gap-10 items-center">
      <img className="w-[400px] rounded-lg" src={img} alt="" />
      <div>
        <h2>{name}</h2>
        <p>${price}</p>
        <p>Available: {} </p>
        <button onClick={() => handleRemove(_id, checkIn)} className="btn">
          Remove
        </button>
        <Link to={`/update-room/${_id}`}>
          <button className="btn">Update Date</button>
        </Link>
      </div>
    </div>
  );
};

BookedRoom.propTypes = {
  room: PropTypes.object,
};

BookedRoom.propTypes = {
  handleRemove: PropTypes.func,
};

export default MyRooms;
