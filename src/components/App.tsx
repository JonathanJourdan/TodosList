import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/global.module.scss";
import TodoList from "./Todo/TodoList/TodoList";
import { sleep } from "../helpers/helpers";
import TodoView from "./Todo/TodoView/TodoView";

interface IAppState {
  error: {
    isError: boolean;
    message: string;
  }
}

/** 
 * App component.
 * Enter point off the app
 * Use react router for rooting
*/
export default class App extends React.Component<unknown, IAppState> {
  private routerBasename: string = window.basename;

  public constructor(props: any) {
    super(props);
    this.state = {
      error: {
        isError: false,
        message: ""
      }
    };
  }

  /**
  * CallBack function call in children component to pass error to the Layout Component for display it.
  * Take the error message at optional parameter.
  * @returns void
  */
  private toggleError = (message?: string) => {
    this.setState({ error: { isError: !this.state.error.isError, message: message != undefined ? message : "" } }, () => {
      if (this.state.error.isError == true) {
        sleep(3000).then(() => this.toggleError());
      }
    });
  };

  /**
     * React Render Function.
     * This function is the render of the component.
     * @returns React.JSX.Element
     */
  public render(): JSX.Element {
    return (
      <BrowserRouter basename={this.routerBasename}>
        <Routes>
          <Route path="/" element={<Layout error={this.state.error} />}>
            <Route path="/" element={<TodoList toggleError={this.toggleError} />} />
            <Route path="todo/:idTodo" element={<TodoView toggleError={this.toggleError} />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}