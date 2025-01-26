import axios from 'axios';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { MenuItem } from '../class/MenuItem';
import SearchBox from './SearchBox';
export const Sidebar = () => {
  const [categories, setCategories] = useState<MenuItem[]>([]);
  const [tags, setTags] = useState<MenuItem[]>([]);
  const [dates, setDates] = useState<MenuItem[]>([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      let categories, dates, tags;
      const menus = window.sessionStorage.getItem('menus');
      if (menus === null) {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/api/menus`
        );
        if (status === 200) {
          ({ categories, dates, tags } = JSON.parse(data.body));
          window.sessionStorage.setItem('menus', data.body);
        }
      } else {
        ({ categories, dates, tags } = JSON.parse(menus));
      }
      setCategories(categories);
      setTags(tags);
      dates = _.sortBy(dates, '_id').reverse();
      setDates(dates);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <aside className="sidebar">
      <SearchBox></SearchBox>
      <section className="widget">
        <h2 className="widget-title">Category</h2>
        <ul className="widget-list menu-list effect with-dot">
          {categories?.map((category: MenuItem) => (
            <li>
              <a href={`${process.env.REACT_APP_DOMAIN}/?category=${category._id}`}>
                {category._id}({category.count})
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget">
        <h2 className="widget-title">Tags</h2>
        <ul className="tag-list effect">
          {tags?.map((tag: MenuItem) => (
            <li>
              <a href={`${process.env.REACT_APP_DOMAIN}/?tag=${tag._id}`}>{tag._id}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget">
        <h2 className="widget-title">Archive</h2>
        <ul className="widget-list effect with-dot">
          {dates?.map((date: MenuItem) => (
            <li>
              <a href={`${process.env.REACT_APP_DOMAIN}/?year=${date._id.split('-')[0]}&month=${date._id.split('-')[1]}`}>
              {date._id}  ({date.count})
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
