import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import ReactLoading from "react-loading";

import ProductModal from "./components/ProductModal";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import Form from "./components/Form";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_BASE;

function App() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [cartProductList, setCartProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const getProducts = async (page) => {
    try {
      setLoadingState(true);
      const res = await axios.get(
        `${BASE_URL}/api/${API_PATH}/products?page=${page}`
      );

      setProducts(res.data.products);

      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getProducts();
    getCartProduct();
  }, []);
  const productModalRef = useRef(null);

  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
  }, []);

  const addToCart = async (id, qty) => {
    try {
      setLoadingState(true);
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/cart/`, {
        data: {
          product_id: id,
          qty: qty,
        },
      });
      alert(res.data.message);
      getCartProduct();
    } catch (error) {
      alert("加入購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };
  const getCartProduct = async () => {
    try {
      setLoadingState(true);
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCartProductList(res.data.data.carts);
      setTotalPrice(res.data.data.final_total);
    } catch (error) {
      alert("取得購物車失敗", error.message);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div className="container">
      <div className="mt-4">
        <ProductList
          products={products}
          setTempProduct={setTempProduct}
          productModalRef={productModalRef}
          addToCart={addToCart}
          loadingState={loadingState}
        />
        <div className="d-flex justify-content-center align-items-center">
          <Pagination pageInfo={pageInfo} getProducts={getProducts} />
        </div>
        <ProductModal
          tempProduct={tempProduct}
          productModalRef={productModalRef}
          addToCart={addToCart}
          loadingState={loadingState}
        />
      </div>
      <CartList
        cartProductList={cartProductList}
        getCartProduct={getCartProduct}
        setCartProductList={setCartProductList}
        totalPrice={totalPrice}
        setLoadingState={setLoadingState}
      />

      <div className="my-5 row justify-content-center">
        <Form
          getCartProduct={getCartProduct}
          cartProductList={cartProductList}
          setLoadingState={setLoadingState}
        />
      </div>
      {loadingState && (
        <div
          className=""
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading
            type={"spin"}
            color={"#000000"}
            height={30}
            width={30}
          />
        </div>
      )}
    </div>
  );
}

export default App;
