import { Footer } from '../layout/Footer';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Post } from '../class/Post';
import moment from 'moment';
import { Loading } from '../layout/Loading';
import { Pagination } from '../parts/Pagination';
import { useSearchContext } from '../context/SearchContext';
import { Params } from '../class/Params';
import { getQueryParam } from '../util/Convert';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

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

export const Top = () => {
  

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
    updatePosts(new Params(queryParams))
  }, []);

  const handlePageChange = async (page_no: number) => {
    setPageNo(page_no);
    await updatePosts(new Params({
      page_no,
      keyword,
      category,
      tag,
      year,
      month,
    }));
  };

  return (
    <>
      <Wrapper>
        {loading && <Loading />}
        <Header></Header>
        <div className="container">
          <section className="posts">
            {posts.map((post: Post) => (
              <article className="post">
                <h2 className="post-title">
                  <a
                    href={`${process.env.REACT_APP_DOMAIN}/${moment(post.post_date).format('YYYY/MM/DD')}/${post.post_no}`}
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="post-date">
                  {moment(post.post_date).format('YYYY/MM/DD')}
                </p>
                <p
                  className="post-excerpt"
                  dangerouslySetInnerHTML={{ __html: post?.contents }}
                ></p>
              </article>
            ))}
            <Pagination
              totalPages={totalPages!}
              currentPage={currentPage!}
              onPageChange={handlePageChange}
            />
          </section>
          <Sidebar></Sidebar>
        </div>
        <Footer></Footer>
      </Wrapper>
    </>
  );
};
