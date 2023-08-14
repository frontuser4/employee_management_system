import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#0e7490"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
