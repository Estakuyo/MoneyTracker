import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

export default function Dropdown({
  label = "Options",
  items = [],
  className = "",
}) {
  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {label}
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom"
        className="z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {items.map((item, index) => (
            <MenuItem key={index} disabled={item.disabled}>
              {item.href ? (
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  disabled={item.disabled}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                >
                  {item.label}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
