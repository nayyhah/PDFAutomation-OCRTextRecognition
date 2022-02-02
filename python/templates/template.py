'''
Classes of all templates
'''

from collections import namedtuple
import json
import re


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
        OCRLocation("Product", (55, 1066, 1558, 417),
            ["Sold"]),
        ]

        return(OCR_LOCATIONS)


    def textExtraction(self,dictionary = dict()):
        new_dict = dict()
        for entries in dictionary:
            if entries == 'Product':
                new_dict[entries] = self.tableExtraction(dictionary[entries])
            
            else:
                address_str = ''
                new_dict1 = dict()
                for list_entries in dictionary[entries]:
                    if ':' in list_entries:
                        dict_key = (list_entries.split(':'))[0].strip()
                        dict_value = (list_entries.split(':'))[1].strip()
                        
                        new_dict1[dict_key] = dict_value
                        
                    else:
                        address_str = address_str + str(list_entries) + ' '
                    
                    # entry = [ele for ele in dictionary[entries] if ele.strip(" ")]
                    # dictionary[entries] = entry
                    new_dict1["address"] = address_str

                new_dict[entries] = new_dict1

        return(json.dumps(new_dict, indent=4))
     
        
        #     return convert_file
    
    def tableExtraction(self, list_entries = list()):
        tablecontent = ''
        for entries in list_entries:
            # print(entries)
            tablecontent = tablecontent + str(entries) + ' '
        
        # print(tablecontent)

        items_units = re.findall('(\d+ PKG)', tablecontent)
        split_content = re.split('\d+ PKG', tablecontent)

        table_contents = dict()

        i = 0
        for items in split_content:
            # items = items + package_items[i]
            # i = i + 1
            if items:
                product_dict = dict()

                try:
                    product_dict['harmCode'] = re.findall('(\d{4}\.\d{2}\.\d{4})\s', items)[0]
                    product_dict['uniqueVal'] = re.findall('\s(\d+\.\d+)\s\d+\.\d+', items)[0]
                    product_dict['totalVal'] = re.findall('\s\d+\.\d+\s(\d+\.\d+)', items)[0]
                    product_dict['units'] = items_units[i]
                    i = i + 1

                    # doesn't replace it with empty string...
                    items = re.sub(r'\d{4}\.\d{2}\.\d{4}', '', items)
                    items = re.sub(r'\s(\d+\.\d+)\s\d+\.\d+', '', items)
                    items = re.sub(r'\s(\d+\.\d+)', '', items)
                    product_dict['description'] = items

                    # print(product_dict)
                    # print(items)
                    
                    table_contents[product_dict['harmCode']] = product_dict

                except:
                    pass

        return table_contents
