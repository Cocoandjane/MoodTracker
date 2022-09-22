import { Link } from "react-router-dom"
import { useState } from 'react'
import Axios from "axios"
export default function Mood({ id, mood, created, rating, onRemove }) {

    let stars = ""
    for (let i = 0; i < 10; i++) {
        if (i < rating) {
            stars += "⭐"
        } else {
            stars += "☆"
        }

    }

    function handleRemove() {
        onRemove(id)
    }


    function handleSubmitEdited(e) {
        Axios.post("/api/edit/" + id, { mood, rating, newMood, newRating, created})
        props.setMoods(prevMoods => {
            return [...prevMoods, { id, created, mood: newMood?newMood:mood, rating: newRating?newRating:rating, }]
          })
        setEditing(false)
    }

    const [isEditing, setEditing] = useState(false);
    const [newMood, setNewMood] = useState('');
    const [newRating, setnewRating] = useState();

    const editingTemplate = (
        <form>
            <label htmlFor="notes">Notes</label>
            <input defaultValue={mood} name="notes" type="text"
                onChange={(e) => setNewMood(e.target.value)}
            ></input>
            <label htmlFor="rates">Ratings</label>
            <input defaultValue={rating} name="rates" type="text"
                onChange={(e) => setnewRating(e.target.value)}
            ></input>
            <button  onClick={handleSubmitEdited}>Submit</button>

        </form>
    )

    const viewTemplate = (
        <div>
            <p>{created}</p>
            <p>{mood}</p>
            <p>{stars}</p>
            <button onClick={handleRemove}>Remove</button>
            <button type="button" className="btn" onClick={() => setEditing(true)}>
                Edit: {mood}
            </button>
        </div>
    )

    return (
        <div>{isEditing ? editingTemplate : viewTemplate}</div>
    )
}
