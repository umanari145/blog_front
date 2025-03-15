// BlogForm.tsx
import React, { useEffect, useState } from 'react';
import Select from '../util/Select';
import CheckboxGroup from '../util/Checkbox';
import styled from 'styled-components';
import { Button, Input, InputGroup, Label, Box, Wrapper, Container } from '../components';
import axios from 'axios';
import _ from 'lodash';
import { Option } from '../class/Option';
import moment from 'moment';
import { Loading } from '../layout/Loading';
import { useParams } from 'react-router-dom';
import { useMenuContext } from '../context/MenuContext';

const CustomWrapper = styled(Wrapper)`
  background-color: #f0f4f8;
`;

const CustomContainer = styled(Container)`
  background-color: #f0f4f8;
`;

const CustomBox = styled(Box)`
  padding: 30px;
  background-color: #f0f4f8;
`;

const CustomTitle = styled.h2`
  font-size: 26px;
  color: #007bff;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  min-height: 500px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Update: React.FC = () => {

  const {
    categoryOptions,
    tagOptions,
    getMenus
  } =
    useMenuContext();

  const { post_key } = useParams();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMenus();
    getPost(post_key);
  }, [post_key]);


  const getPost = async (post_key?: string) => {
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/blogs/${post_key}`
      );
      if (status === 200) {
        if (data.statusCode === 404) {
          alert('存在しないブログです。')
        }
        console.log(data.statusCode)
        let res_item = JSON.parse(data.body);
        console.log(res_item)
        res_item.date = new Date(res_item.post_date);
        setTitle(res_item.title)
        setContents(res_item.contents)
        setSelectedCategory(res_item.categories[0])
        setSelectedTags(res_item.tags)
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !contents || !selectedCategory || !selectedTags) {
      alert('全ての必須項目を入力してください。');
      return;
    }

    const postData = {
      "title": title,
      "contents": contents,
      "categories": [selectedCategory],
      "tags": selectedTags
    }

    console.log(postData);
    setLoading(true);
    try {
      const {status} = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/api/blogs/${post_key}`,
        postData
      );
      if (status === 200) {
        alert('ブログが正常に更新されました。');
      } else {
        alert('ブログの登録に失敗しました。');
      }
    } catch (error) {
      alert('ブログのに失敗しました。');
      console.error('Error fetching data: ', error);
    }
    setLoading(false);
  };

  return (
    <>
    <CustomWrapper>
      {loading && <Loading />}
      <CustomContainer>
        <CustomBox>
          <CustomTitle>ブログ更新</CustomTitle>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>タイトル:</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>本文:</Label>
              <TextArea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>カテゴリ:</Label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </InputGroup>
            <InputGroup>
              <Label>タグ:</Label>
              <CheckboxGroup
                options={tagOptions}
                selectedValues={selectedTags}
                onChange={setSelectedTags}
              />
            </InputGroup>
            <Button type="submit">登録</Button>
          </form>
        </CustomBox>
      </CustomContainer>
    </CustomWrapper>
    </>
  );
};

export default Update;