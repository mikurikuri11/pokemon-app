import React from 'react'
import './Card.css'

const Card = ({ pokemon }) => {
  return (
    <div className='card'>
      <div className='card__img'>
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <h3 className='cardName'>{pokemon.name}</h3>
      <div className='cardTypes'></div>
        <div>タイプ</div>
        {pokemon.types.map((type) => (
          <div key={type.type.name}>
            <span className='typeName' key={type.type.name}>{type.type.name}</span>
          </div>
          ))}
      <div className='cardInfo'>
        <div className='cardData'>
          <p className='title'>重さ：{pokemon.weight}</p>
        </div>
        <div className='cardData'>
          <p className='title'>高さ：{pokemon.height}</p>
        </div>
        <div className='cardData'>
          <p className='title'>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>

  )
}

export default Card
