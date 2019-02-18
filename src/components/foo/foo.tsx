import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'my-foo',
  shadow: true // Error occurs only if true
})
export class Foo {
  @Prop({ mutable: true }) toggle: boolean = true;
  @Prop() dummy: string; // Only used to trigger re-render

  render() {
    return <div>
      <button type="button" onClick={() => this.toggle = !this.toggle}>Toggle</button>
      
      {this.toggle && <div> {/* If we change this <div> to e.g. <span>, then the events are always triggered as expected */}
        {/* This event is always triggered, even when toggled away and back */}
        <my-bar onClick={() => console.log("my-bar: 1")}>1</my-bar>
      </div>}
      {!this.toggle && <div>
        {/* This event is not triggered, unless this element is rendered first (toggle==false). But subsequent toggles will
        cause this event not to be triggered anymore - unless a separate re-render is essentially rendering this another timer */}
        <my-bar onClick={() => console.log("my-bar: 2")}>2</my-bar>
      </div>}
      {/* Note: the problems does also not occur for events on non-webcomponent elements. E.g. <div onClick={...}>s will execute properly */}
    </div>;
  }
}
