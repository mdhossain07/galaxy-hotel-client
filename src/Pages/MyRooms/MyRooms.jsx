import { Link, useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const MyRooms = () => {
  const bookedRooms = useLoaderData();
  const [myRooms, setMyRooms] = useState(bookedRooms);

  const handleRemove = (id) => {
    console.log("delete", id);
    fetch(`http://localhost:5001/booking/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.deletedCount > 0) {
          alert("delete done");
          const remaining = myRooms.filter((room) => room._id !== id);
          setMyRooms(remaining);
        }
      });
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
  const { img, name, price, _id } = room;
  return (
    <div className="flex gap-10 items-center">
      <img className="w-[400px] rounded-lg" src={img} alt="" />
      <div>
        <h2>{name}</h2>
        <p>${price}</p>
        <p>Available: {} </p>
        <button onClick={() => handleRemove(_id)} className="btn">
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
