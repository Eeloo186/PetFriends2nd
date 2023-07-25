import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoAsync } from '../../modules/main';
import { MdChevronRight } from 'react-icons/md';
import { CgComment } from 'react-icons/cg';
const DomParser = require('dom-parser');

const MainBox = styled.div`
  width: 100%;
  height: 344px;
  margin-top: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  padding: 20px 40px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  .more {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 10px;
    color: rgb(50, 50, 50);

    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin-right: 5px;
    color: ${palette.mainColor};
  }

  .subTitle {
    font-size: 16px;
  }

  .title {
    font-weight: bold;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const InfoBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .img {
    width: 150px;
    height: 100px;
    border: 1px solid ${palette.border};
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 15px;
  }

  .title {
    width: 200px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .info {
    border: none;
    background: rgb(0, 100, 256);
    padding: 5px 10px;
    color: white;
    font-size: 12px;
  }
`;

const NotInfo = styled.div`
  width: 100%;
  height: 344px;
  margin-top: 25%;
  text-align: center;
  color: ${palette.border};
  font-size: 20px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
`;

const Info = () => {
  const info = useSelector((state) => state.main.info);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const extractImageUrl = useCallback((content) => {
    const parser = new DomParser();
    const dom = parser.parseFromString(content, 'text/html');
    const imgTag = dom.getElementsByTagName('img')[0];

    if (imgTag) {
      return imgTag.getAttribute('src');
    }

    return null;
  }, []);

  useEffect(() => {
    dispatch(getInfoAsync({ boardName: 'info', limit: '4' }));
  }, [dispatch]);

  return (
    <>
      <Title>
        <div style={{ display: 'flex' }}>
          <CgComment />
          <div>
            <span className="subTitle">알아두면 유용한 반려동물 지식 , </span>
            <span className="title">정보글</span>
          </div>
        </div>
        <div className="more">
          <div>더보기</div>
          <MdChevronRight />
        </div>
      </Title>
      <MainBox theme={String(theme)}>
        <Content>
          {info?.map((post) => (
            <InfoBox key={post.id}>
              <div className="img" style={{ backgroundImage: `url(${extractImageUrl(post.Content.content)})` }}></div>
              <div>
                <span className="info">정보글</span>
                <div className="title">{post.CommunityDetail.title}</div>
              </div>
            </InfoBox>
          ))}
          {info?.length === 0 && (
            <>
              <NotInfo theme={String(theme)}>
                <div>정보글이 없습니다.</div>
              </NotInfo>
            </>
          )}
        </Content>
      </MainBox>
    </>
  );
};

export default Info;
