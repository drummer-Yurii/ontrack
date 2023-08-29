import { computed } from 'vue'
import { calculateCompletionPercentage, trackedActivities } from '../activities'
import { getProgressCollorClass } from '../functions'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'

export function useTotalProgress() {
  const colorClass = computed(() => getProgressCollorClass(percentage.value))

  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete
        )
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  return {
    colorClass,
    percentage
  }
}
