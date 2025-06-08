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
