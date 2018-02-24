import React  from 'react';
import InputText from './input-text';
import classNames from 'classnames';

export default class Editable extends React.Component {
  state = {
    editing: false
  }

  renderView = (props) => {
      return (
        <div onDoubleClick={this.onDoubleClick} className='value'>
          { props.value }
        </div>
      )
  }

  onDoubleClick = () => {
    this.setState({ editing: true })
  }

  renderEditingView = (props, state) => {
    const { value } = props;
    return (
      <InputText
        editing={state.editing}
        text={value}
        onSave={(text) => this.handleSave(text)}
      />
    )
  }

  handleSave = (text) => {
    this.props.onEdit(text);
    this.setState({ editing: false });
  }

  renderComponent = (props, state) => {
    const { className } = this.props;
    const cls = classNames(className, {
      editable: true
    })
    const { editing } = this.state;
    return (
      <div className={cls}  title='Double click to edit'>
        { editing ? this.renderEditingView(props, state) : this.renderView(props, state)}
      </div>
    );
  }
  render() {
    return this.renderComponent(this.props, this.state);
  }
}
