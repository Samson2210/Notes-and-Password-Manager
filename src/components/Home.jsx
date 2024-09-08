import React, { useState } from 'react'

import Notes from './Notes';

export default function Home({showAlert}) {

  const [encrptionKey,setEncrytionKey] = useState();

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  )
}
