interface AddCareProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCareProviderModal({
  isOpen,
  onClose,
}: AddCareProviderModalProps) {
  return (
    <dialog
      id="add-care-provider-modal"
      className="modal"
      open={isOpen}
      onClose={onClose}
    >
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">事業所を登録</h3>

        <label className="input w-full">
          <span className="label">事業所名</span>
          <input type="text" className="grow" />
        </label>
        <label className="input w-full">
          <span className="label">住所</span>
          <input type="text" className="grow" />
        </label>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
