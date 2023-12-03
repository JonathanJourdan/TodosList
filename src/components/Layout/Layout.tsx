import * as React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/Layout.scss";
import { WithRouter, IWithRouter } from "../WithRouter/WithRouter";
import SnackBar from "../SnackBar/SnackBar";

/**
  * Layout props interface
*/
interface LayoutProps {
  error: {
    isError: boolean;
    message: string;
  }
}

/**
  * Layout state interface
*/
interface LayoutState {

}

/** 
 * Layout component.
 * It's the general Layout component for the app.
*/
class Layout extends React.Component<IWithRouter & LayoutProps, LayoutState> {
  constructor(props: IWithRouter & LayoutProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.layoutContainer}>
        <main className={styles.content}>
          <Outlet />
          <SnackBar open={this.props.error.isError} message={this.props.error.message} />
        </main>
      </div>
    );
  }
}

export default WithRouter(Layout);