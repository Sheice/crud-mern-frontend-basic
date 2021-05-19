import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Notes() {

    // states

    const [notes, setNotes] = useState([]);


    // use effect
    useEffect( ()=> {
        getNotes();
    },[])

    // functions
    const getNotes = async() => {
        try{
            const res = await axios.get('http://localhost:4000/api/notes');
            setNotes(res.data);
        }catch(e){
            console.log(e)
        }
        
    }

    const deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        getNotes();
    }

    return (
        <div className="tasks">
            {
               notes.map(note => (
                   <div key={note._id}>
                       <div className="tasks-card">
                           <div>
                               <h2>{note.title}</h2>
                           </div>
                           <div>
                                <p className='tasks-card-description'>{note.description} </p>  
                           </div>
                           <div>
                                <p className='tasks-card-author'>{note.author} </p>  
                           </div>
                           <div className='tasks-buttons'>
                               <button onClick={()=>{deleteNote(note._id)}}>Borrar</button>
                               <Link to={"/edit/" + note._id}>Editar</Link>
                           </div>
                       </div>
                   </div>
                )) 
            }
        </div>
    )
}

export default Notes
