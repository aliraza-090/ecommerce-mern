import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  // State variables
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [category, setCategory] = useState('women');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // for preview

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // store actual file for upload
      setPreviewImage(URL.createObjectURL(file)); // for image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !selectedImage) {
      alert('Please fill all required fields and select an image.');
      return;
    }

    try {
      // 1️⃣ Upload image first
      const formData = new FormData();
      formData.append('product', selectedImage); // backend expects field name "product"

      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success) {
        alert('Image upload failed');
        return;
      }

      const imageUrl = uploadResult.image_url;

      // 2️⃣ Add product with uploaded image URL
      const productData = {
        name: title,
        old_price: price,
        new_price: offerPrice,
        category: category,
        image: imageUrl,
      };

      const addResponse = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const addResult = await addResponse.json();

      if (addResult.success) {
        alert('Product added successfully!');
        // Reset form
        setTitle('');
        setPrice('');
        setOfferPrice('');
        setCategory('women');
        setSelectedImage(null);
        setPreviewImage(null);
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding product.');
    }
  };

  return (
    <div className="add-product">
      {/* Product Title */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type='text'
          name='name'
          placeholder='type here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Price & Offer Price */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type='text'
            name='old_price'
            placeholder='type here'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type='text'
            name='new_price'
            placeholder='type here'
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Product Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className='add-product-selector'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Upload Image */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={previewImage || upload_area}
            className='addproduct-thumnail-img'
            alt="Upload"
          />
        </label>
        <input
          type="file"
          name='image'
          id='file-input'
          hidden
          onChange={handleFileChange}
        />
        <button className='addproduct-btn' onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddProduct;
