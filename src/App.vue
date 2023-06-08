<script setup>
import { computed, ref } from 'vue';
import { PAGE_ACTIVITIES, PAGE_TIMELINE, PAGE_PROGRESS } from './constants';
import { 
  normalizePageHash, 
  generateTimelineItems,
  generateActivitySelectOptions, 
  generateActivities
} from './functions';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheTimeline from './pages/TheTimeline.vue';
import TheProgressVue from './pages/TheProgress.vue';

const currentPage = ref(normalizePageHash())

const timelineItems = generateTimelineItems();

const activities = ref(generateActivities());

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function goTo(page) {
  currentPage.value = page
}

function createActivity(activity) {
  activities.value.push(activity)
}

function deleteActivity(activity) {
  timelineItems.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function setTimelineItemActivity({ timelineItem, activity }) {
  timelineItem.activityId = activity.id
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeline 
      v-show="currentPage === PAGE_TIMELINE" 
      :timeline-items="timelineItems"
      :activities="activities" 
      :activity-select-options="activitySelectOptions" 
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <TheActivities 
      v-show="currentPage === PAGE_ACTIVITIES" 
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity" 
    />
    <TheProgressVue v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
