const Picture = (props) => {
  return (
    <div className="pic">
      <img src={props.img} alt={props.alt} />
    </div>
  );
};

export default Picture;
