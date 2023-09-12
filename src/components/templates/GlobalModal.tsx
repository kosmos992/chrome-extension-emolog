import { useSelector } from 'react-redux';
import { selectModal } from '../../redux/modalSlice';
import ThemeStore from '../module/ThemeStore';
import MonthlyLookback from '../module/MonthlyLookback';
import LookBack from '../module/LookBack';

const MODAL_TYPES = {
  ThemeModal: 'ThemeModal',
  MonthlyModal: 'MonthlyModal',
  LookbackModal: 'LookbackModal',
};

interface Props {
  lookbackRefresh: boolean;
  paletteRefresher: () => void;
  setHiddenCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalModal = ({
  lookbackRefresh,
  paletteRefresher,
  setHiddenCard,
}: Props) => {
  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.ThemeModal,
      component: <ThemeStore paletteRefresher={paletteRefresher} />,
    },
    {
      type: MODAL_TYPES.MonthlyModal,
      component: <MonthlyLookback setHiddenCard={setHiddenCard} />,
    },
    {
      type: MODAL_TYPES.LookbackModal,
      component: (
        <LookBack
          lookbackRefresh={lookbackRefresh}
          setHiddenCard={setHiddenCard}
        />
      ),
    },
  ];
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };
  return <div style={{ display: 'flex', width: '100%' }}>{renderModal()}</div>;
};

export default GlobalModal;
