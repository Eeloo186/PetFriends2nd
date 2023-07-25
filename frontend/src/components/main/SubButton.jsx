import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../../lib/styles/palette';
import { FaStamp } from 'react-icons/fa';
import { GiCardRandom } from 'react-icons/gi';
import { useCallback } from 'react';

const SubBtnBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0 40px;
  cursor: pointer;

  .btn {
    text-align: center;
    color: ${palette.mainColor};
    font-weight: bold;

    svg {
      margin: 15px 0 5px;
      color: ${palette.mainColor};
      font-size: 40px;
    }
  }

  .memo {
    position: relative;
  }

  .memoTitle {
    background: ${palette.mainColor};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 3px;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .line {
    border: 1px dashed ${palette.border};
    margin-top: 22px;
  }
`;

const SubBtn = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  margin: 0 auto;

  &:hover {
    border: 1px solid ${palette.border};
  }
`;

const SubButton = () => {
  const theme = useSelector((state) => state.theme.theme);

  const memoClick = useCallback(() => {
    const popupUrl = `/memo`;
    const popupOptions = 'width=500,height=600,scrollbars=yes,resizable=yes';
    window.open(popupUrl, '메모', popupOptions);
  }, []);

  const randomClick = useCallback(() => {
    const randomUrl = `/random`;
    const randomOptions = 'width=500,height=600,scrollbars=yes,resizable=yes';
    window.open(randomUrl, '랜덤사진', randomOptions);
  }, []);

  return (
    <>
      <SubBtnBox theme={String(theme)}>
        <SubBtn theme={String(theme)} className="btn">
          <FaStamp />
          <div>출석체크</div>
        </SubBtn>
        <SubBtn theme={String(theme)}></SubBtn>
        <SubBtn theme={String(theme)}></SubBtn>
        <SubBtn theme={String(theme)} className="btn" onClick={randomClick}>
          <GiCardRandom />
          <div>랜덤사진</div>
        </SubBtn>
        <SubBtn theme={String(theme)} className="memo" onClick={memoClick}>
          <div className="memoTitle">메모</div>
          <div className="line"></div>
          <div className="line"></div>
        </SubBtn>
      </SubBtnBox>
    </>
  );
};

export default SubButton;
