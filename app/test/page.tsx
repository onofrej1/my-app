'use client';
import React from 'react'
import Button from '@mui/material/Button';
import { use } from 'react';

async function getData() {
  const resp = await fetch('api/test');
  const data = resp.json();
  return data;
}

const data = getData();

export default function Page() {
  const d = use(data);

  return (
    <div>
      <Button variant="contained">Hello World</Button>
    </div>
  )
}
