import { Map, Overlay } from "pigeon-maps";

const MyMap = () => {
  return (
    <div>
      <div className="text-center my-4 mx-auto w-96">
        <h2 className="text-4xl font-bold my-4">Our Location</h2>
        <hr />
        <hr />
      </div>
      <Map height={300} defaultCenter={[23.8103, 90.4125]}>
        {/* <Marker
          width={50}
          anchor={[23.8103, 90.4125]}
          color={color}
          onClick={() => setHue(hue + 20)}
        /> */}

        <Overlay anchor={[23.8103, 90.4125]} offset={[120, 79]}>
          <img
            className="w-36 rounded-full"
            src={`https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D`}
            alt=""
          />
        </Overlay>
      </Map>
    </div>
  );
};

export default MyMap;
