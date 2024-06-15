import BarLoader from "react-spinners/BarLoader";

export const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <BarLoader
        color="#0077FF"
        aria-label="Loading Spinner"
        height={6}
        width={150}
      />
    </div>
  );
};
