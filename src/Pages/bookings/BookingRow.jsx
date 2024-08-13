import ReviewModal from "./ReviewModal";

const BookingRow = ({ booking, handleCancel, handleUpdateDate }) => {
  const { checkIn, images, email, _id, name, pricePerNight, roomId } = booking;
  console.log("roomId", roomId);

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className=" h-24 w-24">
              <img src={images} />
            </div>
          </div>
        </div>
      </td>

      <td>${pricePerNight}</td>
      <td>
        <input
          onChange={(e) => handleUpdateDate(_id, e)}
          type="date"
          placeholder="hda"
          defaultValue={checkIn}
          name="date"
        />
      </td>
      <td>
        <label
          htmlFor={`modal_${_id}`}
          className="btn btn-sm bg-white text-blue-500"
        >
          Add Review
        </label>
        <ReviewModal booking={booking}></ReviewModal>
      </td>
      <td>
        <div
          onClick={() => handleCancel(_id)}
          className="btn btn-ghost btn-sm text-red-600"
        >
          Cancel
        </div>
      </td>
    </tr>
  );
};

export default BookingRow;
