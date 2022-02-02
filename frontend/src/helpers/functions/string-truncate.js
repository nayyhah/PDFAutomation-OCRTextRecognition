export const stringTruncateFromCenter = (str, maxLength) => {
  const midChar = "…"; // character to insert into the center of the result
  var left, right;

  if (str.length <= maxLength) return str;

  // length of beginning part
  left = Math.ceil(maxLength / 2);

  // start index of ending part
  right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substr(0, left) + midChar + str.substring(right);
};
