import React from 'react'

const Multipost = ({ list }) => {
    return (
        <>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 mt-2">
                {list.map((item, i) => (
                    <div className="relative" key={i}>
                        <img loading="lazy" className="w-full h-full object-cover cursor-pointer"
                            src={item.img} alt="" />
                        <h1
                            className="black absolute bottom-0 mb-0 line-clamp-2  font-semibold text-white px-2 pt-1 md:pb-1 md:text-base text-xs">
                            {item.title}
                        </h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Multipost