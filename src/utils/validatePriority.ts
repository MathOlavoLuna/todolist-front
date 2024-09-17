export function validatePriority(priority: string | number) {
 if (priority === 'Baixa') {
  priority = 1;
 } else if (priority === 'Média') {
  priority = 2;
 } else {
  priority = 3;
 }
 return priority;
}
