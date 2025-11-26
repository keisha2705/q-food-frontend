import React, { useEffect, useState } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch("http://18.206.233.191:3000/restaurants");
      const data = await res.json();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

  return (
    <div>
      <h2>Restaurants</h2>

      {menuItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <img src={item.image} width="200" />
        </div>
      ))}
    </div>
  );
};

export default Menu;
