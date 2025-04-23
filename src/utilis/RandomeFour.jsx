import React from 'react'

const RandomeFour = ({ data, changeVideo }) => {
    return (
        <div className='grid grid-cols-2 gap-1' >
            {data.map((list, i) => (
                <div className="relative" key={i} onClick={() => changeVideo(list)}>
                    <img loading="lazy" className="w-full h-full z-10" onClick={() => changeVideo(list)} src={`https://img.youtube.com/vi/${list?.blog_image[0]?.details}/mqdefault.jpg`} alt="" />
                    <h1 className='absolute bottom-0 line-clamp-2 bg-black/50 px-2 text-white text-sm font-bold'>{list.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default RandomeFour
