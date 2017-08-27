# Tutuka CSV Recon Project
## CSV Recon Website (ReactJS - VS Code )
### Statically Hosted on S3
http://tutuka.s3-website.eu-west-2.amazonaws.com/

### Source code in Github 
Let me know when to remove it and I'll pull it down
https://github.com/tonym128/csvrecon

## CSV Recon Windows App (C# - Visual Studio 2017)
http://tutuka.s3-website.eu-west-2.amazonaws.com/tutuka/Files/TutukaTonyMamacosTrailProject.zip

## Some Test Data I made while working on it.
https://s3.eu-west-2.amazonaws.com/tutuka/Files/TestData.zip

## Design choices

I initially chose C# due to familiarity and ease of deploy, however after a bit of communication I started re-implementing in Ruby and a very small way into that, I decided that I wanted to do all client side processing to avoid sending the files over the wire. I chose React for that instead. 

The C# app has a full test suite around it with additional test data. For the React App there is actually very little to test, PapaParse handles the CSV files very well and ReactTable seems pretty solid. I haven't found a combination that actually throws and error, but I could have cleaned up the processing handling around the files.

## Compromises

Due to the dual implementations I didn't do pattern matching, I would have implemented this as a fuzzy type match. Once we decided on the importance of columns totaling a score of 100 across all columns, instead of doing exact matching I would generate comparison scores to other rows and choose the row with the highest match score over a certain threshold (70, being the idea that 2 or 3 important columns match out of 5, with some having a higher priority and we would get a fuzzy match). This concept could be expanded to check the transaction id's and wallet references trying to incorporate misspellings or one or two wrong characters.

## Assumptions / Decisions
- The match is currently on all columns.
- Duplicates aren't errors, but are reported on and will show in unmatched.
- Files with missing / different columns aren't treated as errors, just empty fields.
- Duplicates are treated as unique values instead of hidden. Ie Two duplicates in file 1 with a single match in file 2 will result in one of the file 1 duplicates showing up as unmatched
- According to the CSV standards it doesn't seem files should end with delimeter comma's, but I've just suppresed this error in the CSV parser.

### Speaking to some of the things being monitored.
### Layout and design
If we consider this an initial demo and further layout optimisations are required, please provide feedback and I will do it.
In the windows app I rolled the side by side unmatched view into a single pane, while in the web app I went with the mock up which would allow to add the matching capabilities easlier.

### TDD/BDD
I'd like to add coverage to the React code base with any additional work.

### Exception handling
I haven't had any exceptions from the website code in the production build and all output seems sane, but empty objects are built.

### Algorithm
I did a hashing algorithm for the comparison, it's currently all the fields but since I explicitly listed them this could easily be updated.

### Speed of recon
Without having to send files to a remote server it should be fast.

I was intially going for a streaming approach where you stream both files into a diff hash to only store records without matches, you'll see this implmented in the hash, but unfortunately I wasn't able to spin up worker threads in React for processing both files at the same time, I would potentially do this in html5 directly if I had to do it again. The beauty of the approach would have been to only use as much memory as the diff and given two similar files in date order that would hopefully scale quite far.

### Modularity of code
I hope I've started with some core concepts extracted, but would look to build modular functionality as required.

### Self-documenting code
The easiest code to maintain is the code that isn't there, so I'm hoping it's succinct enough that it seems self documenting.


