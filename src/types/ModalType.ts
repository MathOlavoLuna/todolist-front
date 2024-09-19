export default interface ModalType {
  icon: string;
  size: string;
  firstBtnFunction?: () => void;
  modalIcon: string;
  modalTitle: string;
  secondBtnFunction: (title: string, content: string, priority: string) => void;
}
