import aiohttp
import asyncio
import base64
import logging
import json
import os
from aiohttp import ClientTimeout

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s: %(message)s')

API_TOKEN = "api_key_here"
API_BASE = "https://dev.geospy.ai"
API_ENDPOINT = "/predict_v1"
FULL_API_URL = f"{API_BASE}{API_ENDPOINT}"
IMAGE_DIR = "images"

request_timeout = ClientTimeout(total=60)

collected_responses = []

async def convert_image_to_base64(image_path: str) -> str:
    try:
        with open(image_path, "rb") as file:
            encoded_string = base64.b64encode(file.read()).decode()
        return encoded_string
    except Exception as e:
        logging.error(f"Error converting image {image_path} to base64: {e}")
        return None

async def post_image_data(session, encoded_image: str, file_path: str):
    data = {
        "image": encoded_image,
    }
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json',
    }

    try:
        async with session.post(FULL_API_URL, json=data, headers=headers, timeout=request_timeout) as resp:
            response_text = await resp.text()
            if resp.status == 200:
                response_data = await resp.json()
                collected_responses.append({file_path: response_data})
                logging.debug(f"Request successful for {file_path}: {response_data}")
            else:
                logging.error(f"Request failed for {file_path} with status {resp.status}: {response_text}")
    except Exception as error:
        logging.error(f"Error during request for {file_path}: {error}")

async def process_images():
    async with aiohttp.ClientSession() as session:
        tasks = []
        for root, dirs, files in os.walk(IMAGE_DIR):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff')):
                    path = os.path.join(root, file)
                    encoded_img = await convert_image_to_base64(path)
                    if encoded_img:
                        task = asyncio.create_task(post_image_data(session, encoded_img, path))
                        tasks.append(task)
                        await asyncio.sleep(1)
        await asyncio.gather(*tasks, return_exceptions=True)
        with open('api_responses.json', 'w') as json_file:
            json.dump(collected_responses, json_file)

if __name__ == "__main__":
    asyncio.run(process_images())
