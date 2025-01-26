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
import { useParams } from 'react-router-dom';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Top = () => {
  
  const queryParams = new URLSearchParams(window.location.search);
  const keyword_query = queryParams.get('keyword') || undefined;
  const category_query = queryParams.get('category') || undefined;
  const tag_query = queryParams.get('tag') || undefined;
  const year_query = queryParams.get('year') || undefined;
  const month_query = queryParams.get('month') || undefined;

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

    if (category_query) setCategory(category_query);
    if (tag_query) setTag(tag_query);
    if (year_query) setYear(year_query);
    if (month_query) setMonth(month_query);
    if (keyword_query) setKeyword(keyword_query);

    updatePosts(new Params({
      category: category_query,
      tag: tag_query,
      year: year_query,
      month: month_query,
      keyword: keyword_query,
    }));
  }, []);

  const handlePageChange = async (page_no: number) => {
    setPageNo(page_no);
    const params = new Params({
      page_no,
      keyword: keyword_query,
      category,
      tag,
      year,
      month,
    });
    await updatePosts(params);
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
