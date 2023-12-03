import * as React from "react";
import styles from "./styles/modal.module.scss";

/** 
 * Modal props interface
*/
interface IModalProps {
  // Param for open or close the Modal
  open: boolean;
  // Function to open or close the Modal
  openCloseToggle: () => void;
  // Children of this component
  children?: JSX.Element;
  // Title for the Modal
  title?: string;
}

/** 
 * Modal state interface
*/
interface IModalState {

}

/** 
 * Modal class Component
 * Display a Modal on the screen
*/
class Modal extends React.Component<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {

    };
  }

  /**
    * Render function of Modal component
    * @returns React.JSX.Element
  */
  render() {
    // if open props true, we show the modal otherwise we mask it
    if (this.props.open == true) {
      return (
        <div className={styles.modalContainer}>
          <div onClick={this.props.openCloseToggle} className={styles.modalOverlay}></div>
          <div className={styles.modal}>
            {
              this.props.title != undefined && this.props.title != null && this.props.title != "" ? <h2 className={styles.modalTitle}>{this.props.title}</h2> : <React.Fragment />
            }
            {
              this.props.children
            }
          </div>
        </div>
      );
    }
    else {
      return <React.Fragment />;
    }
  }
}

export default Modal;