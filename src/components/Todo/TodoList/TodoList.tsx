import * as React from 'react';
import { ITodo } from "../Todo/Todo";
import Todo from "../Todo/Todo";
import Modal from "../../Modal/Modal";
import styles from "./styles/todoList.module.scss";
import { createGuid } from '../../../helpers/helpers';
import { addOrUpdateDataInDB, getAllItems, openInitializedDB } from '../../../helpers/DBHelper';
import Spinner from '../../Spinner/Spinner';



/** 
 * TodoList component props interface
*/
interface ITodoListProps {
  toggleError?: (message?: string) => void;
}

/** 
 * TodoList component state interface
*/
interface ITodoListState {
  todosList: ITodo[];
  loading: boolean;
  openAddModal: boolean;
}

/** 
 * TodoList component
 * Display all todo items with the possibility to check (validate) a todo task
*/
class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor(props: ITodoListProps) {
    super(props);
    // State init with default todos values
    this.state = {
      loading: true,
      todosList: [
        {
          id: "8d60c2df-7a61-4a54-a043-03baa29f0fbb",
          title: "Find a new job !",
          description: "",
          done: false,
          order: 1
        },
        {
          id: "5d4e5fec-c19e-479e-8900-16a3da541684",
          title: "Call Mom when i have time",
          description: "",
          done: false,
          order: 2
        },
        {
          id: "d6b7354e-057d-4299-a1f6-af0e87e7e72a",
          title: "I'm a Todo !",
          description: "Good description !",
          done: false,
          order: 3
        }
      ],
      openAddModal: false
    };
  }

  /**
  * React componentDidMount function.
  * It's call just after the first React render function.
  * It's call the initialisation DB function for init and connect to the local indexedDB db.
  * Init the db with the default state data values.
  * @returns void
  */
  componentDidMount(): void {
    openInitializedDB(this.state.todosList).then(() => {
      this.getTodoItems();
    });
  }

  /**
    * Function for get all todo items in the DB.
    * Set the result in the state.
    * @returns void
    */
  private getTodoItems = () => {
    this.setState({ loading: true }, async () => {
      try {
        const items = await getAllItems();
        this.setState({ todosList: items, loading: false });
      } catch (error) {
        console.error("Error getTodoItems : ", error);
        this.setState({ loading: false }, () => {
          this.props.toggleError("Error when loading Todo items, please retry...");
        });
      }
    });
  };


  /**
   * Function for check/uncheck a todo in the list
   * This function is call in the Todo Component, it's a Todo component props.
   * Take the todo id clicked at parameter.
   * It's change the done key at true or false
   * @returns void
   */
  private checkTask = async (idTodo: string) => {
    try {
      const todosList = [...this.state.todosList];
      const indexForUpdate = todosList.findIndex(todo => todo.id == idTodo);
      todosList[indexForUpdate].done = !todosList[indexForUpdate].done;

      // Add or update item ws
      await addOrUpdateDataInDB(todosList[indexForUpdate]);

      this.setState({ todosList: todosList });
    } catch (error) {
      console.error("Error check/uncheck todo : ", error);
      this.props.toggleError("Error when check/uncheck Todo, please retry...");
    }
  };


  /**
   * Function for add a task/todo in the list
   * This function is call in the Todo Component, it's a Todo component props.
   * Take the todo id clicked at parameter.
   * It's change the done key at true or false
   * @returns void
   */
  private addTask: (event: any) => void = async (event: any) => {
    try {
      event.preventDefault();

      // Get form title field value
      const title = event.target.title.value;
      // Get form description field value
      const description = event.target.description.value;
      // Get all Todo in the state
      const todosList = this.state.todosList;

      // Create new TODO item
      const newTODO: ITodo = {
        id: createGuid(),
        title: title,
        description: description,
        done: false,
        order: (todosList.length + 1)
      };

      // Add the new todo in DB
      await addOrUpdateDataInDB(newTODO);

      // Push the new TODO in the todoList array
      todosList.unshift(newTODO);

      // Set the values in the state
      this.setState({ todosList: todosList }, this.toggleModal);
    } catch (error) {
      console.error("Error addTask : ", error);
      this.props.toggleError("Error add Todo, please retry...");
    }
  };

  /**
   * Function for add a task/todo in the list
   * This function is call in the Todo Component, it's a Todo component props.
   * Take the todo id clicked at parameter.
   * It's change the done key at true or false
   * @returns void
   */
  private toggleModal = () => {
    this.setState({ openAddModal: !this.state.openAddModal });
  };


  /**
   * React Render function of TodoList component
   * @returns React.JSX.Element
   */
  render() {
    return (
      <div className={styles.todoListContainer}>
        <button className={styles.addTodoButton} onClick={this.toggleModal} title="Add a new TODO">+</button>
        <h1>Todos list :</h1>
        {
          this.state.loading == true ?
            <Spinner />
            :
            this.state.todosList != undefined && this.state.todosList != null && this.state.todosList.length > 0 ?
              this.state.todosList.sort((a, b) => b.order - a.order).sort((a, b) => Number(a.done) - Number(b.done)).map(todoItem => <Todo key={todoItem.id} todoItem={todoItem} checkTask={this.checkTask} />)
              :
              <p>Todo list is empty !</p>
        }
        <Modal
          title="Add a new TODO"
          open={this.state.openAddModal}
          openCloseToggle={this.toggleModal}
        >
          <form className={styles.addTodoForm} onSubmit={this.addTask}>
            <div className={styles.field}>
              <label htmlFor="todoDescription">Todo title</label>
              <input type="text" id="todoTitle" name="title" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="todoDescription">Todo description</label>
              <textarea id="todoDescription" name="description" rows={5}></textarea>
            </div>
            <div className={styles.field}>
              <input type="submit" name="submit" value="Add" />
            </div>
            <div className={styles.field}>
              <input type="button" name="cancel" value="Cancel" onClick={this.toggleModal} />
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default TodoList;