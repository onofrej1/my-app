import React from 'react'
//import Button from '@mui/material/Button';
import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page2() {
    const session = await getServerSession(authOptions);
    console.log(session);

    return (
        <div>
            Hello world
        </div>
    )
}
