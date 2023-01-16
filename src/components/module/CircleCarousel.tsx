import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { useSelector } from 'react-redux';
import { selectPalettes } from '../../redux/slice';

const CarouselContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 59.9%;
  display: block;
  overflow: hidden;
`;

const CarouselBtnContainer = styled.div`
  padding-top: 50px;
  padding-left: 40px;
`;

const Carousel = styled.div`
  position: absolute;
  bottom: -200px;
  left: 180px;
  width: 364px;
  height: 364px;
  background-color: #ffffff;
  box-shadow: 2px 0px 4px 4px rgba(22, 27, 29, 0.1);
  border-radius: 50%;
  transition: 0.5s;
  /* transform: rotate(15deg); */
  transform-origin: center center;
  ::before {
    /* content: “”; */
    position: absolute;
    width: 50%;
    height: 100%;
    background: #000;
    border-radius: 50% 0 0 50%;
  }
`;

const ItemCarousel = styled.div`
  position: fixed;
  border-radius: 10%;
  transform-origin: 270px;
  top: 130px;
  left: -90px;
  background-color: ${props => props.color || '#fff'};
  width: 140px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 2px;
  transition: 0.5s;
  box-shadow: 1px -2px 2px 1px rgba(22, 27, 29, 0.2);
`;

const CircleCarousel = ({ carouselIndex }) => {
  const palettes = useSelector(selectPalettes);
  const moodList = [
    '기쁨',
    '슬픔',
    '분노',
    '설렘',
    '걱정',
    '평온',
    '예민',
    '희망',
  ];

  const [palette, setPalette] = useState({
    carouselDeg: 17,
    itemDeg: -17,
    centerItem: 0,
    prevItem: 7,
    lastItem: 7,
    nextItem: 1,
    carousel: [],
  });

  useEffect(() => {
    const loadData = () => {
      const newPalette = palettes.map(eachArr =>
        eachArr.map((item, i) => ({ code: item, mood: moodList[i] }))
      );
      setPalette({ ...palette, carousel: newPalette });
    };
    loadData();
  }, []);

  const prevNext = itemId => {
    if (itemId === palette.lastItem) {
      setPalette({ ...palette, nextItem: 0, prevItem: palette.lastItem - 1 });
    } else if (itemId === 0) {
      setPalette({ ...palette, prevItem: palette.lastItem, nextItem: 1 });
    } else {
      setPalette({
        ...palette,
        nextItem: palette.centerItem + 1,
        prevItem: palette.centerItem - 1,
      });
    }
  };

  const next = () => {
    setPalette({
      ...palette,
      carouselDeg: palette.carouselDeg - 45,
      itemDeg: palette.itemDeg + 45,
      centerItem: palette.nextItem,
    });
  };

  const prev = () => {
    setPalette({
      ...palette,
      carouselDeg: palette.carouselDeg + 45,
      itemDeg: palette.itemDeg - 45,
    });
  };

  return (
    <CarouselContainer>
      <CarouselBtnContainer>
        <Button size="long" fontSize="little" onClick={next}>
          다음
        </Button>
        <Button size="long" fontSize="little" onClick={prev}>
          이전
        </Button>
      </CarouselBtnContainer>
      {palette.carousel && (
        <Carousel style={{ transform: `rotate(${palette.carouselDeg}deg)` }}>
          {palette.carousel[carouselIndex] &&
            palette.carousel[carouselIndex].map((item, index) => (
              <ItemCarousel
                key={index}
                id={index}
                color={item.code}
                style={{
                  transform: `rotate(calc(360deg / 8 * ${index}))`,
                }}
              >
                {item.mood}
              </ItemCarousel>
            ))}
        </Carousel>
      )}
    </CarouselContainer>
  );
};

export default CircleCarousel;

// {palette.carousel &&
//   palette.carousel[{ index }].map((item, index) => (
//     <ItemCarousel
//       key={item.id}
//       id={item.id}
//       color={item.color}
//       style={{ transform: `rotate(calc(360deg / 8 * ${item.id}))` }}
//     >
//       {item.name}
//     </ItemCarousel>
//   ))}
