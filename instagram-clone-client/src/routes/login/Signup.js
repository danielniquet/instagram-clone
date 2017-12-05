import React from 'react';
import { Divider, Form, Button, Icon } from 'semantic-ui-react'


export default ({styles, handleClick, handleSubmit}) => {
  const args={}

  const handleChange = (ev, input)=>{
    args[input.name] = input.value
  }

  return (
  <div>
    <div  style={styles.box}>
      <img src='images/logo.png' alt="logo"/>
      <h4>Regístrate para ver fotos y videos de tus amigos.</h4>
      <Form  onSubmit={(ev)=>handleSubmit(ev, args)}>
        <Button color="facebook">
          <Icon name="facebook" /> Iniciar sesión con facebook
        </Button>
        <Divider horizontal> O </Divider>
        <Form.Field>
          <Form.Input  name="email" onChange={handleChange} placeholder='email' icon={<Icon name="remove circle outline" color="red" size="large" />} />
        </Form.Field>
        <Form.Field>
          <Form.Input  name="fullname" onChange={handleChange} placeholder='Nombre completo' icon={<Icon name="remove circle outline" color="red" size="large" />} />
        </Form.Field>
        <Form.Field>
          <Form.Input  name="username" onChange={handleChange} placeholder='nombre de usuario' icon={<Icon name="remove circle outline" color="red" size="large" />} />
        </Form.Field>
        <Form.Field>
          <Form.Input  name="password" onChange={handleChange} type="password" placeholder='Password' icon={<Icon name="remove circle outline" color="red" size="large" />} />
        </Form.Field>
        <Button type='submit' primary fluid>Registrarte</Button>

      </Form>

    </div>
    <div  style={styles.box}>
        ¿Tienes una cuenta? <a href="" onClick={handleClick}>Inicia sesión</a>
    </div>
  </div>)
}
