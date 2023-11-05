/* eslint-disable react/prop-types */
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import star from "../../assets/icons/star_1_.png";

const Rooms = () => {
  const { loading } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [isSorted, setIsSorted] = useState(1);

  useEffect(() => {
    axios(`http://localhost:5001/rooms?sort=${isSorted}`).then((data) =>
      setRooms(data.data)
    );
  }, [isSorted]);

  const handleFilter = () => {
    setIsSorted(isSorted === 1 ? -1 : 1);
  };

  return (
    <div>
      <div>
        {isSorted === 1 ? (
          <button onClick={handleFilter} className="btn btn-accent">
            Filter By Highest
          </button>
        ) : (
          <button onClick={handleFilter} className="btn btn-accent">
            Filter By Lowest
          </button>
        )}
      </div>
      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          {rooms.map((room) => (
            <RoomsCard key={room._id} room={room}></RoomsCard>
          ))}
        </div>
      )}
    </div>
  );
};

const RoomsCard = ({ room }) => {
  const { name, description, img, price, rating } = room;
  return (
    <div>
      <div className="flex gap-5 mt-10 items-center">
        <div>
          <img className="w-[270px] h-[188px] rounded-lg " src={img} alt="" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p>{description.slice(0, 80)}...</p>
          <div className="flex items-center gap-5">
            <div className="flex gap-1 last:items-center">
              <span>
                <img src={star} alt="" />
              </span>
              <p className="font-medium text-sm">{rating} (20) </p>
            </div>

            <p className="font-medium text-lg">
              ${price}
              <span className="text-sm">/night</span>
            </p>
          </div>
          <button className="btn btn-neutral">Book Now</button>
        </div>
      </div>
    </div>
  );
};
export default Rooms;
