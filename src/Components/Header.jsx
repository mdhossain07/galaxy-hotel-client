import banner from "../assets/images/banner-1.jpg";

const Header = () => {
  return (
    <div className="">
      <div className="carousel w-[570px] md:w-full h-[80vh] ">
        <div id="slide1" className="carousel-item relative w-full">
          <div
            className="hero rounded-lg"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-xl">
                <p className="mb-5 text-white">UNIQUE PLACE AND LUXURY HOTEL</p>
                <h1 className="mb-5 text-5xl font-bold">
                  LIFE ENJOY WITH THE GREAT MOMENTS
                </h1>
                <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <p className="mb-5 text-white">UNIQUE PLACE AND LUXURY HOTEL</p>
                <h1 className="mb-5 text-5xl font-bold">
                  LIFE ENJOY WITH THE GREAT MOMENTS
                </h1>
                <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <p className="mb-5">UNIQUE PLACE AND LUXURY HOTEL</p>
                <h1 className="mb-5 text-5xl font-bold">
                  LIFE ENJOY WITH THE GREAT MOMENTS
                </h1>

                <button className="p-3 rounded-sm bg-[#AA8453] text-white border-none text-lg">
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
