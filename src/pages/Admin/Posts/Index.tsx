// BlogForm.tsx
import React, { useEffect } from 'react';
import { useSearchContext } from '../../../context/SearchContext';
import { getQueryParam } from '../../../util/Convert';
import { Params } from '../../../class/Params';
import { Post } from '../../../class/Post';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import '../../../css/admin/index.css'

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
    updatePosts,
    setCategory,
    setTag,
    setYear,
    setMonth,
    setKeyword,
  } =
    useSearchContext();

  const navigate = useNavigate();

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

  const handleCreate = () => {
    navigate('/admin/post');
  };

  const handleEdit = (post_no: string) => {
    navigate(`/admin/post/${post_no}`);
  };

  return (
    <>
      <Container className="mt-5">
        <div>
          <div className="d-flex flex-end mb-3">
            <Button variant="success" onClick={handleCreate}>新規登録</Button>
          </div>

          <Row>
            <Col>
              <ListGroup>
              {posts.map((post:Post) => (
                <ListGroupItem key={post.post_no} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{post.title}</strong>
                  </div>
                  <div>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(post.post_no)}>編集</Button>
                  </div>
                </ListGroupItem>
              ))}
              </ListGroup>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
export default Index;