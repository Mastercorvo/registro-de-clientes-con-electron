
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
function Register({name: NAME, equipo: EQUIPO, create_at_date: CREATE_AT_DATE, phones: PHONES, title: TITLE, description: DESCRIPTION, fix: FIX, pendiente: PENDIENTE, id}){

  const [name, setName] = useState(NAME);
  const nameHandler = ({target})=> setName(target.value); 
  const [equipo, setEquipo] = useState(EQUIPO);
  const equipoHandler = ({target})=> setEquipo(target.value); 
  const [create_at_date, setCreate_at_date] = useState(CREATE_AT_DATE || new Date().toDateString());
  const create_at_dateHandler = ({target})=> setCreate_at_date(target.value); 
  const [phones, setPhones] = useState(PHONES);
  const phonesHandler = ({target})=> setPhones(target.value); 
  const [title, setTitle] = useState(TITLE);
  const titleHandler = ({target})=> setTitle(target.value); 
  const [description, setDescription] = useState(DESCRIPTION);
  const descriptionHandler = ({target})=> setDescription(target.value); 
  const [fix, setFix] = useState(FIX);
  const fixHandler = ()=> setFix(value=>!value); 
  const [pendiente, setPendiente] = useState(PENDIENTE);
  const pendienteHandler = ()=> setPendiente(value=>!value); 
  const [personPhone, setPersonPhone] = useState('');
  const personPhoneHandler = ({target})=> setPersonPhone(target.value); 
  const [numberPhone, setNumberPhone] = useState('');
  const numberPhoneHandler = ({target})=> setNumberPhone(target.value); 

  return (<div className="register">
    <div className="title-container">
      <label>Titulo: </label><input type="text" className="title" placeholder="Titulo de la Falla" value={title} onChange={titleHandler} />
      <label>De: </label>
      <input type="text" placeholder="Persona" value={name} onChange={nameHandler} />
    </div>
    <input type="text" className="equipo" placeholder="Equipo" value={equipo} onChange={equipoHandler} />
    <textarea className="description" placeholder="Description" value={description} onChange={descriptionHandler} />
    <div className="phones">
      <div className="container">
        <input type="text" placeholder="Teléfono" value={numberPhone} onChange={numberPhoneHandler} />
        <input type="text" placeholder="Persona" value={personPhone} onChange={personPhoneHandler} />
        <button>+ Añadir Teléfono</button>
      </div>
      {phones.map(({number, name}, i)=> <p className="phone" key={i}>{number} - {name}</p>)}
    </div>
    <div className="estado">
      <div className="container">
        <button style={{backgroundColor:fix?'green':'red'}} onClick={fixHandler}>{fix?'✅ Reparado':'🔧 Falta Reparar'}</button>
        <button style={{backgroundColor: pendiente? 'gold': 'green'}} onClick={pendienteHandler}>{pendiente?'📦 No Entregado': '✅ Entregado'}</button>

      </div>
      <p className="date">{create_at_date}</p>

    </div>

  </div>);

}

function App() {
  return (
    <div className="App">

      <div className="search">

        <input type="text" placeholder="Buscar..." />

      </div>

      <div className="registers">

        {Object.entries(REGISTERS).map(([index, value])=> <Register {...value} />)}

      </div>

    </div>
  );
}

export default App;
