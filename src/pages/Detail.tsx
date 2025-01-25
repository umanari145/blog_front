import { Footer } from '../layout/Footer';
import { Header } from '../layout/Header';
import { Sidebar } from '../layout/Sidebar';
import '../Detail.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../class/Post';
import { Loading } from '../layout/Loading';
import moment from 'moment';
import { RenderHtmlWithBr } from '../util/Convert';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Detail = () => {
  const { post_key } = useParams();
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPost(post_key);
  }, [post_key]);

  const getPost = async (post_key?: string) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/blogs/${post_key}`
      );
      if (status === 200) {
        let res_item = JSON.parse(data.body);
        res_item.date = new Date(res_item.post_date);
        setPost(res_item);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper>
        {loading && <Loading />}
        <Header></Header>
        <div className="container">
          <article className="post-detail">
            <h1 className="post-title">{post?.title}</h1>
            <p className="post-date">
              {moment(post?.post_date).format('YYYY年MM月DD日')}
            </p>
            <div className="post-content">
              <RenderHtmlWithBr text={post?.contents} />
            </div>
          </article>
          <Sidebar></Sidebar>
        </div>
        <Footer></Footer>
      </Wrapper>
    </>
  );
};
