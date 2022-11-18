//
// Modified come from : https://react.semantic-ui.com/modules/search/#types-standard-custom
//
import React from "react";
import { Search, Label } from "semantic-ui-react";
import { search } from "../zukan/search";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const resultRenderer = ({
  idx,
  title,
  type1,
  type2,
  icon1,
  icon2,
  color1,
  color2,
}) => (
  <>
    <Label content={`${idx} ${title}`} />
    {type1 ? <Label content={type1} color={color1} icon={icon1} /> : <></>}
    {type2 ? <Label content={type2} color={color2} icon={icon2} /> : <></>}
  </>
);

function SearchPokemon({ attributesSetter }) {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      dispatch({
        type: "FINISH_SEARCH",
        results: search(data.value),
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Search
      placeholder="請輸入守方寶可夢名稱"
      loading={loading}
      onResultSelect={(e, data) => {
        dispatch({ type: "UPDATE_SELECTION", selection: data.result.title });
        console.log("data.result:", data.result);
        const attrs = [data.result.attridx1];
        if (data.result.attridx2 >= 0) {
          attrs.push(data.result.attridx2);
        }
        attributesSetter(attrs);
      }}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  );
}

export default SearchPokemon;
