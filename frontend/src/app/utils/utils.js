export const ToShortAddress = (address) => {
  return address.substring(0, 5) + "..." + address.substr(address.length - 5);
};
