// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Collapse } from "react-bootstrap";

// const Sidebar = () => {
//   const [productMenuOpen, setProductMenuOpen] = useState(false);

//   return (
//     <div className="sidebar-wrapper">
//       <nav id="sidebar" className="vh-100 overflow-auto">
//         <ul className="list-unstyled components">
//           <li>
//             <Link to="/dashboard">
//               <i className="fa fa-tachometer"></i> Dashboard
//             </Link>
//           </li>

//           <li>
//             <a
//               href="#productSubmenu"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setProductMenuOpen(!productMenuOpen);
//               }}
//               aria-expanded={productMenuOpen}
//               className="dropdown-toggle"
//             >
//               <i className="fa fa-product-hunt"></i> Products
//               <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
//             </a>
//             <Collapse in={productMenuOpen}>
//               <ul className="list-unstyled" id="productSubmenu">
//                 <li>
//                   <Link to="/admin/products">
//                     All <i className="mx-2 fa fa-product-hunt"></i>
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/admin/product">
//                     <i className="fa fa-plus"></i> Create
//                   </Link>
//                 </li>
//               </ul>
//             </Collapse>
//           </li>

//           <li>
//             <Link to="/admin/orders">
//               <i className="fa fa-shopping-basket"></i> Orders
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/users">
//               <i className="fa fa-users"></i> Users
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin/reviews">
//               <i className="fa fa-star"></i> Reviews
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";
import SidebarDropdown from "./sidebarDropDown";
import { getProfileItems, sidebarMenuItems } from "./sidebarConfig";
import { logoutUser } from "../../../../slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../shared/loader";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role;
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const profileDropdown = getProfileItems(handleLogout);
  // Filter items based on role
  const filteredProfileItems = profileDropdown.items.filter((item) =>
    item.roles.includes(userRole),
  );
  const filteredMenuItems = sidebarMenuItems.filter((item) =>
    item.roles.includes(userRole),
  );
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar" className="vh-100 overflow-auto">
        <ul className="list-unstyled components">
          {filteredMenuItems.map((item, index) =>
            item.type === "dropdown" ? (
              <SidebarDropdown
                key={index}
                title={item.title}
                icon={item.icon}
                items={item.items}
              />
            ) : (
              <li key={index}>
                <Link to={item.path}>
                  <i className={`fa fa-${item.icon}`}></i> {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <ul className="list-unstyled components sidebar-profile-menu">
          {/* Profile Dropdown at the bottom */}
          <SidebarDropdown
            // title={user?.name || "Profile"}
            title={profileDropdown.title}
            icon={profileDropdown.icon}
            items={filteredProfileItems}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
