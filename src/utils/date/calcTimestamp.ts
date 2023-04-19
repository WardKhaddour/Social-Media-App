const calcTimestamp = (date1: Date) => {
  const now = new Date().getTime();
  const date = date1.getTime();

  const minutes = (now - date) / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (minutes < 60) return `${minutes.toFixed(0)}m`;
  if (hours < 24) return `${hours.toFixed(0)}h`;
  if (days < 7) return `${days.toFixed(0)}d`;
  if (weeks < 4 && months < 1) return `${weeks.toFixed(0)}w`;
  if (months < 12) return `${months.toFixed(0)} months`;
  return `${years}y`;
};

export default calcTimestamp;
