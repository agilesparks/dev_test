## Intro
This project is intended for doing knowledge test for candidates.
### Test data
The test data is located in a json file under `/src/data`.
It includes some info like title and length of the test, together with the questions themselves.
Each question and answer can have text and an image. 
Images are placed under src/data/[test id]_assets
Markdown is supported for the text parts.

When the candidate submits the solution or when the time is up, the name, answers and start - stop times are sent to a google script which adds these data to a google sheet.

## Setup
1. Clone the repo  
2. Run: `npm install`  
3. To try out the application, copy `src/demo_data` to `src/data`. 
   For actual use, put your actual test questions and assets under `src/data` and create an `src/data/index.json` file with the list of available tests  
4. Setup a google spreadsheet for use with this application, see: https://github.com/jamiewilson/form-to-google-sheets  
5. To run: `npm start`  
6. To deploy (with netlify): `npm run deploy`
