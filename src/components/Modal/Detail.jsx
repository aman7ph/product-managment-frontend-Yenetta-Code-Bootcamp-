import React from "react";

const Detail = ({ show, crudNum, close, product }) => {
  const product1 = product[0];

  return (
    <div>
      {show && crudNum === 2 ? (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h2 className="modal_header-title">Product Detail</h2>
              <button className="close" onClick={() => close()}>
                <img src="x.svg" alt="close" />
              </button>
            </div>
            <div className="modal_content">
              <p>
                <strong>Name :</strong> {product1.name}
              </p>
              <p>
                <strong>Price :</strong> {`${product1.price}  birr`}
              </p>

              <p>
                <strong>Quantity in store :</strong> {product1.quantity}
              </p>
              <p>
                <strong>Descriprion :</strong>
                {product1.description}
              </p>
            </div>
            <div className=" modal_footer">
              <button className="modal-close" onClick={() => close()}>
                Close
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

export default Detail;
