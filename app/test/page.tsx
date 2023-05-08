'use client';
import React from 'react'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react'
import { use } from 'react';
import useSWR from 'swr'

async function getData() {
  const resp = await fetch('api/test');
  const data = resp.json();
  //console.log(data);
  return data;
}

const data = getData();

export default function Page() {
  //const { data, error, isLoading } = useSWR('api/test');
  /*useEffect(() => {
    console.log('use effect');
    async function fetchData() {
      const d: any = await getData();
      console.log(d.users);
    }
    fetchData();
  }, []);*/
  const d = use(data);
  //console.log(d);

  return (
    <div>
      {/*<div className="test">
        <div className="test1">test1</div>
        <div className="test2">test2</div>
        <div className="test3">test3</div>
  </div>*/}

      <div>
        aaabb
        <Button variant="contained">Hello World</Button>
      </div>
    </div>
  )
}
