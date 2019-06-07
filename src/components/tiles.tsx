import { Component, h } from '@stencil/core';

@Component({
    tag: 'simon-tiles',
})
export class Tiles{
    render() {
        let tiles = [];

        for (let i = 1; i <= 4; i++) {
            let status = {};
            status['tile'] = true;
            status['tile' + i] = true;
            tiles.push(<button class={ status }></button>) 
        }
        return(
            <div>{ tiles }</div>
        );
    }
}