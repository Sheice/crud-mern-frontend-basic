import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateNote(props) {

    // states
    const [users, setUsers] = useState([]);

    const [changeInputs, setChangeInputs] = useState({
        title: '',
        userSelected : '',
        content: ''
    });

    const [edit, setEdit] = useState({_id: '', conditional: false});



    // useEffect

    useEffect(()=> {
        
        async function axiosUsers() {
            try{
               GetUsers();
            } catch(e){
                console.log(e);
            }
            
        } 
        axiosUsers();

        if(props.match.params.id){
            getNotes(props.match.params.id);
            setEdit({_id: props.match.params.id, conditional: true});
        }
        
    },[]);


    // functions

    const getNotes = async (id) => {
        try {
            const res = await axios.get('http://localhost:4000/api/notes/'+ id);
            setChangeInputs({title: res.data.title, userSelected: res.data.author, content: res.data.description});
        }catch(e){
            console.log(e);
        }
    }

    const GetUsers = async () => {
        try{
            const GetUsers = await  axios.get('http://localhost:4000/api/users');
            setUsers(GetUsers.data);
            setChangeInputs({...changeInputs, userSelected: GetUsers.data[0].username})
        } catch (e) {
            console.log(e);
        }
        
        
    }

    const handleForm = async (e) => {
        e.preventDefault();
        const newNote = {
            title: changeInputs.title,
            description: changeInputs.content,
            author: changeInputs.userSelected
        };
        if(edit.conditional){
            await axios.put('http://localhost:4000/api/notes/' + edit._id, newNote);
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';
    }

    const handleInputUsers= (e) => {
        setChangeInputs({...changeInputs, userSelected : e.target.value});
    }

    const handleChangeInputs = (e) => {
        setChangeInputs({...changeInputs, [e.target.name] : e.target.value});
        
    }

   

    // app

    return (
        <div className="container-create-note">
           <div className="create-note__card">
                <h3>Agrega Una Tarea</h3>

               {/* Select User */}
               <form onSubmit={handleForm}>
                    <div className="container-create-note users">
                        <select
                        name='userSelected'
                        value={changeInputs.userSelected}
                    onChange={handleInputUsers}
                        >
                            {
                                users.map(user => (
                                    <option key={user.username} value={user.username}>
                                        {user.username}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <div className="container-create-note__form title">
                        <input
                            type="text"
                            placeholder='titulo'
                            name='title'
                            onChange={handleChangeInputs}
                            value={changeInputs.title}
                            required
                        />
                    </div>

                    <div className="container-create-note__form textarea">
                        <textarea
                            name="content"
                            cols="30"
                            rows="10"
                            placeholder='descripción'
                            value={changeInputs.content}
                            onChange={handleChangeInputs}
                            >
                            </textarea>
                    </div>

                                                                                               


                
                    <button className="create-note_btn" type='submit'>Agregar</button>
                </form>
           </div>
        </div>
    )
}

export default CreateNote
