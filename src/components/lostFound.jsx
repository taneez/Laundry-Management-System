import React, { useState, useEffect } from "react";

const LostAndFound = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    type: "", // Changed from "lost" to ""
    description: "",
    image: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    console.log('Image URL:', currentItem.image);
  };

  const handlePost = () => {
    if (!currentItem.description || !currentItem.image || !currentItem.email) {
      alert("Please fill in description, image URL, and email.");
      return;
    }

    const newItem = {
      ...currentItem,
      date: new Date().toLocaleString(),
    };

    const endpoint =
      currentItem.type === "lost" ? "/postLostItem" : "/postFoundItem";

    fetch(`http://localhost:3001${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Item posted successfully");
          return response.json();
        } else {
          console.error("Failed to post item");
          throw new Error("Failed to post item");
        }
      })
      .then((data) => {
        if (currentItem.type === "lost") {
          setLostItems([data, ...lostItems]);
        } else {
          setFoundItems([data, ...foundItems]);
        }
      })
      .catch((error) => {
        console.error("Error during item posting:", error);
      });

    setCurrentItem({
      type: "",
      description: "",
      image: "",
      email: "",
    });
  };

  useEffect(() => {
    // Fetch lost items
    fetch("http://localhost:3001/getLostItems")
      .then((response) => response.json())
      .then((data) => setLostItems(data))
      .catch((error) => console.error("Error fetching lost items:", error));

    // Fetch found items
    fetch("http://localhost:3001/getFoundItems")
      .then((response) => response.json())
      .then((data) => setFoundItems(data))
      .catch((error) => console.error("Error fetching found items:", error));
  }, []); // Run only once on component mount

  const renderPosts = (items) => {
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} className="card mb-3">
            <img
              src={item.Image}
              className="card-img-top"
              alt={`Item ${index}`}
            />
            <div className="card-body">
              <p className="card-text">{item.Description}</p>
              <p className="card-text">
                <small className="text-muted">{item.Date}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Posted by: {item.Email}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <header>
        {/* Blank header */}
        <div style={{ height: "50px" }}></div>
      </header>
      <h2 className="text-center mb-4">Lost and Found</h2>
      <div className="row">
        <div className="col-md-4">
          <h4>Lost Items</h4>
          {renderPosts(lostItems)}
        </div>
        <div className="col-md-4">
          <h4>Found Items</h4>
          {renderPosts(foundItems)}
        </div>
        <div className="col-md-4">
          <h4>Post a Lost or Found Item</h4>
          <div className="mb-3">
            <label htmlFor="itemType">Item Type:</label>
            <select
              className="form-select"
              id="itemType"
              name="type"
              value={currentItem.type}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="itemDescription">Item Description:</label>
            <textarea
              className="form-control"
              id="itemDescription"
              name="description"
              value={currentItem.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="itemImage">Image URL:</label>
            <input
              type="text"
              className="form-control"
              id="itemImage"
              name="image"
              value={currentItem.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemEmail">Email:</label>
            <input
              type="email"
              className="form-control"
              id="itemEmail"
              name="email"
              value={currentItem.email}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handlePost}>
            Post Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default LostAndFound;
