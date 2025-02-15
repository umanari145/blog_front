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

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [post_no, setPostNo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      let categories,  tags;
      const menus = window.sessionStorage.getItem('menus');
      if (menus === null) {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/menus`
        );
        if (status === 200) {
          ({ categories, tags } = JSON.parse(data.body));
          window.sessionStorage.setItem('menus', data.body);
        }
      } else {
        ({ categories, tags } = JSON.parse(menus));
      }
      categories = []
      tags = []
      categories.push({id:"1", name:"未分類"})
      categories.push({id:"2", name:"database"})
      setCategories(categories);
      tags.push({id:"15", name:"ansible"})
      tags.push({id:"16", name:"bootstrap"})
      setTags(tags);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !contents || !selectedCategory || !selectedTags || !date) {
      alert('全ての必須項目を入力してください。');
      return;
    }

    const postData = {
      "title": title,
      "contents": contents,
      "categories": [selectedCategory],
      "post_no": `post-${post_no}`,
      "post_date": moment(date).format("YYYY-MM-DD"),
      "tags": selectedTags
    }

    console.log(postData);
    setLoading(true);
    try {
      const {status} = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/blogs`,
        postData
      );
      if (status === 200) {
        alert('ブログが正常に登録されました。');
      } else {
        alert('ブログの登録に失敗しました。');
      }
    } catch (error) {
      alert('ブログの登録に失敗しました。');
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
          <CustomTitle>新規ブログ登録</CustomTitle>
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
              <Label>post-no:</Label>
              <Input
                type="text"
                value={post_no}
                onChange={(e) => setPostNo(e.target.value)}
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
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            </InputGroup>
            <InputGroup>
              <Label>タグ:</Label>
              <CheckboxGroup
                options={tags}
                selectedValues={selectedTags}
                onChange={setSelectedTags}
              />
            </InputGroup>
            <InputGroup>
              <Label>投稿日:</Label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
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

export default Create;