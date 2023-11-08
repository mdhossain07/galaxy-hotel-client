import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header";
import Facilities from "./Components/Facilities";
import Rooms from "./Components/Rooms";
import Testimonials from "./Components/Testimonials";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Galaxy Luxury Hotel | Home </title>
      </Helmet>
      <Header />
      <Facilities />
      <Rooms />
      <Testimonials />
    </div>
  );
};

export default Home;
