import React, {Component} from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Dropzone from 'react-dropzone'

class UploadFile extends Component{
  onDrop = async ([file])=>{
    const response = await this.props.mutate({
      variables: { file }
    })
    console.log(response);
  }

  render(){
    return (
      <Dropzone
        onDrop={this.onDrop}>
        Arrastre aqui un archivo
      </Dropzone>
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
