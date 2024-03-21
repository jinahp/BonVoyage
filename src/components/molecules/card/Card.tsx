import React, { useEffect, useState } from 'react';
import styles from './card.module.scss';
import Image from 'next/image';
import calendarIcon from '../../../../public/assets/icon/calendarIcon.svg';
import ChipTagWithoutX from '@/components/atoms/chipTag/ChipTagWithoutX';
import instance from '@/api/axios';

interface Card {
  id: number;
  title: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  assignee: {
    profileImageUrl: string;
  };
}

interface CardProps {
  onClick: () => void;
  columnId: number;
}

export default function Card({ onClick, columnId }: CardProps) {
  const [cards, setCards] = useState<Card[]>([]);

  async function getCards() {
    try {
      const res = await instance.get<{ cards: Card[] }>(
        `/cards?size=10&columnId=${columnId}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        },
      );
      const nextCards = res.data.cards;
      setCards(nextCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  useEffect(() => {
    if (columnId !== undefined) {
      // columnId가 undefined가 아닐 때에만 호출
      getCards();
    }
  }, [columnId]);

  return (
    <div>
      {cards?.map((card) => (
        <div key={card.id} className={styles['card']} onClick={onClick}>
          {card.imageUrl && (
            <Image
              className={styles['cardImage']}
              src={card.imageUrl}
              alt="Card Image"
              width={300}
              height={200}
            />
          )}
          <div className={styles['infoArea']}>
            <span className={styles['cardTitle']}>{card.title}</span>
            <div className={styles['tagDateArea']}>
              <div className={styles['tagArea']}>
                <ChipTagWithoutX tag={card.tags.join(', ')} color="pink" />
              </div>

              <div className={styles['dateProfileArea']}>
                <div className={styles['dateArea']}>
                  <Image
                    className={styles['calendarIcon']}
                    src={calendarIcon}
                    alt="calendarIcon"
                  />
                  <span className={styles['date']}>{card.createdAt}</span>
                </div>
                <Image
                  className={styles['userProfile']}
                  src={card.assignee?.profileImageUrl}
                  alt="userProfile"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
