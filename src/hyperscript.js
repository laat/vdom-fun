// @flow
export type AttributeValue = string | boolean;
export type Props = {[key: string]: AttributeValue };
type Node = {
    type: string,
    props: Props,
    children: Array<?VNode>,
};
export type VNode = Node | string;

const h = (type: string, props: Props, ...children: Array<?VNode>): VNode => ({
    type,
    props: props || {},
    children: children.filter(c => c != null),
});

export default h;
