/**
 * @returns the {@link items} to be displayed
 */
export const fetchItems = async () => {
  try {
    const response = await fetch('/api/items');
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};
