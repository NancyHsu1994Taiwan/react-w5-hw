import { useState } from "react";
import { Modal } from "bootstrap";
import PropTypes from "prop-types";
function ProductModal({
  tempProduct,
  productModalRef,
  addToCart,
  loadingState,
}) {
  const [qtySelect, setQtySelect] = useState(1);

  const closeModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  };
  return (
    <>
      <div
        ref={productModalRef}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        className="modal fade"
        id="productModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5">
                產品名稱：{tempProduct.title}
              </h2>
              <button
                onClick={closeModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={tempProduct.imageUrl}
                alt={tempProduct.title}
                className="img-fluid"
              />
              <p>內容：{tempProduct.content}</p>
              <p>描述：{tempProduct.description}</p>
              <p>
                價錢：{tempProduct.price} <del>{tempProduct.origin_price}</del>{" "}
                元
              </p>
              <div className="input-group align-items-center">
                <label htmlFor="qtySelect">數量：</label>
                <select
                  value={qtySelect}
                  onChange={(e) => setQtySelect(e.target.value)}
                  id="qtySelect"
                  className="form-select"
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                disabled={loadingState}
                onClick={() => {
                  addToCart(tempProduct.id, parseInt(qtySelect));
                }}
              >
                加入購物車
                {loadingState && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductModal;
ProductModal.propTypes = {
  tempProduct: PropTypes.object,
  productModalRef: PropTypes.element,
  addToCart: PropTypes.func,
  loadingState: PropTypes.bool,
};
