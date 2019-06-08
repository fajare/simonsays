import { Component, State, Listen, Prop, h} from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { Game } from './game-logic';

@Component({
    tag: 'simon-main',
})
export class SimonMain {

    protected game:Game;
    protected userProposal;
    

    @Prop() history:RouterHistory;
    @Prop() loss: boolean = false;



    @State() animationPattern;


    @Listen('tileClicked')
    tileClickes(event: CustomEvent) {
        this.userProposal.push(event.detail);

        if (this.game.comparePatterns(this.userProposal, this.animationPattern)) {
            if (this.userProposal.length == this.animationPattern.length) {
                setTimeout(() => {
                    this.animationPattern = [
                        ...this.animationPattern ,
                        this.game.createNewStep()
                    ];
                    this.userProposal = [];  
                }, 500);                             
            }
        } else {
            // this.history.replace(`/gameover/${ this.animationPattern.length - 1 }`, {});
            this.loss = true;
        }
    }

    componentWillLoad() {
        this.game = new Game();
        this.userProposal = [];
        this.animationPattern = [ this.game.createNewStep() ];
    }

    render() {
      return (
        <main>
            <h1>{ !this.loss ? "Simon Says" : "You Lose, try again!"}</h1>
            <simon-tiles animationPattern={ this.animationPattern }></simon-tiles>
            {/* <button class="start" onClick={() => this.history.replace(`/`)}>Let's Go</button> */}
            <div class="start">  
              <stencil-route-link url="/">Start game</stencil-route-link>
          </div>
        </main>
      );
    }
}