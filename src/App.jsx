
import './App.css';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const REGISTERS = {

    "Primero":{
      name: "Andres Olivera",
      equipo: "Televisor Samsung 14",
      create_at_date: new Date().toDateString(),
      phones:[{number:"000000", name:"Casa"}, {number:"111111", name:"Personal"}],
      title: "No prende",
      description: "dopfijkdpgjkerpgk509ti0rgkdfpkjweoprp34kfmp0edk39rfkigj349",
      arreglado: "No arreglado",
      pendiente: true,
      note: "Faltan piezas",
    }
}
function Register({name, equipo, create_at_date, phones, title, description, fix, pendiente, note, id}){

  const [name, setName] = useState(name);
  const nameHandler = ({target})=> setName(target.value); 
  const [equipo, setEquipo] = useState(equipo);
  const equipoHandler = ({target})=> setEquipo(target.value); 
  const [create_at_date, setCreate_at_date] = useState(create_at_date || new Date().toDateString());
  const create_at_dateHandler = ({target})=> setCreate_at_date(target.value); 
  const [phones, setPhones] = useState(phones);
  const phonesHandler = ({target})=> setPhones(target.value); 
  const [title, setTitle] = useState(title);
  const titleHandler = ({target})=> setTitle(target.value); 
  const [description, setDescription] = useState(description);
  const descriptionHandler = ({target})=> setDescription(target.value); 
  const [fix, setFix] = useState(fix);
  const fixHandler = ({target})=> setFix(target.value); 
  const [pendiente, setPendiente] = useState(pendiente);
  const pendienteHandler = ({target})=> setPendiente(target.value); 
  const [note, setNote] = useState(note);
  const noteHandler = ({target})=> setNote(target.value); 

  return (<div className="register">

    <input type="text" placeholder="Titulo de la Falla" value={title} onChange={titleHandler} />
    <input type="text" placeholder="Persona" value={name} onChange={nameHandler} />
    <input type="text" placeholder="Equipo" value={equipo} onChange={equipoHandler} />
    <input type="text" placeholder="Fecha Registrada" value={create_at_date} onChange={create_at_dateHandler} />
    <input type="text" placeholder="Reparado" value={fix} onChange={fixHandler} />
    <input type="text" placeholder="Nota" value={note} onChange={noteHandler} />
    <input type="text-area" placeholder="Description" value={description} onChange={descriptionHandler} />
    <input type="text" placeholder="Estado" value={pendiente} onChange={pendienteHandler} />

  </div>);

}

function App() {
  return (
    <div className="App">

      <div className="search">

        <input type="text" placeholder="Buscar..." />

      </div>

    </div>
  );
}

export default App;
