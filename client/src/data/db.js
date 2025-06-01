import Dexie from "dexie";
import { tasks, metrics, taskTags, metricTags } from "./defaults.js";
const db = new Dexie("trackerDB");

// https://dexie.org/docs/Dexie/Dexie.on.populate

db.on("populate", function () {
    db.tasks.bulkAdd(tasks);
    db.taskTags.bulkAdd(taskTags);
    db.metrics.bulkAdd(metrics);
    db.metricTags.bulkAdd(metricTags);
});

async function initializeDB() {
    try {
        await db.open();
    } catch (error) {
        console.error("Error opening database:", error);
    }
}

db.version(1).stores({
    tasks: "id, title, *tags",
    taskTags: "id, title",
    metrics: "id, title, *tags",
    metricTags: "id, title"
});



export { db, initializeDB };
