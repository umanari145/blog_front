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
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Top = () => {
  const { posts, loading, updatePosts, totalPages, currentPage, setPageNo } =
    useSearchContext();

  useEffect(() => {
    updatePosts();
  }, []);

  const handlePageChange = async (page: number) => {
    setPageNo(page);
    updatePosts();
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
