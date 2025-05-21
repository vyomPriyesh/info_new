import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { FaBell, FaFacebookF } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { HiMailOpen } from "react-icons/hi";
import { apiFunctions } from '../apis/apiFunctions';
import API from '../apis/Apis';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdEmail } from "react-icons/md";

const Subscribe = () => {
    const { apiPost } = apiFunctions();

    const [open, setOpen] = useState(false);
    const [allOpen, setAllopen] = useState(false)
    const [msg, setMsg] = useState(false)
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const closeRef = useRef(null);

    const handleSubscribe = async () => {


        const payload = { email, mobile: number };

        try {
            const response = await apiPost(API.subscribe, payload);
            if (response.status) {
                setEmail('');
                setNumber('');
                setMsg(true)
                setTimeout(() => {
                    setOpen(false);
                    setMsg(false)
                }, 4000);
            }
        } catch (error) {
            console.error('Subscription error:', error);
        }
    };

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (closeRef.current && !closeRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        // Use 'mousedown' instead of 'click'
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <>
            <div
                className={`fixed overflow-hidden bottom-0 right-1 me-5 mb-5 z-[51] h-12 ${allOpen ? 'max-w-full w-44 bg-white' : 'w-12  bg-red-600'} flex flex-row gap-5 justify-center items-center rounded-full text-xl  shadow-lg transition-all duration-300 ease-in-out`}
                aria-label="Open Subscribe Modal"
            >
                {allOpen &&
                    <>
                        <button className='bg-blue-500 text-white rounded-full h-10 w-10 flex justify-center place-items-center'>
                            <FaFacebookF />
                        </button>
                        <button onClick={()=>setOpen(true)} className='bg-red-500 text-white rounded-full h-10 w-10 flex justify-center place-items-center'>
                            <FaBell />
                        </button>
                    </>
                }
                <button onClick={() => setAllopen(!allOpen)} className='shadow-2xl rounded-full h-10 w-10 flex justify-center place-items-center'>
                    {allOpen ?
                        <RxCross2 />
                        :
                        <FaBell className='text-white' />
                    }
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-[51] flex justify-center items-center bg-black/70 p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            ref={closeRef}
                            className="relative w-full max-w-2xl bg-white px-10 py-6 flex flex-col items-center gap-5 rounded-lg"
                        >
                            {msg ?
                                <div className="w-full flex flex-col gap-3 justify-center place-items-center">
                                    <h1 className='text-green-500 text-8xl'><IoIosCheckmarkCircle /></h1>
                                    <p className='text-center text-base font-medium'>Thank you for Subscribe in Info Gujarat channel and portal</p>
                                </div>
                                :
                                <>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-3 left-3 h-7 w-7 text-2xl flex justify-center items-center text-black bg-white rounded-full"
                                        aria-label="Close"
                                    >
                                        <RxCross2 />
                                    </button>

                                    <h1 className="text-blue-500 text-6xl"><HiMailOpen /></h1>
                                    <h2 className="text-xl font-semibold uppercase">Subscribe</h2>
                                    <p className="text-center text-base text-neutral-500">
                                        Subscribe to our newsletter to receive the latest updates.
                                    </p>

                                    <input
                                        type="number"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black"
                                        placeholder="Enter your WhatsApp number"
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-black"
                                        placeholder="Enter your email"
                                    />

                                    <button
                                        onClick={handleSubscribe}
                                        className="px-3 py-2 bg-blue-500 text-white uppercase font-semibold rounded hover:bg-blue-600"
                                    >
                                        Subscribe
                                    </button>
                                </>
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Subscribe;
