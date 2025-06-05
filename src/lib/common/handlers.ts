export function toggle(
  dialog: HTMLDialogElement | undefined | null,
  modal = true,
) {
  if (!dialog) {
    return;
  }
  if (dialog.open) {
    dialog.close();
  } else {
    if (modal) {
      dialog.showModal();
    } else {
      dialog.show();
    }
  }
}
