function handleCapslock(
  event: React.KeyboardEvent<HTMLInputElement>,
  setError: (value: string) => void
) {
  event.target.addEventListener("keyup", function () {
    if (event.getModifierState("CapsLock")) {
      setError("CapsLock Ativado");
    } else {
      setError("");
    }
  });
}

export default handleCapslock;
