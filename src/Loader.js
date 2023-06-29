const Loader = (props) => {
  return (
    <div className="loadingDiv">
      <img
        src={"https://media.tenor.com/hlKEXPvlX48AAAAj/loading-loader.gif"}
        alt={"loading"}
        ref={props.forwardRef}
        key={-1234567}
        style={{ height: "50px" }}
      />
    </div>
  );
};

export default Loader;
