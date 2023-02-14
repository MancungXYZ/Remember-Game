import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import sound from "./assets/benar.mp3"
// import Swal from 'sweetalert2';

const cardImages = [
  { "src": "/img/ayam-1.png",matched: false},
  { "src": "/img/buaya-1.jpg",matched: false},
  { "src": "/img/burung-1.png",matched: false},
  { "src": "/img/panda-1.jpg",matched: false},
  { "src": "/img/sapi-1.png",matched: false},
  { "src": "/img/macan.jpg",matched: false},
  { "src": "/img/masbro-1.jpeg",matched: false},
  { "src": "/img/meong-1.png",matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [disable, setDisable] = useState(false)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //suara benar
  const benarSuara = () => {
    new Audio(sound).play()
  }

  //compare
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true)
      if (choiceOne.src === choiceTwo.src) {
        benarSuara()
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              console.log({...card, matched: true})
              return{...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log("Kartu tidak sama")
        setTimeout(() => resetTurn(), 1000)
      }
    }
    // if (cards.every(item => item.matched === true)) {
    //   Swal.fire({
    //     position: 'top-end',
    //     icon: 'success',
    //     title: 'Selamat anda berhasil',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }
  }, [choiceOne, choiceTwo])


  //reset pilihan
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisable(false)
  }

  //jalankan otomatis
  useEffect(() => {
    shuffleCards()
  }, [])
  return (
    <div className="App">
      <h1>Game Mengingat</h1>
      <button onClick={shuffleCards}>Permainan Baru</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disable={disable}/>
        ))}
      </div>

      <h3>Turns : {turns}</h3>
    </div>
  );
}

export default App;
