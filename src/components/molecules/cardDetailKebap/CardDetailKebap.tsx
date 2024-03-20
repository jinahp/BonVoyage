import KebapMenu from '@/components/atoms/kebapMenu/KebapMenu';
import { useState } from 'react';
import styles from './cardDetailKebap.module.scss';

interface ModalProps {
  getCards: () => void;
  cardId: number;
}

const CardDetailKebap = ({ cardId, getCards }: ModalProps) => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };
  return (
    <div
      className="kebap"
      onClick={(e) => {
        e.stopPropagation();
        handleView();
        // console.log(link);
      }}
    >
      <img
        className={styles['kebabIcon']}
        src="/assets/icon/kebabMenuIcon.svg"
      />
      {/* <img
        className="kebabIcon"
        src={process.env.PUBLIC_URL + `/assets/kebab.png`}
        alt="케밥 버튼"
      /> */}
      {view && <KebapMenu cardId={cardId} getCards={getCards}></KebapMenu>}
    </div>
  );
};

export default CardDetailKebap;
