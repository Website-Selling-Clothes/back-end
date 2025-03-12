export const categoriesNameAtLeast5Characters = new Error(
    "categoriesname must be at least 5 characters"
);
export const categoriesNameNotExisted = new Error(
    "categoriesname is not existed"
);
export const categoriesNameAtMost100Characters = new Error(
    "categoriesName must be at most 100 characters"
);
export const ErrCategoriesInactivated = new Error(
    "User is inactivated or banned"
);
export const ErrInvalidToken = new Error(
    "Invalid token"
);