const handleShowPassword = (setShowPassword: React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowPassword((show) => !show);
  };

export default handleShowPassword;