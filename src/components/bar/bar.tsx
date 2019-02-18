import { Component } from '@stencil/core';

@Component({
  tag: 'my-bar',
  shadow: true // Doesn't matter
})
export class Bar {
  render() {
    return <div>bar: <slot /></div>;
  }
}
