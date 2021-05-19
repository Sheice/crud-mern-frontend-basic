import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateUser() {

//    states

    const [users, setUsers] = useState([]);

    const [userForm, setUseForm] = useState({username: ''});


// functions 

    

    const GetUsers = async () => {
        try{
            const GetUsers = await  axios.get('http://localhost:4000/api/users');
            setUsers(GetUsers.data);
        } catch (e) {
            console.log(e);
        }
        
    }

    const deleteUser = async (id) => {
        try{
            await axios.delete('http://localhost:4000/api/users/' + id);
            GetUsers();

        }catch(e){
            console.log(e);
        }
    }

    const changeFormUser = (e) => {
        setUseForm({username: e.target.value});
    }

    const submitFromUser = async (e) => {
        e.preventDefault();
        try{
            if(userForm.username === ''){
                
            } else {
                await axios.post('http://localhost:4000/api/users', userForm);
                GetUsers();
                setUseForm({username: ''})
            }
            
        } catch(e){
            console.log(e)
        }
        
       
    }

    
// useeffect

    useEffect(()=> {
        async function axiosUsers() {
            try{
               GetUsers();
            } catch(e){
                console.log(e);
            }
            
        }

        axiosUsers();   
    },[]);

// code
    return (
        <div className="container-users">
            <div className="container__form-users">
                <h2>Crear un nuevo usuario</h2>
                <form onSubmit={submitFromUser}>
                    <input
                        type="text"
                        placeholder="Nuevo Usuario"
                        onChange={changeFormUser}
                        value={userForm.username}
                    />
                    <button type='submit'>Agregar</button>
                </form>
            </div>
            <div className="container__list-users">
                <ul>
                    {users.map(user => <li onDoubleClick={()=>{deleteUser(user._id)}} key={user._id}>{user.username}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default CreateUser
