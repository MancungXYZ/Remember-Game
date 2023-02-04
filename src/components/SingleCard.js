import React from 'react'
import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disable}) {

    const handleClick = () => {
        if (!disable) {
            handleChoice(card)
        }
    }


  return (
    <div className='card'>
            <div className={flipped ? "flipped" : ""}>
              <img className='front'src={card.src} alt="card fromt" />
              <img className='back'src="/img/cover.jpg" onClick={handleClick} alt="card fromt" />
            </div>
    </div>
  )
}
