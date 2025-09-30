import React from "react";
import "./NewCollection.css";
import new_collections from "../assets/new_collections";
import Item from "../Item/Item";

const NewCollection = () => {
  return (
    <div className="new-collection">
      <h1>New Collection</h1>
      <div className="collection-grid">
        {new_collections.map((item) => (
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
