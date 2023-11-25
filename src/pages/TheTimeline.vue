<script setup>
import { onActivated, onDeactivated } from 'vue';
import TheTimelineIndecator from '../components/TheTimelineIndecator.vue';
import TimelineItem from '../components/TimelineItem.vue';
import { timelineItems, timelineItemRefs, scrollToCurrentHour } from '../timeline-items';
import { startCurrentDateTimer, stopCurrentDateTimer } from '../time'

onActivated(() => {
    scrollToCurrentHour()
    startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
    <div class="relative mt-7">
        <TheTimelineIndecator />
        <ul>
           <TimelineItem 
                v-for="timelineItem in timelineItems"
                :key="timelineItem.hour"
                :timeline-item="timelineItem" 
                ref="timelineItemRefs"
            />
        </ul>
    </div>
</template>