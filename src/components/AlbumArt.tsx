import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Accordion from 'react-bootstrap/Accordion'
import TableRow from "./TableRow"
import Gridr from "./Gridr"

type MyProps = {};
type MyState = {
    count: number
    currentArtist: string
    currentAlbum: string
    artists: string[]
    albums: string[]
    urls: string[]
    pixelLength: string
    rows: string
    columns: string
};
class AlbumArt extends React.Component<MyProps, MyState> {
    state = {
        count: 0,
        currentArtist: "",
        currentAlbum: "",
        artists: [],
        albums: [],
        urls: [],
        pixelLength: "",
        rows: "",
        columns: ""
    };

    componentDidMount() {
        // this.gangnem()
    }

    render() {
        const canvasStyle = {
            border: "1px solid black",
            height: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        };

        return (
            <div style={{ "padding": 100 }}>
                <h1 style={{ textAlign: "left" }}>Album Grid</h1>
                <br />
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>1) Add album art</Accordion.Header>
                        <Accordion.Body>
                            <Form onSubmit={this.submitAlbum}>
                                <Row>
                                    <Col>
                                        <Form.Control placeholder="Album" value={this.state.currentAlbum} onChange={this.handleAlbumChange} />
                                    </Col>
                                    <Col>
                                        <Form.Control placeholder="Artist" value={this.state.currentArtist} onChange={this.handleArtistChange} />
                                    </Col>
                                    <Col xs="auto" >
                                        <Button type="submit">Add</Button>
                                    </Col>
                                </Row>
                            </Form>
                            <br />
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Album</th>
                                        <th>Artist</th>
                                        <th>Art</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.artists.map((artist, index) =>
                                            <TableRow key={index} url={this.state.urls[index]} number={index + 1} album={this.state.albums[index]} artist={artist} />
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>2) Specify grid dimensions</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row>
                                    <Col >
                                        <Form.Control type="text" placeholder="Image Side Length (1000px max)" value={this.state.pixelLength} onChange={this.handlePixelLengthChange} />
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control type="text" placeholder="Rows" value={this.state.rows} onChange={this.handleRowChange} />
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control type="text" placeholder="Columns" value={this.state.columns} onChange={this.handleColumnChange} />
                                    </Col>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <br />
                <div style={canvasStyle}>
                    {this.state.rows != "" && this.state.columns != "" && (parseInt(this.state.rows) * parseInt(this.state.columns) - this.state.urls.length != 0) ?
                        <Alert variant="warning">
                            You must change your image number by: {parseInt(this.state.rows) * parseInt(this.state.columns) - this.state.urls.length}
                        </Alert> :
                        <Gridr pixelLength={this.state.pixelLength} rows={this.state.rows} cols={this.state.columns} images={this.state.urls} />
                    }
                </div>
            </div>
        );
    }

    handlePixelLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            pixelLength: (event.target.value)
        })
    }

    handleRowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            rows: (event.target.value)
        })
    }

    handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            columns: (event.target.value)
        })
    }

    handleAlbumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentAlbum: event.target.value
        })
    }

    handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentArtist: event.target.value
        })
    }

    submitAlbum = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (this.state.currentArtist != "" && this.state.currentAlbum != "") {
            this.gangnem(this.state.currentArtist, this.state.currentAlbum)
        } else if (this.state.currentArtist == "" && this.state.currentAlbum == "") {
            alert("Album and Artist fields empty ")
        } else if (this.state.currentAlbum == "") {
            alert("Album field empty")
        } else {
            alert("Artist field empty")
        }

    }

    code = (name: string) => {
        return name.replace(/[\W_]+/g, "-");
    }

    gangnem = (artist: string, album: string) => {
        fetch("/" + this.code(artist) + "/" + this.code(album))
            .then(response => response.json())
            .then(data => {
                // Do something with data
                // alter state
                if (data != "Bad Request") {
                    this.setState(prevState => ({
                        artists: [...prevState.artists, this.state.currentArtist],
                        albums: [...prevState.albums, this.state.currentAlbum],
                        urls: [...prevState.urls, data],
                        currentArtist: "",
                        currentAlbum: ""
                    }), () => {
                        console.log(this.state)
                    })
                } else {
                    alert("Album '" + album + "' by artist '" + artist + "' could not be found")
                }
            });
    }
}


export default AlbumArt;