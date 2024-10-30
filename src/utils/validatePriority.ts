export function priorityToNumber(priority: number | string): number {
  if (priority === 'Baixa') {
    priority = 1;
  } else if (priority === 'Média') {
    priority = 2;
  } else {
    priority = 3;
  }
  return priority;
}

export function priorityToString(priority: string | number): string {
  if (priority === 1) {
    priority = 'Baixa';
  } else if (priority === 2) {
    priority = 'Média';
  } else {
    priority = 'Alta';
  }
  return priority;
}
