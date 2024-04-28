import { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";
import Logout from "./logout";

const Dropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);
  const popperRef = useRef(null);

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
    if (popperRef.current) {
      popperRef.current.setOptions({ placement: "bottom-start" });
    }
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Create Popper instance on mount
  useEffect(() => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      popperRef.current = createPopper(
        btnDropdownRef.current,
        popoverDropdownRef.current,
        {
          placement: "bottom-start",
        }
      );
    }
  }, [btnDropdownRef, popoverDropdownRef]);

  // bg colors
  return (
    <>
      <div className="inline-flex align-middle z-50 mx-3">
        <button
          className={"hover:shadow-lg outline-none focus:outline-none"}
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <img
            src="../src/assets/avatar.avif"
            className="size-10 rounded-full border-4 p-0.5"
          />
        </button>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "bg-white text-black z-50 float-left py-2 list-none text-left rounded shadow-lg m-4"
          }
          style={{ minWidth: "12rem" }}
        >
          <a
            href="#pablo"
            className={
              "text-lg py-2 px-4 font-Akshar block w-full whitespace-no-wrap bg-transparent  tracking-wide font-light"
            }
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          <a
            href="#pablo"
            className={
              "text-lg py-2 px-4 font-Akshar block w-full whitespace-no-wrap bg-transparent tracking-wide font-light"
            }
            onClick={(e) => e.preventDefault()}
          >
            Library
          </a>
          <a
            href="#pablo"
            className={
              "text-lg py-2 px-4 font-Akshar block w-full whitespace-no-wrap bg-transparent tracking-wide font-light"
            }
            onClick={(e) => e.preventDefault()}
          >
            Stories
          </a>
          <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
          <div className="font-semibold px-4 tracking-widest">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
