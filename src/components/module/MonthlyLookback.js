import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPalettes } from '../../redux/slice';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import dayjs from 'dayjs';
import { topFourColors } from '../../api/MonthlyLookbackApi';
import { closeModal } from '../../redux/modalSlice';
import { TWallpaper } from '@twallpaper/react';
import '@twallpaper/react/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Contain = styled.div`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100%;
`;

const MonthlyColor = styled.h1`
  position: fixed;
  top: 0px;
  left: 50px;
  opacity: 0.2;
  font-size: 40px;
  letter-spacing: 0.7rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  opacity: 0.3;
  padding: 0 7px;
`;

const Info = styled(Button)`
  position: fixed;
  font-size: 17px;
  top: 57px;
  left: 310px;
  cursor: pointer;
`;

const ButtonContain = styled.span`
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  opacity: 0.4;
`;

const MonthlyLookback = ({ setHidenCard }) => {
  const dispatch = useDispatch();
  const palettes = useSelector(selectPalettes);
  const [topColors, setTopColors] = useState();
  const currentMonth = dayjs(new Date()).format('MM');
  const option = {
    fps: 60,
    tails: 30,
    colors: topColors,
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setHidenCard(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const [code, topColorArr] = await topFourColors();
      // console.log(code);
      // console.log(topColorArr);
      if (topColorArr.length >= 4) {
        setTopColors([
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[1]]}`,
          `${palettes[code][topColorArr[2]]}`,
          `${palettes[code][topColorArr[3]]}`,
        ]);
        return;
      }
      if (topColorArr.length === 3) {
        setTopColors([
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[1]]}`,
          `${palettes[code][topColorArr[2]]}`,
          `${palettes[code][topColorArr[0]]}`,
        ]);
        return;
      }
      if (topColorArr.length === 2) {
        setTopColors([
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[1]]}`,
          `${palettes[code][topColorArr[1]]}`,
        ]);
        return;
      }
      if (topColorArr.length === 1) {
        setTopColors([
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[0]]}`,
          `${palettes[code][topColorArr[0]]}`,
        ]);
        return;
      }
      setTopColors(['#E7AF8D', '#F0DCB1', '#BEB5BF', '#A2A987']); // 값이 안들어왔을 경우 보여지는 임의의 색상
    };
    loadData();
  }, []);

  return (
    <>
      <Contain>
        <MonthlyColor>{`당신의 ${currentMonth}월`}</MonthlyColor>
        <Info data-tip={`이번 달 가장 많이 기록한 감정 4가지가 나와요`}>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </Info>
        <ReactTooltip event="click" eventOff="mouseout" place="right" />
        {topColors && <TWallpaper options={option} />}
        <ButtonContain onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </ButtonContain>
      </Contain>
    </>
  );
};

export default MonthlyLookback;
