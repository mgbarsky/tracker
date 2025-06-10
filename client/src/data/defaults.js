const metrics = [
    {
        id: "5ffc91a3-f01d-4160-82d3-72ee03a6c793",
        title: "Mood",
        description: "",
        enabled: true,
        max: 5,
        min: -5,
        lastValue: 0,
        step: 1,
        tags: ["fe32edc9-20c1-4b12-b938-345b464bf841"],
    },
    {
        id: "c482ca3f-6079-4852-8a1c-f0d887eb241c",
        title: "Anxiety",
        description: "",
        enabled: true,
        max: 10,
        min: 0,
        lastValue: 5,
        step: 1,
        tags: [
            "fe32edc9-20c1-4b12-b938-345b464bf841",
            "ab150a75-ef16-46d4-8fdc-36a32e032ed2",
        ],
    },
    {
        id: "ccd32eaf-6d8d-4f72-8eb4-3a1806d1e7c9",
        title: "Weight",
        description: "",
        enabled: true,
        max: 200,
        min: 40,
        lastValue: 5,
        step: 1,
        tags: ["a4576238-4ac5-45d6-a10f-5ec915df10e7"],
    },
];

const metricTags = [
    { id: "fe32edc9-20c1-4b12-b938-345b464bf841", title: "Emotions", enabled: true , colorID: 0},
    { id: "ab150a75-ef16-46d4-8fdc-36a32e032ed2", title: "Mind", enabled: true, colorID: 1 },
    { id: "a4576238-4ac5-45d6-a10f-5ec915df10e7", title: "Body", enabled: true, colorID: 3 },
    { id: "83800840-c170-46ef-b79c-120b4c717b32", title: "Beauty", enabled: false, colorID: 5 },
];

const tasks = [
    {
        id: "740aed9d-dacb-4437-bdc5-9aa0fc3d805b",
        title: "Swimming",
        enabled: true,
        description: "",
        tags: ["2d7cf458-cbf6-4c25-b8b0-22d60c0f3315"],
    },
    {
        id: "444c8341-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
   /* {
        id: "444c83141-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83421-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83341-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83441-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83451-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83416-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83417-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83481-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83419-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c83401-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834112-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834132-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834133-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834134-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834135-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834136-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834137-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834138-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834139-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834130-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },
    {
        id: "444c834144-6ab4-420e-8a73-4756abd6f1a2",
        title: "Meditation",
        description: "",
        enabled: true,
        tags: ["2963e30e-bbcd-4f64-86d6-335da29fff61"],
    },*/
];

const taskTags = [
    {
        id: "2d7cf458-cbf6-4c25-b8b0-22d60c0f3315",
        title: "Physical exercise",
        enabled: true,
        colorID: 2
    },
    { 
        id: "2963e30e-bbcd-4f64-86d6-335da29fff61", 
        title: "Mindfulness",
        enabled: true,
        colorID: 6 
    }
];

export { tasks, taskTags, metrics, metricTags };
