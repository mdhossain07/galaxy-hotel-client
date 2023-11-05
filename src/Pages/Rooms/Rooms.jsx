import { useQuery } from "@tanstack/react-query";

const Rooms = () => {
  const { data } = useQuery({
    queryKey: ["roomsData"],
    queryFn: () => {
      fetch("http://localhost:5001/rooms").then((res) => res.json());
    },
  });

  console.log(data);
  return (
    <div>
      <h2>Rooms</h2>
    </div>
  );
};

export default Rooms;
