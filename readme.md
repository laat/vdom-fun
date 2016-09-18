# vdom-fun

> Home made, minimal virtual-dom

## Notes

First working example was created Sun Sep 18, and it took about a day
to finish. The implementation is heavily inspired by
[virtual-dom][virtual-dom] with help from
[deathmood blogpost][deathmood].

Uses [Custom Elements v1][cev1].

[SkateJS][skatejs] is very similar, although it does not use
virtual-dom but [incremental DOM][incdom] (slower, but lower memory
usage);

This implementation is naive, and does not handle adding elements to
the start of a lists very well because it creates very many DOM
edits. Figuring out if an element is added at a random point in an
array is [hard][arrayDiff].

Binding events is not implemented.

[Custom Elements v1][cev1] has `customElements.define()` on `window`,
while `Custom Elements v0` had `registerElement()` on `document`. With
`registerElement` on document it was possible to have document-local
tags, which played well with `HTML Imports`. That meant that I could
define all component dependencies *with* the component with
version numbers. Even if another imported component had an
incompatible custom element with the same name I could be sure that my
component still got the correct component.

*Q:* Will it still be possible to have component-local tag imports?
Without it I cannot see how this is safe in large code-bases...

## Defining a component
```javascript
/** @jsx h */
import define from './define-element';
import h from './hyperscript';

const myComponent = (props) => (
  <ul>
    <li>{props.example}</li>
    <li hidden={props.hidden}>hidden?</li>
  </ul>
)

myComponent.props = {
  example: true, // true means that it is required. No real check implemented ¯\_(ツ)_/¯
  hidden: false,
};

define('my-component', myComponent);
```

## Using the component

```html
<my-component example="hello world" hidden={true}></my-component>
```

## Tested with Chrome 53

Anything else will probably crash hard.

## License

MIT © [Sigurd Fosseng](https://github.com/laat)

[virtual-dom]: https://github.com/Matt-Esch/virtual-dom
[deathmood]: https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060#.h4cofzo9m
[cev1]: https://developers.google.com/web/fundamentals/primers/customelements/?hl=en
[skatejs]: https://github.com/skatejs/skatejs
[incdom]: https://github.com/google/incremental-dom
[arrayDiff]: https://github.com/Matt-Esch/virtual-dom/blob/22395e9b5d0bb5b19c0898ebc9fe0536eaac4a3e/vtree/diff.js#L222
