// @flow
import type { VNode } from './hyperscript'
import { setAttributes } from './utils/dom';

export const createElement = (node: VNode) => {
    if (node == null) {
        return null;
    }
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    // $IgnoreFlow
    const $el = document.createElement(node.type);

    setAttributes($el, node.props);

    for (const child of node.children) {
        if (child != null) {
            const $child = createElement(child);
            $el.appendChild($child);
        }
    }

    return $el;
};
