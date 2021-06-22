import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("Programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
    };
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  //   useEffect(() => {
  //     const search = async () => {
  //       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         params: {
  //           action: "query",
  //           list: "search",
  //           origin: "*",
  //           format: "json",
  //           srsearch: term,
  //         },
  //       });
  //       setResults(data.query.search);
  //     };
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       const timeoutId = setTimeout(() => {
  //         if (term) {
  //           search();
  //         }
  //       }, 1000);

  //       return () => {
  //         clearTimeout(timeoutId);
  //       };
  //     }
  //   }, [term]);
  const renderResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org/wiki/${result.title}`}
            className="ui button"
          >
            GO
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter search term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
