import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HistoryData.css'
import { grey } from '@mui/material/colors';

type Range = {
    start: number;
    end: number;
    tema: string;
};
export type DataType = {
    id: number;
    date: number;
    text: string;
}

const dateObj: Record<string, Range> = {
    '0': {
        start: 2015,
        end: 2024,
        tema: 'История',
    },
    '1': {
        start: 2010,
        end: 2015,
        tema: 'Литература',
    },
    '2': {
        start: 2000,
        end: 2024,
        tema: 'Космонафтика',
    },
    '3': {
        start: 2005,
        end: 2015,
        tema: 'Кино',
    },
    '4': {
        start: 2003,
        end: 2012,
        tema: 'Музыка',
    },
    '5': {
        start: 2012,
        end: 2020,
        tema: 'Математика',
    },
}

type PropsButton = {
    active?: boolean;
}

const StyledButton = styled.button<PropsButton>`
   border: 1px solid #DDDEE0FF;
   background: white;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   cursor: pointer;
`;

interface HistoryDataProps {
    data: DataType[];
    points: 2 | 3 | 4 | 5 | 6;
}

const HistoryData: React.FC<HistoryDataProps> = ({ data, points }: HistoryDataProps) => {
    const radius = 265;
    const circleRef = useRef<HTMLDivElement>(null);
    const [activeBlock, setActiveBlock] = useState<number>(points - 1);
    const [isHovered, setIsHovered] = useState<number>(points - 1);
    const [rotation, setRotattion] = useState<number>(0);
    // const [activeSwiper, setActiveSwiper] = useState<any>()
    const swiperRef = useRef<any>(null);
    const mobilePagination = new Array(points).fill(0);

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    // Функция для перехода назад
    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    // Функция для генерации координат точек
    const getPointPosition = (index: number) => {
        const angle = (index / points) * 2 * Math.PI;
        return {
            x: Math.cos(angle) * radius + radius - 1,
            y: Math.sin(angle) * radius + radius - 1,
        };
    };

    // Обработчик клика по точке
    const handlePointClick = (index: number) => {
        setActiveBlock(index)
        const angle = (index / points) * 360;
        const rotation = 180 - (angle - 120);
        setRotattion(rotation);

        gsap.to(circleRef.current!, {
            rotation,
            duration: 2,
            ease: 'power2.inOut',
        });
    };

    // const handleSlideChange = (swiper: any) => {
    //     setActiveSwiper(swiper);
    // };

    return (
        <div style={{ position: 'relative', width: '1440px', height: '100%', paddingTop: '100px' }}>
            <div style={{ position: 'absolute', left: -1, top: '50px', display: 'flex', gap: '95px' }}>
                <div style={{
                    width: '5px',
                    background: 'linear-gradient(to bottom, #3877EE, #EF5DA8)',
                }} className='line-gradient'></div>
                <span className='history-data-span'>
                    Исторические даты</span>
            </div>
            <div
                ref={circleRef}
                className='circle'
                style={{
                    position: 'relative',
                    width: '530px',
                    height: '530px',
                    border: '1px solid #DDDEE0FF',
                    borderRadius: '50%',
                    margin: '0 auto',
                    zIndex: 1000
                }}
            >
                {Array.from({ length: points }, (_, index) => {
                    const { x, y } = getPointPosition(index);
                    return (
                        <div
                            key={index}
                            onClick={() => handlePointClick(index)}
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(6)}
                            style={{
                                position: 'absolute',
                                left: index === activeBlock || isHovered === index ? `${x - 10}px` : `${x}px`,
                                top: index === activeBlock || isHovered === index ? `${y - 10}px` : `${y}px`,
                                width: index === activeBlock || isHovered === index ? '20px' : '6px',
                                height: index === activeBlock || isHovered === index ? '20px' : '6px',
                                borderRadius: '50%',
                                backgroundColor: index === activeBlock || isHovered === index ? 'white' : '#42567a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: index === activeBlock || isHovered === index ? 'black' : 'white',
                                cursor: 'pointer',
                                fontSize: '12px',
                                border: `1px solid ${index === activeBlock || isHovered === index ? '#DDDEE0FF' : 'none'}`,
                            }}
                        >
                            {(index === activeBlock || isHovered === index) &&
                                <span style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    transform: `rotate(${-rotation}deg)`, transition: 'transform 2s ease'
                                }}>
                                    {index + 1}
                                  
                                </span>}
                        </div>

                    );
                })}
                               
            </div>

           <span className='active-tema'>{dateObj[activeBlock].tema}</span>

            <div className='years-block'>
                <span className='year-span' style={{ color: '#3877EE' }}>{dateObj[activeBlock.toString()].start}</span>
                <span className='year-span' style={{ color: '#EF5DA8' }}>{dateObj[activeBlock.toString()].end}</span>
            </div>

            <div className='gorisontal-vector' />
            <div className='vectors vertical-vector' />

            <div style={{ position: 'relative' }}>
                <Swiper
                    spaceBetween={100}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    // onSlideChange={handleSlideChange}
                    // onInit={handleSlideChange}
                    // onTransitionEnd={handleSlideChange}
                    // onTransitionStart={handleSlideChange}
                    className='swiper-block'
                    ref={swiperRef}
                >
                    {data
                        .filter((s) => s.date >= dateObj[activeBlock.toString()].start && s.date <= dateObj[activeBlock.toString()].end)
                        .sort((a, b) => a.date - b.date)
                        .map((el) =>
                            <SwiperSlide key={el.id} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                                <span className='card-date'>{el.date}</span>
                                <p className='card-text'>{el.text}</p>
                            </SwiperSlide>
                        )}

                </Swiper>

                <button className="swiper-button-prev" onClick={handlePrev} />
                <button className="swiper-button-next" onClick={handleNext} />

            </div>
            <div className='block-active-years-buttons'>
                <span>{`0${activeBlock + 1}/0${points}`}</span>
                <div className='bottom-buttons-block'>
                    <StyledButton className='active-year-button' onClick={() => activeBlock !== 0 && handlePointClick(activeBlock - 1)} style={{
                        color: activeBlock === 0 ? '#DDDEE0FF' : 'black',
                    }}>{'<'}</StyledButton>
                    <StyledButton className='active-year-button' onClick={() => activeBlock !== points - 1 && handlePointClick(activeBlock + 1)} style={{
                        color: activeBlock === points - 1 ? '#DDDEE0FF' : '#42567A'
                    }}>{'>'}</StyledButton>
                </div>
            </div>
            <div className='mobile-pagination'>
                {mobilePagination.map((_, index) =>
                    <span key={index} className='mobile-span' style={{ background: index === activeBlock ? '#42567A' : '#DDDEE0FF'}}/>)}
            </div>
        </div >
    );
};

export default HistoryData;