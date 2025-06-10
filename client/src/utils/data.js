function jsonToCSV(jsonArray, headers) {
    const csvHeader = headers.join(",");
    const rows = jsonArray.map((obj) =>
        headers
            .map((header) => {
                // NOTE: if a value is missing, replace with empty string
                const val = obj[header] ?? "";

                // NOTE: if value is a string and contains comma, wrap in quotes.
                return typeof val === "string" && val.includes(",")
                    ? `"${val}"`
                    : val;
            })
            .join(",")
    );

    return [csvHeader, ...rows].join("\n");
}

export async function saveCSVFile(jsonData, headers, filename = "records.csv") {
    const csvData = jsonToCSV(jsonData, headers);

    if ("showSaveFilePicker" in window) {
        try {
            const options = {
                types: [
                    {
                        description: "CSV file",
                        accept: { "text/csv": [".csv"] },
                    },
                ],
                suggestedName: filename,
            };

            const handle = await window.showSaveFilePicker(options);
            const writable = await handle.createWritable();
            await writable.write(csvData);
            await writable.close();

            console.log(`${filename} saved using FileSystem API`);

            return;
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Save canceled by user.");
                return;
            }

            console.warn(
                "Saving with the FileSystem API failed so falling back to blob download",
                err
            );
        }
    }

    // NOTE: Below lines will only be executed only when using file system api is failed or there is no showSaveFilePicker in window
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const aElement = document.createElement("a");
    aElement.href = url;
    aElement.download = filename;
    document.body.appendChild(aElement);
    aElement.click();
    document.body.removeChild(aElement);
    URL.revokeObjectURL(url);

    console.log(`${filename} saved using fallback method!`);
}

export async function downloadData (records, db) {
        const generatedJsonData = [];
        for (const record of records) {
            const generatedJsonObj = {};
            if ("metricID" in record) {
                // query metric
                const metric = await db.metrics.get(record.metricID);

                generatedJsonObj["title"] = metric.title;
                generatedJsonObj["type"] = "metric";
                generatedJsonObj["level"] = record.metricLevel;
                generatedJsonObj["dateKey"] = record.dateKey;
                generatedJsonObj["start"] = record.start;
                generatedJsonObj["year"] = record.year;
                generatedJsonObj["month"] = record.month;
                generatedJsonObj["day"] = record.day;
                generatedJsonObj["weekDay"] = record.weekDay;
            } else if ("taskID" in record) {
                // query task
                const task = await db.tasks.get(record.taskID);

                generatedJsonObj["title"] = task.title;
                generatedJsonObj["type"] = "task";
                generatedJsonObj["totalSecs"] = record.totalSecs;
                generatedJsonObj["dateKey"] = record.dateKey;
                generatedJsonObj["start"] = record.start;
                generatedJsonObj["year"] = record.year;
                generatedJsonObj["month"] = record.month;
                generatedJsonObj["day"] = record.day;
                generatedJsonObj["weekDay"] = record.weekDay;
            }

            generatedJsonData.push(generatedJsonObj);
        }

        console.log(generatedJsonData);

        const headers = [
            "title",
            "type",
            "totalSecs",
            "level",
            "dateKey",
            "start",
            "year",
            "month",
            "day",
            "weekDay",
        ];

        await saveCSVFile(generatedJsonData, headers);
    };