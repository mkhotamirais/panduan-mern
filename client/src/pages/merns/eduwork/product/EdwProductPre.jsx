import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getProducts } from "../../../../app/features/eduwork/edwProductSlice";
import { getCategories } from "../../../../app/features/eduwork/edwCategorySlice";
import { getTags } from "../../../../app/features/eduwork/edwTagSlice";

const EdwProductPre = () => {
  const { query, tags } = useSelector((state) => state.edwProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ query, tags }));
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch, query, tags]);

  return <Outlet />;
};

export default EdwProductPre;
