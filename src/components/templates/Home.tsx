import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
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
  const { modalType } = useAppSelector(selectModal);
  const [hiddenCard, setHiddenCard] = useState(false);
  const [lookbackRefresh, setLookbackRefresh] = useState(false);
  const lookbackRefresher = () => {
    setLookbackRefresh(!lookbackRefresh);
  };

  const [paletteRefresh, setPaletteRefresh] = useState(false);
  const paletteRefresher = () => {
    setPaletteRefresh(!paletteRefresh);
  };

  const [dataRefresh, setDataRefresh] = useState(false);
  const dataRefresher = () => {
    setDataRefresh(!dataRefresh);
  };

  useEffect(() => {
    if (modalType === 'LookbackModal' || modalType === 'MonthlyModal') {
      setHiddenCard(true);
    } else {
      setHiddenCard(false);
    }
  }, [modalType]);

  return (
    <Browser>
      <Header dataRefresh={dataRefresh} setHiddenCard={setHiddenCard} />
      <ContentLayout>
        {hiddenCard ? null : (
          <div>
            <MoodSelector
              lookbackRefresher={lookbackRefresher}
              dataRefresher={dataRefresher}
              paletteRefresh={paletteRefresh}
            />
          </div>
        )}
        <GlobalModal
          setHiddenCard={setHiddenCard}
          lookbackRefresh={lookbackRefresh}
          paletteRefresher={paletteRefresher}
        />
      </ContentLayout>
    </Browser>
  );
};

export default Home;
