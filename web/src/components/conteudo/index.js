import React from 'react';


import './styles.css';
import logo from "../../assets/images/ifound.svg";

export default function conteudo() {
  return (
    <div id="content">
      <img src={logo}/>
      <br/><br/>
      <h2>"Share what technologies you work and get on the radar..."</h2>
      <br/>
    </div>
  );
}
