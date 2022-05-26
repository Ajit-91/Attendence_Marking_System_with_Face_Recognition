import React from 'react'
import "../../assets/styles/imgCard.css"

const ImgCard = ({ url, children }) => {
    return (
        <div className='imgCard'>
            {children}
            <img 
                src={url} 
                alt="category" 
            />
        </div>
    )
}

export default ImgCard