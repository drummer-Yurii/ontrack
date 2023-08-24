<script setup>
import { provide, readonly } from 'vue'
import { PAGE_ACTIVITIES, PAGE_TIMELINE, PAGE_PROGRESS } from './constants'
import { generatePeriodSelectOptions } from './functions'
import { currentPage, timelineRef } from './router'
import * as keys from './keys'
import { 
  setActivitySecondsToComplete, 
  activitySelectOptions, 
  createActivity, 
  deleteActivity, 
  activities 
} from './activities'
import { updateTimelineItemActivitySeconds, setTimelineItemActivity, timelineItems, resetTimelineItemActivities } from './timeline-items'
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheActivities from './pages/TheActivities.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheProgressVue from './pages/TheProgress.vue'

provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)

provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)

provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)

provide(keys.createActivityKey, createActivity)

provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivities(activity)
  deleteActivity(activity)
})

provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))

provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))

provide(keys.timelineItemsKey, readonly(timelineItems))
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgressVue v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
