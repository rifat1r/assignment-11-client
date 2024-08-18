import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://assignment-11-server-tau-pied.vercel.app/bookings?email=${user?.email}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => setBookings(res.data));
  }, [user.email]);
  const handleCancel = (id) => {
    fetch(`https://assignment-11-server-tau-pied.vercel.app/bookings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Booking Cancelled Successfully");
        }

        console.log(data);
        const remaining = bookings.filter((booking) => booking._id !== id);
        setBookings(remaining);
      });
  };
  const handleUpdateDate = (id, e) => {
    const updatedDate = e.target.value;
    console.log(updatedDate, id);
    fetch(`https://assignment-11-server-tau-pied.vercel.app/bookings/${id}`, {
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
          Swal.fire({
            title: "Success",
            text: "Date Updated SUccessfully",
            icon: "success",
            position: "top-center",
            showConfirmButton: false,
            timer: 1500,
          });

          // console.log("updated successfully");
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
      <table className="table  ">
        {/* head */}
        <Toaster position="top-center" />
        <thead>
          <tr className="bg-slate-200">
            <th>Room</th>
            <td>Check In</td>
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
