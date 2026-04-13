import { createContext, useMemo, useState } from "react";
import Modal from "../components/modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  const openModal = ({ title, content }) => {
    setModalState({
      isOpen: true,
      title: title ?? "",
      content: content ?? null,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal
        title={modalState.title}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  );
};
