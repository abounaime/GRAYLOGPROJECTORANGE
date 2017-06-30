import React, { PropTypes } from 'react';
import Reflux from 'reflux';
import SelectStreamsUsers from 'components/common/SelectStreamsUsers.jsx';
import StoreProvider from 'injection/StoreProvider';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from 'routing/Routes';
import CombinedProvider from 'injection/CombinedProvider';
const { StreamsStore } = CombinedProvider.get('Streams');
const UsersAndStreamsStore = StoreProvider.getStore('UsersAndStreams');
import { DocumentTitle, Spinner } from 'components/common';
import { MalformedSearchQuery, SearchExecutionError, SearchResult } from 'components/search';
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button,Row, Col } from 'reactstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid,Thumbnail } from 'react-bootstrap';

const HomePage = React.createClass({
  getInitialState() {
    return {
      streams : [{}],
      numberFavoris : undefined,
      src0 : require('images/addFav.png'),
      src1 : require('images/addFav.png'),
      src2 : require('images/addFav.png'),
      src3 : require('images/addFav.png'),
      src4 : require('images/addFav.png'),
      src5 : require('images/addFav.png'),
      src6 : require('images/addFav.png'),
      src7 : require('images/addFav.png'),

    }
    this.handleMouseOver1=this.handleMouseOver1.bind(this);
    this.handleMouseOut1 = this.handleMouseOut1.bind(this);
    this.handleMouseOver0=this.handleMouseOver0.bind(this);
    this.handleMouseOut0 = this.handleMouseOut0.bind(this);
    this.handleMouseOver2=this.handleMouseOver2.bind(this);
    this.handleMouseOut2 = this.handleMouseOut2.bind(this);
    this.handleMouseOver3=this.handleMouseOver3.bind(this);
    this.handleMouseOut3 = this.handleMouseOut3.bind(this);
    this.handleMouseOver4=this.handleMouseOver4.bind(this);
    this.handleMouseOut4 = this.handleMouseOut4.bind(this);
    this.handleMouseOver5=this.handleMouseOver5.bind(this);
    this.handleMouseOut5 = this.handleMouseOut5.bind(this);
    this.handleMouseOver6=this.handleMouseOver6.bind(this);
    this.handleMouseOut6 = this.handleMouseOut6.bind(this);
    this.handleMouseOver7=this.handleMouseOver7.bind(this);
    this.handleMouseOut7 = this.handleMouseOut7.bind(this);
  },
  componentDidMount() {
    this.loadStreamsList()
  },
  loadStreamsList() {

    StreamsStore.listStreams().then((response) => {

      this.setState({
        streams: response });
    })
  },
  supp(idStream,data){

    if(idStream)
    StreamsStore.modif(idStream,data)
    this.loadStreamsList()

  },
  handleMouseOver0(){
    this.setState({
      src0 : require('images/stream.png')
    })
  },
  handleMouseOut0() {
    this.setState({
      src10: require('images/addFav.png')
    });
  },
  handleMouseOver1(){
    this.setState({
      src1 : require('images/stream.png')
    })
  },
  handleMouseOut1() {
    this.setState({
      src1 : require('images/addFav.png')
    });
  },
  handleMouseOver2(){
    this.setState({
      src2 : require('images/stream.png')
    })
  },
  handleMouseOut2() {
    this.setState({
      src2 : require('images/addFav.png')
    });
  },
  handleMouseOver3(){
    this.setState({
      src3: require('images/stream.png')
    })
  },
  handleMouseOut3() {
    this.setState({
      src3 : require('images/addFav.png')
    });
  },
  handleMouseOver4(){
    this.setState({
      src4 : require('images/stream.png')
    })
  },
  handleMouseOut4() {
    this.setState({
      src4 : require('images/addFav.png')
    });
  },
  handleMouseOver5(){
    this.setState({
      src5 : require('images/stream.png')
    })
  },
  handleMouseOut5() {
    this.setState({
      src5 : require('images/addFav.png')
    });
  },
  handleMouseOver6(){
    this.setState({
      src6 : require('images/stream.png')
    })
  },
  handleMouseOut6() {
    this.setState({
      src6 : require('images/addFav.png')
    });
  },
  handleMouseOver7(){
    this.setState({
      src7 : require('images/stream.png')
    })
  },
  handleMouseOut7() {
    this.setState({
      src7 : require('images/addFav.png')
    });
  },
  render() {
    var streams=this.state.streams
    var j=0
    var strFav=[{}]
    for(var i=0; i<streams.length;i++){
      if(streams[i].isFavoriteStream === true){
        strFav[j]=streams[i]
        j++

      }
    }

    var fav0
      if(strFav[0])
      fav0 =
        <Grid>
          <Row>
            <Col xs={1} md={1}>
          <LinkContainer to={Routes.stream_search(strFav[0].id)}>
            <a>{strFav[0].title}</a>
          </LinkContainer>
            <button onClick={this.supp.bind(this,strFav[0].id,{
              title : strFav[0].title,
              description : strFav[0].description,
              remove_matches_from_default_stream :strFav[0].remove_matches_from_default_stream,
              isFavoriteStream : strFav[0].isFavoriteStream,
              index_set_id : strFav[0].index_set_id,
            })}>
              Supprimer
            </button>
            </Col>
          </Row>
        </Grid>
      else
        fav0 =
              <LinkContainer to={Routes.STREAMS}>
                <img href="#" alt="171x180" src={this.state.src0}
                     onMouseOver={this.handleMouseOver0} onMouseOut={this.handleMouseOut0}
                />
              </LinkContainer>

    var fav1
    if(strFav[1])
      fav1 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[1].id)}>
            <a>{strFav[1].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[1].id,{
              title : strFav[1].title,
              description : strFav[1].description,
              remove_matches_from_default_stream :strFav[1].remove_matches_from_default_stream,
              isFavoriteStream : strFav[1].isFavoriteStream,
              index_set_id : strFav[1].index_set_id,
            })}>
              Supprimer
            </Button>

        </Card>
      </Col>
    else
      fav1 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src1}
                   onMouseOver={this.handleMouseOver1} onMouseOut={this.handleMouseOut1}
              />
            </LinkContainer>

    ///////////////////////////////////////////
    var fav2
    if(strFav[2])
      fav2 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[2].id)}>
            <a>{strFav[2].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[2].id,{
              title : strFav[2].title,
              description : strFav[2].description,
              remove_matches_from_default_stream :strFav[2].remove_matches_from_default_stream,
              isFavoriteStream : strFav[2].isFavoriteStream,
              index_set_id : strFav[2].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav2 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src2}
                   onMouseOver={this.handleMouseOver2} onMouseOut={this.handleMouseOut2}
              />
            </LinkContainer>

    ///////////////////////////////////////////
    var fav3
    if(strFav[3])
      fav3 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[3].id)}>
            <a>{strFav[3].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[3].id,{
              title : strFav[3].title,
              description : strFav[3].description,
              remove_matches_from_default_stream :strFav[3].remove_matches_from_default_stream,
              isFavoriteStream : strFav[3].isFavoriteStream,
              index_set_id : strFav[3].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav3 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src3}
                   onMouseOver={this.handleMouseOver3} onMouseOut={this.handleMouseOut3}
              />
            </LinkContainer>


    ////////////////////////////////////////////////
    var fav4
    if(strFav[4])
      fav4 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[4].id)}>
            <a>{strFav[4].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[4].id,{
              title : strFav[4].title,
              description : strFav[1].description,
              remove_matches_from_default_stream :strFav[4].remove_matches_from_default_stream,
              isFavoriteStream : strFav[4].isFavoriteStream,
              index_set_id : strFav[4].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav4 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src4}
                   onMouseOver={this.handleMouseOver4} onMouseOut={this.handleMouseOut4}
              />
            </LinkContainer>

    ////////////////////////////////////////////////////////////////////////////////

    var fav5
    if(strFav[5])
      fav5 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[5].id)}>
            <a>{strFav[1].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[5].id,{
              title : strFav[5].title,
              description : strFav[5].description,
              remove_matches_from_default_stream :strFav[5].remove_matches_from_default_stream,
              isFavoriteStream : strFav[5].isFavoriteStream,
              index_set_id : strFav[5].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav5 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src5}
                   onMouseOver={this.handleMouseOver5} onMouseOut={this.handleMouseOut5}
              />
            </LinkContainer>

    ////////////////////////////////////////////////////////////////////////
    var fav6
    if(strFav[6])
      fav6 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[6].id)}>
            <a>{strFav[6].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[6].id,{
              title : strFav[6].title,
              description : strFav[6].description,
              remove_matches_from_default_stream :strFav[6].remove_matches_from_default_stream,
              isFavoriteStream : strFav[6].isFavoriteStream,
              index_set_id : strFav[6].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav6 =
            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src6}
                   onMouseOver={this.handleMouseOver6} onMouseOut={this.handleMouseOut6}
              />
            </LinkContainer>


    ///////////////////////////////////////////////////////
    var fav7
    if(strFav[7])
      fav7 =<Col sm="3">
        <Card block>
          <CardTitle>Application</CardTitle>
          <LinkContainer to={Routes.stream_search(strFav[7].id)}>
            <a>{strFav[7].title}</a>
          </LinkContainer>
            <Button onClick={this.supp.bind(this,strFav[7].id,{
              title : strFav[7].title,
              description : strFav[1].description,
              remove_matches_from_default_stream :strFav[7].remove_matches_from_default_stream,
              isFavoriteStream : strFav[7].isFavoriteStream,
              index_set_id : strFav[7].index_set_id,
            })}>
              Supprimer
            </Button>
        </Card>
      </Col>
    else
      fav7 =

            <LinkContainer to={Routes.STREAMS}>
              <img href="#" alt="171x180" src={this.state.src7}
                   onMouseOver={this.handleMouseOver7} onMouseOut={this.handleMouseOut7}
              />
            </LinkContainer>



    const thumbnailInstance = (
      <Grid>
        <Row>
          <Col xs={1} md={1}>
            <LinkContainer to={Routes.STREAMS}>
            <img href="#" alt="171x180" src={this.state.src}
                 onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}
            />
            </LinkContainer>
          </Col>
        </Row>
      </Grid>
    );

    return (
      <DocumentTitle title="Search">
        <div>
          <Grid>
            <Row>
              <Col xs={1} md={3}>
          {fav0}
              </Col>
              <Col xs={1} md={3}>
              {fav1}
              </Col>
              <Col xs={1} md={3}>
                {fav2}
              </Col>
              <Col xs={1} md={3}>
                {fav3}
              </Col>
            </Row>
            <Row>
              <Col xs={1} md={3}>
                {fav4}
              </Col>
              <Col xs={1} md={3}>
                {fav5}
              </Col>
              <Col xs={1} md={3}>
                {fav6}
              </Col>
              <Col xs={1} md={3}>
                {fav7}
              </Col>
            </Row>

          </Grid>


        </div>

      </DocumentTitle>
    );
// les composants de la vue home sont développés dans SearchBar.jsx
  /*  if(strFav.length===1)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>

                  <LinkContainer  to={Routes.stream_search(strFav[0].id)}>
                    <Button>
                      Supprimer
                    </Button>
                  </LinkContainer>

                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <LinkContainer to={Routes.STREAMS}>
                    <Button>Add a Favorite</Button>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===2)
    return (
      <DocumentTitle title="Search">
        <div>
   {fav0}
   {fav1}
   {fav2}
   {fav3}
   {fav4}
   {fav5}
   {fav6}
   {fav7}
          <Row>
            <Col sm="3">
              <Card block>
                <CardTitle>Application</CardTitle>
                <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                  <a>{strFav[0].title}</a>
                </LinkContainer>

                <Button onClick={this.edit.bind(this,strFav[0].id,{
                  title : strFav[0].title,
                  description : strFav[0].description,
                  remove_matches_from_default_stream :strFav[0].remove_matches_from_default_stream,
                  isFavoriteStream : strFav[0].isFavoriteStream,
                  index_set_id : strFav[0].index_set_id,
                })}>
                  Supprimer
                </Button>
              </Card>
            </Col>

            <Col sm="3">
              <Card block>
                <CardTitle>Application</CardTitle>
                <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                  <a>{strFav[1].title}</a>
                </LinkContainer>

                <Button onClick={this.edit.bind(this,strFav[0].id,{
                  title : strFav[0].title,
                  description : strFav[0].description,
                  remove_matches_from_default_stream :strFav[0].remove_matches_from_default_stream,
                  isFavoriteStream : strFav[0].isFavoriteStream,
                  index_set_id : strFav[0].index_set_id,
                })}>
                  Supprimer
                </Button>

              </Card>
            </Col>

            <Col sm="3">
              <Card block>
                <CardTitle></CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Add a Favorite</Button>
              </Card>
            </Col>
          </Row>

        </div>

      </DocumentTitle>
    );
    if(strFav.length===3)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===4)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[3].id)}>
                    <a>{strFav[3].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===5)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[3].id)}>
                    <a>{strFav[3].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[4].id)}>
                    <a>{strFav[4].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===6)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[3].id)}>
                    <a>{strFav[3].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[4].id)}>
                    <a>{strFav[4].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[5].id)}>
                    <a>{strFav[5].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===7)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[3].id)}>
                    <a>{strFav[3].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[4].id)}>
                    <a>{strFav[4].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[5].id)}>
                    <a>{strFav[5].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[6].id)}>
                    <a>{strFav[6].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Add a Favorite</Button>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );
    if(strFav.length===8)
      return (
        <DocumentTitle title="Search">
          <div>

            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[0].id)}>
                    <a>{strFav[0].title}</a>
                  </LinkContainer>
                </Card>
              </Col>

              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[1].id)}>
                    <a>{strFav[1].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[2].id)}>
                    <a>{strFav[2].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[3].id)}>
                    <a>{strFav[3].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[4].id)}>
                    <a>{strFav[4].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[5].id)}>
                    <a>{strFav[5].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[6].id)}>
                    <a>{strFav[6].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
              <Col sm="3">
                <Card block>
                  <CardTitle>Application</CardTitle>
                  <LinkContainer to={Routes.stream_search(strFav[7].id)}>
                    <a>{strFav[7].title}</a>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>

          </div>

        </DocumentTitle>
      );*/

  },
});

export default HomePage;
