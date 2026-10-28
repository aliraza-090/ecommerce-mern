import React, { useEffect, useState } from "react";
import "./NewCollection.css";
import new_collections from "../assets/new_collections"; // keep existing static data
import Item from "../Item/Item";

const NewCollection = () => {
  // ✅ State for dynamic data from API
  const [collection, setCollection] = useState([]);

  // ✅ Fetch new collection from backend
  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setCollection(data.data); // use API data if available
        } else {
          setCollection(new_collections); // fallback to static data
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching new collection:", error);
        setCollection(new_collections); // fallback on error
      });
  }, []);

  return (
    <div className="new-collection">
      <h1>New Collection</h1>
      <div className="collection-grid">
        {collection.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollection;
