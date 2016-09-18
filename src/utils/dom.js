// @flow
import { camelize, decamelize } from './camelize';

export const setAttribute = ($el: HTMLElement, name: string, value: string | boolean) => {
    const key = decamelize(name);
    if (value === false) {
        $el.removeAttribute(key);
    } else if (value === true) {
        $el.setAttribute(key, '');
    } else if (name === 'class-name') {
        $el.setAttribute('class', value);
    } else {
        $el.setAttribute(key, value);
    }
}

type Props = {[key: string]: any}
export const setAttributes = ($el: HTMLElement, props: Props) => {
    for (const [name, value] of Object.entries(props)) {
        if (typeof value === 'string' || typeof value === 'boolean') {
            setAttribute($el, name, value);
        }
    }
}

export const getAttributes = ($el: HTMLElement) => {
    const props = {};
    for (let i = 0; i < $el.attributes.length; i++){
        let { nodeName, nodeValue, nodeType } = $el.attributes.item(i);
        if (nodeType === Node.ATTRIBUTE_NODE) {
            if (nodeValue === '') {
                nodeValue = true;
            }
            props[camelize(nodeName)] = nodeValue;
        }
    }
    return props;
}
