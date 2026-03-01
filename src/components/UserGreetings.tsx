import React from 'react'

export const UserGreetings:React.FC<{ userName: string | null | undefined }> = ({ userName }) => {
    const isValidUserName = userName !== "" && userName !== null && userName !== undefined;
    return(
        isValidUserName 
        ? <span className="user-greeting">¡Hola, {userName}!</span> 
        : <span className="user-greeting">¡Hola, Usuario!</span>
    )
}