# GeoSpy API Basic Application

Processes a collection of local images, sends them to the [GeoSpy API](https://dev.geospy.ai/docs/routes#overview) for analysis and then visualizes the returned metadata in a browser.

## Overview

The Python backend walks through an images directory, converts each image to base64 and submits it to the API. Afterwards collecting responses such as city, country, coordinates and explanatory context into a JSON file. The frontend then allows a user to upload that JSON file, rendering each image alongside its inferred location details and displays an interactive map using Leaflet with a marker pinpointing the predicted location.

## Set Up Instructions

Below are the required software programs and instructions for installing and using this application.

### Programs Needed

- [Git](https://git-scm.com/downloads)

- [Python](https://www.python.org/downloads/)

### Steps For Use

1. Install the above programs

2. Open a terminal

3. Clone this repository using `git` by running the following command: `git clone git@github.com:devbret/geospy-api-basic-app.git`

4. Navigate to the repo's directory by running: `cd geospy-api-basic-app`

5. Create a virtual environment with this command: `python3 -m venv venv`

6. Activate your virtual environment using: `source venv/bin/activate`

7. Install the needed dependencies for running the script: `pip install -r requirements.txt`

8. Add your photos to the `images` directory

9. Open the `app.py` script in a text editor and enter your `API_TOKEN` value

10. Run the program using this command: `python3 app.py`

11. Launch a local HTTP server to view the frontend UI: `python3 -m http.server`

12. Visit the following URL in a modern web browser: `http://localhost:8000`

13. To exit the virtual environment, type this command in the terminal: `deactivate`

## Other Considerations

This repo is not being actively maintained because the GeoSpy API is no longer available to the general public. If you do decide to clone and use this application, you do so at your own risk.

Regardless, this project repo is intended to demonstrate an ability to do the following:

- Analyze a batch of images to determine their likely geographic locations using an external AI-powered API

- Visualize results by displaying images, metadata and interactive maps showing predicted locations

If you have any questions or would like to collaborate, please reach out either on GitHub or via [my website](https://bretbernhoft.com/).
