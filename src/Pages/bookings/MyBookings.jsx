import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBookings(data);
      });
  }, [user.email]);
  const handleCancel = (id) => {
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const remaining = bookings.filter((booking) => booking._id !== id);
        setBookings(remaining);
      });
  };
  const handleUpdateDate = (id, e) => {
    const updatedDate = e.target.value;
    console.log(updatedDate, id);
    fetch(`http://localhost:5000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ checkIn: updatedDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          console.log("updated successfully");
          // Update the state without changing the order of the bookings
          const updatedBookings = bookings.map(
            (booking) =>
              booking._id === id
                ? { ...booking, checkIn: updatedDate }
                : booking,
            console.log("heyyy")
          );
          setBookings(updatedBookings);
        }
      });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-slate-200">
            <th>Room</th>

            <th>Night</th>
            <th>Update Check-in</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bookings.map((booking) => (
            <BookingRow
              key={booking._id}
              booking={booking}
              handleUpdateDate={handleUpdateDate}
              handleCancel={handleCancel}
            ></BookingRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
