import { useState, useEffect } from 'react'
import './App.css'
import Moods from './Moods'
import MoodForm from './MoodForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from 'axios';


function App() {
  const [moods, setMoods] = useState([])

  useEffect(() => {
    Axios.get("/api/moods")
      .then((response) => {
        setMoods(response.data)
      })
  }, [])

  function onRemove(id) {
    console.log(id)
    Axios.post("/api/delete/" + id)
    console.log("cliked")
    setMoods(moods.filter(mood => mood.id !== id))
  }

  const sortbyDate = () => {
    const sortedMoods = [...moods].sort((a, b) => {
      return new Date(b.created) - new Date(a.created)
    })
    setMoods(sortedMoods)
  }

  const sortbyRating = () => {
    const sortedMoods = [...moods].sort((a, b) => {
      return b.rating - a.rating
    })
    setMoods(sortedMoods)
  }


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Moods setMoods={setMoods} sortbyRating={sortbyRating} sortbyDate={sortbyDate} onRemove={onRemove} moods={moods} />}></Route>
          <Route path='/MoodForm' element={<MoodForm setMoods={setMoods} />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
