import React from "react";
import MobileHeader from "./MobileHeader";
const Header = () => {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/products" },
    { title: "Solutions", link: "/solutions" },
    { title: "Partners", link: "/partners" },
    { title: "Developers", link: "/developers" },
    { title: "Resources", link: "/resources" },
    { title: "About Us", link: "/resources/solutions" },
    { title: "Contact Us", link: "/resources/solutions" },
    { title: "Get Started", link: "/signin" },
  ];
  return (
    <header
      className="flex items-center justify-center bg-white relative z-50"
      style={{ boxShadow: "1px 1px 38px -20px #888888" }}
    >
      
      <div className="container">
        
        <div className="flex items-center px-12 py-5">
          
          <div>
            
            <img
              src="https://cdn.pinelabs.com/common/img/logo.png"
              className="w-32 max-w-full h-auto"
            />
          </div>
          <div className="ml-auto">
            
            <div className="hidden md:block">
              
              <ul className="flex items-center list-none">
                
                {menuItems.map((item) => (
                  <li
                    key={item.title}
                    className={`relative group mx-4 first:ml-0 last:mr-0`}
                  >
                    
                    <a
                      href={item.link}
                      className={`py-2 hover:text-[#ff6400] text-sm flex items-center ${
                        item?.title === "Contact Us" ? "font-bold" : ""
                      } ${
                        item?.title === "Get Started"
                          ? "bg-[#c7ef31] px-4 rounded-full"
                          : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:hidden block">
              <MobileHeader />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
