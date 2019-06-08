import '@stencil/router';
import { Component, h } from '@stencil/core';

@Component({
    tag: 'simon-game',
})
export class SimonGame {
  render() {
    return (
      <stencil-router root="/simonsays/">
          <stencil-route url='/' component='simon-main'></stencil-route> 
      </stencil-router>
    );
  }
}