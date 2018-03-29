import React from 'react';
import InputText from './input-text';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Editable extends React.Component {
    state = {
        text: this.props.value || ''
    }

    renderView = (props) => {
        return (
            <div onDoubleClick={this.onDoubleClick} className='value'>
                {props.value}
            </div>
        )
    }

    onDoubleClick = () => {
        this.props.onEdit({editing: true});
    }

    renderEditingView = (props, state) => {
        const {value} = props;
        return (
            <InputText
                editing={state.editing}
                text={value}
                onSave={props.onSave}
            />
        )
    }

    renderComponent = (props, state) => {
        const { className } = this.props;
        const cls = classNames(className, {
            editable: true
        });
        const { editing } = this.props;
        return (
            <div className={cls} title='Double click to edit'>
                {editing ? this.renderEditingView(props, state) : this.renderView(props, state)}
            </div>
        );
    }

    render() {
        return this.renderComponent(this.props, this.state);
    }
}

Editable.propTypes = {
    value: PropTypes.string
};
