import { Combobox, Listbox, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { AxiosResponse } from "axios";
import api from "../../axios/config";

interface ICategory {
  _id: string;
  name: string;
}

interface IResult {
  _id: string;
  title: string;
  category: { _id: string; name: string };
}

function Search() {
  const response = useRouteLoaderData("root") as AxiosResponse;
  const categories = response.data as ICategory[];

  const [category, setCategory] = useState<ICategory>(categories[0]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<IResult[]>([]);

  const [query, setQuery] = useDebounce("", 1000);

  const navigate = useNavigate();

  const navigateToProduct = (e: IResult) => navigate("/products/" + e._id);

  const getResults = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get<IResult[]>("/search?query=" + query);
      setResults(response.data);
    } catch (error) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!input) return;
    
    setQuery(input);
  }, [input]);

  useEffect(() => {
    getResults();
  }, [getResults]);

  const CategoryOptions = () => {
    return (
      <>
        {categories.map((item) => (
          <Listbox.Option
            key={item._id}
            value={item}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-8 pr-4 group flex w-full items-center rounded-md text-sm ${
                active ? "bg-accent/10 text-accent" : "text-gray-900"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span className="block truncate font-medium">{item.name}</span>
                {selected ? (
                  <span className="ic absolute text-lg inset-y-0 left-0 flex items-center pl-2 text-accent">
                    check
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ))}
      </>
    );
  };

  const SearchOptions = () => {
    if (!input) return;

    if (input !== query || isLoading)
      return <div className="text-gray-500 py-2 px-4">Loading...</div>;

    if (!results.length)
      return <div className="text-gray-500 py-2 px-4">No results...</div>;

    return (
      <>
        {results.map((item) => (
          <Combobox.Option
            className={({ active }) =>
              `truncate rounded-md py-2 px-4 cursor-pointer ${
                active && "bg-accent/10 text-accent"
              }`
            }
            key={item._id}
            value={item}
          >
            {item.title}{" "}
            {item.category && (
              <>
                <span className="font-[400]">in category</span>{" "}
                <span className="capitalize text-accent">
                  {item.category.name}
                </span>
              </>
            )}
          </Combobox.Option>
        ))}
      </>
    );
  };

  return (
    <div className="relative flex max-w-xl w-full">
      <Listbox value={category} by="_id" onChange={setCategory}>
        <div className="relative">
          <Listbox.Button className="relative border-r border-gray-200 flex gap-2 items-center h-full bg-gray-100 text-sm text-gray-700 rounded-l-md pl-8 pr-2 max-w-[160px]">
            <span className="ic absolute left-0 pl-2 pointer-events-none flex items-center">
              category
            </span>
            <span className="truncate max-sm:hidden">{category.name}</span>
            <span className="ic flex items-center">unfold_more</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <nav
              className="absolute z-10 mt-1
            max-sm:w-full max-sm:fixed max-sm:left-0 max-sm:px-2"
            >
              <Listbox.Options className="max-h-60 overflow-auto rounded-lg bg-white p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <CategoryOptions />
              </Listbox.Options>
            </nav>
          </Transition>
        </div>
      </Listbox>

      <Combobox onChange={navigateToProduct}>
        <Combobox.Input
          autoComplete="off"
          placeholder="Product name..."
          className="search h-10 bg-gray-100 pl-2 border border-gray-100 w-full text-sm appearance-none outline-none truncate
        max-sm:rounded-r-md"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="flex items-center bg-accent/20 text-accent px-4 rounded-r-md max-sm:hidden">
          <span className="text-sm leading-none">Search</span>
        </button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Combobox.Options className="absolute w-full popover left-0 top-full p-1 mt-1 text-sm">
            <SearchOptions />
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}

export default Search;
