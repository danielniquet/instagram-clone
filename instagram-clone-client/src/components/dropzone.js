import React, {Component} from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Dropzone from 'react-dropzone'
import {Dimmer, Header, Icon, Image} from 'semantic-ui-react'
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
  }
  onDrop = async ([file])=>{
    // const response = await this.props.mutate({
    //   variables: { file }
    // })
    // console.log(response);
    this.setState({file})
  }
  handleFilterClick = (filter)=>{
    this.setState({currentFilter:filter})
  }

  render(){
    const {file, currentFilter} = this.state
    return (
      <div>
        <Dimmer
          active={true}
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
                  <figure className={currentFilter} style={styles.previewFigure}>
                    <Image
                      src={file.preview}
                      size="medium"
                    />
                  </figure>
                  <div>
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
                  </div>
                </div>
              )
            }
        </Dimmer>
      </div>
    )
  }
}


export default graphql(gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`)(UploadFile)
