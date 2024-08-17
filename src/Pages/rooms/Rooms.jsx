import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [size, setSize] = useState(10);
  const [countObj, setCountObj] = useState(null); // Initializing as null
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRooms = async () => {
      // const roomsRes = await axios.get("http://localhost:5000/rooms");
      const countRes = await axios.get("http://localhost:5000/roomsCount");

      // setRooms(roomsRes.data);
      setCountObj(countRes.data);
      setLoading(false);
    };

    fetchRooms();
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/rooms?page=${currentPage}&size=${size}`)
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {rooms.map((room) => (
          <RoomCard room={room} key={room._id}></RoomCard>
        ))}
      </div>
      <p>Current page: {currentPage}</p>
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
