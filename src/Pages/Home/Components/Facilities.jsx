/* eslint-disable react/prop-types */
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Facilities = () => {
  //   const result = useQuery({
  //     queryKey: ["facilities"],
  //     queryFn: () => {
  //       fetch("facilities.json").then((res) => res.json());
  //     },
  //   });
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch("facilities.json")
      .then((res) => res.json())
      .then((data) => setFacilities(data));
  }, []);

  console.log(facilities);
  return (
    <div className="text-center space-y-2">
      <p className="font-medium">Galaxy Services</p>
      <h2 className="font-semibold text-4xl"> Hotel Facilities </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10">
        {facilities.map((facility, index) => (
          <FacilityCard key={index} facility={facility}></FacilityCard>
        ))}
      </div>
    </div>
  );
};

const FacilityCard = ({ facility }) => {
  const { service_name, service_description } = facility;
  return (
    <div>
      <div className="card w-96 border border-[#DBCBB7]">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{service_name}</h2>
          <p className="text-[#858585]">{service_description}</p>
        </div>
      </div>
    </div>
  );
};

FacilityCard.PropTypes = {
  facility: PropTypes.node,
};

export default Facilities;