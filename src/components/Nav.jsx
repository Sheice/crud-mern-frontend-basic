import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
            <div className="container-nav">
                <div className="container-nav__logo">
                    <Link to="/">TAREAS</Link>
                </div>
                <div className="container-nav__ul">
                    <ul>
                        <li>
                            <Link to="/">Notas</Link>
                        </li>
                        <li>
                            <Link to="/notes">Crear Nota</Link>
                        </li>
                        <li>
                            <Link to="/users">Usuarios</Link>
                        </li>
                    </ul>
                </div>
            </div>
    )
}

export default Nav
