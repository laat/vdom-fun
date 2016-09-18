// @flow
import type { Patch } from './diff';
import { setAttribute } from './utils/dom';
import { createElement } from './create-element';

const applyPatch = ({ patch, el }) => {
    switch(patch.type) {
        case 'create': {
            const $child = createElement(patch.node);
            if (el.$parent instanceof HTMLElement && $child !== null) {
                el.$parent.appendChild($child);
            } else {
                console.error('PATCH failed', patch, el)
            }
            break;
        }
        case 'remove': {
            if (el.$el != null && el.$parent != null) {
                el.$parent.removeChild(el.$el);
            } else {
                console.error('PATCH failed', patch, el)
            }
            break;
        }
        case 'replace': {
            const $child = createElement(patch.node);
            if ($child != null && el.$el != null && el.$parent instanceof HTMLElement) {
                el.$parent.replaceChild($child, el.$el);
            } else {
                console.error('PATCH failed', patch, el)
            }
            break;
        }
        case 'prop_set': {
            if(el.$el instanceof HTMLElement) {
                setAttribute(el.$el, patch.key, patch.value);
            } else {
                console.error('PATCH failed', patch, el)
            }
            break;
        }
        case 'prop_delete': {
            if(el.$el instanceof HTMLElement) {
                el.$el.removeAttribute(patch.key);
            } else {
                console.error('PATCH failed', patch, el)
            }
            break;
        }
        default:
            console.log('unhandeled patch', patch, el);
    }
}

type El = Node | HTMLElement;

const getEl = ($el: ?El, $parent: ?El, path: Array<number>) => {
    if (path.length === 0) {
        return { $el, $parent, path };
    }
    if ($el == null) {
        return { $el, $parent, path };
    }
    const i = path.shift();
    const $child = $el.childNodes.item(i);
    return getEl($child, $el, path);
}

export default ($el: HTMLElement, patches: Array<Patch>) => {
    // must be done first, because patching destroys paths
    const args = patches.map(patch => ({
        patch,
        el: getEl($el, $el, [...patch.path]),
    }));

    for (const patch of args) {
        applyPatch(patch);
    }
}
