export const extractImageName = (image) => {
  if (!image) return "";
  try {
    const pathList = image.split("/");
    const name = pathList[pathList.length - 1].split(".")[0];
    return name;
  } catch (error) {
    return "";
  }
};
