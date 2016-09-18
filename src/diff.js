// @flow
import type { VNode } from './hyperscript'

type Path = Array<number>;
type CreatePatch = {
    type: 'create',
    node: VNode,
    path: Path,
}
type ReplacePatch = {
    type: 'replace',
    node: VNode,
    path: Path,
}
type RemovePatch = {
    type: 'remove',
    path: Path,
}
type PropSetPatch = {
    type: 'prop_set',
    key: string,
    value: string | boolean,
    path: Path,
}
type PropDeletePatch = {
    type: 'prop_delete',
    key: string,
    path: Path,
}

export type Patch = CreatePatch | ReplacePatch | RemovePatch | PropSetPatch | PropDeletePatch;

const CREATE = 'create';
const REMOVE = 'remove';
const REPLACE = 'replace';

const diffNode = (oldNode, newNode, patches, index = 0, parentPath=[]) => {
    if (oldNode == null && newNode == null) {
        return;
    }
    const path = [...parentPath, index];
    if (newNode == null) {
        patches.push({ type: 'remove', path });
    } else if (oldNode == null) {
        patches.push({ type: 'create', node: newNode, path });
    } else if (typeof newNode === 'string' || typeof oldNode == 'string') {
        if (newNode !== oldNode) {
            patches.push({ type: 'replace', node: newNode, path });
        }
    } else if (newNode.type !== oldNode.type) {
        patches.push({ type: 'replace', node: newNode, path });
    } else {
        diffProps(oldNode, newNode, patches, path);
        const oldChildren = oldNode.children
        const newChildren = newNode.children
        const maxLength = Math.max(newChildren.length, oldChildren.length);
        for (let i = 0; i < maxLength; i++) {
            diffNode(oldChildren[i], newChildren[i], patches, i, path);
        }
    }
}

const PROP_SET = 'prop_set';
const PROP_DELETE = 'prop_delete';
const diffProps = (oldNode, newNode, patches, path) => {
    const oldProps = oldNode.props;
    const newProps = newNode.props;
    for (const [key, value] of Object.entries(newProps)) {
        if (value == null) {
            patches.push({ type: 'prop_delete', key, path });

        } else if(typeof value === 'boolean' || typeof value === 'string') {
            if (value !== oldProps[key]) {
                patches.push({ type: PROP_SET, key, value, path });
            }
        }
    }
    for (const [key, value] of Object.entries(oldProps)) {
        if (!(key in newProps)) {
            patches.push({ type: PROP_DELETE, key, path });
        }
    }
};
const diff = (oldNode: ?VNode, newNode: ?VNode) => {
    const patches: Array<Patch> = [];
    diffNode(oldNode, newNode, patches);
    return patches;
};

export default diff;
