import { Component } from '@stencil/core';

@Component({
  tag: 'my-bar',
  shadow: true
})
export class Bar {
  render() {
    return <div>bar: <slot /></div>;
  }
}
