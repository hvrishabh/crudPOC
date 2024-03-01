const Validation = (values) => {
  let error = {};

  const namePattern = /^[a-zA-Z]+$/;
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else if (!namePattern.test(values.name)) {
    error.name = "Name should only contains characters";
  } else {
    error.name = "";
  }

  //   switch (values.name) {
  //     case "":
  //       error.name = "Name should not be empty";
  //       break;
  //     case !namePattern.test(values.name):
  //       error.name = "Name should only contains characters";
  //       break;
  //     default:
  //       error.name = "";
  //   }

  if (values.email === "") {
    error.email = "email should not be empty";
  } else if (!emailPattern.test(values.email)) {
    error.email = "enter a valid email address";
  } else {
    error.email = "";
  }
  return error;
};

export default Validation;
