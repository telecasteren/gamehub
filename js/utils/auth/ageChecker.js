export function isUserOldEnough(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  // Calculate age
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Check if birth date has happened yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 14;
}
