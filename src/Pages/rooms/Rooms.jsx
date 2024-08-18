import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [size, setSize] = useState(10);
  const [countObj, setCountObj] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRooms = async () => {
      // const roomsRes = await axios.get("http://localhost:5000/rooms");
      const countRes = await axios.get(
        "https://assignment-11-server-tau-pied.vercel.app/roomsCount"
      );

      // setRooms(roomsRes.data);
      setCountObj(countRes.data);
      setLoading(false);
    };

    fetchRooms();
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://assignment-11-server-tau-pied.vercel.app/rooms?page=${currentPage}&size=${size}`
      )
      .then((res) => {
        setRooms(res.data);
        console.log("its coming");
      });
  }, [currentPage, size]);

  const numberOfPages = countObj ? Math.ceil(countObj.count / size) : 0;
  const pages = [...Array(numberOfPages).keys()];

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setSize(val);
    setCurrentPage(0); // Reset to the first page when size changes
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-48">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  //filter
  const handleFilter = (e) => {
    e.preventDefault();
    const min = parseInt(e.target.min.value);
    const max = parseInt(e.target.max.value);
    // console.log("min , max",  min, max);
    axios
      .get(`http://localhost:5000/api/rooms?min=${min}&max=${max}`)
      .then((res) => {
        setRooms(res.data);
        console.log("filter works");
      });
    e.target.reset();
  };

  return (
    <div>
      <div className="dropdown dropdown-star my-5 w-full flex justify-end pr-2 md:pr-9">
        <div tabIndex={0} role="button" className="btn m-1 btn-outline">
          Filter By Price
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-96 p-2 shadow"
        >
          <form onSubmit={handleFilter} className="grid grid-cols-7 space-x-2">
            <label className="input input-bordered flex items-center gap-2 col-span-3">
              Minimum
              <input
                type="text"
                className="grow"
                placeholder="price"
                name="min"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2  col-span-3">
              Maximum
              <input
                type="text"
                className="grow"
                placeholder="price"
                name="max"
              />
            </label>
            <input type="submit" className="btn btn-secondary p-2" value="GO" />
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <RoomCard room={room} key={room._id}></RoomCard>
        ))}
      </div>
      {/* <p>Current page: {currentPage}</p> */}
      {numberOfPages > 0 && (
        <div className="text-center">
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page ? "btn mr-2 bg-orange-400" : "btn mr-2"
              }
              key={page}
            >
              {page + 1} {/* Display page numbers starting from 1 */}
            </button>
          ))}
          <select
            className="border px-3 py-2"
            value={size}
            onChange={handleItemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Rooms;
