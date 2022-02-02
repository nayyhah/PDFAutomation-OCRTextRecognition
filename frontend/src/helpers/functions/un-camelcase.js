export const unCamelCase = function camelToSpace(txt) {
  return txt
    .replace(/([^A-Z]*)([A-Z]*)([A-Z])([^A-Z]*)/g, "$1 $2 $3$4")
    .replace(/ +/g, " ");
};
// camelToSpace("camelToSpaceWithTLAStuff");
