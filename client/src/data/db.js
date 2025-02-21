import Dexie from "dexie";
import { tasks, getDefaults } from "./defaults.js";
const db = new Dexie("trackerDB")


// https://dexie.org/docs/Dexie/Dexie.on.populate
/* db.on('ready', function (db) {
    // on('ready') event will fire when database is open but 
    // before any other queued operations start executing.
    // By returning a Promise from this event,
    // the framework will wait until promise completes before
    // resuming any queued database operations.
    // Let's start by using the count() method to detect if 
    // database has already been populated.
    return db.tasks.count(function (count) {
        if (count > 0) {
            console.log("Already populated");
        } else {
            console.log("Database is empty. Populating default values...");  
            const defaults = getDefaults();
            console.log(defaults.defaultTasks) ;         
            db.tasks.bulkAdd(defaults.defaultTasks);
        }
    });
}); */

db.on("populate", function () {
    db.tasks.bulkAdd(tasks);
}); 

async function initializeDB() {
    try {        
        await db.open();
    } catch (error) {
        console.error("Error opening database:", error);
    }
}

db.version(1).stores({
    tasks: "id, title",
    taskTypes: "id,caption",
    metrics: "id,title",
    metricTypes: "id,caption",
    taskTags: "[taskID+tagID]",
    metricTags: "[metricID+tagID]"
});

// Schema declaration:
/* db.version(1).stores({
    tasks: "id, title"
});

db.version(2).stores({    
    taskTypes: "id,caption"   
});

db.version(3).stores({ 
    metrics: "id,title"
});

db.version(4).stores({    
    metricTypes: "id,caption"
}); */

/* db.version(5).stores({ 
    taskTags: "[taskID + tagID]"
});

db.version(6).stores({   
    metricTags: "[metricID, tagID]"
}); */

export { db, initializeDB };