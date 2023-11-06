import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

const MyRooms = () => {
  const bookedRooms = useLoaderData();
  const [myRooms, setMyRooms] = useState(bookedRooms);
  console.log(bookedRooms);
  return (
    <div className="">
      {myRooms.map((room, index) => (
        <BookedRoom key={index} room={room}></BookedRoom>
      ))}
    </div>
  );
};

const BookedRoom = ({ room }) => {
  const { img, name, price } = room;
  console.log(room);
  return (
    <div className="flex gap-10 items-center">
      <img className="w-[400px] rounded-lg" src={img} alt="" />
      <div>
        <h2>{name}</h2>
        <p>${price}</p>
        <button className="btn">Remove</button>
      </div>
    </div>
  );
};

BookedRoom.propTypes = {
  room: PropTypes.object,
};

export default MyRooms;
