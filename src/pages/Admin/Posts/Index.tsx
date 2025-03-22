// BlogForm.tsx
import React, { useEffect } from 'react';
import { useSearchContext } from '../../../context/SearchContext';
import { getQueryParam } from '../../../util/Convert';
import { Params } from '../../../class/Params';
import { Post } from '../../../class/Post';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';

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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        管理画面の一覧
      </Typography>

      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>管理画面</div>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "10px" }}
            onClick={handleCreate}
          >
            新規作成
          </Button>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper} style={{marginTop: "10px"}}>
        <Table>
          <TableBody>
            {posts.map((post:Post) => (
              <TableRow key={post._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>handleEdit(post.post_no)}
                  >
                    編集
                  </Button>
                </TableCell>  
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}
export default Index;