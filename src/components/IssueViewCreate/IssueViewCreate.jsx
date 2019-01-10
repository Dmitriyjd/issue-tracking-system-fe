import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import './style.css';

class IssueViewCreate extends PureComponent {
  onCreate() {
    const formData = {
      issue_name: this.issue_name.value,
      description: this.description.value,
      assignee_id: this.state.assignee_id,
      priority_id: this.state.priority_id,
      estimation: this.estimation.value,
      board_id: this.state.board_id,
    };
    this.props.makeCreateIssueRequest(formData);
  }

  onColumnsListUpdate() {
    const formData = {
      board_id: this.state.board_id
    };
    this.props.makeBoardColumnsRequest(formData);
  }

  renderAssigneeList() {
    const assigneeList = this.props.assignee_array;
    const current_assignee_id = this.props.current_assignee_id;

    return (
      <select
        ref={(ref) => {this.assignee_id = ref;}}
        onChange={(event) => {
          const selectedIndex = event.target.options.selectedIndex;
          this.setState({ assignee_id:event.target.options[selectedIndex].getAttribute('_id') })
        }}
      >
        {
          assigneeList.map(assignee => (
            <option key = { assignee._id }
                    asignee_id = { assignee._id }
                    selected = { assignee.user_id === current_assignee_id }
            >
              { assignee.email }
            </option>
          ))
        }
      </select>
    )
  }

  renderBoardList() {
    const board_array = this.props.board_array;
    return (
      <select
        ref={(ref) => {this.board_id = ref;}}
        onChange={(event) => {
          const selectedIndex = event.target.options.selectedIndex;
          this.setState({ board_id:event.target.options[selectedIndex].getAttribute('board_id') },
            this.onColumnsListUpdate()
          )
        }}
      >
        {
          board_array.map(board => (
            <option
              key={board.board_id}
              board_id = { board.board_id }
            >
              { board.board_name }
            </option>
          ))
        }
      </select>
    )
  }

  renderColumnList() {
    const columnList = this.props.columns;
    return (
      <select
        ref={(ref) => {this.column_id = ref;}}
        onChange={(event) => {
          const selectedIndex = event.target.options.selectedIndex;
          this.setState({ board_id:event.target.options[selectedIndex].getAttribute('column_id') }
          )
        }}
      >
        {
          columnList.map(column => (
            <option
              key={column.column_id}
              column_id={column.column_id}
            >
              {column.column_name}
            </option>
          ))
        }
      </select>
    )
  }

  renderPriorityList() {
    const priority_array = this.props.priority_array ;

    return (
      <select
        ref = {(ref)=>{this.priority_id = ref;}}
        onChange={(event) => {
          const selectedIndex = event.target.options.selectedIndex;
          this.setState(event.target.options[selectedIndex].getAttribute('priority_id'));
        }}>
        {
          priority_array.map(priority => (
            <option key={priority.priority_id}
                    priority_id={priority.priority_id}
            >
              {priority.priority_name}
            </option>
          ))
        }
      </select>
    )
  }

  render () {
    return (
      <div className="issue-view-create">
        <div className="issue-view-create__body">
          <div className="issue-view-create__body-issue">
            <span> Название задачи: </span>
            <input ref={(ref) => {this.issue_name = ref;}}/>
          </div>
          <div className="issue-view-create__body-issue">
            <span> Описание: </span>
            <textarea />
          </div>
          <div className="issue-view-create__body-issue">
            {this.renderBoardList()}
          </div>
          <div className="issue-view-create__body-issue">
            {this.renderColumnList}
          </div>
          <div className="issue-view-create__body-issue">
            <span> Исполнитель:</span>
            {this.renderAssigneeList()}
          </div>
          <div className="issue-view-create__body-issue">
            <span> Приоритет: </span>
            {this.renderPriorityList()}
          </div>
          <div className="issue-view-create__body-issue">
            <span> Estimation: </span>
            <input defaultValue={this.props.estimation} ref={(ref) => {this.estimation = ref;}}/>
          </div>
          <div className="issue-view-create__buttons">
            <button className="issue-view-create__buttons-create" onClick={()=> this.onCreate()}> Создать задачу </button>
          </div>
        </div>
      </div>
    )
  }
}

IssueViewCreate.defaultProps = {
  description: '',
  assignee_email: '',
  priority_name: 'None',
  estimation: '',
  column_name:'',
  assignees: [],
  column_names: [],
  assignee_emails: [],
  reporter_email: '',
  current_assignee_id: '',
  current_column_id: '',
  current_priority_id: '',
};

IssueViewCreate.propTypes = {
  assignee_array: propTypes.array.isRequired,
  priority_array: propTypes.array.isRequired,
  column_array: propTypes.array.isRequired,
  board_array: propTypes.array.isRequired,
  makeCreateIssueRequest: propTypes.func,
};

export default IssueViewCreate;