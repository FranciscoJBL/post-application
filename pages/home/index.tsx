import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Post, { PostProps } from "../../components/Post";
import AddPost from "../../components/AddPost";
import { prepareFeed } from "../../lib/prepareFeed";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: { feed: await prepareFeed(ctx) },
  };
};

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  const [activeSearch, setActiveSearch] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.search) {
      if (router.query.search === "") {
        setActiveSearch([]);
      } 

      if (Array.isArray(router.query.search)) {
        setActiveSearch(router.query.search);
      } else {
        setActiveSearch(router.query.search.split(" "));
      }
    }

    if (router.query.filters) {
      if (router.query.filters === "") {
        setActiveFilters([]);
      } 

      if (Array.isArray(router.query.filters)) {
        setActiveFilters(router.query.filters);
      } else {
        setActiveFilters(router.query.filters.split(" "));
      }
    }
  }, [router.query]);

  const handleQuerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let queryParams = {};
    let searchParams = activeSearch;

    const searchQueryInput = document.getElementById("searchQueryInput") as HTMLInputElement;
    
    if (searchQueryInput.value !== "") {
      searchQueryInput.value.split(" ").forEach((word) => {
        if (!activeSearch.includes(word) && word.length > 0) {
          searchParams.push(word);
        } 
      });
    }

    let filterParams = activeFilters;
    const filterQueryInput = document.getElementById("filterQueryInput") as HTMLInputElement;
    if (filterQueryInput.value !== "") {
      filterQueryInput.value.split(" ").forEach((word) => {
        if (!activeFilters.includes(word) && word.length > 0) {
          filterParams.push(word);
        }
      });
    }

    if (searchParams.length > 0) {
      queryParams = { ...queryParams, search: searchParams.join(" ") };
    }

    if (filterParams.length > 0) {
      queryParams = { ...queryParams, filters: filterParams.join(" ") };
    }
    
    // Clear the search and filter inputs
    searchQueryInput.value = "";
    filterQueryInput.value = "";
    
    router.push({
      pathname: '/home',
      query: queryParams,
    });
  };

  const handleDeleteSearchElement = (word: string) => {
    setActiveSearch(activeSearch.filter((search) => search !== word));
  }

  const handleDeleteFilterElement = (word: string) => {
    setActiveFilters(activeFilters.filter((filter) => filter !== word));
  }

  return (
    <div>
    <Layout>
      <div className="page">
        <h1 className="feedTitle">Recent posts</h1>
        <div className="queryFeedControls">
        <form id="queryParamsForm" onSubmit={handleQuerySubmit}>
          <input id="searchQueryInput" type="text" placeholder="Search" />
          <input id="filterQueryInput" type="text" placeholder="Filter" />
          <button type="submit">Apply</button>
        </form>
        <div className="queryInfoContainer">
          {activeSearch.length > 0 && activeSearch[0] !== '' ? <span>Searching for:
            <div className="tag">
            {activeSearch.map((word, index) => (
              <div className="tagElement" key={index}>  
              <span>{word}</span>
              <span className="deleteQuery" onClick={() => handleDeleteSearchElement(word)}>x</span>
              </div>
            ))}
            </div>
            </span> : null
          }
          {activeFilters.length > 0 &&  activeFilters[0] !== '' ? <span>Filtering by: 
          <div className="tag">
            {activeFilters.map((word, index) => (
              <div className="tagElement" key={index}>
                <span>{word}</span>
                <span className="deleteQuery" onClick={() => handleDeleteFilterElement(word)}>x</span>
              </div>
            ))}
            </div>
            </span> : null
          }
        </div>
        </div>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
    <AddPost />
    </div>
  )
};

export default Home