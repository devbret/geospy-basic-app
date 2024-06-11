# GeoSpy Basic API Application

![GeoSpy Basic API Application Screenshot](https://hosting.photobucket.com/images/i/bernhoftbret/geospy-basic-api-application-screenshot.png)

Query the [GeoSpy API](https://dev.geospy.ai/docs/routes#overview) for any allowed number of images using Python. Then display that information, including submitted images and interactive maps.

## Basic Usage

After cloning the repo, first open the provided images directory, and add your files/photos therein. Then open the app.py script in a text editor. Here, enter your API_TOKEN value.

Once your details are saved, open a terminal and run `pip install -r requirements.txt`. Thereby ensuring that you have the Python library needed for this application to work properly.

Following a successful install, run `python3 app.py` in the console. This will query the GeoSpy basic API, and produce a JSON file locally.

Next, open the index.html file with any modern web browser. This will feature a file uploader. Select your JSON with the file input element. The data will then be displayed on your screen.
