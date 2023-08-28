import { computed } from "vue"
import { calculateActivityCompletionPercentage } from '../activities'
import { getProgressCollorClass } from '../functions'
import { timelineItems, calculateTrackedActivitySeconds } from '../timeline-items'

export function useProgress(activity) {
    const colorClass = computed(() => getProgressCollorClass(percentage.value))

    const percentage = computed(() =>
      calculateActivityCompletionPercentage(activity, trackedSeconds.value)
    )

    const trackedSeconds = computed(() =>
      calculateTrackedActivitySeconds(timelineItems.value, activity)
    )

    return {
        colorClass,
        percentage,
        trackedSeconds
    }
}