import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const CarouselBox = styled.div`
  box-shadow: ${({ theme }) => (theme === 'true' ? '' : `0 0 0 1px ${palette.border}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};

  h3 {
    width: 100%;
    height: 150px;

    border-radius: 0;
  }
  .slick-prev:before,
  .slick-next:before {
    content: '';
  }

  .slick-dots {
    bottom: 10px;
  }

  .attend {
    background-image: url('../../../images/attend.png');
    background-repeat: no-repeat;
    background-size: 27%;
    background-position: 50% 41%; /* 이미지를 가로로 50% 위치로 이동 */
    background-color: ${palette.mainColor};
    cursor: pointer;
  }

  .second {
    background-image: url('../../../images/second.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 50% 63%; /* 이미지를 가로로 50% 위치로 이동 */
    cursor: pointer;
  }
`;

export const Event = ({ sliderRef, settings, theme }) => {
  const navigate = useNavigate();

  const onAttendancePage = useCallback(() => {
    navigate('/attendance'); // 이동할 주소를 지정합니다.
  }, [navigate]);

  return (
    <CarouselBox theme={String(theme)}>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <h3 className="attend" onClick={onAttendancePage}>
            <a href="https://kor.pngtree.com/freepng/korean-yellow-time-attendance-punch-card-style_6590218.html">
              출처
            </a>
          </h3>
        </div>
        <div>
          <h3 className="second">
            <a href="https://www.seoul.co.kr/news/newsView.php?id=20220510500030&wlog_tag3=daum">출처</a>
          </h3>
        </div>
      </Slider>
    </CarouselBox>
  );
};

export default Event;
