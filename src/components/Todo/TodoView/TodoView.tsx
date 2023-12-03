import * as React from "react";
import { WithRouter, IWithRouter } from "../../WithRouter/WithRouter";
import { ITodo } from "../Todo/Todo";
import { getItemByKey } from "../../../helpers/DBHelper";
import Spinner from "../../Spinner/Spinner";
import styles from "./styles/TodoView.module.scss";

/** 
 * TodoView component props interface
*/
interface ITodoViewProps {
  toggleError?: (message?: string) => void;
}

/** 
 * TodoView component state interface
*/
interface ITodoViewState {
  todoItem: ITodo;
  loading: boolean;
}


/** 
 * TodoView component.
 * Display a todo item with it's descrisption
*/
class TodoView extends React.Component<ITodoViewProps & IWithRouter, ITodoViewState> {
  constructor(props: ITodoViewProps & IWithRouter) {
    super(props);
    // State initialisation
    this.state = {
      loading: true,
      todoItem: null
    };
  }

  /**
  * React componentDidMount function.
  * It's call just after the first React render function.
  * Check if a todo id is in the url parameter and pass it to the getTodoItem function.
  * @returns void
  */
  componentDidMount(): void {
    // Check if idTodo is set in the url
    if (this.props.params.idTodo != undefined && this.props.params.idTodo != null) {
      const idTodo: string = this.props.params.idTodo;
      // Call the function to get the item
      this.getTodoItem(idTodo);
    }
    else {
      this.setState({ todoItem: null, loading: false });
    }
  }

  /**
   * getTodoItem function.
   * This function get the itemin the db.
   * Take a todoId param
   * @returns void
   */
  private getTodoItem = (todoId: string) => {
    this.setState({ loading: true }, async () => {
      try {
        // Call the function for get item in db 
        // We can call a back office with axios for example
        const item = await getItemByKey(todoId);
        if (item != undefined) {
          this.setState({ todoItem: item, loading: false });
        }
        else {
          this.setState({ todoItem: null, loading: false });
        }
      } catch (error) {
        console.error("Error getTodoItem : ", error);
        this.setState({ loading: false }, () => {
          this.props.toggleError("Error when loading item, please retry...");
        });
      }
    });
  };

  /**
     * React Render Function.
     * This function is the render of the component.
     * @returns React.JSX.Element
     */
  render() {
    return (
      <div className={styles.todoViewContainer}>
        <button className={styles.BackButton} onClick={() => { this.props.navigate("/");}} title="Back to Todo list">{"<"}</button>
        {
          this.state.loading == true ?
            <Spinner />
            :
            this.state.todoItem != undefined && this.state.todoItem != null ?
              <div>
                <h2>{this.state.todoItem.title}</h2>
                {
                  this.state.todoItem.description != undefined && this.state.todoItem.description != null && this.state.todoItem.description != "" ?
                    <React.Fragment>
                      <hr />
                      <p>{this.state.todoItem.description}</p>
                    </React.Fragment>
                    :
                    <React.Fragment />
                }

              </div>
              :
              <div>
                No todo found or selected !
              </div>
        }
      </div>
    );
  }
}

export default WithRouter(TodoView);