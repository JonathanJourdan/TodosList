import * as React from "react";
import styles from "./styles/spinner.module.scss";

/** 
 * Spinner component.
 * Display a Spinner.
 * Call when loading event is necessary.
*/
class Spinner extends React.Component<unknown, unknown> {
  constructor(props: unknown) {
    super(props);
  }

  /**
    * React Render Function.
    * This function is the render of the component.
    * @returns React.JSX.Element
    */
  render() {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader} />
      </div>
    );
  }
}

export default Spinner;