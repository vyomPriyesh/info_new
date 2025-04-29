// import { Modal } from 'flowbite-react'
// import React, { useEffect, useState } from 'react'
// import Postdata from './Postdata'
// import { RxCross2 } from 'react-icons/rx';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { AnimatePresence, motion, wrap } from 'framer-motion';

// const Modalopen = ({ open, set, data }) => {

//     useEffect(() => {
//         if (!open) return;

//         const handleBackButton = (e) => {
//             e.preventDefault();
//             set(false);
//         };

//         window.history.pushState(null, '', window.location.pathname);
//         window.addEventListener('popstate', handleBackButton);

//     }, [open, set]);

//     const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;


//     const variants = {
//         enter: (direction) => {
//             return {
//                 y: direction > 0 ? 1000 : -1000,
//                 opacity: 0,
//             };
//         },
//         center: {
//             zIndex: 1,
//             y: 0,
//             opacity: 1,
//         },
//         exit: (direction) => {
//             return {
//                 zIndex: 0,
//                 y: direction < 0 ? 1000 : -1000,
//                 opacity: 0,
//             };
//         },
//     };

//     const swipeConfidenceThreshold = 10000;
//     const swipePower = (offset, velocity) => {
//         return Math.abs(offset) * velocity;
//     };

//     const [[page, direction], setPage] = useState([0, 0]);
//     const imageIndex = wrap(0, data?.blog_image.length, page);

//     const paginate = (newDirection) => {
//         setPage([page + newDirection, newDirection]);
//     };


//     return (
//         <>
//             <Modal className='bgg flex justify-center place-items-center text-white relative'>
//                 <button onClick={() => set(false)} className='absolute right-5 z-50 bg-white rounded-full h-7 w-7 top-5 aspect-square flex justify-center place-items-center text-black'><RxCross2 /></button>
//                 <Modal.Body className='p-2 bgg text-white relative h-screen overflow-y-auto'>
//                     <div className="space-y-6 h-2/3 flex justify-center place-items-center p-5">
//                         <Swiper
//                             direction={'vertical'}
//                             className="mySwiper h-64"
//                         >
//                             {data?.
//                                 blog_image.map((l, i) => (
//                                     <SwiperSlide className=' flex justify-end'>
//                                         <div className="h-full flex justify-center place-items-center">
//                                             <img loading="lazy" key={i} src={`${imgUrl}${l?.details}`} alt="" />
//                                         </div>
//                                     </SwiperSlide>
//                                 ))}
//                         </Swiper>
//                     </div>
//                     {data?.profile &&
//                         <div className="h-1/3">
//                             <div className="bg_2 p-2">
//                                 <Postdata title={data?.title} moreData={data?.description} profile={data?.profile} />
//                             </div>
//                         </div>
//                     }
//                 </Modal.Body>
//             </Modal>
//             {/* {open && */}
//             <AnimatePresence initial={false}>
//                 {open ? (
//                     <motion.div className='fixed inset-0 h-screen z-50 flex justify-center place-items-center w-screen'
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0 }}
//                         key="box"
//                     >
//                             <button onClick={() => set(false)} className='absolute right-5 z-50 bg-white rounded-full h-7 w-7 top-5 aspect-square flex justify-center place-items-center text-black'><RxCross2 /></button>
//                             <AnimatePresence initial={false} custom={direction}>
//                                 <motion.img
//                                     key={page}
//                                     src={`${imgUrl}${data?.blog_image[imageIndex].details}`}
//                                     custom={direction}
//                                     variants={variants}
//                                     // exit="exit"
//                                     transition={{
//                                         y: { type: "spring", stiffness: 300, damping: 30 },
//                                         opacity: { duration: 0.2 },
//                                     }}
//                                     drag="y"
//                                     dragConstraints={{ top: 0, bottom: 0 }}
//                                     dragElastic={1}
//                                     onDragEnd={(e, { offset, velocity }) => {
//                                         const swipe = swipePower(offset.y, velocity.y);

//                                         if (swipe < -swipeConfidenceThreshold) {
//                                             paginate(1);
//                                         } else if (swipe > swipeConfidenceThreshold) {
//                                             paginate(-1);
//                                         }
//                                     }}
//                                 />
//                             </AnimatePresence>
//                     </motion.div>
//                 ) : null}
//             </AnimatePresence>
//             {/* } */}
//         </>
//     )
// }

// export default Modalopen

import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { RxCross2 } from 'react-icons/rx';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import Postdata from './Postdata';

const Modalopen = ({ open, set, data }) => {


    useEffect(() => {
        if (!open) return;

        const handleBackButton = (e) => {
            e.preventDefault();
            set(false);
        };

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [open, set]);

    const imgUrl = import.meta.env.VITE_IMAGE_BASEURL;

    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            y: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, data?.blog_image.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    useEffect(() => {
        if (!open || !data?.blog_image?.length) return;

        const interval = setInterval(() => {
            paginate(1); // Go to next image
        }, 3000);

        return () => clearInterval(interval); // Clean up on unmount or modal close
    }, [open, data?.blog_image?.length, page]);

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 h-screen w-screen z-50 flex justify-center items-center bgg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={() => set(false)}
                            className="absolute right-5 top-5 z-50 bg-white rounded-full h-7 w-7 flex justify-center items-center text-black"
                        >
                            <RxCross2 />
                        </button>

                        <div className="w-full max-w-2xl relative h-screen flex flex-col items-center">
                            {/* <div className="relative h-full w-full overflow-hidden"> */}
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={page}
                                    src={`${imgUrl}${data?.blog_image[imageIndex].details}`}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        y: { type: "spring", stiffness: 200, damping: 25 },
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 }
                                    }}
                                    drag="y"
                                    dragConstraints={{ top: 0, bottom: 0 }}
                                    dragElastic={0.8}
                                    className="absolute w-full h-full object-contain"
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.y, velocity.y);
                                        if (swipe < -swipeConfidenceThreshold) {
                                            paginate(1);
                                        } else if (swipe > swipeConfidenceThreshold) {
                                            paginate(-1);
                                        }
                                    }}
                                />
                            </AnimatePresence>
                            {/* </div> */}

                            {data?.profile && (
                                <div className="absolute bottom-20 left-0 w-full px-4 z-50">
                                    <div className="bg_2 bg-opacity-80 backdrop-blur-md text-white max-h-[50vh] p-4 overflow-y-auto rounded-lg">
                                        <Postdata
                                            title={data?.title}
                                            moreData={data?.description}
                                            profile={data?.profile}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Modalopen;
