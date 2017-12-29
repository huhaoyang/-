export const isMobile = val => {
  if(!(/^1\d{10}$/.test(val))){
    return true;
  }
  return false;
}
