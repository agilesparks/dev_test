## Intro
This project is intended for doing knowledge test for candidates.
### Test data
The test data is located in a json file under `/src/data`.
It includes some info like title and length of the test, together with the questions themselves.
Each question and answer can have text and an image. 
Images are placed under src/data/[test id]_assets

When the candidate submits the solution or when the time is up, the name, answers and start - stop times are sent to a google script which adds these data to a google sheet.

## Setup
On how to setup a google spreadsheet for use with this application, see https://github.com/jamiewilson/form-to-google-sheets
Besides that, the application should just be deployed as a static SPA.