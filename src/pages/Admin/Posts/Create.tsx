// BlogForm.tsx
import React, { useEffect, useState } from 'react';
import Select from '../../../util/Select';
import CheckboxGroup from '../../../util/Checkbox';
import { Button, Input, InputGroup, Label} from '../../../components';
import axios from 'axios';
import moment from 'moment';
import { Loading } from '../../../layout/Loading';
import { useMenuContext } from '../../../context/MenuContext';
import { CustomBox, CustomContainer, CustomTitle, CustomWrapper, TextArea } from '../../../styled/Admin';

const Create: React.FC = () => {

  const {
    categoryOptions,
    tagOptions,
    getMenus
  } =
    useMenuContext();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [post_no, setPostNo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMenus();
  }, []);


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