''' 
1. Take image input from cloudinary
2. Take input from node code
3. Call Parsing Function
4. Upload the result in MongoDB
'''

import pdf2image
import cv2
from parsing import parse
import pymongo
import sys
import os
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import json
import time
from bson.objectid import ObjectId

# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract'

'''
Dictinary Storing Template Deatils
'''
template_dict = {0 : ["template1.jpg","template1"]}


def main():

	'''
	Input taken from backend
	'''
	# queryID is used to upload json file to mongo
	queryID = sys.argv[1] 
	# documentID is the number when user passes multiple docs at once
	documentID = sys.argv[2]
	# URL of image hosted in cloudinary
	url = sys.argv[3] #url of image
	# type of applicatino ie, "applications/pdf" or "image/jpg"
	filetype = sys.argv[4]
	# ID of template used by user
	templateID = int(sys.argv[5])


	#get template details from dictionary
	template = cv2.imread(template_dict[templateID][0])
	className = template_dict[templateID][1]


	#convert link into image
	response = requests.get(url)


	if( filetype.find("/pdf") == -1 ):
		'''If input file is PDF, Conversion of pdf into image'''
		image = Image.open(BytesIO(response.content))
	else:
		image = pdf2image.convert_from_bytes(response.content)[0]

		
	filename = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
	

	''' Image Alignment, Watermark Removal, Bounding Box, Text extraction '''
	finaloutput = json.loads(parse(filename, template, className))
	

	#Upload the json file into mongo
	mongo_url = os.getenv('MONGO_URL',default="mongodb+srv://codemonk:database12qw@cluster0.0vur0.mongodb.net/pass_test?retryWrites=true&w=majority")
	client = pymongo.MongoClient(mongo_url)
	queryCollection =  client['pass_test']['queries']
	queryCollection.find_one_and_update({"_id":ObjectId(str(queryID))},{"$set":{f"parsed.{documentID}.document":finaloutput,f"parsed.{documentID}.isparsed":True}})


if __name__ == '__main__':
	main()