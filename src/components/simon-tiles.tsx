import { Component, Prop, State, Listen, Event, EventEmitter, Watch, h } from '@stencil/core';


@Component({
    tag: 'simon-tiles',
    styleUrl : 'simon-tiles.css'
})
export class SimonTiles{
    get isPlaying() {
        return this.step < this.animationPattern.length;
    }
    @State()
    step:number = 0;

    @Prop()
    animationPattern:number[];
    
    @Watch('animationPattern')
    animationPatternChanged() {
        this.step = 0;
    }

    @Event()
    tileClicked: EventEmitter;

    @Listen('animationiteration')
    blinkFinished() {
        this.step += 1;
    }
    render() {
        let tiles = [];

        for (let i = 1; i <= 4; i++) {
            let status = {};
            status['tile'] = true;
            status['tile' + i] = true;
            status['blink'] = this.animationPattern[this.step] == i;
            if (this.isPlaying) {
                tiles.push(<button class={ status }></button>);
            } else {
                tiles.push(<button onClick={ () => this.tileClicked.emit(i) } class={ status }></button>);
            }     
        }
        return(
            <div class="cont">{ tiles }</div>
        );
    }
}