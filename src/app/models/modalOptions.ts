export interface ModalOptions {
  title?: string;
  confirmationSentence?: string;
  confirmationLabel?: string;
  onConfirm?: () => void;
  displayHeader?: boolean;
  data?: any;
  animations?: {
    modal?: {
      enter?: string;
      leave?: string;
    };
    overlay?: {
      enter?: string;
      leave?: string;
    };
  };
  size?: {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
  };
}