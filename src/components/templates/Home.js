import { useState } from 'react';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import MoodSelector from '../module/MoodSelector';
import GlobalModal from './GlobalModal';
import styled from 'styled-components';

const Browser = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
`;
const Home = () => {
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

  return (
    <Browser>
      <Header dataRefresh={dataRefresh} />
      <ContentLayout>
        <MoodSelector
          lookbackRefresher={lookbackRefresher}
          dataRefresher={dataRefresher}
          paletteRefresh={paletteRefresh}
        />
        <GlobalModal
          lookbackRefresh={lookbackRefresh}
          lookbackRefresher={lookbackRefresher}
          paletteRefresher={paletteRefresher}
        />
      </ContentLayout>
    </Browser>
  );
};

export default Home;
