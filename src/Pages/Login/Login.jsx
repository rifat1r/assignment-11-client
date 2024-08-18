import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../assets/hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = { email, password };
    // console.log(user);
    loginUser(email, password)
      .then((res) => {
        // console.log(res.user);
        Swal.fire({
          position: "top-center",
          timer: 1500,
          showConfirmButton: false,
          title: "Success",
          text: "Logged in successfully",
          icon: "success",
        });
        if (res.user) {
          navigate(location?.state ? location?.state : "/");
        }
      })
      .catch((error) => console.log(error.message));
    form.reset();
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        // console.log(res);
        Swal.fire({
          position: "top-center",
          timer: 1500,
          showConfirmButton: false,
          title: "Success",
          text: "Logged in successfully",
          icon: "success",
        });
        if (res.user) {
          navigate(location?.state ? location?.state : "/");
        }
      })
      .catch((error) => {
        // console.log(error);
        Swal.fire({
          title: "error",
          text: "Login failed",
          icon: "error",
        });
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login Now</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <button onClick={handleGoogleLogin} className="btn btn-secondary">
              Login With Google
            </button>
            <p className="text-center mt-3">
              New to this site?
              <Link className="text-blue-500 font-medium" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
