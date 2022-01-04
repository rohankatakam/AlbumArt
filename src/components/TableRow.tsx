import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

type MyProps = {
    // using `interface` is also ok
    number: number;
    artist: string;
    album: string;
    url: string;
};
type MyState = {
    url: string
};
class TableRow extends React.Component<MyProps, MyState> {
    state = {
        url: this.props.url
    };

    componentDidMount() {
        this.gangnem()
    }

    render() {
        if (this.state.url == "") {
            return <tr>
                <td>{this.props.number}</td>
                <td>{this.props.album}</td>
                <td>{this.props.artist}</td>
                <td><Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </td>
            </tr>

        } else {
            return (
                <tr>
                    <td>{this.props.number}</td>
                    <td>{this.props.album}</td>
                    <td>{this.props.artist}</td>
                    <td width={200}><img width={200} height={200} src={this.state.url}></img></td>
                </tr>
            );
        }
    }

    code = (name: string) => {
        return name.replace(/[\W_]+/g, "-");
    }

    gangnem = () => {
        fetch("/" + this.code(this.props.artist) + "/" + this.code(this.props.album))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    url: data
                })
            });
    }
}

export default TableRow;