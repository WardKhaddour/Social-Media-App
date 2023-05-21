import moment from 'moment';

const calcTimestamp = (date1: Date) => {
  const now = moment();
  const date = moment(date1);

  const minutes = now.diff(date, 'minutes');
  const hours = now.diff(date, 'hours');
  const days = now.diff(date, 'days');
  const weeks = now.diff(date, 'weeks');
  const months = now.diff(date, 'months');
  const years = now.diff(date, 'years');

  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  if (weeks < 4 && months < 1) return `${weeks}w`;
  if (months < 12) return `${months} months`;
  return `${years}y`;
};

export default calcTimestamp;
