import { useState } from 'react';
import { useSearchContext } from '../context/SearchContext';

const SearchBox = () => {
  const { setKeyword, updatePosts, clearQuery } = useSearchContext();

  const [keyword, setLocalKeyword] = useState('');
  const handleSearch = async () => {
    clearQuery();
    setKeyword(keyword);
    updatePosts();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="検索ワードを入力"
        value={keyword}
        onChange={(e) => setLocalKeyword(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        検索
      </button>
    </div>
  );
};

export default SearchBox;
