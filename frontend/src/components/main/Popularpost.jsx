import styled from 'styled-components';
import { MdOutlineLocalFireDepartment, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PiDog } from 'react-icons/pi';
import palette from '../../lib/styles/palette';

const PopularpostBox = styled.div`
  width: 350px;
  height: 372px;
  border: 1px solid ${palette.border};
  padding: 20px;
  margin-right: 20px;
  overflow: hidden;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45, 45, 45)' : '')};
`;

const Postlist = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid ${palette.border};
  padding: 5px 10px;
  margin-top: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(20,20,20)' : '')};
  font-size: 14px;

  svg {
    color: red;
    font-size: 20px;
    margin-right: 10px;
  }

  .postView {
  }

  div:nth-child(2) {
    margin-right: 10px;
  }

  .title {
    display: inline-block;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & + & {
    margin-top: 5px;
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: ${({ theme }) => (theme === 'true' ? `${palette.border}` : 'rgb(50, 50, 50)')};
  }

  .add-list {
    font-size: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    margin-left: 40px;
    color: rgb(255, 140, 0);
  }

  svg {
    font-size: 20px;
  }
`;

const MiniBox = styled.div`
  position: absolute;

  svg {
    font-size: 35px;
    color: rgb(255, 140, 0);
  }
`;

const Popularpost = ({ pupularPosts, theme }) => {
  return (
    <>
      <PopularpostBox theme={String(theme)}>
        <ListBox theme={String(theme)}>
          <MiniBox>
            <PiDog />
          </MiniBox>
          <h2>인기 게시물</h2>
          <Link to="/community" className="add-list">
            더보기
            <MdChevronRight />
          </Link>
        </ListBox>

        <ol>
          {pupularPosts?.map((post) => (            
            <Postlist key={post.id} theme={String(theme)}>
              <MdOutlineLocalFireDepartment />
              <div className="postView">{post.view}</div>
              <div className="postInfo">
                <span className="title">{post.CommunityInfo.itle}</span>
              </div>
            </Postlist>
          ))}
        </ol>
      </PopularpostBox>
    </>
  );
};

export default Popularpost;
