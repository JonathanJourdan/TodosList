import * as React from "react";
import styles from "./styles/Todo.module.scss";
import { Link } from "react-router-dom";

/** 
 * Todo item interface
*/
export interface ITodo {
  id: string;
  title: string;
  description: string;
  done: boolean;
  order: number;
}

/** 
 * Todo props interface
*/
interface ITodoProps {
  todoItem: ITodo;
  checkTask: (idTodo: string) => void;
}

/** 
 * Todo state interface
*/
interface ITodoState {

}

/** 
 * Todo class Component
 * Display a todoElement with checkbox and title
*/
class Todo extends React.Component<ITodoProps, ITodoState> {
  constructor(props: ITodoProps) {
    super(props);
    this.state = {

    };
  }

  /**
     * React Render Function.
     * This function is the render of the component.
     * @returns React.JSX.Element
     */
  render() {
    return (
      <div className={this.props.todoItem.done == true ? styles.todoContainer + " " + styles.todoContainerChecked : styles.todoContainer}>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id={this.props.todoItem.id}
            name={this.props.todoItem.title}
            value=""
            onChange={() => this.props.checkTask(this.props.todoItem.id)}
            checked={this.props.todoItem.done}
          />
          <label htmlFor={this.props.todoItem.id}>
            <span></span>
          </label>
        </div>
        <Link style={this.props.todoItem.done == true ? { textDecoration: "line-through" } : {}} className={styles.todoTitle} to={"todo/" + this.props.todoItem.id}>
          {this.props.todoItem.title}
        </Link>
      </div>
    );
  }
}

export default Todo;