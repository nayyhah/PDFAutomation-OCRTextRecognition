'''
Classes of all templates
'''

from collections import namedtuple
import json

class template1:

    def __init__(self,dictionary = {}):
        self.dictionary = {}

    def ocr_locations(self):

        OCRLocation = namedtuple("OCRLocation", ["id", "bbox","filter_keywords"])

        OCR_LOCATIONS = [
        OCRLocation("From", (55,118,769,507),
            ["From", "FROM"]),
        OCRLocation("SecondBox", (838, 118, 775, 507),
            ["From"]),
        OCRLocation("ShipTo", (55, 625, 769, 427),
            ["Ship","To", "SHIP","TO"]),
        OCRLocation("SoldTo", (838, 625, 769, 427),
            ["Sold", "To", "Information", "SOLD", "TO", "INFORMATION"]),
        OCRLocation("BillingInfo", (836, 1608, 777, 371),
            ["Sold"]),
        OCRLocation("Table", (55, 1066, 1558, 417),
            ["Sold"]),
        ]

        return(OCR_LOCATIONS)


    def textExtraction(self,dictionary = dict()):
        new_dict = dict()
        for entries in dictionary:
            address_str = ''
            new_dict1 = dict()
            for list_entries in dictionary[entries]:
                if ':' in list_entries:
                    dict_key = (list_entries.split(':'))[0].strip()
                    dict_value = (list_entries.split(':'))[1].strip().strip('\f')
                    
                    new_dict1[dict_key] = dict_value
                    
                else:
                    address_str = address_str + str(list_entries) + ' '
                
                # entry = [ele for ele in dictionary[entries] if ele.strip(" ")]
                # dictionary[entries] = entry
                new_dict1["address"] = address_str

            new_dict[entries] = new_dict1
        
        
        with open('output2.json', 'w') as convert_file:
            convert_file.write(json.dumps(new_dict))

    
    def tableExtraction(self, dictionary = dict()):
        return
