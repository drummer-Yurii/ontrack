import { createApp } from 'vue'
import * as storage from './storage'
import { activities } from './activities'
import { timelineItems } from './timeline-items'
import App from './App.vue'

import './assets/main.css'

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hiden') {
        console.log('hidden');
        saveState()
    }
})

function saveState() {
    storage.save({
        timelineItems: timelineItems.value,
        activities: activities.value
    })
}

createApp(App).mount('#app')
