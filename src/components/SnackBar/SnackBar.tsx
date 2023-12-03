import * as React from "react";
import styles from "./styles/SnackBar.module.scss";

/** 
 * SnackBar props interface
*/
interface ISnackBarProps {
  open:boolean;
  message:string;
}

/** 
 * SnackBar state interface
*/
interface ISnackBarState {

}


/** 
 * SnackBar component.
 * Display a notification at the bootom of the screen.
 * Call when an error occur.
*/
class SnackBar extends React.Component<ISnackBarProps, ISnackBarState> {
  constructor(props: ISnackBarProps) {
    super(props);
    this.state = {};
  }

  /**
     * React Render Function.
     * This function is the render of the component.
     * @returns React.JSX.Element
     */
  render() {
    return (
      <div className={this.props.open == true ? styles.snackBarContainer : styles.snackBarContainer + " " + styles.snackBarContainerClosed}>
        <div className={styles.snackBarContent}>
          {this.props.message}
        </div>
      </div>
    );
  }
}

export default SnackBar;