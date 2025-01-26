import React, { createContext, useContext, useState} from 'react';
import { Post } from '../class/Post';
import axios from 'axios';
import { Params } from '../class/Params';

interface SearchProviderProps {
  children: React.ReactNode;
}

// Contextの型定義
interface SearchContextType {
  page_no: number;
  setPageNo: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  setKeyword: (keyword: string) => void;
  category: string;
  setCategory: (category: string) => void;
  tag: string;
  setTag: (tag: string) => void;
  year: string;
  setYear: (year: string) => void;
  month: string;
  setMonth: (month: string) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePosts: (params?: Params) => Promise<void>;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  clearQuery: () => void;
}

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
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updatePosts = async (params?: Params) => {
    let query_str = params?.getQueryString() || '';
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
        setPosts(parseItems(res_items.items));
        // たとえばページ読み込み順の関係からこの部分だたのtotal_page=data.total_pagesだと反映されない
        setTotalPages(parseInt(res_items.total_pages));
        setCurrentPage(parseInt(res_items.current_page));
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  }

  const clearQuery = () => {
    setKeyword('');
    setCategory('');
    setTag('');
    setYear('');
    setMonth('');
    setPageNo(1);
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
