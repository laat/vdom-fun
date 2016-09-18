// @flow
import type { VNode } from './hyperscript'
import { decamelize } from './utils/camelize';
import { getAttributes } from './utils/dom';
import diff from './diff';
import applyPatches from './apply-patches';

/**
 * This callback renders props to vdom nodes.
 * @callback renderCallback
 * @param {Object} props - Props object.
 */

/**
 * Define a Web Component
 * @param {string} name - Component name. must contain hyphen [-].
 * @param {string[]} [props] - camelCased props to observe.
 * @param {renderCallback} render - callback to render props to vdom.
 */
const define = (name: string, render: (props: Object) => VNode) => {
    const props = Object.keys(render.props || {});
    const kebabProps = props.map(decamelize); // kebab-case

    class cl extends HTMLElement {
        connected: boolean;
        vdom: VNode;

        connectedCallback() {
            this.connected = true;
            this.render();
        }
        static get observedAttributes() {
            return kebabProps;
        }
        attributeChangedCallback() {
            this.render();
        }
        render() {
            if (!this.connected) {
                return;
            }

            const attrs = getAttributes(this);
            const vdom = render(attrs);
            const patches = diff(this.vdom, vdom);
            applyPatches(this, patches);

            this.vdom = vdom;
        }
    }

    customElements.define(name, cl);
    return cl;
}

export default define;
