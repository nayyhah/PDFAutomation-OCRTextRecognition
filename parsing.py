'''
Program to parse the image :

1. Create an object of required template class and Import coordinates of bounding boxes
2. Make bounding box across those coordinates
3. Extract text from each Bounding Box
4. Save it in dictionary and call textExtraction()
5. Send back the result of textExtraction() to main

'''
from collections import namedtuple
import pytesseract
import imutils
import cv2
import json
from functions.align_image import align_img
from functions.removewatermark import removeWatermark
import templates.template


def cleanup_text(text):
    #Removes non-ASCII text using OpenCV
    return("".join([c if ord(c) < 128 else "" for c in text]).strip())


def parse(image, template, className):

    # Create object of required template class
    tempClass = getattr(templates.template, className)
    Object = tempClass()
    OCR_LOCATIONS = Object.ocr_locations()

    '''
    Align Images
    '''
    alignedimg = align_img(image, template)

    '''
    RemoveWatermark
    '''
    processedimg = removeWatermark(alignedimg)

    # initialize a list to store the document OCR parsing results
    parsingResults = []

    # loop over the locations of the document we are going to OCR
    for loc in OCR_LOCATIONS:

        #Extract the OCR Region of Interest ie, ROI
        (x, y, w, h) = loc.bbox
        roi = processedimg[y:y + h, x:x + w]

        # OCR the ROI using Tesseract
        rgb = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
        text = pytesseract.image_to_string(rgb, config='--oem 3 --psm 6' )

        # break the text into lines and loop over them
        for line in text.split("\n"):
            
            if len(line) == 0:
                continue

            lower = line.lower()

            # count no of filterkeywords, if any ignore them.
            count = sum([lower.count(x) for x in loc.filter_keywords])

            if count == 0:
                parsingResults.append((loc, line))


    # initialize a dictionary to store our final OCR results  
    results = {}

    # loop over the results of parsing the document
    for (loc, line) in parsingResults:
        # grab any existing OCR result for the current ID of the document
        r = results.get(loc.id, None)

        if r is None:
            results[loc.id] = (line, loc._asdict())
        else:
            # unpack the existing OCR result and append the line to the
            # existing text
            (existingText, loc) = r
            text = "{}\n{}".format(existingText, line)
            # update our results dictionary
            results[loc["id"]] = (text, loc)
            
    dictionary={}

    # loop over the results fix size of image
    for (locID, result) in results.items():
        # unpack the result tuple
        (text, loc) = result
        text = "{}\n\n".format(text)
        dictionary[loc["id"]] = text
        clean = cleanup_text(text)


    for entries in dictionary:
        dictionary[entries] = dictionary[entries].split('\n')
        entry = [ele for ele in dictionary[entries] if ele.strip(" ")]
        dictionary[entries] = entry

    return(Object.textExtraction(dictionary))

