import React, { createContext, useContext, useState } from 'react';
import { Post } from '../class/Post';
import axios from 'axios';

interface SearchProviderProps {
  children: React.ReactNode;
}

// Contextの型定義
interface SearchContextType {
  page_no: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  updatePosts: () => Promise<void>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clearQuery: () => void;
}

// Contextの初期値
const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
}

// Context Providerのコンポーネント
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [page_no, setPageNo] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updatePosts = async () => {
    let page_no_query = page_no ? `page_no=${page_no}` : '';
    let keyword_query = keyword ? `search_word=${keyword}` : '';
    let category_query = category ? `category=${category}` : '';
    let tag_query = tag ? `tag=${tag}` : '';
    let year_query = year ? `year=${year}` : '';
    let month_query = month ? `month=${month}` : '';

    let queries = [];
    if (page_no_query) queries.push(page_no_query);
    if (keyword_query) queries.push(keyword_query);
    if (category_query) queries.push(category_query);
    if (tag_query) queries.push(tag_query);
    if (year_query) queries.push(year_query);
    if (month_query) queries.push(month_query);

    let query_str = '';
    if (queries.length > 0) {
      query_str = '?' + queries.join('&');
    }
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/blogs${query_str}`
      );
      if (status === 200) {
        let res_items = JSON.parse(data.body);
        // dateの値を変換
        const parseItems = (posts: Post[]): Post[] => {
          return posts.map((post: Post) => {
            const parsedDate = new Date(post.post_date);
            return {
              ...post,
              contents: post.contents?.slice(0, 100),
              date: parsedDate,
            };
          });
        };
        console.log('furuhata');
        setPosts(parseItems(res_items.items));
        // たとえばページ読み込み順の関係からこの部分だたのtotal_page=data.total_pagesだと反映されない
        setTotalPages(parseInt(res_items.total_pages));
        setCurrentPage(parseInt(res_items.current_page));
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  const clearQuery = () => {
    setKeyword('');
    setCategory('');
    setTag('');
    setYear(0);
    setMonth(0);
    setPageNo(0);
  };

  return (
    <SearchContext.Provider
      value={{
        page_no,
        setPageNo,
        keyword,
        setKeyword,
        category,
        setCategory,
        tag,
        setTag,
        year,
        setYear,
        month,
        setMonth,
        posts,
        updatePosts,
        setPosts,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        loading,
        setLoading,
        clearQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Hookを作成して、Contextを簡単に使えるように
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
