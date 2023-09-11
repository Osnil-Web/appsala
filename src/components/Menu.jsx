import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu({ childs }) {
  const [subCategories, setSubCategories] = useState([]);
  const [subMenu, setSubMenu] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (childs?.data) {
      const categoryNames = childs.data.map(item => item.name);
      setCategories(categoryNames);
    }
  }, [childs]);

  const handleMouseLeave = () => {
    setSubMenu(false);
  };

  const handleMouseEnter = (item) => {
    setSubMenu(true);
    const selectedItem = childs?.data?.find(listItem => listItem.name === item);
    if (selectedItem) {
      setSubCategories(selectedItem.subCategory_ids);
    }
  };

  return (
    <div className="dropdown-content">
      <ul>
        {categories.map((item) => (
          <li
            className="categories"
            onMouseEnter={() => handleMouseEnter(item)}
            
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>

      {subMenu && subCategories && (
        <div className="sub-categories" onMouseLeave={handleMouseLeave}>
          {subCategories.map((item) => (
            <li className="categories" key={item._id}> <Link to={`/category/${item.slug}`}>
              {item.name}
              </Link>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
