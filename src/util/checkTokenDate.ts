export const CheckTokenExpiryDate = (date: Date | number) => {
  const daysUntilExpiry = new Date().setDate(new Date().getDate() + 7);
  return daysUntilExpiry > date;
};
