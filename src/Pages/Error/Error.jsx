import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-48">
      <div>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
      </div>
      <br />
      <Link to="/">
        <div>
          <button className="btn btn-secondary">Go Home</button>
        </div>
      </Link>
    </div>
  );
};

export default Error;
