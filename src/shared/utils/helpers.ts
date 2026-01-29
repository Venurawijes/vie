/**
 * add min to a given datetime and return time in sec
 * @param from date time string
 * @param addedTimeInMin time need to be added in min
 * @returns
 */
export function getRemainingSeconds(from: string, addedTimeInMin: number = 30): number {
  const createdAt = new Date(from).getTime();
  const deadline = createdAt + addedTimeInMin * 60 * 1000;
  const diff = Math.floor((deadline - Date.now()) / 1000);
  return Math.max(0, diff);
}

/**
 * format given datetime to 'YYYY-MM-DD HH:mm:ss' format
 * @param dateTime
 * @returns
 */
export const getFormattedDateTime = (date = new Date()) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
