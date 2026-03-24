import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { imageGallery, showcaseProducts } from "../data/collectionData";
import { API_BASE_URL } from "../config";
import "./Home.css";

const trendRows = [
  [
    {
      image: "Images/trends-image 02.png",
      alt: "trend 1",
      title: "What to Wear to Work This Fall Without Overthinking It"
    },
    {
      image: "Images/trends-image 03.jpg",
      alt: "trend 2",
      title: "A Guide to Effortless Fall Fashion on the Wedding Formal Suits"
    },
    {
      image: "Images/trends-image 01.jpg",
      alt: "trend 3",
      title: "A Men's Easy Guide to Holiday Style and Casual Collection to Wear"
    }
  ],
  [
    {
      image: "Images/trends-image 05.jpg",
      alt: "trend 4",
      title: "Mens Spring Style Guide and Trendy Collection of Outfit Offers"
    },
    {
      image: "Images/trends-image 04.jpg",
      alt: "trend 5",
      title: "Man Spring Style Fashion Trends and Business Style Outfit Ideas"
    },
    {
      image: "Images/trends-image 06.jpg",
      alt: "trend 6",
      title: "VibeVault Style Forecast: Mens Fashion and Outfit Ideas"
    }
  ]
];

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  }, []);

  const displayProducts = [...products];

  if (displayProducts.length < 12) {
    const needed = 12 - displayProducts.length;
    displayProducts.push(...showcaseProducts.slice(0, needed));
  }

  return (
    <div className="page-shell">
      <main className="main-container">
        <section className="box-container">
          <h2>Trends + Occasions</h2>
          <h1>A Men&apos;s Easy Guide to Holiday Style</h1>
          <p>
            Discover how to elevate your holiday wardrobe with effortless style
            tips and festive fashion inspiration.
          </p>
          <button>Read More</button>
        </section>
        <section className="grid-container">
          <div className="grid-parent">
            <div className="box1">
              <img src="Images/cover-image 01.jpg" alt="cover 1" />
            </div>
            <div className="box2">
              <img src="Images/cover-image 02.jpg" alt="cover 2" />
            </div>
            <div className="box3">
              <img src="Images/cover-image 03.jpg" alt="cover 3" />
            </div>
          </div>
        </section>
      </main>

      <main className="card-main">
        <h2>Trends + Occasions</h2>

        {trendRows.map((row, rowIndex) => (
          <section className="card-section" key={rowIndex}>
            {row.map((item) => (
              <article className="trend-container" key={item.title}>
                <div className="trend-image-wrap">
                  <img src={item.image} alt={item.alt} />
                </div>
                <div className="trend-box">
                  <p>Trends + Occasions</p>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </section>
        ))}
      </main>

      <section className="dress-section" id="collection">
        <h2>New Arrivals</h2>
        <div className="dress-grid">
          {displayProducts.slice(0, 12).map((product, index) => (
            <div className="dress-image" key={product._id}>
              {(() => {
                const galleryItem = imageGallery[index % imageGallery.length];

                return (
                  <>
              <img
                src={galleryItem.image}
                alt={galleryItem.alt}
                style={{
                  objectPosition: galleryItem.position
                }}
              />
              <div className="dress-content">
                <h3>{galleryItem.title}</h3>
                <p>Rs. {product.price}</p>
              </div>
              <button type="button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </section>

      <div className="more-tips">
        <h3>
          Want more tips and updates? Follow <a href="#">@vibevaultmen</a> on Instagram
        </h3>
      </div>
    </div>
  );
}

export default Home;
