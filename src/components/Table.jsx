import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/userSlice";
import { fetchProduct, fetchAllProduct } from "../store/productSlice";

import Add from "./Modal/Add";
import Detail from "./Modal/Detail";
import Edit from "./Modal/Edit";
import Delete from "./Modal/Delete";

const Table = () => {
  const [productId, setProductId] = useState("X73ONmeQh2ASw59snxRC");
  const [modal, setModal] = useState(false);
  const [crudNum, setCrudNum] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { singleProduct, products, loading, error, message } = useSelector(
    (state) => state.product
  );
  const { currentUser } = useSelector((state) => state.user);

  const Toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [singleProduct, message]);

  return (
    <div className="app__table">
      <div className="table_header">
        <p>Producs</p>
        <div>
          <input
            placeholder="products"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="add_new clickme"
            onClick={() => {
              Toggle();
              setCrudNum(1);
            }}
          >
            + Add New
          </button>
          {currentUser.role === "admin" ? (
            <button
              className="add_new clickme"
              onClick={() => dispatch(fetchAllProduct())}
            >
              All Products
            </button>
          ) : (
            ""
          )}
          <button
            className="add_new clickme logout"
            onClick={() => dispatch(signOut())}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="app__table-section">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Availability </th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" rowSpan="2" className="td_color">
                  There is no product yet, please add some
                </td>
              </tr>
            ) : (
              products
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((product, index) => {
                  if (product) {
                    return (
                      <tr key={index}>
                        <td data-cell="No.">{index + 1}</td>
                        <td data-cell="Name">{product.name}</td>
                        <td data-cell="Price">{`${product.price}  Birr`}</td>
                        <td data-cell="Quantity">{product.quantity}</td>
                        <td data-cell="Availability">
                          <p
                            className={
                              product.quantity === "0"
                                ? "unavailable"
                                : "available"
                            }
                          >
                            {product.quantity === "0"
                              ? "out Stock"
                              : "in stock"}{" "}
                          </p>
                        </td>
                        <td data-cell="Action">
                          <button
                            className="clickme"
                            onClick={() => {
                              Toggle();
                              setCrudNum(2);
                              setProductId(product._id);
                            }}
                          >
                            <BiDetail />
                          </button>
                          <button
                            className="clickme"
                            onClick={() => {
                              Toggle();
                              setCrudNum(3);
                              setProductId(product._id);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="clickme"
                            onClick={() => {
                              Toggle();
                              setCrudNum(4);
                              setProductId(product._id);
                            }}
                          >
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })
            )}
          </tbody>
        </table>
      </div>

      <Add show={modal} crudNum={crudNum} close={Toggle} />
      <Detail
        show={modal}
        crudNum={crudNum}
        close={Toggle}
        product={products.filter((product) => {
          return product._id === productId;
        })}
      />
      <Edit
        show={modal}
        crudNum={crudNum}
        close={Toggle}
        product={products.filter((product) => {
          return product._id === productId;
        })}
      />
      <Delete
        show={modal}
        crudNum={crudNum}
        close={Toggle}
        product={products.filter((product) => {
          return product._id === productId;
        })}
      />
    </div>
  );
};

export default Table;
