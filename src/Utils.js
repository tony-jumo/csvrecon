import React from 'react';
import Papa from 'papaparse'

export function FileInput(props) {
    return <div><label> {props.description} </label><input type="file" accept='.csv' name={props.name} /></div>;
}

export function buildHash(dataRow) {
    var hashString = ""
    var row = dataRow[0]

    hashString = row.ProfileName + '|' +
        row.TransactionDate + '|' +
        row.TransactionAmount + '|' +
        row.TransactionNarrative + '|' +
        row.TransactionDescription + '|' +
        row.TransactionID + '|' +
        row.TransactionType + '|' +
        row.WalletReference

    var hash = numbersconv(hashString)
    return hash
}

export function numbersconv(str) {
    var res = 0,
        len = str.length;
    for (var i = 0; i < len; i++) {
        res = res * 31 + str.charCodeAt(i);
        res = res & res;
    }
    return res;
}

export function processFile(callback, file, fileHash) {
    var fileDetails = {name: 'n/a', records:0, duplicates:0, errors:0, matches: 0};
    fileDetails.name = file.name;
    
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
            callback(fileDetails, fileHash);
        },
        step: function (results) {
            // Ignore TooManyFields errors since we can't disable it for the trailing comma.
            var errors = results.errors.filter(function (error) {
                return error.code !== "TooManyFields";
            });

            // Counts as a record in all scenarios
            fileDetails.records += 1;

            if (errors.length === 0) {
                var hash = buildHash(results.data)
                if (fileHash.hasOwnProperty(hash)) {
                    //Collision
                    if (fileHash[hash].fileNames.indexOf(file.name) > -1) {
                        //File already exists in array
                        fileDetails.duplicates += 1;
                    } else {
                        //It's a match
                        fileDetails.matches += 1;

                        // Update the filename hash to include this file
                        fileHash[hash].fileNames.push(file.name)

                        //Remove the data, it's no longer neccesary
                        delete fileHash[hash]
                    }
                }
                else {
                    fileHash[hash] = { fileNames: [file.name], rowData: results.data[0] }
                }
            }
            else {
                // Count the error if it's flagged as such
                fileDetails.errors += 1;
            }
        }
    });

    return fileDetails;
}
