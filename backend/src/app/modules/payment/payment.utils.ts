export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomString}`;
};

export const validateTimeSlot = (start: Date, end: Date): boolean => {
  const now = new Date();
  const minDuration = 30 * 60 * 1000;
  const maxDuration = 8 * 60 * 60 * 1000;

  if (start < now) throw new Error('Start time cannot be in the past');
  if (end <= start) throw new Error('End time must be after start time');
  if (end.getTime() - start.getTime() < minDuration) {
    throw new Error('Minimum booking duration is 30 minutes');
  }
  if (end.getTime() - start.getTime() > maxDuration) {
    throw new Error('Maximum booking duration is 8 hours');
  }

  return true;
};
