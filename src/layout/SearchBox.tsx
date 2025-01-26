import { Params } from '../class/Params';
import { useSearchContext } from '../context/SearchContext';

const SearchBox = () => {
  const { keyword, setKeyword, updatePosts, clearQuery} = useSearchContext();

  const handleSearch = async () => {
    clearQuery();
    await updatePosts(new Params({keyword: keyword}));
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="検索ワードを入力"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button 
        type="button" 
        onClick={handleSearch}
      >
        検索
      </button>
    </div>
  );
};

export default SearchBox;
