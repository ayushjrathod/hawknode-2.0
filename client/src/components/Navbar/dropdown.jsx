import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import Logout from "../Auth/logout";
import useAuth from "../../hooks/useAuth";

const Dropdown = () => {
  const { auth } = useAuth();
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

    // Add event listener on document for outside clicks
    const handleClickOutside = (event) => {
      if (
        dropdownPopoverShow &&
        !btnDropdownRef.current.contains(event.target) &&
        !popoverDropdownRef.current.contains(event.target)
      ) {
        closeDropdownPopover();
      }
    };

    // Add listener on mount, remove on unmount
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [btnDropdownRef, popoverDropdownRef, dropdownPopoverShow]);

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
            className="size-10 rounded-full border-2 p-0.5"
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
          <Link
          to={`/user/${auth.user.username}`}
            className="text-lg py-1 px-4 font-Akshar block w-full whitespace-nowrap bg-transparent tracking-wide font-light mb-1"
          >
            Dashboard
          </Link>
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
          <hr />
          <div className="font-semibold px-4 tracking-widest">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
