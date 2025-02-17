import Dexie from "dexie";

const db = new Dexie("trackerDB")

// Schema declaration:
db.version(1).stores({
    tasks: "id, name",
});


db.on("populate", function () {
    db.tasks.bulkAdd([
        {
            id: 1,
            name: 'golf'
        },
        {
            id: 2,
            name: 'yoga'
        },
    ]);
});

async function initializeDB() {
    try {
        await db.open();
    } catch (error) {
        console.error("Error opening database:", error);
    }
}

export { db, initializeDB };