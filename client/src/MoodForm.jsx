import { Link } from "react-router-dom"
import { useState } from 'react'
import Axios from 'axios'

export default function MoodForm(props) {
    const [mood, setMood] = useState("")
    const [rating, setRating] = useState("")
    const [newId, setNewId] = useState("")


    const created = new Date().toString()


    const submitForm = (e) => {
        Axios.post("/api/create", {
            mood: mood,
            rating: rating
        }).then(res => {
            const id = res.data.id
            props.setMoods(prevMoods => {
                return [...prevMoods, { id, created, mood, rating }]
            })

        })
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