import React, { useEffect, useState } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await fetch("http://18.206.233.191:3000/restaurants");
      const data = await res.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <h2>All Restaurants</h2>

      {restaurants.map((r) => (
        <div key={r._id}>
          <h3>{r.name}</h3>
          <img src={r.image} width="200" />
        </div>
      ))}
    </div>
  );
};

export default Restaurant;
