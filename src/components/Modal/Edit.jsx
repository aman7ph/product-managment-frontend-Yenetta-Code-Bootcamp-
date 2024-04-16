import React, { useEffect, useState } from "react";

import { editProduct } from "../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Edit = ({ show, crudNum, close, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (product && product.length > 0) {
      const productData = product[0];
      setFormData({
        name: productData.name,
        price: productData.price.toString(),
        quantity: productData.quantity.toString(),
        description: productData.description,
      });
    }
  }, [product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors({
      ...errors,
      [name]: null,
    });
  }

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Product Name is required";
    }

    if (formData.price.trim() === "" || isNaN(formData.price)) {
      newErrors.price = "Price must be a number";
    }

    if (formData.quantity.trim() === "" || isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedProduct = {
        ...product[0],
        ...formData,
      };
      dispatch(editProduct(updatedProduct));
      // close();
    }
  };
  return (
    <div>
      {show && crudNum === 3 ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h2 className="modal_header-title">Edit Product</h2>
              <button className="close" onClick={() => close()}>
                <img src="x.svg" alt="close" />
              </button>
            </div>
            <div className="modal_content">
              <input
                type="text"
                placeholder="Product Name"
                onChange={handleChange}
                name="name"
                value={formData.name}
              />
              {errors.name && <div className="error">{errors.name}</div>}
              <input
                type="text"
                placeholder="Price"
                onChange={handleChange}
                name="price"
                value={formData.price}
              />
              {errors.price && <div className="error">{errors.price}</div>}
              <input
                type="text"
                placeholder="Available Quantity"
                onChange={handleChange}
                name="quantity"
                value={formData.quantity}
              />
              {errors.quantity && (
                <div className="error">{errors.quantity}</div>
              )}
              <textarea
                type="text"
                placeholder="Product Description"
                onChange={handleChange}
                name="description"
                value={formData.description}
              />
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
                onClick={handleUpdate}
              >
                {loading ? "Loading...." : " Submit"}
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

export default Edit;
