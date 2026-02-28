import React from 'react'


export const UserGreetings:React.FC<{ userName: string }> = ({ userName }) => {
    return(
        <li>¡Hola, {userName}!</li>
    )

}