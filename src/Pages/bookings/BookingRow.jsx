import ReviewModal from "./ReviewModal";

const BookingRow = ({ booking, handleCancel, handleUpdateDate }) => {
  const { checkIn, images, email, _id, name, pricePerNight } = booking;

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
      <td>{checkIn}</td>
      <td>${pricePerNight}</td>
      <td>
        <div className=" text-blue-500 opacity-60 border rounded-xl px-2 btn bg-white">
          <p>Update Date</p>
          <input
            onChange={(e) => handleUpdateDate(_id, e)}
            type="date"
            defaultValue="update Date"
            name="date"
          />
        </div>
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
