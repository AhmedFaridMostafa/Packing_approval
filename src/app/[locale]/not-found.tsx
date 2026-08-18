import ErrorState from "@/components/shared/ErrorState";

const NotFound = () => {
  return <ErrorState layout="page" status={404} />;
};

export default NotFound;
