// components/categorySelect.jsx
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Tag, Check, ChevronDown, Plus } from "lucide-react";

const ACCENTS = {
  success: {
    ring: "focus:border-success-500",
    text: "text-success-600",
    bg: "bg-success-100",
    icon: "text-success-500",
  },
  error: {
    ring: "focus:border-error-500",
    text: "text-error-600",
    bg: "bg-error-100",
    icon: "text-error-500",
  },
  primary: {
    ring: "focus:border-primary-500",
    text: "text-primary-600",
    bg: "bg-primary-100",
    icon: "text-primary-500",
  },
};

const CategorySelect = ({
  categories = [],
  value,
  onChange,
  accentColor = "primary",
  placeholder = "Select a category",
}) => {
  const [query, setQuery] = useState("");
  const accent = ACCENTS[accentColor] ?? ACCENTS.primary;

  const filtered =
    query === ""
      ? categories
      : categories.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        );

  const exactMatch = categories.some(
    (c) => c.name.toLowerCase() === query.trim().toLowerCase(),
  );
  const showCreate = query.trim().length > 0 && !exactMatch;

  return (
    <Combobox
      value={value || null}
      onChange={(val) => {
        if (val) onChange(val);
        setQuery("");
      }}
    >
      <div className="relative">
        <Tag
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400"
        />

        <Combobox.Input
          className={`w-full rounded-md border border-secondary-300 bg-secondary-50 p-2.5 pl-9 pr-9 text-sm text-secondary-800 outline-none transition-colors ${accent.ring}`}
          displayValue={(val) => val ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />

        <Combobox.Button className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
          <ChevronDown size={16} />
        </Combobox.Button>

        <Combobox.Options
          anchor="bottom start"
          className="z-[9999] mt-1.5 w-[var(--input-width)] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-xl empty:hidden"
        >
          {filtered.length === 0 && !showCreate && (
            <div className="px-3 py-2 text-sm text-secondary-400">
              No categories found
            </div>
          )}

          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.map((item) => (
              <Combobox.Option
                key={item.id}
                value={item.name}
                className={({ focus }) =>
                  `flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                    focus ? accent.bg : ""
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className="flex-1 truncate text-secondary-700">
                      {item.name}
                    </span>
                    {selected && <Check size={14} className={accent.icon} />}
                  </>
                )}
              </Combobox.Option>
            ))}

            {showCreate && (
              <Combobox.Option
                value={query.trim()}
                className={({ focus }) =>
                  `flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                    focus ? accent.bg : ""
                  }`
                }
              >
                <Plus size={14} className={accent.icon} />
                <span className={`font-medium ${accent.text}`}>
                  Create "{query.trim()}"
                </span>
              </Combobox.Option>
            )}
          </div>
        </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default CategorySelect;
