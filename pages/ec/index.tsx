import { useEffect, useState } from "react";

export default function ECPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/ec/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>ECプラットフォーム</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.image_url} alt={p.name} width={100} />
            <p>{p.name}</p>
            <p>{p.price}円</p>
            {/* 商品詳細ページへのリンク */}
          </li>
        ))}
      </ul>
    </div>
  );
}
