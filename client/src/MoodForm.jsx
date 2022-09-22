import { Link } from "react-router-dom"
import { useState } from 'react'
import Axios from 'axios'

export default function MoodForm(props) {
    const [mood, setMood] = useState("")
    const [rating, setRating] = useState("")
    const [newId, setNewId] = useState("")


    const now= new Date().toString()

    
    const submitForm = (e) => {
        // e.preventDefault()

        // Axios.get("/api/getid")
        // .then((response) => {
        //     setNewId(response.data[0].id)
        //     console.log(newId)
        // })

        Axios.post("/api/create", {
            mood:mood,
            rating:rating
        })
        props.setMoods(prevMoods => {
            return [...prevMoods, { id: newId+1, now:now, mood: mood, rating: rating, created: now }]
          })
          //self.crypto.randomUUID()
    }




    return (
        <form>
            <label htmlFor="notes">Notes</label>
            <input name="notes" type="text"
                onChange={(event) => {
                    setMood(event.target.value)
                }}
            ></input>

            <label htmlFor="rates">Ratings</label>
            <input name="rates" type="number"
                onChange={(event) => {
                    setRating(event.target.value)
                }}
            ></input>
            <Link to="/">
                <button onClick={submitForm}>Submit</button>
            </Link>
        </form>
    )
}