type Option<T extends string> = {
  id: string;
  value: T;
  literal: string;
};

type SearchFilterGroupProps<T extends string> = {
  name: string;
  value: T;
  options: readonly Option<T>[];
  onChange: (next: T) => void;
};

export const SearchFilterGroup = <T extends string> ({ value, onChange, name = "searchBy", options}: SearchFilterGroupProps<T>) => {
  return (
    <div className="search-filter-group">
      {options.map((opt) => (
        <label key={opt.id} htmlFor={opt.id}>
          <input
            id={opt.id}
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.literal}
        </label>
      ))}
    </div>
  );
};
