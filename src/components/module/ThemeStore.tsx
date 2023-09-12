import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { StoreModal } from './Modal';
import CircleCarousel from './CircleCarousel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { selectPalettes } from '../../redux/slice';

const TitleContainer = styled.div`
  margin: 5px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Point = styled.div`
  height: 50px;
  margin-top: 20px;
  font-size: 17px;
  font-weight: 500;
  color: transparent;
`;

const PaletteName = styled.div`
  margin: 10px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 3px;
`;

const BtnContainer = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 45px;
  padding-right: 45px;
  .arrow {
    color: gray;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
`;

const CarouselBtnContainer = styled.div`
  padding-top: 50px;
  padding-left: 40px;
`;

interface Props {
  paletteRefresher: () => void;
}

export const ThemeStore = ({ paletteRefresher }: Props) => {
  // const dispatch = useDispatch();
  // const palettes = useSelector(selectPalettes);

  const [myPalette, setMyPalette] = useState(0);
  const [carouselIndex, setIndex] = useState(0);

  const [paletteEntry, SetPaletteEntry] = useState(0);
  const [refresher, setRefresher] = useState(false);
  const lastIndex = 5;
  const paletteName = [
    '기본',
    '테라코타',
    '빈티지',
    '크리스마스',
    '모노',
    '비비드',
  ];
  const palettePoint = ['', '', '', '', '', ''];

  const handleSet = (paletteEntry: number) => {
    toast('팔레트 적용이 완료되었습니다');
    chrome.storage.local.set({ paletteCode: paletteEntry });
    setRefresher(!refresher);
    paletteRefresher();
  };

  const toRight = () => {
    if (carouselIndex < lastIndex) {
      setIndex(carouselIndex + 1);
    } else {
      setIndex(0);
    }
  };

  const toLeft = () => {
    if (carouselIndex > 0) {
      setIndex(carouselIndex - 1);
    } else {
      setIndex(lastIndex);
    }
  };

  useEffect(() => {
    chrome.storage.local.get(['paletteCode']).then(res => {
      if (res.paletteCode !== undefined) {
        setMyPalette(res.paletteCode);
      } else {
        setMyPalette(0);
      }
    });
  }, [refresher]);

  useEffect(() => {
    SetPaletteEntry(carouselIndex);
  }, [carouselIndex]);

  return (
    <StoreModal>
      <TitleContainer>
        <Point>{palettePoint[carouselIndex]}</Point>
        <PaletteName>{paletteName[carouselIndex]}</PaletteName>
        <BtnContainer>
          <Button
            size="long"
            fontSize="middle"
            onClick={() => handleSet(paletteEntry)}
            disabled={myPalette === carouselIndex}
          >
            적용
          </Button>
        </BtnContainer>
      </TitleContainer>
      <ArrowContainer>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2x"
          onClick={() => toLeft()}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          onClick={() => toRight()}
          style={{ cursor: 'pointer' }}
        />
      </ArrowContainer>
      <CarouselContainer>
        <CircleCarousel carouselIndex={carouselIndex} />
      </CarouselContainer>
    </StoreModal>
  );
};

export default ThemeStore;
