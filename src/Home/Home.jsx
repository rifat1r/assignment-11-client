import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const { name } = useContext(AuthContext);
  return <div>this is home:{name} </div>;
};

export default Home;
