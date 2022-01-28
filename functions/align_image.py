from turtle import width
import numpy as np
import imutils
import cv2

def align_img(img, template, maxFeatures=500, keepPercent=0.2, debug=False):
# convert both the input image and template to grayscale
    # print(image.shape[:2])
    (height,width) = template.shape[:2]
    # print(template.shape)
    image = imutils.resize(img,width,height)
    # print(image.shape)
    # cv2.imwrite("Image.jpg",image)
    # cv2.waitKey(0)
    # print(image.shape)
    imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    templateGray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
    # # gray = np.concatenate((imageGray,templateGray), axis=0)
    # cv2.imshow("images",gray)
    # cv2.waitKey(0)
    orb = cv2.ORB_create()
    
    (kpsA, descsA) = orb.detectAndCompute(imageGray, None)
    (kpsB, descsB) = orb.detectAndCompute(templateGray, None)	
    
    # method = cv2.DESCRIPTOR_MATCHER_BRUTEFORCE_HAMMING
    # matcher = cv2.DescriptorMatcher_create(method)
    
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    
    
    matches = bf.match(descsA, descsB, None)
    
    matches = sorted(matches,key= lambda x : x.distance)
    
    keep = int(len(matches)*keepPercent)
    
    matches = matches[:keep]
    
    if debug:
        matchedVis = cv2.drawMatches(image, kpsA, template, kpsB,
            matches, None)
        matchedVis = imutils.resize(matchedVis, width=1000)
        cv2.imshow("Matched Keypoints", matchedVis)
        cv2.waitKey(0)
        
    ptsA = np.zeros((len(matches),2),dtype="float")
    ptsB = np.zeros((len(matches),2),dtype="float")
    
    for (i,m) in enumerate(matches):
        ptsA[i] = kpsA[m.queryIdx].pt
        ptsB[i] = kpsB[m.trainIdx].pt
        
    (H,mask) = cv2.findHomography(ptsA,ptsB,method=cv2.RANSAC)
    
    (h,w) = template.shape[:2]
    # print(img.shape)
    cv2.imwrite("Image.jpg",img)
    (image_h,image_w) = image.shape[:2]
    (img_h,img_w) = img.shape[:2]
    # print(img.shape,image.shape)
    # h = int(h * img_h/image_h)
    # w = int(w* img_w/image_w)
    s = np.array(([img_w/image_w,0,0],[0,img_h/image_h,0],[0,0,1]))
    s_inv = np.linalg.inv(s)
    H_s = np.matmul(H,s_inv)
    aligned = cv2.warpPerspective(img,H_s,(w,h))
    # print(aligned.shape)
    # cv2.imwrite("Image_post.jpg",aligned)
    return(aligned)