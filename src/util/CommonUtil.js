// ======================================================= Menu List Filter ==============================================
export const menuListFilter = (menu, privileges) => {
  return privileges
    ?.map((privilege, index) => {
      // Find the menu item that matches the privilege module
      const matchedModule = menu?.find(
        (menuItem) => privilege?.module === menuItem?.module
      );

      if (matchedModule) {
        // Filter nested items to include only pages with the "View" permission
        const filteredNestedItems = matchedModule.nestedItems?.filter(
          (nestedItem) =>
            privilege?.pagesWithPermissions?.[nestedItem.page]?.includes("View")
        );

        return {
          ...matchedModule,
          itemNumber: index, // Dynamically assign itemNumber based on index
          nestedItems: filteredNestedItems,
          order: privilege.order, // Add order property to maintain the sequence
        };
      }
      return null;
    })
    .filter(Boolean) // Filter out null values
    .sort((a, b) => a.order - b.order); // Sort items based on the order property
};

// ========================================================== DATE FORMATOR =================================================
export const dateFormatter = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}/${month}/${day}`;
};

// ========================================================== DATE FORMATOR =================================================
export const dateFormatterTwo = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// ======================================================== DOWNLOAD SAMPLE FILE ========================================
export const downloadSampleHandle = (fileName) => {
  const fileUrl = `${process.env.PUBLIC_URL}/${fileName}.xlsx`;
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
