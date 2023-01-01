import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodSelector from '../module/MoodSelector';
import GlobalModal from './GlobalModal';
import styled from 'styled-components';
import { selectModal } from '../../redux/modalSlice';

const Browser = styled.div`
  position: relative;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
  //mobile 767px 이하일때
  @media screen and (max-width: 767px) {
    max-width: 767px;
  }
  //tablet 768px 이상일때
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 1023px;
  }
`;
const Home = () => {
  const { modalType } = useSelector(selectModal);
  const [hidenCard, setHidenCard] = useState(false);
  const [lookbackRefresh, setLookbackRefresh] = useState(-1);
  const lookbackRefresher = () => {
    setLookbackRefresh(lookbackRefresh * -1);
  };

  const [paletteRefresh, setPaletteRefresh] = useState(-1);
  const paletteRefresher = () => {
    setPaletteRefresh(paletteRefresh * -1);
  };

  const [dataRefresh, setDataRefresh] = useState(-1);
  const dataRefresher = () => {
    setDataRefresh(dataRefresh * -1);
  };
  useEffect(() => {
    if (modalType === 'LookbackModal' || modalType === 'MonthlyModal') {
      setHidenCard(true);
    } else {
      setHidenCard(false);
    }
  }, [modalType]);

  return (
    <Browser>
      <Header dataRefresh={dataRefresh} setHidenCard={setHidenCard} />
      <ContentLayout>
        {hidenCard ? null : (
          <div>
            <MoodSelector
              lookbackRefresher={lookbackRefresher}
              dataRefresher={dataRefresher}
              paletteRefresh={paletteRefresh}
            />
          </div>
        )}
        <GlobalModal
          setHidenCard={setHidenCard}
          lookbackRefresh={lookbackRefresh}
          lookbackRefresher={lookbackRefresher}
          paletteRefresher={paletteRefresher}
        />
      </ContentLayout>
    </Browser>
  );
};

export default Home;
