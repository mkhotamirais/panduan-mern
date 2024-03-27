import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../../../../app/features/eduwork/edwAddressSlice";
import { Err, GridCard, Loading, PostBtn } from "../../../../../components/Components";
import EdwAddressList from "./EdwAddressList";

const EdwAddress = () => {
  const { data: address, status, error } = useSelector((state) => state.edwAddress);
  const { cred: user } = useSelector((state) => state.edwAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAddress(user?.signed));
    }
  }, [dispatch, user]);

  let content;
  if (status === "loading") content = <Loading />;
  else if (status === "failed") content = <Err>{error}</Err>;
  else if (status === "succeeded") {
    const addresses = address.address;
    const renderedAddress = addresses && addresses.map((address) => <EdwAddressList key={address?._id} address={address} />);
    content = <GridCard>{renderedAddress}</GridCard>;
  }
  return (
    <div>
      <PostBtn />
      {content}
    </div>
  );
};

export default EdwAddress;
