// ======================================================= Menu List Filter ==============================================
export const menuListFilter = (menu, privileges) => {
  return privileges?.map((privilege) => {
    const matchedModule = menu?.find((menuItem) => privilege.module === menuItem?.module);
    if (matchedModule) {
      const filteredNestedItems = matchedModule.nestedItems?.filter((nestedItem) =>
        privilege.pages.includes(nestedItem.page)
      );
      return {
        ...matchedModule,
        nestedItems: filteredNestedItems
      };
    }
    return null;
  }).filter(Boolean);
};