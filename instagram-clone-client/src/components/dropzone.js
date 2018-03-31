import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo'
import Dropzone from 'react-dropzone'
import {Dimmer, Header, Icon, Image, Radio} from 'semantic-ui-react'
import Aviary from 'aviary-react';
import queries from '../queries'
import '../css/cssgram.min.css'

const cssFilters= ["_1977","aden","brannan","brooklyn","clarendon","earlybird","gingham","hudson","inkwell","kelvin","lark","lofi","maven","mayfair","moon","nashville","perpetua","reyes","rise","slumber","stinson","toaster","valencia","walden","willow","xpro2"]

const styles={
  dropzoneContainer:{
    background: "white",
    color: "#333",
    padding: "10px",
  },
  previewDiv:{
    display: "inline-block",
    padding: "10px",
    background: "white",
  },
  divFigure:{
    display: "inline-block",
    cursor:"pointer",
  },
  figure:{
    margin: "5px",
  },
  divFilters:{
    height:'200px',
    overflow:'auto',
  },
  h4:{
    color:"black",
    marginBottom:0,
  },
  previewFigure:{
    display:"inline-block"
  }
}

class UploadFile extends Component{
  state={
    file:null,
    currentFilter: "",
    advanced: false,
    active: true,
  }
  onDrop = async ([file])=>{
    // const response = await this.props.singleUpload({
    //   variables: { file }
    // })
    // console.log(response);
    this.setState({file})
  }
  handleFilterClick = (filter)=>{
    this.setState({currentFilter:filter})
  }
  handleAdvanced = (ev,{checked})=>{
    this.setState( {advanced: checked} )
  }
  handleSave = async (URL)=>{
    const response = await this.props.createPost({
      variables: { post: {desc:"Hola mundo", photo: URL} }
    })
    if(response.data.createPost.success){
      this.setState({active:false})
    }
  }
  handleClose = ()=>{
    this.setState({active:false})
  }

  render(){
    const {file, currentFilter, advanced, active} = this.state
    return (
      <div>
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
        >
            {
              !file && (
                <Header as='h2' icon inverted style={styles.dropzoneContainer}>
                  <Dropzone
                    onDrop={this.onDrop}>
                    <Icon name="upload" />
                    Arrastre aquí un archivo
                  </Dropzone>
                </Header>
              )
            }
            {
              file && (
                <div style={styles.previewDiv}>
                  {
                    advanced && (
                      <Aviary file={file} onSave={this.handleSave} />
                    )
                  }
                  {
                    !advanced && (
                      <figure className={currentFilter} style={styles.previewFigure}>
                        <Image
                          src={file.preview}
                          size="medium"
                        />
                      </figure>
                    )
                  }
                  <div>
                    <Radio toggle onChange={this.handleAdvanced} /> <span style={{color:"black"}}>Ir a {advanced?"Simple":"Avanzado"}</span>
                    {
                      !advanced && (
                        <Image.Group size="tiny" style={styles.divFilters}>
                          {
                            cssFilters.map((filter,i)=>(
                              <div key={i} style={styles.divFigure} onClick={()=>this.handleFilterClick(filter)}>
                                <h4 style={styles.h4}>{filter}</h4>
                                <figure className={filter} style={styles.figure}>
                                  <Image
                                    src={file.preview}
                                  />
                                </figure>
                              </div>
                            ))
                          }
                        </Image.Group>
                      )
                    }

                  </div>
                </div>
              )
            }
        </Dimmer>
      </div>
    )
  }
}


export default compose(
  graphql(queries.mutation.singleUpload, {name:"singleUpload"}),
  graphql(queries.mutation.createPost, {name: "createPost" }),
)(UploadFile)
