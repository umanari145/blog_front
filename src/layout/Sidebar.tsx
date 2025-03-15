import { useEffect } from 'react';
import { MenuItem } from '../class/MenuItem';
import SearchBox from './SearchBox';
import { useMenuContext } from '../context/MenuContext';
export const Sidebar = () => {

  const {
    categories,
    tags,
    postDates,
    getMenus
  } =
    useMenuContext();

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <aside className="sidebar">
      <SearchBox></SearchBox>
      <section className="widget">
        <h2 className="widget-title">Category</h2>
        <ul className="widget-list menu-list effect with-dot">
          {categories?.map((category: MenuItem) => (
            <li>
              <a href={`${process.env.REACT_APP_DOMAIN}/?category=${category.name}`}>
                {category.name}({category.count})
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
              <a href={`${process.env.REACT_APP_DOMAIN}/?tag=${tag.name}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="widget">
        <h2 className="widget-title">Archive</h2>
        <ul className="widget-list effect with-dot">
          {postDates?.map((date: MenuItem) => (
            <li>
              <a href={`${process.env.REACT_APP_DOMAIN}/?year=${date.name.split('-')[0]}&month=${date.name.split('-')[1]}`}>
              {date.name}  ({date.count})
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
