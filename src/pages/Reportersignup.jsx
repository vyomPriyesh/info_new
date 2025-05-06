import React, { useState } from 'react'
import Labelinput from '../utilis/Labelinput'
import axios from 'axios'
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { address } from 'framer-motion/client';
import { useMyContext } from '../context/Allcontext';
import loader from '../assets/loader.gif'
import Loader from '../utilis/Loader';


const Reportersignup = () => {

    const apiUrl = import.meta.env.VITE_APP_BASEURL;

    const { loading, setLoading } = useMyContext();

    const [pass, setPass] = useState(false)
    const [cPass, setCpass] = useState(false)
    // const emailID = localStorage.getItem("email")
    const [emailID, setEmailid] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        whatsApp: '',
        city: '',
        address: '',
        password: '',
        c_password: '',
        file: '',
    })

    const [images, setImages] = useState({
        image: '',
        file: '',
    })
    const [errors, setErrors] = useState({});


    const step1Schema = Yup.object().shape({
        data: Yup.object().shape({
            name: Yup
                .string()
                .required("Name is required"),
            email: Yup
                .string()
                .email("Invalid email format")
                .required("Email is required"),
            mobile: Yup.string()
                .required("Phone No is required")
                .matches(/^[0-9]{10}$/, "Phone No must be exactly 10 digits"),

            whatsApp: Yup.string()
                .required("WhatsApp No is required")
                .matches(/^[0-9]{10}$/, "WhatsApp No must be exactly 10 digits"),
            city: Yup
                .string()
                .required("City is required"),
            address: Yup
                .string()
                .required("Address is required"),
            password: Yup
                .string()
                .min(8, "Password must be at least 8 characters")
                // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                // .matches(/[0-9]/, "Password must contain at least one number")
                // .matches(/[@$!%*?&]/, "Password must contain at least one special character")
                .required("Password is required"),
            c_password: Yup
                .string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required("Confirm password is required"),
            file: Yup
                .string()
                .required("Profile Image is required"),
        }),
    });

    const handleSubmit = async () => {

        const formData = new FormData;

        formData.append(`name`, data?.name);
        formData.append(`email`, data?.email);
        formData.append(`mobile`, data?.mobile);
        formData.append(`whatsApp`, data?.whatsApp);
        formData.append(`city`, data?.city);
        formData.append(`address`, data?.address);
        formData.append(`image`, data?.file);
        formData.append(`password`, data?.password);

        const vali_Data = {
            name: data?.name ?? '',
            email: data?.email ?? '',
            mobile: data?.mobile ?? '',
            whatsApp: data?.whatsApp ?? '',
            city: data?.city ?? '',
            address: data?.address ?? '',
            file: data?.file ?? '',
            password: data?.password ?? '',
            c_password: data?.c_password ?? '',
        }
        setLoading(true)
        try {
            await step1Schema.validate({ data: vali_Data }, { abortEarly: false });
            const response = await axios.post(`${apiUrl}register/1`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.data.status) {
                // localStorage.setItem("email", data?.email)
                setEmailid(true)
            }

        } catch (err) {
            if (err.status == 422) {
                console.log(err)
                setErrors({
                    email: err.response.data.message
                })
            } else {
                const newErrors = {};
                if (err.inner) {
                    err.inner.forEach((error) => {
                        newErrors[error.path?.split(".")[1]] = error.message;
                    });
                }
                setErrors(newErrors);
            }
        }
        setLoading(false)
    }

    return (
        <>
            {/* {loading && <Loader />} */}
            {loading ?
                <div className="h-[40vh]  z-50 w-full flex justify-center place-items-center ">
                    <img src={loader} alt="" className='h-20 w-20' />
                </div>
                :
                <div className="px-5 pb-10 container mx-auto flex justify-center place-items-center">
                    <div className="p-3 mt-12 shadow-[0_0px_10px_0px_gray] rounded-lg flex flex-col gap-3 place-items-center w-full">
                        {emailID ?
                            <div className="w-full flex flex-col gap-3 justify-center place-items-center">
                                <h1 className='text-green-500 text-8xl'><IoIosCheckmarkCircle /></h1>
                                <p className='text-center text-base font-medium'>Thank you for registering in Info Gujarat channel and portal</p>
                                <p className='text-sm text-center text-neutral-500'>Now you will receive a mail on your registered mail ID in which you can open the link of the given admin panel and publish your information</p>
                            </div>
                            :
                            <>

                                <div className="flex flex-row place-items-center gap-5">
                                    <h1 className='text-center text-xl font-semibold border-b w-fit inline-block pb-1 border-black'>Reporter Sign Up</h1>
                                    <a href='https://infogujarat.in/admin/login' target='_blank' className='text-center text-xl font-semibold pb-1'>Login</a>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <Labelinput label='Name' type='text' error={errors?.name} value={data?.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder='Enter Name' />
                                    <Labelinput label='Email' type='email' error={errors?.email} value={data?.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder='Enter E-mail' />
                                    <Labelinput label='Profile Image' type='file' error={errors?.file} onChange={(e) => setData({ ...data, file: e.target.files[0] })} />
                                    <Labelinput label='Mobile Number' type='number' error={errors?.mobile} value={data?.mobile} onChange={(e) => setData({ ...data, mobile: e.target.value })} placeholder='Enter Mobile Number' />
                                    <Labelinput label='Whatsapp Number' type='number' error={errors?.whatsApp} value={data?.whatsApp} onChange={(e) => setData({ ...data, whatsApp: e.target.value })} placeholder='Enter Whatsapp Number' />
                                    <Labelinput label='Location' type='text' error={errors?.city} value={data?.city} onChange={(e) => setData({ ...data, city: e.target.value })} placeholder='Enter Your Location' />
                                    <Labelinput label='Address' type='text' error={errors?.address} value={data?.address} onChange={(e) => setData({ ...data, address: e.target.value })} placeholder='Enter Your Address' />
                                    <Labelinput pass={true} label='Password' type='password' error={errors?.password} view={pass} setView={setPass} value={data?.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder='Enter Password' />
                                    <Labelinput pass={true} label='Confirm Password' error={errors?.c_password} view={cPass} setView={setCpass} value={data?.c_password} onChange={(e) => setData({ ...data, c_password: e.target.value })} placeholder='Enter Confirm Password' />
                                    <div className="flex justify-center place-items-center mt-5">
                                        <button className='bg-blue-500 text-white px-4 w-full py-2 rounded-lg font-semibold text-base' onClick={handleSubmit}>Sign Up</button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Reportersignup