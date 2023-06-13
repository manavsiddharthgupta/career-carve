const Input = (props) => {
  return (
    <div className="w-full ml-2">
      <input
        value={props.value}
        onChange={props.onChangeHandler}
        className="outline-none border-[1px] border-black px-2"
      />
    </div>
  );
};

export default Input;
