
import './App.css';

import { useState, useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

const REGISTERS = {

    "Primero":{
      name: "Andres Olivera",
      equipo: "Televisor Samsung 14",
      create_at_date: getNowTime(),
      phones:[["000000", "Casa"], ["111111", "Personal"]],
      title: "No prende",
      description: "dopfijkdpgjkerpgk509ti0rgkdfpkjweoprp34kfmp0edk39rfkigj349",
      fix: false,
      pendiente: true,
      cache: []
    }
}

function getNowTime(){

  const DATE = new Date();

  return `${DATE.getDate()}/${DATE.getMonth()}/${DATE.getFullYear()} - Hora ${DATE.getHours()} Minuto ${DATE.getMinutes()} Segundos ${DATE.getSeconds()}`

}

function Cache({DATA, setShowCache}){

  function buttonHandler(){

    setShowCache(false)

  }

  //const OLD_OBJECT = [name, equipo, phones, title, description, fix, pendiente, cache, getNowTime()]

  const SCROLL = useRef()

  useEffect(()=>{

    SCROLL.current.scroll(0, 0);

  },[]);

  return (<div className="cache">

    <div className="container" ref={SCROLL}>

      <h2>Registros</h2>

{DATA.map(e=><p>Actualización Hecha El: {e[8]} <br/> Nombre: {e[0]} - Titulo: {e[3]} - Equipo: {e[1]} <br/> Teléfonos: <br/> {e[2].map((v, i)=>{ 

    if(i === e[2].length -1) return v.join(' ');

    return <> {v.join(' ')} <br/> </> ;

})} <br/> Descripción: {e[4]} <br/> Reparado: {e[5]?'Sí.':'No.'} - Entregado: {e[6]?'Sí.':'No.'}</p>)}

    </div>
    <button onClick={buttonHandler}>Salir</button>

  </div>)

}

function Register(DATA){

  const {name: NAME, equipo: EQUIPO, create_at_date, phones: PHONES, title: TITLE, description: DESCRIPTION, fix: FIX, pendiente: PENDIENTE, id, setRegisters, setViewRegisters, cache} = DATA;

  const [name, setName] = useState(NAME);
  const nameHandler = ({target})=> setName(target.value); 
  const [equipo, setEquipo] = useState(EQUIPO);
  const equipoHandler = ({target})=> setEquipo(target.value); 
  const [phones, setPhones] = useState(PHONES);
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

  const [deletedPhones, setDeletedPhones] = useState(false);
  const deletePhonesHandler = ()=> setDeletedPhones(v=>!v);

  const [showCache, setShowCache] = useState(false)

  const [edit, setEdit] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{

    const objetData = JSON.stringify({
      name, equipo, create_at_date, phones, title, description, fix, pendiente
    })
    

    const COPY = {...DATA}

    delete COPY.id
    delete COPY.cache
    delete COPY.registers
    delete COPY.setRegisters
    delete COPY.setViewRegisters

    const OriginalObject = JSON.stringify(COPY);

    if(OriginalObject !== objetData) setEdit(true);
      else setEdit(false)

  })

  function addPhone(){

    if(!numberPhone || !personPhone) return;

    if(phones.find(({number})=> number === numberPhone)) return alert('Numero de Teléfono Ya Registrado');

    setPhones(value=>[[numberPhone, personPhone], ...value, ]); 

    setNumberPhone('');

    setPersonPhone('');

  }

  function deletePhone(phone){

    setPhones(value=>{

      return value.filter(({number})=> number !== phone);

    });

  }

  function getData(value){

    const COPY = {...value};

    const OLD_OBJECT = [name, equipo, phones, title, description, fix, pendiente, cache, getNowTime()]
    
    COPY[id] = {name, equipo, create_at_date, phones, title, description, fix, pendiente, cache :[OLD_OBJECT ,...cache]};


    return COPY;

  }

  function saveHandler(){

    setRegisters(value=>{

      return getData(value);

    });

    setViewRegisters(value=>{

      return getData(value);

    });

  }

  function cancel(){

    setName(NAME);
    setTitle(TITLE);
    setEquipo(equipo);
    setDescription(DESCRIPTION);
    setFix(FIX);
    setPendiente(PENDIENTE);
    setPhones(PHONES);

  }

  return (<div className="register">
    {showCache && <Cache DATA={DATA.cache} setShowCache={setShowCache}/>}
    <div className="save" style={{display:edit?'flex':'none'}}>

      <div className="yes" onClick={saveHandler} title="Guardar cambios">✅</div>
      <div className="no" onClick={cancel} title="Cancelar cambios">❌</div>

    </div>
    <div className="title-container">
      <label>Titulo: </label><input type="text" className="title" placeholder="Titulo de la Falla" value={title} onChange={titleHandler} />
      <label>De: </label>
      <input type="text" placeholder="Persona" value={name} onChange={nameHandler} />
    </div>
    <label>Equipo: <input type="text" className="equipo" placeholder="Equipo" value={equipo} onChange={equipoHandler} /></label>
    <div className="container">
      <textarea className="description" placeholder="Description" value={description} onChange={descriptionHandler} />
      <button onClick={()=>setShowCache(true)}>📜 Ver el Historial</button>
    </div>
    <div className="phones">
      <div className="container">
        <input type="text" placeholder="Teléfono" value={numberPhone} onChange={numberPhoneHandler} />
        <input type="text" placeholder="Persona" value={personPhone} onChange={personPhoneHandler} />
        <button onClick={addPhone}>➕ Añadir Teléfono</button>
        <button onClick={deletePhonesHandler} className="delete">❌</button>
      </div>
{phones.map(([number, name], i)=> <div className="phone" key={i}>{deletedPhones && <button onClick={()=>deletePhone(number)}>❌</button>} {number} - {name} </div>)}
    </div>
    <div className="estado">
      <div className="container">
        <button style={{backgroundColor:fix?'green':'red'}} onClick={fixHandler}>{fix?'✅ Reparado':'🔧 Falta Reparar'}</button>
        <button style={{backgroundColor: pendiente? 'gold': 'green'}} onClick={pendienteHandler}>{pendiente?'📦 No Entregado': '✅ Entregado'}</button>

      </div>
      <p className="date">Solicitado El: {create_at_date}</p>
    </div>

  </div>);

}

function App() {

  const [registers, setRegisters] = useState(REGISTERS);

  const [viewRegisters, setViewRegisters] = useState(registers);

  const [search, setSearch] = useState('');

  const genericRegister = {
      name: "",
      equipo: "",
      phones:[],
      title: "",
      description: "",
      fix: false,
      pendiente: true,
      cache: []
    }

  function searchHandler({target: { value } }){

    setSearch(value);

    if(!value) return setViewRegisters(registers);

    setViewRegisters(()=>{

      return Object.fromEntries(Object.entries(registers).map(([index, e])=>{

        const COPY = {e}
        return [JSON.stringify(Object.values(COPY)).match(new RegExp(value,'i')), [index, e]];
      
      })
      .filter(([e])=>e)
      .sort(([a], [b])=>{
  
        return b[0].length - a[0].length;
  
      })
      .sort(([a], [b])=>{
  
        return a.index - b.index;
  
      })
      .map(([, e])=>e));

    });

  }

  function addRegister(){

    setViewRegisters(registers=>{

      return {[uuidv4()]:{...genericRegister, create_at_date: getNowTime()}, ...registers}

    });

  }

  return (
    <div className="App">

      <div className="search">

        <input type="text" value={search} onChange={searchHandler} placeholder="Buscar..." />

        <button onClick={addRegister}>➕ Añadir Registro</button>

      </div>

      <div className="registers">

        {Object.entries(viewRegisters).map(([index, value])=> <Register {...value} setViewRegisters={setViewRegisters} setRegisters={setRegisters} id={index} key={index}/>)}

      </div>

    </div>
  );
}

export default App;