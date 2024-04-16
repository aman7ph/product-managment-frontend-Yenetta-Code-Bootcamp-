import React from "react";
import { deleteProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Delete = ({ show, crudNum, close, product }) => {
  const product1 = product[0];
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const handleDelete = async (id) => {
    // close();
    dispatch(deleteProduct({ id }));
  };

  return (
    <div>
      {show && crudNum === 4 ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h2 className="modal_header-title">Delete Product</h2>
              <button className="close" onClick={() => close()}>
                <img src="x.svg" alt="close" />
              </button>
            </div>
            <div className="modal_content">
              Are you shure you Want to delete this product ?
            </div>
            <div className=" modal_footer">
              <button
                disabled={loading}
                className="modal-close"
                onClick={() => close()}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="submit"
                onClick={() => handleDelete(product1._id)}
              >
                {loading ? "Loading...." : " Continue"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Delete;
