import './App.css'
import {  Route, Routes,Router } from "react-router-dom";
import Login from './login/Login';
import Menu from './menu/Menu';
import MenuCliente from './menu/MenuCliente';
import MenuEmpleado from './menu/MenuEmpleado';
import FormCliente from './FormCliente';
import ReservaHabitacion from  './ReservaHabitacion';
import BusquedaCliente from './BusquedaCliente';
import FormHabitacion from './FormHabitacion';
import ListHabitaciones from './ListHabitaciones';
import BusquedaAdmin from './BusquedaAdmin';
import BuscarReservaFecha from './BuscarReservaFecha';
import BuscarHabitacionPrecio from './BuscarHabitacionPrecio';
import BuscarRangoFechas from './BuscarRangoFechas';





function App() {
  

  return (
    <>
   
     <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/CrearCuenta' element={<FormCliente />}/>
      <Route path='/Menu' element={<Menu />}/>
      <Route path='/Administraccion' element={<MenuEmpleado />}/>
      <Route path='/AltaHabitacion' element={<FormHabitacion />}/>
      <Route path='/Habitaciones' element={<ListHabitaciones />}/>
      <Route path='/BusquedaAdmin' element={<BusquedaAdmin />}/>
      <Route path='/BusquedaReserva' element={<BuscarReservaFecha />}/>
      <Route path='/Clientes' element={<MenuCliente />}/>
      <Route path='/Reserva' element={<ReservaHabitacion />}/>
      <Route path='/Busqueda' element={<BusquedaCliente />}/>
      <Route path='/BusquedaPrecio' element={<BuscarHabitacionPrecio />}/>
      <Route path='/Busquedafechas' element={<BuscarRangoFechas />}/>
     </Routes> 
    </>
  )
}

export default App
