// ======================================================= Menu List Filter ==============================================
// export const menuListFilter = (menu, privileges) => {
//   return privileges?.map((privilege, index) => {
//     const matchedModule = menu?.find((menuItem) => privilege?.module === menuItem?.module);
//     if (matchedModule) {
//       const filteredNestedItems = matchedModule.nestedItems?.filter((nestedItem) =>
//         privilege.pages.includes(nestedItem.page)
//       );
//       return {
//         ...matchedModule,
//         nestedItems: filteredNestedItems
//       };
//     }
//     return null;
//   }).filter(Boolean);
// };
export const menuListFilter = (menu, privileges) => {
  return privileges?.map((privilege, index) => {
    const matchedModule = menu?.find((menuItem) => privilege?.module === menuItem?.module);
    if (matchedModule) {
      const filteredNestedItems = matchedModule.nestedItems?.filter((nestedItem) =>
        privilege.pages.includes(nestedItem.page)
      );
      return {
        ...matchedModule,
        itemNumber: index, // Dynamically assign itemNumber based on index
        nestedItems: filteredNestedItems
      };
    }
    return null;
  }).filter(Boolean); // Filter out null values
};
// ========================================================== DATE FORMATOR =================================================
export const dateFormatter = (date) => {
  const d = new Date(date);
  
  const day = String(d.getDate()).padStart(2, '0'); // Pads day with leading zero
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();
  
  // return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
  return `${year}/${month}/${day}`; // Format: DD-MM-YYYY
};

// ========================================================== DATE FORMATOR =================================================
export const dateFormatterTwo = (date) => {
  const d = new Date(date);
  
  const day = String(d.getDate()).padStart(2, '0'); // Pads day with leading zero
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();
  
  // return `${day}-${month}-${year}`; // Format: DD-MM-YYYY
  return `${year}-${month}-${day}`; // Format: DD-MM-YYYY
};