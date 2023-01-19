const Error = ({ error }) => {
  console.log("errormessage ", error.message);
  return (
    <div>
      <h1>Oops!</h1>
      <h3>Something went wrong</h3>
    </div>
  );
};

export default Error;
