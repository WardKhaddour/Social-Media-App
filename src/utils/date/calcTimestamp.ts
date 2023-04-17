const calcTimestamp = (date1: Date) => {
  const now = new Date().getTime();
  const date = date1.getTime();

  const minutes = (now - date) / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  if (weeks < 4 && months < 1) return `${weeks}w`;
  if (months < 12) return `${months} months`;
  return `${years}y`;
};

export default calcTimestamp;
