import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { Sidebar } from "../layout/Sidebar";
import axios from 'axios'
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Post } from "../class/Post";
import moment from "moment";
import { Loading } from "../layout/Loading";
import { Pagination } from "../parts/Pagination";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Top = () => {

  const {category, tag, year, month} = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [total_pages, setTotalPage] = useState<number>();
  const [current_page, setCurrentPage] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts();
  },[]); // 空の空白がないとgetPostsが永久ループするので注意

  const getPosts = async (page_no?:number) => {
    let page_no_query = page_no ? `page_no=${page_no}` : ""
    let category_query = category ? `category=${category}` : ""
    let tag_query = tag ? `tag=${tag}` : ""
    let year_query = year ? `year=${year}` : ""
    let month_query = month ? `month=${month}` : ""

    let queries = []
    if (page_no_query) queries.push(page_no_query)
    if (category_query) queries.push(category_query)
    if (tag_query) queries.push(tag_query)
    if (year_query) queries.push(year_query)
    if (month_query) queries.push(month_query)

    let query = "";
    if (queries.length > 0) {
      query = "?" + queries.join('&')
    }

    setLoading(true)
    try {
      const {data, status} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/blogs${query}`)
      if (status === 200) {
        let res_items = JSON.parse(data.body)
				// dateの値を変換
				const parseItems = (posts:Post[]):Post[] => {
					return posts.map((post:Post) => {
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
				setTotalPage(parseInt(res_items.total_pages))
				setCurrentPage(parseInt(res_items.current_page))
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

	const handlePageChange = async(page:number) => {
    getPosts(page)
  };

  return (
    <>
      <Wrapper>
        {loading && <Loading />}
        <Header></Header>
        <div className="container">
          <section className="posts">
            {posts.map((post:Post) => (
            <article className="post">
              <h2 className="post-title">
                <a href={`${process.env.REACT_APP_DOMAIN}/${moment(post.post_date).format('YYYY/MM/DD')}/${post.post_no}`}>{post.title}</a>
              </h2>
              <p className="post-date">{moment(post.post_date).format('YYYY/MM/DD')}</p>
              <p className="post-excerpt" dangerouslySetInnerHTML={{ __html: post?.contents}}>
              </p>
            </article>
            ))}
          <Pagination
            totalPages={total_pages!}
            currentPage={current_page!}
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
