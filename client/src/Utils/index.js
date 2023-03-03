export const conditionAdapter = (condition) => {
  switch (condition.toString()) {
    case "0":
      return "New";
    case "1":
      return "Like New";
    case "2":
      return "Good";
    case "3":
      return "Acceptable";
    default:
      return "n/a";
  }
};
