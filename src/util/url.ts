export const getLocation = () => {
  const hostArr = location.host.split(".");
  return hostArr.length === 2 ? hostArr.join(".") : hostArr.slice(1).join(".");
};
