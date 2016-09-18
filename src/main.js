import type { VNode } from './hyperscript';
import define from './define-element';
import h from './hyperscript';

type VcardProps = {
    firstName: string,
    lastName: string,
    email: string,
    extra: ?boolean,
}
const vcard = (props: VcardProps): VNode => (
    <ul>
        {(() => {
            if (props.extra) {
                return <li>extra</li>;
            }
        })()}
        <li>{ props.firstName } { props.lastName }</li>
        <li extra={props.extra}>{ props.email }</li>
        <li><my-name firstName={props.firstName} lastName={props.lastName}></my-name></li>
    </ul>
);
vcard.props = {
    firstName: true,
    lastName: true,
    email: true,
    extra: false,
};
const vcardComp = define("my-vcard", vcard);


const myName = (props): VNode => (
    <div checked>
      My name is {props.firstName} {props.lastName}
    </div>
);
myName.props = {
    firstName: true,
    lastName: true,
}
define("my-name", myName);
