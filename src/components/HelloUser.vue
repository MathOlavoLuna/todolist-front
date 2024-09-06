<script setup lang="ts">
const user = JSON.parse(localStorage.getItem('user') as string);
const date = new Date();
const dayHour = date.getHours();
let message = '';

if (dayHour > 6 && dayHour <= 12) {
 message = 'Good Morning';
} else if (dayHour > 12 && dayHour <= 18) {
 message = 'Good Afternoon';
} else if (dayHour > 18) {
 message = 'Good Night';
} else if (dayHour > 1 && dayHour <= 4) {
 message = 'Why are you awake,';
}
</script>

<template>
 <span>{{ message }} {{ user.name }}</span>
</template>
