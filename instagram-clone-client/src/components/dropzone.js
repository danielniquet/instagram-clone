import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';
import WrapperConsumer, { ActionTypes } from '../store';
import {
  Dimmer,
  Header,
  Icon,
  Image,
  Radio,
  Button,
  Container,
  Input
} from 'semantic-ui-react';
import Aviary from 'aviary-react';
import '../css/cssgram.min.css';

const cssFilters = [
  '_1977',
  'aden',
  'brannan',
  'brooklyn',
  'clarendon',
  'earlybird',
  'gingham',
  'hudson',
  'inkwell',
  'kelvin',
  'lark',
  'lofi',
  'maven',
  'mayfair',
  'moon',
  'nashville',
  'perpetua',
  'reyes',
  'rise',
  'slumber',
  'stinson',
  'toaster',
  'valencia',
  'walden',
  'willow',
  'xpro2'
];

class UploadFile extends Component {
  defaultState = {
    file: null,
    fileURL: null,
    currentFilter: '',
    advanced: false,
    active: false,
    activeView: 1,
    desc: ''
  };
  state = this.defaultState;
  setDefaultState = () => {
    this.setState(this.defaultState);
  };
  onDrop = async ([file]) => {
    this.setState({ file });
  };
  handleFilterClick = filter => {
    this.setState({ currentFilter: filter });
  };
  handleAdvanced = (ev, { checked }) => {
    this.setState({ advanced: checked });
  };
  handleSave = async URL => {
    const { desc, currentFilter, file } = this.state;
    // console.log(desc, fileURL, currentFilter);
    const { dispatch } = this.props.context;
    dispatch({
      type: ActionTypes.CREATE_POST,
      payload: { file, desc, effect: currentFilter }
    });

    this.setDefaultState();
  };
  handleShowDropzone = () => {
    this.setState({ active: true });
  };
  handleClose = () => {
    this.setState({ active: false });
  };
  handleGoToView = n => {
    this.setState({ activeView: n });
  };
  handleInputDesc = (ev, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { user } = this.props.context;
    const {
      file,
      currentFilter,
      advanced,
      active,
      activeView,
      desc
    } = this.state;
    const ImgPreview = () => (
      <figure className={currentFilter} style={styles.previewFigure}>
        <Image src={file.preview} size="medium" />
      </figure>
    );
    return (
      <div>
        <Dimmer active={active} onClickOutside={this.handleClose} page>
          {!file && (
            <Header as="h2" icon inverted style={styles.dropzoneContainer}>
              <Dropzone onDrop={this.onDrop}>
                <Icon name="upload" />
                Arrastre aquí un archivo
              </Dropzone>
            </Header>
          )}
          {file && (
            <div style={styles.previewDiv}>
              {advanced && <Aviary file={file} onSave={this.handleSave} />}
              <Container>
                {activeView === 1 && (
                  <Fragment>
                    <Button
                      circular
                      icon="arrow right"
                      size="huge"
                      style={styles.rightButton}
                      onClick={ev => this.handleGoToView(2)}
                    />
                    {!advanced && <ImgPreview />}
                    <Radio toggle onChange={this.handleAdvanced} />{' '}
                    <span style={{ color: 'black' }}>
                      Ir a {advanced ? 'Simple' : 'Avanzado'}
                    </span>
                    {!advanced && (
                      <Image.Group size="tiny" style={styles.divFilters}>
                        {cssFilters.map((filter, i) => (
                          <div
                            key={i}
                            style={styles.divFigure}
                            onClick={() => this.handleFilterClick(filter)}
                          >
                            <h4 style={styles.h4}>{filter}</h4>
                            <figure className={filter} style={styles.figure}>
                              <Image src={file.preview} />
                            </figure>
                          </div>
                        ))}
                      </Image.Group>
                    )}
                  </Fragment>
                )}
                {activeView === 2 && (
                  <Fragment>
                    <Button
                      circular
                      icon="arrow left"
                      size="huge"
                      style={styles.leftButton}
                      onClick={ev => this.handleGoToView(1)}
                    />
                    @{user.username}
                    <ImgPreview />
                    <Input
                      name="desc"
                      defaultValue={desc}
                      placeholder="Descripción"
                      onChange={this.handleInputDesc}
                    />
                    <Button onClick={this.handleSave}>Publicar</Button>
                  </Fragment>
                )}
              </Container>
            </div>
          )}
        </Dimmer>
        <Button
          circular
          icon="plus"
          size="huge"
          style={styles.showDropzoneButton}
          onClick={this.handleShowDropzone}
        />
      </div>
    );
  }
}

export default WrapperConsumer(UploadFile);

const styles = {
  dropzoneContainer: {
    background: 'white',
    color: '#333',
    padding: '10px'
  },
  previewDiv: {
    display: 'inline-block',
    padding: '10px',
    background: 'white',
    color: 'black',
    position: 'relative'
  },
  divFigure: {
    display: 'inline-block',
    cursor: 'pointer'
  },
  figure: {
    margin: '5px'
  },
  divFilters: {
    height: '200px',
    overflow: 'auto'
  },
  h4: {
    color: 'black',
    marginBottom: 0
  },
  previewFigure: {
    display: 'inline-block'
  },
  showDropzoneButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px'
  },
  rightButton: {
    position: 'absolute',
    top: '10px',
    right: '10px'
  },
  leftButton: {
    position: 'absolute',
    top: '10px',
    left: '10px'
  }
};
