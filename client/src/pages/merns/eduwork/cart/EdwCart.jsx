import { useEffect } from "react";
import { useSelector } from "react-redux";

const EdwCart = () => {
  const { data: cart } = useSelector((state) => state.edwCart);
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return <div>EdwCart</div>;
};

export default EdwCart;
