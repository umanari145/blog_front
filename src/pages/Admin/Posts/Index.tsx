// BlogForm.tsx
import React, { useEffect } from 'react';
import { CustomBox, CustomContainer, CustomTitle, CustomWrapper } from '../../../styled/Admin';
import { Loading } from '../../../layout/Loading';
import { useSearchContext } from '../../../context/SearchContext';
import { getQueryParam } from '../../../util/Convert';
import { Params } from '../../../class/Params';
import { Post } from '../../../class/Post';

const getAllQueryParams = () => ({
  keyword: getQueryParam('keyword'),
  category: getQueryParam('category'),
  tag: getQueryParam('tag'),
  year: getQueryParam('year'),
  month: getQueryParam('month'),
});

const setContextFromQuery = (queryParams: ReturnType<typeof getAllQueryParams>, context: any) => {
  const { setCategory, setTag, setYear, setMonth, setKeyword } = context;

  if (queryParams.category) setCategory(queryParams.category);
  if (queryParams.tag) setTag(queryParams.tag);
  if (queryParams.year) setYear(queryParams.year);
  if (queryParams.month) setMonth(queryParams.month);
  if (queryParams.keyword) setKeyword(queryParams.keyword);
};


const Index: React.FC = () => {

  const {
    posts,
    loading,
    updatePosts,
    totalPages,
    currentPage,
    category,
    tag,
    year,
    month,
    keyword,
    setPageNo,
    setCategory,
    setTag,
    setYear,
    setMonth,
    setKeyword,
  } =
    useSearchContext();

  useEffect(() => {
    const queryParams = getAllQueryParams();
    setContextFromQuery(queryParams, { 
      setCategory,
      setTag,
      setYear,
      setMonth,
      setKeyword,
    });
    console.log("aaaaa");
    updatePosts(new Params(queryParams))
  }, []);    

  return (
    <>
    <CustomWrapper>
      {loading && <Loading />}
      <CustomContainer>
        <a href="/admin/post">
          ブログ新規登録
        </a>
        <CustomBox>
          <CustomTitle>ブログ一覧</CustomTitle>
          {posts.map((post: Post, index:number) => (
            <li>
              {post.post_no} {post.title}
            </li>
          ))}
        </CustomBox>
      </CustomContainer>
    </CustomWrapper>
    </>
  );
}
export default Index;