import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { HiMailOpen } from "react-icons/hi";
import { apiFunctions } from '../apis/apiFunctions';
import API from '../apis/Apis';

const Subscribe = () => {

    const { apiPost } = apiFunctions();

    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState(null)

    const handleSubscribe = async () => {

        const payload = {
            email: email
        }

        const response = await apiPost(API.subscribe, payload);

        if (response.status) {
            setEmail(null)
            setOpen(false)
        }
    }

    return (
        <>
            {/* <div className=" flex justify-end items-end h-full bg-green-500"> */}
                <button
                    onClick={() => setOpen(!open)}
                    className="me-5 mb-5 transition-all duration-300 z-[51] fixed bottom-0 right-1 ease-in-out bg-red-600 hover:bg-red-700 h-12 w-12 flex justify-center items-center rounded-full text-xl text-white shadow-lg"
                >
                    <FaBell />
                </button>
            {/* </div> */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 p-10 h-screen w-full z-[51] flex justify-center items-center bg-black/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute left-5 top-10 z-50 bg-white rounded-full h-7 w-7 flex justify-center items-center text-black"
                        >
                            <RxCross2 />
                        </button>


                        <div className="w-full max-w-2xl flex justify-center place-items-center flex-col gap-5 bg-white px-10 py-6">
                            <h1 className='text-blue-500 text-6xl'><HiMailOpen /></h1>
                            <h1 className='text-xl font-semibold uppercase'>subscribe</h1>
                            <p className='text-center text-base text-neutral-500'>subscribe our newsletter to receive the latest updates.</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='border border-gray-400 focus:outline-none focus:border-black rounded-lg w-full px-2 py-2' placeholder='Enter Your Email' />
                            <button onClick={handleSubscribe} className='bg-blue-500 px-3 py-2 text-white uppercase font-semibold'>subscribe</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Subscribe;
