import React, { ReactElement } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import GridrItem from "../components/GridrItem"

type MyProps = {
    // using `interface` is also ok
    pixelLength: string;
    rows: string;
    cols: string;
    images: string[];
};
type MyState = {
    collageOutput: ReactElement[][]
};
class Gridr extends React.Component<MyProps, MyState> {
    state = {
        collageOutput: []
    };

    componentDidMount() {
        // this.gangnem()
    }

    createCollage = (e: React.SyntheticEvent, grid: ReactElement[][]) => {
        e.preventDefault();
        console.log(grid)
    }

    render() {
        let temp: ReactElement[][] = [];
        // let temp: number[][] = [];

        for (let i = 0; i < parseInt(this.props.rows); i++) {
            temp[i] = []
            for (let j = 0; j < parseInt(this.props.cols); j++) {
                var imageIndex = i * parseInt(this.props.cols) + j
                var url = this.props.images[imageIndex]
                temp[i][j] = <GridrItem pixelLength={parseInt(this.props.pixelLength)} url={url} />
            }
        }

        return (<div><Container>
            {temp.map((row, index) =>
                <div>
                    <div key={index}>{row}</div>
                </div>
            )}
        </Container>
        </div>)
    }
}

export default Gridr;