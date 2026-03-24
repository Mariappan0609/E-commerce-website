import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { imageGallery, showcaseProducts } from "../data/collectionData";
import { API_BASE_URL } from "../config";
import "./Home.css";

function Collections() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  }, []);

  const displayProducts = useMemo(() => {
    const items = [...products];

    if (items.length < 40) {
      items.push(...showcaseProducts.slice(0, 40 - items.length));
    }

    return items.slice(0, 40);
  }, [products]);

  return (
    <section className="dress-section collections-page">
      <h2>Full Collection</h2>
      <div className="collection-intro">
        <p>Explore the complete catalogue with 40 curated menswear arrivals.</p>
      </div>
      <div className="dress-grid">
        {displayProducts.map((product, index) => {
          const galleryItem = imageGallery[index % imageGallery.length];

          return (
            <div className="dress-image" key={product._id}>
              <img
                src={galleryItem.image}
                alt={galleryItem.alt}
                style={{ objectPosition: galleryItem.position }}
              />
              <div className="dress-content">
                <h3>{galleryItem.title}</h3>
                <p>Rs. {product.price}</p>
              </div>
              <button type="button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Collections;
