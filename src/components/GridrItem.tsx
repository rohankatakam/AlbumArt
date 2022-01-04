import React from "react";

type MyProps = {
    // using `interface` is also ok
    pixelLength: number;
    url: string;
};
type MyState = {
    pixelLength: number
    url: string
};
class GridrItem extends React.Component<MyProps, MyState> {
    state = {
        pixelLength: this.props.pixelLength,
        url: this.props.url
    };

    render() {
        return (
            <img width={this.props.pixelLength} height={this.props.pixelLength} src={this.props.url} />
        )
    }
}

export default GridrItem;